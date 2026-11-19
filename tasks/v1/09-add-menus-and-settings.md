# v1-15 Add menus and comfort settings

Size: M
Needs: v1-10

## Goal

The game has a title screen, a pause menu, settings, and an end screen, all in the HUD style.

## Why

A stranger needs to start playing within ten seconds, and some players need motion and sound turned down.

## Steps

- [ ] Title screen: the name, "press fire", the mode (`LIVE` or `SIM`), and a how-to-play that reads in ten seconds.
- [ ] Pause menu: resume, settings, leave. Pausing stops the sim. The stream keeps running.
- [ ] Settings: volumes, reduced motion, callouts, key remapping. Save them in `localStorage`.
- [ ] End screen: the five numbers from `DESIGN.md`, per player, and "again".
- [ ] Every menu works with keyboard only, gamepad only, and touch only. Focus is always visible.
- [ ] Go through the "Comfort" section of `DESIGN.md` and fix every gap.

## Done when

- [ ] You can go from the title to a sortie to the end screen and back without a mouse.
- [ ] Every setting keeps its value after a reload.
- [ ] An automated accessibility scan of the menus, run with Playwright, reports no violations.
- [ ] The pull request has a phone and a desktop screenshot of each screen.

## Learn

- Explain it back: name two players who cannot use the game without the comfort settings, and what each one needs.

## Not now

- Online lobbies. That is v2-20.
