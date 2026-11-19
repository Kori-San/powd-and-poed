# v1-09 Add menus and settings

Size: L
Needs: v1-08

## Goal

The game has a title screen, a pause menu, a settings screen, and an end screen.

## Why

A stranger should be playing within ten seconds of opening the page. Later tasks also need a place for their settings.

## Steps

1. [ ] Title screen: the name, "press fire", the mode (`LIVE` or `SIM`), and a how-to-play that reads in ten seconds.
2. [ ] Pause menu: resume, settings, leave. Pausing stops the sim. The stream keeps running.
3. [ ] Settings screen: reduced motion and key remapping to start. Save every setting in `localStorage`. Later tasks add their own rows.
4. [ ] End screen: the five numbers from `DESIGN.md`, and "again".
5. [ ] Every menu works with keyboard only, gamepad only, and touch only. Focus is always visible.
6. [ ] Add Playwright with an axe accessibility scan of the four screens. Run it in CI.
7. [ ] Go through the "Comfort" section of `DESIGN.md` and fix every gap that exists so far.

## Done when

- [ ] You can go from the title to a sortie to the end screen and back without a mouse.
- [ ] Every setting keeps its value after a reload.
- [ ] The accessibility scan reports no violations.
- [ ] The pull request has a phone and a desktop screenshot of each screen.

## Learn

- Explain it back: name two players who cannot use the game without the comfort settings, and say what each one needs.

## Not now

- The final look of the menus. Task v1-12 restyles them with the HUD.
- Online lobbies. That is v2-20.
