# v2-12 Define SLOs

Size: M
Needs: v2-11

## Goal

The fleet has a written availability SLO, an error budget, and burn-rate alerts, and the HUD shows the budget.

## Why

"Still no downtime" becomes a number with a target. That is how platform teams state reliability.

## Steps

- [ ] Write `docs/SLO.md`: the indicator (good probe requests over all probe requests), the target, the window.
- [ ] Add Prometheus recording rules for the indicator and for the remaining error budget.
- [ ] Add a fast and a slow burn-rate alert. Route them to a local receiver.
- [ ] Add a dashboard panel for the budget left in the window.
- [ ] HUD: add `BUDGET` next to `UPTIME`, fed by the bridge from the same counters.
- [ ] Game day: scale the fleet to zero for 30 seconds. Check that the alert fires and the budget drops as you predicted.
- [ ] Add codex entries: slo, error-budget.

## Done when

- [ ] `docs/SLO.md` fits on one screen.
- [ ] The fast-burn alert fires during the game day and resolves after it.
- [ ] The HUD budget and the dashboard budget agree within one percent.

## Learn

- An SLI is what you measure. An SLO is the target for it. The error budget is how much failure the target allows.
- Explain it back: your SLO is 99.9% over 30 days. How many minutes of downtime is that?

## Not now

- Paging a phone. A local receiver is enough.
