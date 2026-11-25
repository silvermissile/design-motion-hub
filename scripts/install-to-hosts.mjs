#!/usr/bin/env node
/**
 * Install or symlink registered packages from design-motion-hub into target hosts:
 *   - opendesign: copies/updates into <OD_DATA_DIR>/plugins/<id> (default ~/.od/plugins)
 *   - agent-skills: symlinks into <AGENT_SKILLS_DIR>/<id> (default ~/.agents/skills)
 *   - openmotion: optional catalog injection into <openmotion>/library/design/skills
 */
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_PATH = path.join(ROOT, 'registry', 'sources.json');
const SYNC_ROOT = path.join(ROOT, 'synced');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

function flagValue(name, fallback) {
  const idx = args.indexOf(name);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : fallback;
}

const targetArg = flagValue('--target', 'all');
const targets = targetArg === 'all' ? new Set(['opendesign', 'agent-skills']) : new Set(targetArg.split(','));
const odDataDir = flagValue('--od-data-dir', process.env.OD_DATA_DIR || path.join(os.homedir(), '.od'));
const odPluginsDir = path.join(odDataDir, 'plugins');
const agentSkillsDir = flagValue('--skills-dir', path.join(os.homedir(), '.agents', 'skills'));
const openmotionDir = flagValue('--openmotion-dir', '');

function resolveItemDir(item) {
  if (item.source.startsWith('local:')) {
    return path.resolve(ROOT, item.source.slice('local:'.length));
  }
  return path.join(SYNC_ROOT, item.id);
}

function replaceSymlink(src, dest) {
  if (dryRun) {
    console.log(`  [dry-run] symlink ${dest} -> ${src}`);
    return;
  }
  mkdirSync(path.dirname(dest), { recursive: true });
  try {
    const st = lstatSync(dest);
    if (st.isSymbolicLink() || st.isDirectory() || st.isFile()) {
      rmSync(dest, { recursive: true, force: true });
    }
  } catch {
    // destination does not exist
  }
  symlinkSync(src, dest);
}

function copyDirClean(src, dest) {
  if (dryRun) {
    console.log(`  [dry-run] copy ${src} -> ${dest}`);
    return;
  }
  mkdirSync(path.dirname(dest), { recursive: true });
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
}

function registerInOpenMotionCatalog(omRoot, item, srcDir) {
  const designSkillsRoot = path.join(omRoot, 'library', 'design', 'skills');
  const catalogFile = path.join(designSkillsRoot, 'catalog.json');
  if (!existsSync(catalogFile)) {
    console.log(`  [warn] OpenMotion catalog not found at ${catalogFile}`);
    return;
  }
  const destSkillDir = path.join(designSkillsRoot, item.id);
  copyDirClean(srcDir, destSkillDir);
  if (dryRun) {
    console.log(`  [dry-run] update OpenMotion catalog.json entry for ${item.id}`);
    return;
  }
  const catalog = JSON.parse(readFileSync(catalogFile, 'utf8'));
  const entry = {
    id: item.id,
    title: item.id.replace(/(^|-)([a-z])/g, (_, p, c) => (p ? ' ' : '') + c.toUpperCase()),
    description: item.description || `${item.id} skill`,
    scenario: 'prototype',
    category: 'animation-motion',
    examplePrompt: null,
  };
  catalog.skills = (catalog.skills || []).filter((s) => s.id !== item.id);
  catalog.skills.push(entry);
  catalog.skills.sort((a, b) => a.id.localeCompare(b.id));
  writeFileSync(catalogFile, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  console.log(`  [openmotion] registered ${item.id} in ${catalogFile}`);
}

function main() {
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
  const items = registry.items || [];

  for (const item of items) {
    const srcDir = resolveItemDir(item);
    if (!existsSync(srcDir)) {
      console.log(`[skip] ${item.id}: missing ${srcDir} (run sync-sources.mjs first?)`);
      continue;
    }
    console.log(`=== ${item.id} ===`);
    const itemTargets = new Set(item.targets || []);

    if (targets.has('opendesign') && itemTargets.has('opendesign-plugin')) {
      const dest = path.join(odPluginsDir, item.id);
      copyDirClean(srcDir, dest);
      if (!dryRun) console.log(`  [opendesign] installed -> ${dest}`);
    }

    if (targets.has('agent-skills') && itemTargets.has('agent-skill')) {
      const dest = path.join(agentSkillsDir, item.id);
      replaceSymlink(srcDir, dest);
      if (!dryRun) console.log(`  [agent-skills] linked -> ${dest}`);
    }

    if (targets.has('openmotion') && openmotionDir) {
      registerInOpenMotionCatalog(path.resolve(openmotionDir), item, srcDir);
    }
  }
}

main();
