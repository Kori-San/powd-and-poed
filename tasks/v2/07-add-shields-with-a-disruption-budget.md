# v2-07 Add shields with a disruption budget

Size: M
Needs: v2-06

## Goal

A second weapon evicts pods instead of deleting them, and a PodDisruptionBudget blocks it when too few pods would remain.

## Why

Delete ignores disruption budgets. Eviction respects them. Feeling that difference in the game is the lesson.

## Steps

1. [ ] Add a PodDisruptionBudget (`policy/v1`) for the fleet with `minAvailable`.
2. [ ] Bridge: add `POST /api/evict`, which creates an Eviction for the pod. The API answers 429 when the budget blocks it.
3. [ ] RBAC in `arena`: `create` on `pods/eviction`, and read access to PodDisruptionBudgets. Add a decision entry.
4. [ ] Game: add the evict weapon. A blocked eviction shows a shield flare on the fighter and a callout.
5. [ ] HUD: show how many disruptions the budget allows right now.
6. [ ] Update `ARCHITECTURE.md`, the simulator, and the contract tests.
7. [ ] Add codex entries: pod-disruption-budget, eviction.

## Done when

- [ ] Evicting pods one after another succeeds until the budget is used up, then is blocked.
- [ ] The delete weapon still kills the same pods, and a callout says it bypasses the budget.
- [ ] The HUD value matches `kubectl get pdb -n arena`.

## Learn

- A PodDisruptionBudget limits voluntary disruptions such as drains and evictions. It does not stop a direct delete or a crash.
- Try it: `kubectl drain powd-worker --ignore-daemonsets`, and watch it wait for the budget. Then `kubectl uncordon powd-worker`.
- Explain it back: why does `kubectl drain` respect the budget when `kubectl delete pod` does not?

## Not now

- Draining from the game. That is v2-10.
