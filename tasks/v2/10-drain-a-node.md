# v2-10 Drain a node

Size: L
Needs: v2-07

## Goal

On a local cluster, a boss fight ends with a real node drain, and the fleet survives it.

## Why

Draining is how nodes are emptied before maintenance. It uses everything from v2-06 and v2-07 together.

## Steps

- [ ] Gate the feature: the bridge needs the flag `--allow-node-drain`, and only the local values file sets it.
- [ ] RBAC, local values only: `patch` on nodes, for cordon. Add a decision entry and update `.claude/rules/security.md`.
- [ ] Bridge: `POST /api/drain` cordons the node, then evicts its `arena` pods one by one within the budget. A timer uncordons it.
- [ ] Game: a carrier becomes a boss with a health bar. At zero, the drain starts and its fighters leave as each eviction succeeds.
- [ ] The carrier goes dark while cordoned and returns when uncordoned.
- [ ] Update `ARCHITECTURE.md`, the simulator, and the contract tests.
- [ ] Add codex entries: cordon, drain.

## Done when

- [ ] A drain during a sortie keeps uptime at 100.00%.
- [ ] `kubectl get nodes` shows `SchedulingDisabled` during the drain and plain `Ready` after.
- [ ] Without the flag, `/api/drain` returns 404, and `kubectl auth can-i patch nodes --as=system:serviceaccount:powd:bridge` prints `no`.

## Learn

- Cordon marks a node as unschedulable. Drain cordons it and then evicts its pods.
- Explain it back: you must patch the kernel on every node of a production cluster. Describe the steps, and name the objects that protect the service.

## Not now

- Drains on any shared or public cluster.
