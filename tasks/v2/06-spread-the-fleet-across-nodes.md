# v2-06 Spread the fleet across nodes

Size: M
Needs: v1-23

## Goal

The fleet survives the loss of any single node, because its pods are spread evenly.

## Why

Twelve replicas on one node are one failure away from zero. Spreading is what makes replicas count.

## Steps

1. [ ] Add `topologySpreadConstraints` to the fleet on `kubernetes.io/hostname` with `maxSkew: 1` and `nodeTaintsPolicy: Honor`. Without the second field, the tainted control-plane node counts as an empty domain.
2. [ ] Choose between `DoNotSchedule` and `ScheduleAnyway`. Record why in `docs/DECISIONS.md`.
3. [ ] Set the rolling update strategy explicitly: `maxSurge` and `maxUnavailable`.
4. [ ] Game: each carrier shows its pod count. A carrier with no pods looks idle.
5. [ ] Local test: stop a worker the bridge is not running on, for example `docker stop powd-worker2`. Watch its pods. Start it again.
6. [ ] Add a codex entry: topology-spread.

## Done when

- [ ] `kubectl get pods -n arena -o wide` shows the same pod count on each worker, give or take one.
- [ ] With one worker stopped, `UPTIME` dips and then recovers. The pull request says how deep the dip was and how long it lasted.
- [ ] The pull request says how long the pods of the stopped node took to be replaced, and which setting controls that.

## Learn

- The pods of a dead node keep receiving traffic until the node is marked not ready. By default that takes under a minute.
- Kubernetes then waits before it replaces those pods. The default wait is 300 seconds.
- Try it: `kubectl get pod <name> -n arena -o jsonpath='{.spec.tolerations}'`
- Explain it back: a node dies. Why does uptime dip for a short time, and why are its pods not replaced at once?

## Not now

- Draining a node on purpose. That is v2-10.
