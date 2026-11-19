---
paths:
  - "assets/**"
  - "web/public/assets/**"
  - "CREDITS.md"
---

# Assets

Rules for models, textures, audio, and fonts.
Every asset has a clean license, a credit, and an optimized file before it is committed.

## Allowed sources

- CC0 first: Poly Haven (HDRIs, textures, models), ambientCG (materials), Kenney and Quaternius (models), NASA (star maps).
- CC BY is allowed when nothing CC0 fits. Put the exact attribution line in `CREDITS.md`.
- Read the license on the page of the asset itself. Sketchfab, Poly Pizza, OpenGameArt, and freesound set it per asset.

## Never allowed

- Licenses with NC, ND, or SA terms. "Free for personal use". Missing or unclear licenses.
- Anything made by a generative model: images, textures, models, audio, voices.
- Rips or lookalikes of ships, logos, sounds, or music from an existing franchise.
- The NASA insignia, or anything that implies NASA endorses the game.

## Paper trail

Every asset gets both of these in the commit that adds it:

1. A row in `CREDITS.md`: file, title, author, source URL, license, changes made.
2. An entry in `assets/manifest.json`: source URL, sha256 of the original download, output path.

CI fails when a file under `web/public/assets/` has no manifest entry or no credit row.

## Pipeline

- Originals live in `assets-src/`, which git ignores. `make assets` downloads them from the manifest and checks each sha256.
- Only optimized files are committed, under `web/public/assets/`.
- Models are `.glb`, processed with glTF Transform and compressed with Meshopt.
- Textures are KTX2. Use UASTC for normal and ORM maps. Use ETC1S for color maps when it holds up.
- Fonts are self-hosted `.woff2`. Keep the license file next to them.
- Scripts that call the Poly Haven API send a `User-Agent` that names this project.

## Size

- Ship textures start at 1024 px. Go to 2048 px only for something seen up close.
- The lighting HDRI is 1k or 2k.
- Hard budgets are set in task v2-01.

## One look

Mixed asset packs are the fastest way to look cheap. Before committing an asset:

- Repaint it to the shared palette in `DESIGN.md`.
- Match the texel density used by the other ships.
- Use the shared wear textures for chips, streaks, and dirt.
- Keep material values physical: no pure black or pure white base color, metalness is 0 or 1.
- Look at it in the game, at game distance and game speed, next to the other ships.
