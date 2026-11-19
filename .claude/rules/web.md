---
paths:
  - "web/**"
---

# Web client

Rules for the game in `web/`. Game logic stays free of three.js.
Nothing in the frame loop allocates memory or waits for the network.

## Stack

- TypeScript in strict mode, three.js, Vite, Vitest. Package manager: npm.
- Renderer: `WebGLRenderer`. The three.js manual still calls `WebGPURenderer` experimental. WebGPU is task v2-05.
- No UI framework. The HUD and menus are plain DOM and CSS on top of the canvas.
- Before adding a dependency, write in the pull request why the platform or 30 lines of code cannot do the job.

## Check the API before you use it

three.js renames things often. Your memory of it is probably out of date.

- Read the migration guide for the version in `web/package.json` before using a loader, a pass, or a helper: https://github.com/mrdoob/three.js/wiki/Migration-Guide
- Known as of r187: `HDRLoader` replaced `RGBELoader`. `Timer` replaced `Clock`. `PCFSoftShadowMap` is deprecated.

## Layout

| Folder | Holds | May import |
|---|---|---|
| `src/sim/` | Game rules and state. Plain TypeScript. | Nothing from the other folders. No three.js, no DOM. |
| `src/net/` | Stream client and kill requests | `sim` |
| `src/render/` | Draws the sim state with three.js | `sim` |
| `src/hud/` | DOM overlay | `sim` |
| `src/input/` | Keyboard, pointer, gamepad | `sim` |

## Game loop

- The simulation runs on a fixed step of 1/60 s with an accumulator. Rendering interpolates between the last two states.
- Clamp the frame delta to 0.1 s, so a tab that was in the background does not replay a burst of steps.
- Drive the loop with `renderer.setAnimationLoop`.
- Never wait for the network inside the loop. A hit shows at once. The stream corrects the state later.

## Every frame

- No allocation in the loop. No `new Vector3()`, no array or object literals, no new closures. Reuse module-level scratch objects.
- Bullets, debris, and particles come from fixed-size pools.
- Many copies of one mesh use `InstancedMesh`. Different meshes that share a material use `BatchedMesh`.
- Hit tests are circle overlap on the play plane. No raycasts against meshes.

## Color and light

- Leave color management on. It is the default.
- Color textures (base color, emissive) use `SRGBColorSpace`. Data textures (normal, roughness, metalness, occlusion) keep `NoColorSpace`.
- Tone mapping is set once for the whole game. Start with `AgXToneMapping`. Task v1-03 compares it with `ACESFilmicToneMapping`.
- With post-processing, tone mapping and output conversion happen one time, in the last pass.
- HDRI: load with `HDRLoader`, set `EquirectangularReflectionMapping`, assign to `scene.environment`. A 1k or 2k file is enough for lighting.

## Sizing

- Do not call `renderer.setPixelRatio`. Size the drawing buffer yourself: `renderer.setSize(width, height, false)` in device pixels.
- Cap the total pixel count, so dense phone screens do not render at 4K.
- Resize from a `ResizeObserver` on the canvas, not from the window `resize` event.

## Input

- Use Pointer Events for mouse and touch. Handle `pointercancel`. Set `touch-action: none` on the canvas.
- Poll `navigator.getGamepads()` every frame. Gamepad events alone are not enough.
- Input code emits actions (`move`, `fire`, `scan`, `pause`) for a player slot. Game code never reads a key.
- Create or resume the `AudioContext` inside the first user gesture.

## Cleanup

- Dispose every geometry, material, texture, and render target you create. three.js does not do it for you.
- The dev overlay shows `renderer.info`: draw calls, triangles, textures, geometries. A number that only grows is a leak.

## Test

- Vitest covers `src/sim/` and `src/net/`. These tests need no WebGL.
- Playwright runs one smoke test in sim mode. Wait for the app-ready signal before asserting.
- Before you commit, run in `web/`: `npm run typecheck && npm run lint && npm test`
