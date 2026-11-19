# v2-14 Deploy with GitOps

Size: L
Needs: v1-23

## Goal

The cluster state comes from git through a GitOps controller, and manual changes are reverted.

## Why

It is the same idea as the game, one level up. Git holds the desired state, and a controller restores it.

## Steps

- [ ] Choose Argo CD or Flux. Compare their current releases and what you want to learn. Record the choice.
- [ ] Install it in `make cluster-up` and point it at this repo.
- [ ] Define the applications: the game chart, the gateway, the observability stack.
- [ ] Turn on automatic sync with self-heal and prune.
- [ ] Remove `helm upgrade` from `make deploy`. A deploy is now a merge.
- [ ] CI writes each new image digest into the values file through a pull request.
- [ ] Add codex entries: gitops, reconciliation.

## Done when

- [ ] `kubectl delete deploy fleet -n arena`: the controller recreates it within its sync interval.
- [ ] `kubectl scale deploy web -n powd --replicas=5`: the count returns to the value in git.
- [ ] A merged change to the values reaches the cluster with no manual command.
- [ ] The controller shows every application as synced and healthy.

## Learn

- With GitOps, nobody runs `kubectl apply` by hand. The repo is the only way to change the cluster.
- Try it: change something by hand and watch it get reverted.
- Explain it back: the game deletes a pod and it comes back. You delete a Deployment and it comes back. What do the two have in common?

## Not now

- Several environments. One cluster is enough here.
