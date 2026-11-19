---
paths:
  - "bridge/**"
---

# Bridge

The bridge is the Go service between the game and the cluster. `security.md` applies to every line of it.

## Stack

- Go with the standard library first. HTTP is `net/http` with method patterns such as `POST /api/kill`. Logs are `log/slog` in JSON.
- Kubernetes access is `k8s.io/client-go`. Its minor version matches the cluster's Kubernetes minor.
- No web framework. No global state. No `init()` functions.

## Kubernetes access

- Read through shared informers. Never poll with `List` in a loop. Never shell out to `kubectl`.
- Wait for `cache.WaitForCacheSync` before serving. The bridge is not ready until then.
- Inside a cluster, use `rest.InClusterConfig()`. Outside, load the kubeconfig and require a `--context` flag.
- Delete with a UID precondition: `metav1.DeleteOptions{Preconditions: &metav1.Preconditions{UID: &uid}}`.
- `NotFound` and `Conflict` from a delete are normal outcomes. Map them to HTTP statuses. Do not log them as errors.
- A new verb or resource needs the RBAC manifest change in the same pull request.

## HTTP

- Routes and payloads follow `ARCHITECTURE.md`. Change both together.
- Limit request bodies with `http.MaxBytesReader`. Reject unknown JSON fields.
- Set `ReadHeaderTimeout` on the server. The stream route has no write deadline.
- Each stream client has a bounded buffer. Drop a slow client. It must never block the others.
- `/healthz` reports that the process is alive. `/readyz` reports that the informer caches are synced.
- On SIGTERM: stop accepting requests, close the streams, exit inside the grace period.

## Go

- `context.Context` is the first parameter of anything that blocks or calls the network.
- Check every error. Wrap it with `%w` and say what was being done.
- No `panic` outside `main`.
- Every goroutine has an owner that stops it.
- Tests are table-driven. Use `k8s.io/client-go/kubernetes/fake` for the clientset.

## Before you commit

Run in `bridge/`:

```sh
golangci-lint run
go test -race ./...
govulncheck ./...
```
