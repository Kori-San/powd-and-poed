# v0-06 Stream the cluster

Size: M
Needs: v0-03, v0-05

## Goal

A Go service called the bridge watches the cluster and streams every pod and node change to any HTTP client.

## Why

The browser must never talk to the Kubernetes API. The bridge is the only door.

## Steps

1. [ ] Create the Go module in `bridge/` with `/healthz`, `/readyz`, and JSON logs.
2. [ ] Connect to the cluster with client-go. Outside a cluster, refuse to start without a `--context` flag.
3. [ ] Start shared informers: pods in the `arena` namespace, and nodes.
4. [ ] Add `GET /api/stream` as Server-Sent Events. Send one `snapshot` event, then `pod` and `node` events. The shapes are in `ARCHITECTURE.md`.
5. [ ] Shut down cleanly on SIGTERM and close open streams.
6. [ ] Unit test the event mapping with the client-go fake clientset.
7. [ ] Add `make bridge-dev` that runs the bridge against `kind-powd`. Add a CI job with golangci-lint, the tests, and govulncheck. Add `gomod` to `dependabot.yml`.

## Done when

- [ ] `curl -N localhost:8080/api/stream` prints a snapshot with 12 pods and 4 nodes.
- [ ] Delete a pod by hand. Within 2 seconds the stream shows that pod terminating and a new pod added.
- [ ] The three commands under "Before you commit" in `.claude/rules/bridge.md` pass.

## Learn

- API server: the only way to read or change cluster state. `kubectl` and the bridge are both plain clients of it.
- Watch: one long request that receives changes, instead of asking again and again.
- Informer: the client-go helper that combines a watch, a local cache, and automatic reconnects.
- Try it: `kubectl get pods -n arena --watch --output-watch-events` prints the same raw events.
- Explain it back: why does the bridge send a snapshot before the first change event?

## Not now

- Deleting pods. That is v0-07.
- Auth and per-player limits. That is v2.
