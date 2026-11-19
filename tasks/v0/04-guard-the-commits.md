# v0-04 Guard the commits

Size: S
Needs: v0-01

## Goal

A commit with a bad message or a banned character is rejected on your machine.

## Why

The commit convention and the writing rules only hold if a machine checks them.

## Steps

1. [ ] Add lefthook to `mise.toml`. Create `lefthook.yml`.
2. [ ] Add a `pre-commit` hook that runs `node scripts/check-text.mjs --staged`.
3. [ ] Write `scripts/check-commit.mjs`. It checks the subject against the format in `.claude/rules/git.md`. It reads the allowed emoji from `docs/GITMOJI.md`.
4. [ ] Add a `commit-msg` hook that runs `scripts/check-commit.mjs`, then `node scripts/check-text.mjs --message` on the message file.
5. [ ] Add `make setup` that installs the hooks.
6. [ ] Write `CONTRIBUTING.md`: how to set up, how to commit, how to open a pull request. Under 40 lines.

## Done when

- [ ] `git commit -m "fix stuff"` is rejected, and the error shows the expected format.
- [ ] A commit whose subject starts with a valid gitmoji passes.
- [ ] Staging a file that contains an em dash makes the commit fail.

## Learn

- Shift left means catching a problem at the earliest and cheapest point. A hook runs before CI, and CI runs before production.
- Try it: `lefthook run pre-commit` runs the hook without committing.
- Explain it back: a hook can be skipped with `--no-verify`. What catches the problem then?

## Not now

- CI. That is v0-05.
- Code linters. Each one arrives with the code it checks.
