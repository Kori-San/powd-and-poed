# v2-03 Shrink the download

Size: M
Needs: v2-01

## Goal

The first load fits the transfer budget, and the game is playable before every asset has arrived.

## Why

People open the demo on mobile data. Each extra second of loading loses some of them.

## Steps

1. [ ] Analyze the bundle. List the largest modules and assets in the pull request.
2. [ ] Convert the remaining textures to KTX2 and the models to Meshopt-compressed `.glb`. Lower a texture size only where a side-by-side shows no visible loss.
3. [ ] Split the code so the codex, menus, and audio load after the first frame.
4. [ ] Show real progress on the loading screen. Start the game when the minimum set is loaded.
5. [ ] On the web server in the cluster, give hashed files long cache headers and never cache the HTML. GitHub Pages sets its own headers.
6. [ ] Subset the fonts to the characters the game uses.

## Done when

- [ ] The first-load transfer size is under the budget.
- [ ] On a throttled "Fast 3G" profile, the game is playable within the time budget from v2-01.
- [ ] A second visit to the game served from the cluster loads its hashed assets from cache, as seen in the network tab.

## Learn

- Compressed GPU textures stay compressed in video memory, so they save memory as well as download size.
- Explain it back: why do files with a hash in their name get a long cache time while the HTML gets none?

## Not now

- Quality tiers. That is v2-04.
