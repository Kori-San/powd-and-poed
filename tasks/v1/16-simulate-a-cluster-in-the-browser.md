# v1-16 Simulate a cluster in the browser

Size: M
Needs: v1-13

## Goal

With `?mode=sim`, the game runs against a simulated cluster that speaks the same contract as the bridge.

## Why

A live cluster costs money to host. The simulator lets anyone play from a free static site.

## Steps

1. [ ] Define a `ClusterSource` interface in `src/net/`: subscribe to events, send a kill.
2. [ ] Move the bridge client behind that interface.
3. [ ] Write `SimCluster`: nodes, a Deployment with replicas, pods with phases, a controller loop, and an uptime probe.
4. [ ] Measure the real delays on `kind-powd`: schedule, start, ready, terminate. Use them in the simulator, with the date in a comment.
5. [ ] Write one contract test suite that runs against both sources.
6. [ ] Show `SIM` on the HUD. Say on the title screen that the cluster is simulated.

## Done when

- [ ] `npm run dev` with `?mode=sim` is fully playable with no bridge running.
- [ ] The contract tests pass against `SimCluster`.
- [ ] A test shows the word `LIVE` cannot appear in sim mode.

## Learn

- A controller runs a reconcile loop: compare the desired state with the actual state, then act to close the gap.
- Try it: read the simulator's controller function next to the output of `kubectl get rs -n arena -w`.
- Explain it back: describe the reconcile loop of a ReplicaSet in three steps.

## Not now

- Simulating node failures or autoscaling. Add them when v2 adds the real thing.
