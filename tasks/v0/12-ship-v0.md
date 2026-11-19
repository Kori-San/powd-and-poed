# v0-12 Ship v0

Size: S
Needs: every other v0 task

## Goal

A stranger can clone the repo, run one command, and play the cube version within five minutes.

## Why

A demo nobody can run does not exist. This is the first thing you can show in an interview.

## Steps

- [ ] Add `make demo`: cluster up, arena up, bridge up, then start the web dev server and print the URL.
- [ ] Add `make clean` that removes everything `make demo` created.
- [ ] Rewrite the README quick start: what you need, `make demo`, what to look at. Under 20 lines.
- [ ] Record a 20 second screen capture: the game on the left, `kubectl get pods -n arena -w` on the right. Put it at the top of the README.
- [ ] Tag `v0.1.0` and publish a GitHub release with three lines of notes.
- [ ] Sort `tasks/IDEAS.md`. Each idea becomes a task or gets deleted.

## Done when

- [ ] On a machine with only Docker and mise: clone, `mise install`, `make demo`, play. Under 5 minutes, no manual steps.
- [ ] `make clean` leaves no cluster and no containers behind.
- [ ] The release `v0.1.0` exists on GitHub.

## Learn

- Explain it back, the big one: tell the full story out loud in one minute. You shoot. What happens, step by step, until a new enemy appears?

## Not now

- Anything that makes it prettier. v1 starts after the tag.
