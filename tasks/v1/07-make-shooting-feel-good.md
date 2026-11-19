# v1-07 Make shooting feel good

Size: M
Needs: v1-06

## Goal

Every shot and every kill has weight: recoil, flash, shake, a short freeze, and debris.

## Why

Pillar two in `DESIGN.md` says feel comes first. A game that feels flat does not get played twice.

## Steps

- [ ] Add a muzzle flash and recoil on fire. Make bullets big and fast.
- [ ] Add a hit flash on the fighter and a freeze of a few frames on a kill.
- [ ] Add screen shake driven by one "trauma" value that decays over time. Cap it.
- [ ] Add debris and smoke from pools. Wrecks stay on screen for a while.
- [ ] Put every tuning value in one file, `feel.ts`.
- [ ] Make `prefers-reduced-motion` turn off shake, freeze, and flashes.
- [ ] Play ten sorties and tune. Then watch one other person play.

## Done when

- [ ] A test shows no shake, freeze, or flash happens with reduced motion on.
- [ ] Nothing flashes more than three times per second at the highest fire rate.
- [ ] Frame time on your phone stays under 16.7 ms during a burst of ten kills.
- [ ] The pull request has a before clip and an after clip.

## Learn

- Game feel comes from many small responses to one input. Each is cheap, and together they make the action readable.
- Explain it back: the hit effect plays before the cluster confirms the delete. Why is that right for a game, and where would the same trick be dangerous?

## Not now

- Sound. That is v1-08.
