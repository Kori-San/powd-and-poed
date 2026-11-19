# v1-14 Write the first codex

Size: M
Needs: v1-13

## Goal

Ten codex entries exist, are checked against the official docs, and unlock when scanned.

## Why

The scanner shows data. The codex explains it. Wrong explanations would teach wrong things, so each one is verified.

## Steps

1. [ ] Read `.claude/rules/codex.md`.
2. [ ] Write `scripts/check-codex.mjs`: required front matter, the 60 word limit, a `docs` URL on an allowed site. Add it to `make check`.
3. [ ] Write ten entries: cluster, node, control-plane, pod, container, deployment, replicaset, service, namespace, probe. Give each one an `unlock` trigger.
4. [ ] Check each entry against its `docs` page. Run each `command` on `kind-powd`.
5. [ ] Bundle the entries into the web build. Fill the two codex lines on the scanner card.
6. [ ] Add the codex screen: locked and unlocked entries, the command with a copy button, the docs link.
7. [ ] Store unlocks in `localStorage`.

## Done when

- [ ] `make check` fails on an entry with 61 words, and on an entry with a missing field.
- [ ] The first scan of a fighter unlocks "pod" and shows a one-line notice. A test shows every entry can be unlocked in play.
- [ ] A script runs every `command` from the ten entries on `kind-powd`, and each exits 0.

## Learn

- Explain it back: pick three entries and explain them to someone without reading them.

## Not now

- Entries for things the cluster does not run yet. Each later task adds its own.
