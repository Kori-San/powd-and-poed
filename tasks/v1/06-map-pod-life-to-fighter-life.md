# v1-06 Map pod life to fighter life

Size: M
Needs: v1-04, v1-05

## Goal

A fighter looks and behaves according to the real state of its pod: pending, ready, terminating, gone.

## Why

This is where the game starts to teach. What you see on screen is the pod lifecycle.

## Steps

1. [ ] Write the state table in `src/sim/`: pod fields in, fighter state out. Unit test every row.
2. [ ] Pending or not ready: a ghost outline warps in next to its carrier. It cannot be hit.
3. [ ] Ready: the fighter joins its formation and can be hit.
4. [ ] Hit: the explosion starts at once. Terminating: a wreck drifts until the pod is gone.
5. [ ] Fighters launch from the carrier that matches their node. A pod without a node waits at the edge of the field.
6. [ ] A kill the bridge rejects puts the fighter back with a "deflected" effect.
7. [ ] Measure `RECOVERY` as defined in `ARCHITECTURE.md`. Show the average on the HUD.

## Done when

- [ ] Every row of the state table has a passing test.
- [ ] `kubectl scale deploy fleet -n arena --replicas=20` makes eight ghosts warp in and become fighters.
- [ ] Set a bad image on the Deployment: the new fighters stay ghosts. `kubectl rollout undo deploy/fleet -n arena` removes the ghosts, and new fighters warp in.

## Learn

- A pod has a phase, such as Pending or Running, and conditions, such as PodScheduled and Ready. They answer different questions.
- Try it: `kubectl describe pod <name> -n arena`, and read the Conditions and Events sections.
- Explain it back: a pod is Running but never becomes Ready. Name two possible causes.

## Not now

- Shake, flashes, and debris. That is v1-07.
