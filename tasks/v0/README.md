# v0: prove the loop

You shoot a cube in the browser, a real pod dies, and the cluster brings it back.

v0 has cubes, one player, a keyboard, and a local cluster. Nothing else.

## Board

- [ ] [v0-01 Bootstrap the repo](01-bootstrap-the-repo.md) (S)
- [ ] [v0-02 Start a local cluster](02-start-local-cluster.md) (S)
- [ ] [v0-03 Deploy the arena](03-deploy-the-arena.md) (S)
- [ ] [v0-04 Guard the commits](04-guard-the-commits.md) (S)
- [ ] [v0-05 Add CI and Dependabot](05-add-ci-and-dependabot.md) (M)
- [ ] [v0-06 Stream the cluster](06-stream-the-cluster.md) (M)
- [ ] [v0-07 Kill a pod through the bridge](07-kill-a-pod.md) (S)
- [ ] [v0-08 Draw pods as cubes](08-draw-pods-as-cubes.md) (M)
- [ ] [v0-09 Fly and shoot](09-fly-and-shoot.md) (M)
- [ ] [v0-10 Run the bridge inside the cluster](10-run-bridge-in-cluster.md) (M)
- [ ] [v0-11 Show the uptime meter](11-show-the-uptime-meter.md) (M)
- [ ] [v0-12 Ship v0](12-ship-v0.md) (S)

## v0 is done when

1. `make demo` on a clean machine starts everything.
2. You shoot a cube, and `kubectl get pods -n arena -w` shows that pod replaced.
3. The uptime meter shows a measured number.
4. The tag `v0.1.0` is published.

## Not in v0

Models, lighting, sound, touch, the second player, the scanner, Helm. All of that is v1.
