# v1-05 Rebuild the game loop

Size: M
Needs: v1-01

## Goal

The simulation is a set of small tested systems over pooled entities: players, fighters, bullets, debris.

## Why

v0 proved the idea with throwaway code. Two players, enemy fire, and replays need a sim that is deterministic.

## Steps

- [ ] Define the entity state in `src/sim/` as plain data in fixed-size pools.
- [ ] Write one system per file, each with tests: input, movement, enemy patterns, firing, collision, damage, sortie timer.
- [ ] Fighters fly patterns and fire back. A player ship takes three hits, then restarts after two seconds.
- [ ] A sortie lasts 90 seconds. Then the sim reports the stats listed in `DESIGN.md`.
- [ ] The sim takes a random seed. The same seed and the same inputs give the same run.

## Done when

- [ ] A test replays recorded inputs with a fixed seed twice and gets the same final state.
- [ ] A 90 second sortie with held fire shows no sawtooth in the browser memory timeline.
- [ ] `npm test` passes in `web/`.

## Learn

- Deterministic code gives the same output for the same input, which makes bugs repeatable.
- Your ship restarts after three hits, like a container that crashed.
- Try it: `kubectl get pod <name> -n arena -o jsonpath='{.spec.restartPolicy}'`
- Explain it back: a container crashes. Who restarts it, and how is that different from a pod being replaced?

## Not now

- Effects and sound. That is v1-07 and v1-08.
- The second player. That is v1-10.
