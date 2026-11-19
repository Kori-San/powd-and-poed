# v1-01 Set up the render pipeline

Size: M
Needs: v0-12

## Goal

The game draws through one configured pipeline: color management, tone mapping, sizing, and a fixed-step loop.

## Why

Every visual task after this one builds on it. A color or timing mistake here shows up in everything later.

## Steps

- [ ] Read `.claude/rules/web.md`: "Game loop", "Color and light", and "Sizing".
- [ ] Split the v0 code into `src/sim/`, `src/render/`, `src/net/`, `src/hud/`, and `src/input/`.
- [ ] Add the fixed-step loop with interpolation. Unit test the accumulator.
- [ ] Configure the renderer in one place: tone mapping, output color space, drawing-buffer size with a pixel cap.
- [ ] Add a dev overlay behind `?debug` that shows frame time and `renderer.info`.
- [ ] Add Biome with `npm run lint`. Add the web checks to CI.

## Done when

- [ ] The v0 gameplay still works.
- [ ] Resizing the window or rotating a phone never stretches the image.
- [ ] A test shows the simulation reaches the same state at 30, 60, and 144 rendered frames per second.
- [ ] `npm run typecheck && npm run lint && npm test` pass in `web/`.

## Learn

- A fixed timestep makes the game behave the same on every screen refresh rate.
- Try it: open the dev overlay and throttle the CPU in the browser dev tools. Drawing slows down. The rules do not.
- Explain it back: why does the simulation run 60 steps per second even on a 144 Hz screen?

## Not now

- Models and lights. That is v1-03 and v1-04.
