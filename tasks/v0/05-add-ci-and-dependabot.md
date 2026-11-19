# v0-05 Add CI and Dependabot

Size: M
Needs: v0-04

## Goal

GitHub Actions checks every pull request, `main` is protected, and Dependabot keeps the pins fresh.

## Why

A hook can be skipped, so CI runs the same checks where nobody can skip them.

## Steps

1. [ ] Read `.claude/rules/ci.md`. Every line of it applies here.
2. [ ] Add `.github/workflows/ci.yml` with five checks: text, pull request title, actionlint, zizmor, and the manifests (kubeconform, kube-linter).
3. [ ] Add `.github/dependabot.yml` for `github-actions`, with a 7 day cooldown and one group.
4. [ ] Decide whether to adopt workflow lockfiles (`gh actions-lock`). Record the choice in `docs/DECISIONS.md`.
5. [ ] Add `SECURITY.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant 3.0), a pull request template, issue forms, and `.github/CODEOWNERS`.
6. [ ] In the repo settings, add the ruleset on `main` and turn on the features listed under "Repo settings" in `ci.md`.

## Done when

- [ ] A pull request shows the five checks, and they pass.
- [ ] A pull request titled "fix stuff" fails the title check.
- [ ] `git push origin main` from your machine is rejected.
- [ ] The Community Standards page of the repo shows every item ticked.
- [ ] `zizmor .github/workflows` reports no findings.

## Learn

- The workflow token starts with no permissions, and each job asks for what it needs. It is least privilege applied to CI.
- An action pinned by tag can change under you. An action pinned by commit SHA cannot.
- Try it: open a run in the Actions tab and read the "Set up job" log. It lists the token permissions.
- Explain it back: in March 2026 the tags of a popular security action were moved to malware. Why were repos that pinned by SHA not affected?

## Not now

- Build, test, and scan jobs. Each one arrives with the code it checks.
- OpenSSF Scorecard. That is v2-18.
