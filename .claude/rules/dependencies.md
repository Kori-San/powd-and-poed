# Versions and dependencies

Your memory of tool versions is out of date. Look them up.

## Rules

- Before you add or bump a tool, read its release page and use the current stable version.
- Check that it is maintained: a release in the last 12 months and no archive notice.
- Pin exactly:

| Thing | Pin with |
|---|---|
| npm packages | Exact versions and the committed lockfile |
| Go modules | `go.mod` and `go.sum` |
| Container images | Tag plus sha256 digest |
| GitHub Actions | Full commit SHA, version in a comment |
| CLI tools | `mise.toml` and `mise.lock` |

- No `latest`, no floating major tags, no version ranges.
- Do not adopt a release in its first 7 days. Dependabot enforces this with `cooldown`.
- Each new dependency gets one line in the pull request: what it does, and why we do not write it ourselves.
- Dependabot owns routine bumps. Do not bump versions by hand inside a feature task.

## State of the world, November 2026

These facts were checked on 2026-11-19. They will age. Check again before you rely on one.

| Topic | Fact |
|---|---|
| Kubernetes | 1.37 is the current minor. 1.35 to 1.37 are supported. |
| Ingress | ingress-nginx is retired and archived. The Ingress API is frozen. Use Gateway API. |
| Helm | Helm 4 is current. `--atomic` became `--rollback-on-failure`. Server-side apply is the default. |
| kind | v0.33.0, default node image is Kubernetes 1.37 |
| ExternalSecret | The API version is `external-secrets.io/v1`. `v1beta1` is no longer served. |
| three.js | r187. `WebGPURenderer` is still marked experimental. |
| TypeScript | 7 is current. typescript-eslint does not support it yet. Use Biome. |
| Gitmoji linting | The commitlint gitmoji packages are unmaintained since 2023. Use the local hook. |
| gitleaks | Security patches only. GitHub push protection covers this repo. |
| Trivy | Maintained. Its action tags were hijacked in March 2026. Pin by SHA. |
| Workflow lockfiles | New in October 2026: `gh actions-lock`. Task v0-05 decides whether to adopt them. |
