# v1: a game that teaches

Two people can play it on a phone or a laptop. It looks like a 1970s space film. The scanner explains everything they hit.

Work through the groups in order. Inside a group, follow the numbers.

## Board

### Engine and look

- [ ] [v1-01 Set up the render pipeline](01-set-up-the-render-pipeline.md) (M)
- [ ] [v1-02 Build the asset pipeline](02-build-the-asset-pipeline.md) (M)
- [ ] [v1-03 Light the scene](03-light-the-scene.md) (M)
- [ ] [v1-04 Bring in the ships](04-bring-in-the-ships.md) (L)

### Game

- [ ] [v1-05 Rebuild the game loop](05-rebuild-the-game-loop.md) (M)
- [ ] [v1-06 Map pod life to fighter life](06-map-pod-life-to-fighter-life.md) (M)
- [ ] [v1-07 Make shooting feel good](07-make-shooting-feel-good.md) (M)
- [ ] [v1-08 Add sound](08-add-sound.md) (M)
- [ ] [v1-09 Add touch and gamepad](09-add-touch-and-gamepad.md) (M)
- [ ] [v1-10 Add Poed](10-add-poed.md) (M)

### Learn

- [ ] [v1-11 Redraw the HUD](11-redraw-the-hud.md) (M)
- [ ] [v1-12 Add the scanner](12-add-the-scanner.md) (L)
- [ ] [v1-13 Write the first codex](13-write-the-first-codex.md) (M)
- [ ] [v1-14 Teach at the right moment](14-teach-at-the-right-moment.md) (M)
- [ ] [v1-15 Add menus and comfort settings](15-add-menus-and-comfort-settings.md) (M)

### Platform

- [ ] [v1-16 Simulate a cluster in the browser](16-simulate-a-cluster-in-the-browser.md) (M)
- [ ] [v1-17 Publish the sim demo](17-publish-the-sim-demo.md) (S)
- [ ] [v1-18 Package with Helm](18-package-with-helm.md) (M)
- [ ] [v1-19 Serve the game from the cluster](19-serve-the-game-from-the-cluster.md) (M)
- [ ] [v1-20 Harden the workloads](20-harden-the-workloads.md) (M)
- [ ] [v1-21 Test the loop in CI](21-test-the-loop-in-ci.md) (M)
- [ ] [v1-22 Build and scan images in CI](22-build-and-scan-images-in-ci.md) (M)
- [ ] [v1-23 Ship v1](23-ship-v1.md) (S)

## v1 is done when

1. The public sim demo is playable on a phone.
2. `make demo` gives a live game at one URL, served from the cluster.
3. Two players can finish a sortie together.
4. Ten codex entries unlock by scanning.
5. The uptime meter reads 100.00% while pods are killed one at a time.
6. CI runs the kill loop on a real cluster for every pull request.

## Not in v1

Online co-op, autoscaling, GitOps, dashboards, a public live cluster. All of that is v2.
