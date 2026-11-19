# v0-01 Bootstrap the repo

Size: S
Needs: nothing

## Goal

A fresh clone installs its tools with one command, and `make help` lists what you can run.

## Why

Pinned tools make the project run the same way on your laptop, in CI, and for anyone who clones it.

## Steps

1. [x] Install mise: https://mise.jdx.dev
2. [x] Add `mise.toml` that pins Node, Go, kubectl, and kind. Look up the current stable versions first. Commit `mise.lock` too.
3. [x] Add a `Makefile` with a `help` target that prints each target and its one-line description.
4. [x] Add `make check` that runs `node scripts/check-text.mjs`.
5. [ ] Add a "Quick start" section to the README with `mise install` and `make help`.

## Done when

- [ ] `mise install` exits 0 on a clean clone.
- [ ] `make help` lists `help` and `check`.
- [ ] `make check` exits 0.

## Learn

- A pinned toolchain means every machine runs the same versions.
- Try it: `mise ls` shows each tool, its version, and the file that asked for it.
- Explain it back: what could go wrong if CI used a newer kubectl than your laptop?

## Not now

- Linters and git hooks. That is v0-04.
- Docker. You need it from v0-02 on, and you install it yourself.
