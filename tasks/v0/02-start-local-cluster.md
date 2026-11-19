# v0-02 Start a local cluster

Size: S
Needs: v0-01

## Goal

`make cluster-up` creates a four-node Kubernetes cluster on your machine. `make cluster-down` deletes it.

## Why

Every later task needs a cluster. Several nodes let the game show pods spread across machines.

## Steps

1. [ ] Check that Docker is running: `docker info`.
2. [ ] Write `deploy/kind/cluster.yaml`: one control-plane node, three workers.
3. [ ] Pin the node image by sha256 digest. Copy it from the release notes of the kind version in `mise.toml`.
4. [ ] Add `cluster-up` and `cluster-down` to the Makefile. The cluster is named `powd`.
5. [ ] Make every `kubectl` call in the Makefile pass `--context kind-powd`.

## Done when

- [ ] `make cluster-up` exits 0, and exits 0 again when the cluster already exists.
- [ ] `kubectl get nodes --context kind-powd` lists 4 nodes, all `Ready`.
- [ ] `make cluster-down` exits 0 and `kind get clusters` no longer lists `powd`.

## Learn

- Node: a machine that runs pods. In kind, each node is a Docker container.
- Control plane: the part that decides. It holds the API server, the scheduler, the controllers, and etcd.
- Try it: `kubectl get nodes -o wide`, then `docker ps` to see the same nodes as containers.
- Explain it back: if the control-plane node stops, what keeps running and what stops working?

## Not now

- Cloud clusters. That is v2.
- Gateway API or a load balancer. That is v1.
