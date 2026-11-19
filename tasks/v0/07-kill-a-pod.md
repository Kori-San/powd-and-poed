# v0-07 Kill a pod through the bridge

Size: S
Needs: v0-06

## Goal

`POST /api/kill` with a pod UID deletes that pod. Nothing else can be deleted through it.

## Why

This is the trigger the game will pull. It has to be safe before a browser can reach it.

## Steps

- [ ] Add `POST /api/kill` with the body `{"uid": "..."}`.
- [ ] Look the UID up in the informer cache. Unknown UID returns 404. Already terminating returns 409.
- [ ] Delete with a UID precondition, so a new pod that reuses the name is never hit.
- [ ] Add one global rate limit. Start with 5 kills per second. Over the limit returns 429.
- [ ] Log every kill with the pod name, the node, and the result.
- [ ] Unit test the four outcomes: 202, 404, 409, 429.

## Done when

- [ ] `curl -X POST localhost:8080/api/kill -d '{"uid":"<uid>"}'` returns 202 and the pod starts terminating.
- [ ] The same call again returns 409. A made-up UID returns 404.
- [ ] 50 calls within one second produce at least one 429.
- [ ] `go test ./...` passes in `bridge/`.

## Learn

- Graceful termination: delete marks the pod, the kubelet sends SIGTERM, waits for the grace period, then sends SIGKILL.
- The replacement starts right away. The ReplicaSet does not wait for the old pod to finish dying.
- Try it: `kubectl delete pod <name> -n arena`, and time how long the old pod stays in `Terminating`.
- Explain it back: why does the bridge delete by UID and not by name?

## Not now

- Per-player limits and abuse protection. That is v2.
- The eviction API. That is v2.
