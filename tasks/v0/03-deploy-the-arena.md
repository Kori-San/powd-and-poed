# v0-03 Deploy the arena

Size: S
Needs: v0-02

## Goal

The `arena` namespace runs 12 copies of a small web app behind one Service. These pods are the targets.

## Why

This is the first real win. You delete a pod by hand and watch Kubernetes replace it.

## Steps

- [ ] Write `deploy/arena/namespace.yaml` for the namespace `arena`.
- [ ] Write `deploy/arena/deployment.yaml`: a Deployment named `fleet`, 12 replicas, image `ghcr.io/stefanprodan/podinfo` pinned by tag and digest.
- [ ] Give the container a readiness probe, a liveness probe, and CPU and memory requests and limits. Take the port and probe paths from the podinfo README.
- [ ] Write `deploy/arena/service.yaml`: a ClusterIP Service named `fleet` that selects those pods.
- [ ] Add `make arena-up` and `make arena-down`.

## Done when

- [ ] `kubectl get deploy fleet -n arena` shows `12/12` ready.
- [ ] `kubectl get pods -n arena -o wide` shows pods on all three workers.
- [ ] Delete one pod by hand. A new pod reaches `Running` within 10 seconds.

## Learn

- Pod: one running copy of your app. Pods are disposable.
- Deployment: a request for "12 pods of this image". A controller keeps making it true.
- Service: one stable address in front of pods that come and go.
- Try it: run `kubectl get pods -n arena -w` in one terminal. In another, run `kubectl delete pod -n arena <name>`.
- Explain it back: you deleted a pod and a new one appeared. Which component created it, and how did it know?

## Not now

- Helm. Plain YAML first, so you can read every line. Helm is v1.
- Spread rules and disruption budgets. That is v2.
