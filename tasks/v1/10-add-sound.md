# v1-08 Add sound

Size: M
Needs: v1-07

## Goal

The game has effects and one music loop, all CC0, mixed so that nothing clips.

## Why

Half of game feel is audio. It also has to follow the same rights rules as the art.

## Steps

- [ ] Shortlist CC0 sounds. Read the license on the page of each sound.
- [ ] Write an audio module on Web Audio: a pool per sound, an effects bus, a music bus, and a limiter.
- [ ] Resume the audio context inside the first user gesture.
- [ ] Add the sounds: shot, hit, explosion, warp-in, deflect, player down, menu tick. Add one music loop.
- [ ] Vary pitch and volume slightly on each play, so repeats do not sound mechanical.
- [ ] Add the files through `make assets` and credit them.

## Done when

- [ ] Sound starts after the first tap on iOS Safari and on Android Chrome.
- [ ] Twenty explosions within one second do not clip.
- [ ] Mute and both volume sliders work and keep their values after a reload.
- [ ] Every sound has a row in `CREDITS.md`.

## Learn

- Browsers block audio until the user interacts with the page.
- Explain it back: why does the sound of a kill play at once instead of waiting for the pod to be gone?

## Not now

- Voice lines. `DESIGN.md` bans generated voices, and recording is out of scope.
