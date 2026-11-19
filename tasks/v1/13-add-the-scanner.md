# v1-13 Add the scanner

Size: L
Needs: v1-11, v1-12

## Goal

Holding scan slows time and shows a live data card for the nearest target.

## Why

This is learning mode. It turns a target into a labeled Kubernetes object the player can read.

## Steps

1. [ ] Add `restarts` to the Pod payload in the bridge and in `ARCHITECTURE.md`.
2. [ ] Scan input: while held, the sim runs at 20% speed. The cluster stream stays in real time.
3. [ ] Add the relay beacon, a fixed object that stands for the `fleet` Service. The scan target is the fighter, carrier, or beacon nearest to the player's aim line.
4. [ ] Draw the data card in the scanner color: kind, name, node, phase, age, restarts.
5. [ ] Reserve two text lines on the card for the codex: what it is, and why it came back.
6. [ ] A carrier shows the node card: name, ready or not, pods on it. The beacon shows the Service card: ready pods behind it, and uptime.
7. [ ] With two players, each has their own scan and their own card side.

## Done when

- [ ] The card values match `kubectl get pod <name> -n arena -o wide` for the scanned pod.
- [ ] A card for a pod that dies while scanned switches to "terminating", then closes.
- [ ] Scan works on keyboard, gamepad, and touch.

## Learn

- Every Kubernetes object has metadata, a spec that says what you want, and a status that says what is true now.
- Try it: `kubectl get pod <name> -n arena -o yaml`, and find the three parts.
- Explain it back: does the card read the spec or the status of the pod? Why?

## Not now

- Codex text and unlocks. That is v1-14.
