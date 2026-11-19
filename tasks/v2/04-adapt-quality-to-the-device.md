# v2-04 Adapt quality to the device

Size: M
Needs: v2-02

## Goal

The game picks a quality tier that holds 60 fps on the device, and adjusts while it runs.

## Why

One fixed quality level is too heavy for a cheap phone and wastes a good laptop.

## Steps

- [ ] Define three tiers: resolution scale, final pass on or off, particle counts.
- [ ] Pick the starting tier from a two second benchmark on first load. Do not read the user agent string.
- [ ] Add dynamic resolution: lower the pixel count when frame time stays over budget, raise it when there is room.
- [ ] Stop rendering when the tab is hidden.
- [ ] Add a setting that locks a tier.
- [ ] Recover from a lost WebGL context without a reload.

## Done when

- [ ] The low-end phone holds the frame budget for a full sortie on the automatic tier.
- [ ] Forcing a context loss with the `WEBGL_lose_context` extension recovers without a reload.
- [ ] A test shows the tier changes at most once every 5 seconds.

## Learn

- This is a control loop: measure, compare with a target, adjust. An autoscaler does the same with pods.
- Explain it back: why must the tier not change every frame?

## Not now

- WebGPU. That is v2-05.
