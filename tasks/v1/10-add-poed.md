# v1-10 Add Poed

Size: M
Needs: v1-09

## Goal

A second player can join on the same screen at any time, as Poed.

## Why

The game is named after two characters. Co-op also shows two clients acting on one shared cluster.

## Steps

- [ ] Add player slots to the sim. Slot 1 is Powd and slot 2 is Poed. Each has a ship, shots, hits, and a kill count.
- [ ] Join: pressing fire on a device that no player uses adds the second player. Leaving is in the pause menu.
- [ ] Split the keyboard as in `DESIGN.md`. Each gamepad takes the next free slot.
- [ ] Each player's shots have their own color and their own shape.
- [ ] Show kills per player on the HUD and on the end screen.
- [ ] Send both players' kills through the same bridge rate limit.

## Done when

- [ ] Two people finish a sortie on one keyboard, and on a keyboard plus a gamepad.
- [ ] Player two joining or leaving during a sortie does not reset the run.
- [ ] A sim test with two input streams is deterministic.
- [ ] On a touch device the menu says the game is single player.

## Learn

- Both players can hit the same pod in the same frame. One kill counts. The bridge answers 409 to the other.
- Explain it back: two requests try to delete the same pod. How does the API server keep the result correct?

## Not now

- Playing from two devices. That is v2-20.
