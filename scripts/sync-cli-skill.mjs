// Copies the Logic Fabric CLI skill from the flowon-xrm repository, where it lives next to the CLI's code, into the
// flowon-dynamics plugin. Run it before a release of the plugin:
//   node scripts/sync-cli-skill.mjs <path to flowon-xrm>
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const xrm = process.argv[2];
if (!xrm) {
  console.error('Usage: node scripts/sync-cli-skill.mjs <path to flowon-xrm>');
  process.exit(1);
}

const source = resolve(xrm, 'src/server/src/platform/Flowon.Xrm.Tools.CommandLine/skill');
const target = resolve(fileURLToPath(new URL('..', import.meta.url)), 'skills/cli');

if (!existsSync(join(source, 'SKILL.md'))) {
  console.error(`No SKILL.md in ${source}`);
  process.exit(1);
}

for (const name of readdirSync(source).filter(n => n.endsWith('.md'))) {
  // The repository checks files out with LF; write them that way whatever the source checkout uses.
  const text = readFileSync(join(source, name), 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
  writeFileSync(join(target, name), text);
  console.log(`copied ${name}`);
}
