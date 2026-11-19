# v1-23 Ship v1

Size: S
Needs: every other v1 task

## Goal

`v1.0.0` is released: a public sim demo, a one-command live demo, and a README that shows both.

## Why

v1 is the version people will see. The README has about 30 seconds to make its case.

## Steps

- [ ] Choose release automation that reads gitmoji commits. Candidates: semantic-release with its gitmoji plugin, or git-cliff. Check that the choice is maintained. Record it.
- [ ] Generate `CHANGELOG.md` from the commits.
- [ ] Rewrite the README top: demo link, a short clip, the stack, the quick start. Then the architecture diagram.
- [ ] Record a 60 second video: two players, the scanner, and `kubectl get pods -n arena -w` on the side.
- [ ] Tag `v1.0.0`. Push images with the same tag.
- [ ] Sort `tasks/IDEAS.md`.
- [ ] Re-read every v2 task and fix what has changed since it was written.

## Done when

- [ ] The release page shows `v1.0.0` with notes generated from the commits.
- [ ] From the README, a stranger reaches a playable game in one click (sim) or one command (live).
- [ ] Every claim in the README is true today.

## Learn

- Explain it back: answer the "Explain it back" questions of v0 again, without notes.

## Not now

- Anything on the v2 board.
