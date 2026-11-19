# v2-02 Cut draw calls

Size: M
Needs: v2-01

## Goal

The benchmark scene stays inside its draw-call and frame-time budgets on the mid-range phone.

## Why

Draw calls are the usual limit on phones. Batching is the cheapest large win.

## Steps

- [ ] Profile the benchmark. List the five largest costs in the pull request before you change anything.
- [ ] Draw bullets, debris, and particles with one instanced mesh or one points buffer each.
- [ ] Draw ships that share a material with one `BatchedMesh`. Put liveries in a texture atlas or a per-instance color.
- [ ] Remove the per-frame allocations that the heap timeline shows.
- [ ] Merge the static backdrop geometry.
- [ ] Run the benchmark again and update `docs/PERFORMANCE.md`.

## Done when

- [ ] Draw calls in the benchmark are under the budget from v2-01.
- [ ] The 95th percentile frame time is lower than before. Both numbers are in the pull request.
- [ ] Screenshots before and after show no visual change.

## Learn

- Each draw call has a fixed CPU cost. Fewer, larger calls leave more time for the game.
- Explain it back: why can 1000 instances of one mesh be cheaper than 50 different meshes?

## Not now

- Download size. That is v2-03.
