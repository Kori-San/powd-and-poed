# Powd & Poed

A space shooter where every enemy is a real Kubernetes pod. You shoot it, the pod is deleted, and the cluster brings it back.

This is a portfolio project. Its owner is learning platform engineering by building it.
All text here follows the ADHD-friendly writing rules in `.claude/rules/writing.md`.

## Read first

| File | Tells you |
|---|---|
| `tasks/README.md` | What to work on now |
| `DESIGN.md` | The game, the two players, the look |
| `ARCHITECTURE.md` | The parts, the bridge API, the safety model |
| `docs/DECISIONS.md` | Why things are the way they are |
| `.claude/rules/` | How to work here |

Rules without a path load every session. Rules for a folder load when you open a file in that folder.

## Layout

| Path | Holds | Exists from |
|---|---|---|
| `tasks/` | The roadmap: v0, v1, v2 | now |
| `scripts/` | Repo checks | now |
| `docs/` | Decisions, gitmoji list, later the runbook | now |
| `web/` | The game: TypeScript, three.js, Vite | v0-08 |
| `bridge/` | The Go service between the game and the cluster | v0-06 |
| `deploy/` | Cluster config, manifests, later the Helm chart | v0-02 |
| `content/codex/` | Learning entries for the scanner | v1-14 |

## Commands

| Command | Does |
|---|---|
| `node scripts/check-text.mjs` | Checks every file for banned characters and phrases |
| `make help` | Lists all other commands, once task v0-01 is done |

## The six rules that matter most

1. Work on one task from `tasks/` at a time. Type `/next-task` to start.
2. Commits use gitmoji. See `.claude/rules/git.md`.
3. No em dashes, en dashes, or emoji in files. A hook checks every edit. See `.claude/rules/writing.md`.
4. Only the bridge touches the cluster, and it only deletes in the `arena` namespace. See `.claude/rules/security.md`.
5. Every asset has an allowed license and a row in `CREDITS.md`. No generated assets. See `.claude/rules/assets.md`.
6. Look up versions before you use them. See `.claude/rules/dependencies.md`.
