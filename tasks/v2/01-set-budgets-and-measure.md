# v2-01 Set budgets and measure them

Size: M
Needs: v1-23

## Goal

Frame time, draw calls, and download size have written budgets, and CI enforces the ones a machine can check.

## Why

"Optimized" means nothing without numbers. Measure first, then decide what to fix.

## Steps

1. [ ] Write a benchmark scene in sim mode: 60 fighters, constant fire, a fixed seed, 30 seconds.
2. [ ] Run it with Playwright. Record frame time (median and 95th percentile), draw calls, triangles, and heap size.
3. [ ] Measure on three devices: your laptop, a mid-range phone, a low-end phone. Write the results in `docs/PERFORMANCE.md` with the date.
4. [ ] Set budgets from those numbers: frame time, draw calls, triangles, first-load transfer size, largest single asset, and time until playable on a slow connection.
5. [ ] CI: fail when a size budget is passed, or when the benchmark passes its draw-call or triangle budget. CI runners have no real GPU, so frame time on phones stays a manual check.
6. [ ] Add Lighthouse CI for the public demo.
7. [ ] Write the budgets into `DESIGN.md` and `.claude/rules/assets.md`.

## Done when

- [ ] `docs/PERFORMANCE.md` has a table of measured numbers per device.
- [ ] Adding a 5 MB file to the bundle fails CI.
- [ ] `make bench` prints the same metrics locally.

## Learn

- A budget is a limit you set from a measurement and then enforce by machine. An SLO is the same idea for a service.
- Explain it back: why track the 95th percentile frame time and not the average?

## Not now

- Fixing what the numbers show. That is v2-02 to v2-04.
