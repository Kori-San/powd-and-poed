# v0-09 Fly and shoot

Size: M
Needs: v0-07, v0-08

## Goal

You fly a ship with the keyboard, shoot a cube, and the real pod behind it dies.

## Why

This is the whole idea in its ugliest form. If it is fun with cubes, it is worth making pretty.

## Steps

- [ ] Add the player ship as a cone. Move with WASD or the arrow keys. Keep it inside the play area.
- [ ] Fire with Space. Bullets come from a fixed pool. Nothing is allocated per shot.
- [ ] Detect bullet hits with circle overlap on the play plane.
- [ ] On a hit: flash the cube at once, mark it as hit, and send the kill request. Do not wait for the answer.
- [ ] If the bridge answers 429, put the cube back to normal.
- [ ] Show kills, pods ready, and nodes ready as plain text on screen.
- [ ] Unit test movement bounds and hit detection.

## Done when

- [ ] Shoot a cube. `kubectl get pods -n arena -w` shows that exact pod terminating.
- [ ] A cube that is already hit cannot be hit again.
- [ ] The game holds 60 fps on your laptop while you hold fire.
- [ ] `npm test` passes in `web/`.

## Learn

- Optimistic update: show the result now and let the server confirm later. Games and fast UIs both do this.
- Try it: open the browser network tab, shoot, and read the `kill` request and the stream events that follow.
- Explain it back: the cube flashed before the pod was deleted. What should the screen do if the delete fails?

## Not now

- Enemies that move or shoot back. That is v1.
- Touch and gamepad. That is v1.
- The second player. That is v1.
