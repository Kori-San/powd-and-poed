# v2-08 Call reinforcements with autoscaling

Size: M
Needs: v2-06

## Goal

The fleet grows under load and shrinks afterwards, driven by a HorizontalPodAutoscaler.

## Why

A fixed replica count is a guess. Autoscaling lets the cluster answer load by itself.

## Steps

- [ ] Install metrics-server in `make cluster-up`. Note in a comment which flag kind needs and why it is for local use only.
- [ ] Add an HPA (`autoscaling/v2`) for the fleet: a CPU target, min 12, max 30, and a scale-down stabilization window.
- [ ] Remove the fixed `replicas` from the Deployment template, so Helm does not fight the HPA.
- [ ] Add `make load`, which starts a load generator Job against the fleet Service.
- [ ] Game: new fighters warp in as the HPA scales up. The HUD shows current and desired replicas.
- [ ] Add codex entries: hpa, metrics-server.

## Done when

- [ ] `make load` raises the replica count within two minutes, in the game and in `kubectl get hpa -n arena -w`.
- [ ] After the load stops, the fleet returns to 12.
- [ ] A `helm upgrade` during a scale-up does not reset the replica count.

## Learn

- The HPA is one more controller. It compares a metric with a target and edits the replica count. The Deployment does the rest.
- Explain it back: why must the Deployment manifest not set `replicas` when an HPA manages it?

## Not now

- Scaling on custom metrics. CPU is enough to show the idea.
