#!/usr/bin/env node
/**
 * Validate all packages, synced external repos, adapters, and marketplace metadata
 * in design-motion-hub without requiring external daemon dependencies.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES_PATH = path.join(ROOT, 'registry', 'sources.json');
const MARKETPLACE_PATH = path.join(ROOT, 'registry', 'custom-marketplace.json');
const SYNC_ROOT = path.join(ROOT, 'synced');

function githubSubpath(spec) {
  const parts = spec.slice('github:'.length).split('/');
  return parts.length > 2 ? parts.slice(2).join('/') : '';
}

function resolveItemDir(item) {
  if (item.source.startsWith('local:')) {
    return path.resolve(ROOT, item.source.slice('local:'.length));
  }
  const base = path.join(SYNC_ROOT, item.id);
  if (item.source.startsWith('github:')) {
    const sub = githubSubpath(item.source);
    return sub ? path.join(base, sub) : base;
  }
  return base;
}

function checkFrontmatter(skillPath) {
  const text = readFileSync(skillPath, 'utf8');
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return 'SKILL.md missing YAML frontmatter';
  const fm = match[1];
  if (!/^name:\s*\S+/m.test(fm)) return 'SKILL.md frontmatter missing "name"';
  if (!/^description:\s*\S+/m.test(fm)) return 'SKILL.md frontmatter missing "description"';
  return null;
}

function main() {
  const errors = [];
  const sources = JSON.parse(readFileSync(SOURCES_PATH, 'utf8'));
  const marketplace = JSON.parse(readFileSync(MARKETPLACE_PATH, 'utf8'));

  if (!Array.isArray(sources.items) || sources.items.length === 0) {
    errors.push('registry/sources.json has no items');
  }
  if (!Array.isArray(marketplace.plugins)) {
    errors.push('registry/custom-marketplace.json missing plugins array');
  }

  const mpNames = new Set((marketplace.plugins || []).map((p) => p.name));

  for (const item of sources.items || []) {
    if (!mpNames.has(item.id)) {
      errors.push(`${item.id}: missing entry in registry/custom-marketplace.json`);
    }
    const dir = resolveItemDir(item);
    if (!existsSync(dir)) {
      errors.push(`${item.id}: directory missing at ${dir} (run sync-sources.mjs first)`);
      continue;
    }

    const skillPath = path.join(dir, 'SKILL.md');
    if (!existsSync(skillPath)) {
      errors.push(`${item.id}: missing SKILL.md at ${skillPath}`);
    } else {
      const fmErr = checkFrontmatter(skillPath);
      if (fmErr) errors.push(`${item.id}: ${fmErr}`);
    }

    const manifestPath = path.join(dir, 'open-design.json');
    if (!existsSync(manifestPath)) {
      errors.push(`${item.id}: missing open-design.json at ${manifestPath}`);
    } else {
      try {
        const m = JSON.parse(readFileSync(manifestPath, 'utf8'));
        for (const req of ['specVersion', 'name', 'version']) {
          if (!m[req]) errors.push(`${item.id}: open-design.json missing "${req}"`);
        }
        const entry = m.od?.preview?.entry;
        if (entry && !existsSync(path.resolve(dir, entry))) {
          errors.push(`${item.id}: preview entry missing: ${entry}`);
        }
      } catch (err) {
        errors.push(`${item.id}: invalid open-design.json (${err.message})`);
      }
    }

    if (item.kind === 'adapter') {
      const upstreamDir = path.join(dir, 'upstream');
      if (!existsSync(upstreamDir)) {
        errors.push(`${item.id}: adapter upstream missing at ${upstreamDir}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('Validation failed:');
    for (const e of errors) console.error('  ✗ ' + e);
    process.exit(1);
  }
  console.log(`✓ Validated ${sources.items.length} registered assets cleanly.`);
}

main();
