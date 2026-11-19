# v2-18 Score the repo

Size: M
Needs: v2-16

## Goal

The repo publishes its OpenSSF Scorecard result, and every check a solo project can pass is passing.

## Why

Scorecard is an outside, automated review of the practices this repo claims to follow.

## Steps

1. [ ] Add the `ossf/scorecard-action` workflow with `publish_results: true`. Read its restrictions first: that workflow allows no `run` steps.
2. [ ] Read the report. Fix Token-Permissions, Pinned-Dependencies, Branch-Protection, Security-Policy, SAST, Signed-Releases, and Dependency-Update-Tool.
3. [ ] Add one Go fuzz test for the kill request parser, for the Fuzzing check.
4. [ ] Register for the OpenSSF Best Practices badge and answer the passing-level questions.
5. [ ] Add the Scorecard badge to the README. Keep the badge count at four or fewer.
6. [ ] List in `SECURITY.md` the checks that stay low and why. Code-Review and Contributors need more than one maintainer.

## Done when

- [ ] The Scorecard page for the repo is public.
- [ ] Each check named in step two scores 8 or more, or has a written reason.
- [ ] The fuzz test runs for 30 seconds in CI without a crash.

## Learn

- Explain it back: pick the three checks that matter most for this repo, and say which attack each one makes harder.

## Not now

- Chasing a perfect score. Some checks cannot pass with one maintainer.
