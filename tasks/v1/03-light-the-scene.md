# v1-03 Light the scene

Size: M
Needs: v1-02

## Goal

The scene has its final lighting: one hard key light, a Poly Haven HDRI for reflections, and a star backdrop built from real data.

## Why

Lighting decides whether the game reads as a 1970s film or as a default three.js demo.

## Steps

- [ ] Pick three HDRI candidates on Poly Haven. Test each on a grey sphere and a chrome sphere. Keep one.
- [ ] Load it with `HDRLoader` as `scene.environment`. Keep it out of `scene.background`.
- [ ] Add the key light. Tune `scene.environmentIntensity` until shadows are almost black.
- [ ] Build the star backdrop from NASA's Deep Star Maps 2020. Read the usage terms on its page first.
- [ ] Compare AgX and ACES Filmic tone mapping on the same frame. Keep one. Record it in `docs/DECISIONS.md`.
- [ ] Add film grain and halation as one final pass. Follow the strength rule in `DESIGN.md`.

## Done when

- [ ] The pull request shows the two spheres next to the era reference they match.
- [ ] No highlight clips to flat white in a screenshot histogram.
- [ ] Frame time on your phone stays under 16.7 ms with the final pass on.
- [ ] The HDRI and the star map are in `CREDITS.md`.

## Learn

- Image-based lighting uses a photo of real light to light and reflect the scene.
- Try it: set `scene.environmentIntensity` to 0 and see what the key light does alone.
- Explain it back: why does the HDRI appear in reflections but not as the backdrop?

## Not now

- Ship models. The spheres are enough to judge light. Ships are v1-04.
