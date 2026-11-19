# v2: fast, observable, and online

The game runs on a real cluster through GitOps, with SLOs, signed images, and online co-op.

Pick the group you most want to learn next, then follow its numbers.
A task that needs something from another group says so on its "Needs" line.
These tasks were written long before the code. Re-read each one before you start it.

## Board

### Performance

- [ ] [v2-01 Set budgets and measure them](01-set-budgets-and-measure.md) (M)
- [ ] [v2-02 Cut draw calls](02-cut-draw-calls.md) (M)
- [ ] [v2-03 Shrink the download](03-shrink-the-download.md) (M)
- [ ] [v2-04 Adapt quality to the device](04-adapt-quality-to-the-device.md) (M)
- [ ] [v2-05 Try WebGPU](05-try-webgpu.md) (L)

### Resilience

- [ ] [v2-06 Spread the fleet across nodes](06-spread-the-fleet-across-nodes.md) (M)
- [ ] [v2-07 Add shields with a disruption budget](07-add-shields-with-a-disruption-budget.md) (M)
- [ ] [v2-08 Call reinforcements with autoscaling](08-call-reinforcements-with-autoscaling.md) (M)
- [ ] [v2-09 Roll out during a fight](09-roll-out-during-a-fight.md) (M)
- [ ] [v2-10 Drain a node](10-drain-a-node.md) (L)

### Observability

- [ ] [v2-11 Export metrics](11-export-metrics.md) (M)
- [ ] [v2-12 Define SLOs](12-define-slos.md) (M)
- [ ] [v2-13 Trace a kill](13-trace-a-kill.md) (M)

### Delivery and security

- [ ] [v2-14 Deploy with GitOps](14-deploy-with-gitops.md) (L)
- [ ] [v2-15 Sync a secret from outside](15-sync-a-secret-from-outside.md) (M)
- [ ] [v2-16 Sign and attest images](16-sign-and-attest-images.md) (M)
- [ ] [v2-17 Enforce policy at admission](17-enforce-policy-at-admission.md) (M)
- [ ] [v2-18 Score the repo](18-score-the-repo.md) (M)

### Online

- [ ] [v2-19 Switch the stream to WebSocket](19-switch-the-stream-to-websocket.md) (L)
- [ ] [v2-20 Add online co-op](20-add-online-co-op.md) (L)
- [ ] [v2-21 Protect the public bridge](21-protect-the-public-bridge.md) (M)
- [ ] [v2-22 Provision a demo cluster on demand](22-provision-a-demo-cluster-on-demand.md) (L)
- [ ] [v2-23 Expose it with TLS](23-expose-it-with-tls.md) (M)
- [ ] [v2-24 Write the runbook and run a game day](24-write-the-runbook-and-run-a-game-day.md) (M)
- [ ] [v2-25 Ship v2](25-ship-v2.md) (M)

## v2 is done when

1. The benchmark holds its frame budget on a mid-range phone, and CI enforces the size and draw-call budgets.
2. The fleet survives a node drain and a rollout with 100.00% uptime.
3. A dashboard, an SLO, and a trace exist for the kill loop.
4. The cluster is deployed from git and only runs signed images.
5. Two players on different devices can finish a sortie on a cluster that `make cloud-up` created.
