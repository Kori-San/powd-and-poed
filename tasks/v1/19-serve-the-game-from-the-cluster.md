# v1-19 Serve the game from the cluster

Size: M
Needs: v1-18

## Goal

One URL serves the game and the API from inside the cluster, routed with Gateway API.

## Why

Until now the game ran from a dev server on your laptop. A real deployment serves everything from the cluster.

## Steps

1. [ ] Write `web/Dockerfile`: a build stage, then an unprivileged static server. Follow `.claude/rules/containers.md`.
2. [ ] Add the web Deployment and Service to the chart, in `powd`, with two replicas.
3. [ ] Pick a Gateway API implementation. Candidates: Envoy Gateway, NGINX Gateway Fabric, Traefik. Record the choice in `docs/DECISIONS.md`.
4. [ ] Install the Gateway API CRDs (Standard channel) and the implementation in `make cluster-up`. Give kubeconform their schemas with `-schema-location`.
5. [ ] Add a `Gateway` and two `HTTPRoute` objects: `/api` to the bridge, `/` to the web. Make sure the event stream is not buffered or cut by a timeout.
6. [ ] Map a host port to the gateway in the kind config. `make demo` prints the URL.
7. [ ] Add codex entries: gateway, httproute.

## Done when

- [ ] After `make demo`, the game is playable at the printed URL with no port-forward and no dev server.
- [ ] The event stream stays open for 10 minutes through the gateway.
- [ ] `kubectl get gateway -n powd` shows `PROGRAMMED` as `True`. `kubectl describe httproute -n powd` shows `Accepted` as `True` for both routes.

## Learn

- A Gateway is the door into the cluster. An HTTPRoute says which path goes to which Service.
- The older Ingress API is frozen, and its most used controller was retired in March 2026.
- Try it: `kubectl describe httproute -n powd`, and read the conditions.
- Explain it back: why do the web and the bridge share one hostname instead of using two?

## Not now

- TLS and a real domain. That is v2-23.
