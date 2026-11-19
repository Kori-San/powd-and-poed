# v2-01 Set budgets and measure them

Size: M
Needs: v1-23

## Goal

Frame time, draw calls, download size, and memory have written budgets, and CI fails when one is broken.

## Why

"Optimized" means nothing without numbers. Measure first, then decide what to fix.

## Steps

- [ ] Write a benchmark scene in sim mode: 60 fighters, constant fire, a fixed seed, 30 seconds.
- [ ] Run it with Playwright. Record frame time (median and 95th percentile), draw calls, triangles, and heap size.
- [ ] Measure on three devices: your laptop, a mid-range phone, a low-end phone. Write the results in `docs/PERFORMANCE.md` with the date.
- [ ] Set budgets from those numbers: frame time, draw calls, first-load transfer size, largest single asset.
- [ ] CI: fail when the bundle or an asset passes its size budget. Run the benchmark and fail on a clear regression.
- [ ] Add Lighthouse CI for the public demo.
- [ ] Write the budgets into `DESIGN.md` and `.claude/rules/assets.md`.

## Done when

- [ ] `docs/PERFORMANCE.md` has a table of measured numbers per device.
- [ ] Adding a 5 MB file to the bundle fails CI.
- [ ] `make bench` prints the same metrics locally.

## Learn

- A budget is a limit you set from a measurement and then enforce by machine. An SLO is the same idea for a service.
- Explain it back: why track the 95th percentile frame time and not the average?

## Not now

- Fixing what the numbers show. That is v2-02 to v2-04.
