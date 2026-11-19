# v1-11 Add Poed

Size: M
Needs: v1-09

## Goal

A second player can join on the same screen at any time, as Poed.

## Why

The game is named after two characters. Local co-op is also the first step toward online play in v2-20.

## Steps

1. [ ] Add player slots to the sim. Slot 1 is Powd and slot 2 is Poed. Each has a ship, shots, hits, and a kill count.
2. [ ] Join: pressing fire on a device that no player uses adds the second player. Leaving is in the pause menu.
3. [ ] Split the keyboard as in `DESIGN.md`. Each gamepad takes the next free slot.
4. [ ] Each player's shots have their own color and their own shape.
5. [ ] Show kills per player on the HUD and on the end screen.
6. [ ] Send both players' kills through the same bridge rate limit.

## Done when

- [ ] Two people finish a sortie on one keyboard, and on a keyboard plus a gamepad.
- [ ] Player two joining or leaving during a sortie does not reset the run.
- [ ] A sim test with two input streams is deterministic.
- [ ] On a touch device the menu says the game is single player.

## Learn

- Both players can hit the same pod in the same frame. The game credits one kill, and the bridge refuses a second delete for the same UID.
- Explain it back: two delete requests for the same pod arrive almost together. Why is that harmless?

## Not now

- Playing from two devices. That is v2-20.
