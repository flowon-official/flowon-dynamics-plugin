# Logic Fabric CLI (flowon-dynamics)

Use the Logic Fabric CLI (`flowon-dynamics`) and the Flowon PowerShell module from Claude Code. Claude knows the
commands, the file formats (data specifications, data map files, `security.xml`, `.flop` packages) and the safe way
to deploy, and asks you before it changes an environment. It works with Logic Fabric for Dataverse and Logic Fabric
for Dynamics 365 On-Premises.

Ask in your own words, for example:

- "Export the Claims project with its managed solution to ./artifacts."
- "Deploy ./artifacts to UAT with the UAT mappings." (Claude confirms the target and the command first.)
- "Copy the Sales Manager role from development to UAT, and show me what would change."
- "Write an Azure DevOps pipeline that builds the project and deploys it to UAT, then production."

## Before you start

You need:

- **Claude Code**.
- **The .NET 10 SDK** and the CLI: `dotnet tool install --global Flowon.Xrm.Tools.CommandLine`. Claude checks for
  it and tells you if it's missing.
- **A connection string** for each environment, in an environment variable such as `DEV_CONNECTION_STRING`. Claude
  never asks you to paste a secret into the chat.

## Install

```bash
claude plugin marketplace add flowon-official/claude-plugins
claude plugin install flowon-dynamics@flowon
```

The skill is `/flowon-dynamics:cli`. Claude also uses it on its own when you ask for something the CLI does.

If you installed the skill with an earlier version of the CLI (`flowon-dynamics install-skill`), delete those copies
so Claude Code doesn't load both: `.claude/skills/logic-fabric` in a repository and `~/.claude/skills/logic-fabric`
for your user.

## Privacy and license

The plugin runs the CLI on your computer against the environments you name; it doesn't send your data anywhere
else. See the Flowon [privacy policy](https://www.flowon.com/privacy-policy). Use of the plugin is subject to the
Flowon software license in [LICENSE](LICENSE).
