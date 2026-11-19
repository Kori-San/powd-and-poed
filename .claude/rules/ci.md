---
paths:
  - ".github/**"
---

# GitHub Actions and repo automation

Rules for workflows, Dependabot, and repo settings.
A workflow starts with no permissions, and every action is pinned by commit SHA.

## Every workflow

- Start with `permissions: {}`. Each job then lists only what it needs.
- Pin every action to a full commit SHA, with the version in a comment on the same line.
- `actions/checkout` sets `persist-credentials: false`.
- No `pull_request_target`. No `workflow_run` job that checks out pull request code.
- Never put `${{ github.event.* }}` text inside a `run:` script. Pass it through `env:`.
- Cloud access uses OIDC. No long-lived keys in secrets.
- Every job sets `timeout-minutes`. Workflows on pull requests set `concurrency` to cancel older runs.
- Install tools with mise, so CI and laptops use the same versions.

Why SHA pins: tags can be moved. `tj-actions/changed-files` in March 2025 and `aquasecurity/trivy-action` in March 2026 both shipped malware through moved tags.

## Checks on every pull request

| Area | Tools |
|---|---|
| Workflows | actionlint, zizmor |
| Text | `node scripts/check-text.mjs` |
| Pull request title | The gitmoji check from task v0-04 |
| Web | Biome, `tsc --noEmit`, Vitest |
| Bridge | golangci-lint, `go test -race`, govulncheck |
| Manifests | kubeconform, kube-linter |
| Dockerfiles | hadolint |
| Images, from v1-22 | Build, SBOM, vulnerability scan |
| End to end, from v1-21 | The kill loop on a kind cluster |

A check is added in the task that adds the code it checks.

## Dependabot

- One entry per ecosystem in use: `github-actions`, then `npm`, `gomod`, `docker`, and `helm` as they appear.
- `cooldown` with `default-days: 7`.
- One group per ecosystem for minor and patch updates.
- `commit-message.prefix` is the "upgrade dependencies" gitmoji from `git.md`.

## Images and releases

- Images are pushed to GHCR by CI only.
- Each image gets a provenance attestation from `actions/attest` and an SBOM.
- Anyone can verify one: `gh attestation verify oci://ghcr.io/<owner>/<image>:<tag> -R <owner>/<repo>`

## Repo settings

Task v0-05 sets these. Do not loosen them.

- A ruleset on `main`: pull request required, status checks required, no force push, no deletion.
- Secret scanning with push protection.
- Private vulnerability reporting.
- CodeQL default setup for Go, JavaScript and TypeScript, and Actions.
