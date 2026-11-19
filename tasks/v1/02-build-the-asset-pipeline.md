# v1-02 Build the asset pipeline

Size: M
Needs: v1-01

## Goal

`make assets` turns a manifest of source URLs into optimized files, and CI rejects any asset without a credit.

## Why

Clean rights and small files are easy to enforce from the first asset and painful to fix later.

## Steps

- [ ] Read `.claude/rules/assets.md`.
- [ ] Define `assets/manifest.json`: id, source URL, license, sha256, processing steps, output path.
- [ ] Write `scripts/assets.mjs`: download to `assets-src/`, verify the sha256, optimize, write to `web/public/assets/`.
- [ ] Add glTF Transform and the KTX2 tools as pinned dev dependencies.
- [ ] Write `scripts/check-credits.mjs`: every file under `web/public/assets/` has a manifest entry and a `CREDITS.md` row.
- [ ] Run one real asset through the pipeline: a Poly Haven HDRI.
- [ ] Add `make assets`. Add the credits check to `make check` and to CI.

## Done when

- [ ] `make assets` on a clean clone produces every file listed in the manifest.
- [ ] Deleting a row from `CREDITS.md` makes `make check` fail.
- [ ] Changing one byte of a downloaded original makes `make assets` fail on the checksum.

## Learn

- A download pinned by checksum is supply-chain safety for art. A lockfile does the same job for code.
- Try it: `sha256sum assets-src/<file>` and compare the result with the manifest.
- Explain it back: why are the original downloads kept out of git?

## Not now

- Choosing the final ships and sounds. That is v1-04 and v1-08.
