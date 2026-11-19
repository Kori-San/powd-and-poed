# v1-09 Add touch and gamepad

Size: M
Needs: v1-05

## Goal

The game is fully playable with one thumb on a phone, and with a gamepad.

## Why

Most people will open the demo link on a phone. If it does not work there, they leave.

## Steps

- [ ] Read `.claude/rules/web.md`, section "Input".
- [ ] Add an input layer that maps each device to actions for a player slot.
- [ ] Touch: drag anywhere to move. Fire is automatic. One button scans and one pauses.
- [ ] Gamepad: use the mapping in `DESIGN.md`.
- [ ] Make the play field and HUD fit portrait and landscape, and respect the safe-area insets.
- [ ] Pause when the tab is hidden or a gamepad disconnects.
- [ ] Unit test the mapping. Test by hand on one iPhone and one Android phone.

## Done when

- [ ] A full sortie is playable on a phone in portrait with one thumb.
- [ ] A gamepad plugged in during a sortie works after its first button press.
- [ ] The page never scrolls, zooms, or pulls to refresh during play.
- [ ] Rotating the phone during a sortie keeps the game state.

## Learn

- Pointer Events give one API for mouse, touch, and pen.
- Explain it back: why does game code read actions such as "fire" instead of keys such as Space?

## Not now

- Two players on one touch screen. Touch stays single player.
