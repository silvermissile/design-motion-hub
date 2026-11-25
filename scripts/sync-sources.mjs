#!/usr/bin/env node
/**
 * Synchronize registered external repositories and adapters defined in registry/sources.json.
 * Supports:
 *   - github:owner/repo[@ref][/subpath]
 *   - update: "latest" (fetch & hard reset) | "pinned" (skip if present) | "local" (no-op)
 *   - optional manifestOverride injection into the resolved package root (supports subpath)
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_PATH = path.join(ROOT, 'registry', 'sources.json');
const SYNC_ROOT = path.join(ROOT, 'synced');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const onlyIdx = args.indexOf('--only');
const onlyId = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

export function parseGithubSource(spec, defaultRef = 'main') {
  const raw = spec.slice('github:'.length);
  const parts = raw.split('/');
  if (parts.length < 2) throw new Error(`Invalid github source: ${spec}`);
  const owner = parts[0];
  let repo = parts[1];
  let ref = defaultRef;
  if (repo.includes('@')) {
    const at = repo.indexOf('@');
    ref = repo.slice(at + 1) || defaultRef;
    repo = repo.slice(0, at);
  }
  const subpath = parts.slice(2).join('/');
  return { url: `https://github.com/${owner}/${repo}.git`, ref, subpath };
}

function runGit(cwd, gitArgs) {
  if (dryRun) {
    console.log(`  [dry-run] git ${cwd ? `-C ${cwd} ` : ''}${gitArgs.join(' ')}`);
    return;
  }
  execFileSync('git', cwd ? ['-C', cwd, ...gitArgs] : gitArgs, { stdio: 'inherit' });
}

function syncGithubRepo(spec, destDir, ref, updateMode, extraPaths = []) {
  const parsed = parseGithubSource(spec, ref || 'main');
  const gitDir = path.join(destDir, '.git');
  const sparsePaths = parsed.subpath ? [parsed.subpath, ...extraPaths] : [];

  if (existsSync(gitDir)) {
    if (updateMode === 'pinned') {
      console.log(`  [skip] pinned at ${destDir}`);
      return parsed;
    }
    if (sparsePaths.length > 0) {
      runGit(destDir, ['sparse-checkout', 'set', ...sparsePaths]);
    }
    console.log(`  [update] fetching ${parsed.url} (${parsed.ref})`);
    runGit(destDir, ['fetch', '--depth', '1', 'origin', parsed.ref]);
    runGit(destDir, ['reset', '--hard', 'FETCH_HEAD']);
    return parsed;
  }

  console.log(`  [clone] ${parsed.url} (${parsed.ref}) -> ${destDir}`);
  if (!dryRun) mkdirSync(path.dirname(destDir), { recursive: true });

  if (sparsePaths.length > 0) {
    runGit(null, ['clone', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', parsed.ref, parsed.url, destDir]);
    runGit(destDir, ['sparse-checkout', 'set', ...sparsePaths]);
  } else {
    runGit(null, ['clone', '--depth', '1', '--branch', parsed.ref, parsed.url, destDir]);
  }
  return parsed;
}

function main() {
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
  const items = (registry.items || []).filter((it) => !onlyId || it.id === onlyId);

  if (!items.length) {
    console.log(onlyId ? `No matching item for --only ${onlyId}` : 'No items in registry.');
    return;
  }

  for (const item of items) {
    console.log(`=== ${item.id} (${item.kind}) ===`);
    if (item.kind === 'local-package') {
      const localPath = path.resolve(ROOT, item.source.slice('local:'.length));
      console.log(`  [local] ready at ${localPath}`);
      continue;
    }

    if (item.kind === 'external-repo' && item.source.startsWith('github:')) {
      const dest = path.join(SYNC_ROOT, item.id);
      const extraPaths = Array.isArray(item.extraPaths) ? item.extraPaths : [];
      const parsed = syncGithubRepo(item.source, dest, item.ref, item.update || 'latest', extraPaths);
      const pkgRoot = parsed.subpath ? path.join(dest, parsed.subpath) : dest;
      for (const extraRel of extraPaths) {
        const srcExtra = path.join(dest, extraRel);
        const dstExtra = path.join(pkgRoot, extraRel);
        console.log(`  [extra] ${srcExtra} -> ${dstExtra}`);
        if (!dryRun && existsSync(srcExtra)) cpSync(srcExtra, dstExtra, { recursive: true });
      }
      if (item.overlayDir) {
        const srcOverlay = path.resolve(ROOT, item.overlayDir);
        console.log(`  [overlay] ${srcOverlay} -> ${pkgRoot}`);
        if (!dryRun && existsSync(srcOverlay)) cpSync(srcOverlay, pkgRoot, { recursive: true });
      }
      if (item.manifestOverride) {
        const srcManifest = path.resolve(ROOT, item.manifestOverride);
        const dstManifest = path.join(pkgRoot, 'open-design.json');
        console.log(`  [manifest] ${srcManifest} -> ${dstManifest}`);
        if (!dryRun && existsSync(srcManifest)) cpSync(srcManifest, dstManifest);
      }
      continue;
    }

    if (item.kind === 'adapter' && item.upstream?.startsWith('github:')) {
      const adapterDir = path.resolve(ROOT, item.source.slice('local:'.length));
      const upstreamDir = path.join(adapterDir, 'upstream');
      syncGithubRepo(item.upstream, upstreamDir, item.ref, item.update || 'latest');
      continue;
    }

    console.log(`  [warn] unsupported source format: ${item.source}`);
  }

  if (dryRun) console.log('\n[dry-run] complete (no files modified).');
}

main();
