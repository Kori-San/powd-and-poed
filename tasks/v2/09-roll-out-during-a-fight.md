# v2-09 Roll out during a fight

Size: M
Needs: v2-06

## Goal

A new fleet version rolls out during a sortie with zero failed requests, and the game shows it happening.

## Why

Zero-downtime deploys are the everyday form of high availability. Here you can watch one.

## Steps

1. [ ] Make the fleet version visible: a pod label drives the paint of the fighter. Add the label to the Pod payload.
2. [ ] Add `make rollout`, which changes the version, and `make rollback`, which undoes it.
3. [ ] Bridge: stream the rollout status of the Deployment. This needs read access to Deployments in `arena`. Update `ARCHITECTURE.md`, the simulator, and the contract tests.
4. [ ] Game: fighters with the new paint replace the old ones in waves. A HUD line shows the progress.
5. [ ] Try a broken version with a bad image. The rollout must stall while old pods keep serving.
6. [ ] Add codex entries: rolling-update, rollback.

## Done when

- [ ] `make rollout` during a sortie keeps uptime at 100.00%.
- [ ] With a bad image, the old pods still serve, and `make rollback` restores the fleet.
- [ ] `kubectl rollout history deploy/fleet -n arena` lists the revisions.

## Learn

- A rolling update replaces pods a few at a time and waits for each new pod to be ready. The readiness probe is what makes it safe.
- Try it: `kubectl rollout status deploy/fleet -n arena` during `make rollout`.
- Explain it back: a new version starts but never becomes ready. What does the rollout do, and what would happen without a readiness probe?

## Not now

- Canary or blue-green releases. Put them in `tasks/IDEAS.md` if you want them.
