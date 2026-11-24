# Maintaining the Logic Fabric CLI plugin

The plugin brings the Logic Fabric CLI (`flowon-dynamics`) and the Flowon PowerShell module to Claude Code, Codex and
GitHub Copilot. It is written once, for Claude Code; Flowon's
[plugin-tools](https://github.com/flowon-official/plugin-tools) build what Codex and Copilot need, check it, and release
it to the `flowon` marketplace, [flowon-official/ai-plugins](https://github.com/flowon-official/ai-plugins). The
repository is the plugin: everything in it is installed.

## Layout

```
.claude-plugin/plugin.json    name, version, repository, license, privacy policy, network hosts
.claude-plugin/icon.png       listing icon
.codex-plugin/plugin.json     Codex's manifest (generated)
.github/plugin/plugin.json    Copilot's manifest (generated)
.github/workflows/            CI on pull requests; release on main (plugin-tools' workflows)
README.md                     the plugin's documentation, for its users
CHANGELOG.md                  one entry per release: the release notes
skills/cli/                   SKILL.md and reference.md, copied from flowon-xrm (don't edit them here)
ports/config.json             what the Claude manifest doesn't say about the Codex package
scripts/sync-cli-skill.mjs    copies the skill from flowon-xrm
```

## The skill comes from the CLI

The skill's source is in the `flowon-xrm` repository, next to the CLI's code
(`src/server/src/platform/Flowon.Xrm.Tools.CommandLine/skill/`), so it changes with the CLI. Change it there. Each
CLI release proposes the skill here as a pull request (`cli-skill/<CLI version>`) with a patch version; merging it
releases the plugin. To copy it by hand: `node scripts/sync-cli-skill.mjs <path to flowon-xrm>`, then raise the
version as below.

## Changing and releasing

- After changing the manifest, write the Codex and Copilot packages and commit them with the change:
  `node <plugin-tools>/bin/build-ports.mjs .`. CI fails while they're out of date.
- Check a change as CI does: `claude plugin validate --strict .` and
  `PLUGIN_DIR=. node --test <plugin-tools>/checks/plugin.test.mjs`.
- To release, raise the version and add its changelog entry in a pull request:
  `node <plugin-tools>/bin/bump-version.mjs . patch --note "What changed."`. Merging it to `main` tags the commit
  `v<version>` and opens a pull request in the catalog; a release owner merges that one, which ships the release to
  Claude Code, Codex and GitHub Copilot. Reverting it rolls the release back.
