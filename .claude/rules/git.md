# Git and commits

Commits use gitmoji. Each task gets one branch and one pull request.

## Commit format

Commits follow the gitmoji spec: https://gitmoji.dev/specification

```
<emoji> <Message>
<emoji> (<scope>): <Message>
```

- Use exactly one emoji, as the real character. Do not write a `:shortcode:`.
- The message is imperative and starts with a capital letter: "Add", "Fix", "Remove".
- No period at the end. The whole subject is 72 characters or fewer.
- The scope is optional. Use one of: `web`, `bridge`, `deploy`, `ci`, `docs`, `tasks`, `codex`.
- A commit has one purpose. If it needs two emoji, split it into two commits.
- The body is optional. Use it to say why the change was needed.

```
✨ (bridge): Stream pod events over SSE
🐛 (web): Stop a bullet from hitting the same pod twice
🧱 (deploy): Add the fleet Deployment and Service
⬆️ Bump three from 0.187.0 to 0.188.0
```

## Which emoji

| Emoji | Use it for |
|---|---|
| ✨ | A new feature |
| 🐛 | A bug fix |
| 📝 | Docs, tasks, rules |
| ✅ | Tests |
| ♻️ | A refactor that changes no behavior |
| ⚡️ | Performance |
| 💄 | UI and style: HUD, menus, CSS |
| 🍱 | Assets: models, textures, audio, fonts |
| 💬 | Text: HUD copy, codex entries |
| 🧱 | Infrastructure: manifests, Helm, cluster config |
| 🛂 | Permissions: RBAC, ServiceAccounts |
| 🔒️ | A security fix |
| 🩺 | Health checks: probes, `/healthz` |
| 👷 | CI workflows |
| 💚 | Fixing a broken CI run |
| 🔧 | Config files |
| 🔨 | Dev scripts: Makefile, `scripts/` |
| ⬆️ | Upgrading a dependency |
| 📌 | Pinning a dependency |
| ➕ | Adding a dependency |
| ➖ | Removing a dependency |
| 🔥 | Removing code or files |
| 🚚 | Moving or renaming files |
| 🚨 | Fixing linter warnings |
| ♿️ | Accessibility |
| 📱 | Responsive layout |
| 💫 | Animations |
| 🔊 | Logs |
| 🔖 | A release tag |
| 🚀 | A deploy |
| ⏪️ | A revert |

Nothing fits? Find the right one in `docs/GITMOJI.md`. Never invent one.

## Branches and pull requests

- One task, one branch, one pull request.
- Branch name: the task id and a short slug, for example `v0-03-deploy-the-arena`.
- Work outside a task uses `fix-<slug>` or `chore-<slug>`.
- The pull request title uses the commit format. Pull requests are squash merged, so the title becomes the commit.
- The description lists each "Done when" line with its result.
- Never push to `main` directly once the ruleset from task v0-05 is active.
- Never use `--no-verify`. Never force push a shared branch.
