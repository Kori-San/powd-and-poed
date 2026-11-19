# v0-08 Draw pods as cubes

Size: M
Needs: v0-06

## Goal

A web page shows one cube per pod, grouped by node, and updates live from the bridge stream.

## Why

It proves the whole pipe before any gameplay exists: cluster, bridge, browser.

## Steps

- [ ] Create `web/` with Vite, TypeScript in strict mode, and three.js. Look up the current versions first.
- [ ] Proxy `/api` to the bridge in the Vite dev config, so the browser sees a single origin.
- [ ] Write a `ClusterStore` in plain TypeScript with no three.js import. It applies stream events and holds pods and nodes.
- [ ] Unit test the store with Vitest: snapshot, add, update, delete, reconnect.
- [ ] Render one cube per pod, grouped by node. Grey for not ready, white for ready, red for terminating.
- [ ] Show a text banner when the stream drops, and reconnect automatically.
- [ ] Add `make web-dev`.

## Done when

- [ ] With `make bridge-dev` and `make web-dev` running, the page shows 12 cubes grouped by node.
- [ ] Delete a pod by hand. Its cube turns red, then disappears. A grey cube appears, then turns white.
- [ ] Stop the bridge: the banner appears. Start it again: the cubes return without a page reload.
- [ ] `npm test` and `npm run typecheck` pass in `web/`.

## Learn

- Phase and readiness are different. A pod can be `Running` and still not `Ready`.
- Ready means the readiness probe passes. Only ready pods receive traffic from a Service.
- Try it: `kubectl get pods -n arena -w`, delete a pod, and compare the `READY` and `STATUS` columns of the new one.
- Explain it back: why does the page talk to the bridge and not to the Kubernetes API?

## Not now

- A ship, bullets, or any input. That is v0-09.
- Models, lighting, textures. That is v1.
