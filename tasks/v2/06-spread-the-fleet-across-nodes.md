# v2-06 Spread the fleet across nodes

Size: M
Needs: v1-23

## Goal

The fleet survives the loss of any single node, because its pods are spread evenly.

## Why

Twelve replicas on one node are one failure away from zero. Spreading is what makes replicas count.

## Steps

- [ ] Add `topologySpreadConstraints` to the fleet on `kubernetes.io/hostname` with `maxSkew: 1`.
- [ ] Choose between `DoNotSchedule` and `ScheduleAnyway`. Record why in `docs/DECISIONS.md`.
- [ ] Set the rolling update strategy explicitly: `maxSurge` and `maxUnavailable`.
- [ ] Game: each carrier shows its pod count. A carrier with no pods looks idle.
- [ ] Local test: `docker stop powd-worker2`. Watch what happens to its pods. Start it again.
- [ ] Add a codex entry: topology-spread.

## Done when

- [ ] `kubectl get pods -n arena -o wide` shows the same pod count on each worker, give or take one.
- [ ] With one worker stopped, uptime stays at 100.00%.
- [ ] The pull request says how long the pods of the stopped node took to be replaced, and which setting controls that.

## Learn

- Kubernetes waits before it replaces pods on a node it cannot reach. The default wait is 300 seconds.
- Try it: `kubectl get pod <name> -n arena -o jsonpath='{.spec.tolerations}'`
- Explain it back: a node dies. Why are its pods not replaced at once, and why is uptime still fine?

## Not now

- Draining a node on purpose. That is v2-10.
