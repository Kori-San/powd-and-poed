# v1-12 Add the scanner

Size: L
Needs: v1-11

## Goal

Holding scan slows time and shows a live data card for the nearest target.

## Why

This is learning mode. It turns a target into a labeled Kubernetes object the player can read.

## Steps

- [ ] Add `restarts` to the Pod payload in the bridge and in `ARCHITECTURE.md`.
- [ ] Scan input: while held, the sim runs at 20% speed. The cluster stream stays in real time.
- [ ] Pick the target: the fighter or carrier nearest to the player's aim line.
- [ ] Draw the data card in the scanner color: kind, name, node, phase, age, restarts.
- [ ] Reserve two text lines on the card for the codex: what it is, and why it came back.
- [ ] Scanning a carrier shows the node card: name, ready or not, pods on it.
- [ ] With two players, each has their own scan and their own card side.

## Done when

- [ ] The card values match `kubectl get pod <name> -n arena -o wide` for the scanned pod.
- [ ] A card for a pod that dies while scanned switches to "terminating", then closes.
- [ ] Scan works on keyboard, gamepad, and touch.

## Learn

- Every Kubernetes object has metadata, a spec that says what you want, and a status that says what is true now.
- Try it: `kubectl get pod <name> -n arena -o yaml`, and find the three parts.
- Explain it back: does the card read the spec or the status of the pod? Why?

## Not now

- Codex text and unlocks. That is v1-13.
