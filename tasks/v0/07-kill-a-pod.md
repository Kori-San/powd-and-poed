# v0-07 Kill a pod through the bridge

Size: M
Needs: v0-06

## Goal

`POST /api/kill` with a pod UID deletes that pod. Nothing else can be deleted through it.

## Why

This is the trigger the game will pull. It has to be safe before a browser can reach it.

## Steps

1. [ ] Add `POST /api/kill` with the body `{"uid": "..."}`. A bad body returns 400.
2. [ ] Apply one global rate limit before anything else. Start with 5 requests per second. Over the limit returns 429.
3. [ ] Look the UID up in the informer cache. An unknown UID returns 404.
4. [ ] A pod that is terminating, or has a delete in flight, returns 409. Keep the in-flight UIDs in memory until the cache catches up.
5. [ ] Delete with a UID precondition, so a new pod that reuses the name is never hit.
6. [ ] Log every kill with the pod name, the node, and the result.
7. [ ] Unit test the five outcomes: 202, 400, 404, 409, 429.

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
