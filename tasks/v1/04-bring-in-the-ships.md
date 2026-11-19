# v1-04 Bring in the ships

Size: L
Needs: v1-03

## Goal

Powd, Poed, the pod fighter, and the node carrier are real models in one shared style.

## Why

Mixed asset packs make a small game look cheap. One style pass fixes that.

## Steps

1. [ ] Shortlist CC0 kits, for example the Kenney Space Kit and the Quaternius ship packs. Read each license on its own page.
2. [ ] Build the four ships from kit parts in Blender. Powd and Poed must differ in silhouette. Save the working files under `assets/work/`.
3. [ ] Repaint everything to the palette in `DESIGN.md`. Write the final livery colors back into `DESIGN.md`.
4. [ ] Build the shared wear textures from ambientCG materials and apply them. Pick one texel density and write it in `.claude/rules/assets.md`.
5. [ ] Run the models through `make assets`. Add the credits.
6. [ ] Replace the cubes and the cone. Draw fighters with `InstancedMesh`.
7. [ ] Give each ReplicaSet a squadron marking derived from its name.

## Done when

- [ ] All four ships are in the game and none is a primitive shape.
- [ ] In a black silhouette screenshot, Powd, Poed, and a fighter are easy to tell apart.
- [ ] Scaling the fleet from 12 to 40 pods does not raise the draw-call count in the dev overlay.
- [ ] Every model has a row in `CREDITS.md`.

## Learn

- Instancing draws many copies of one mesh in a single call. The pods of a ReplicaSet are also copies of one template.
- Try it: `kubectl get rs -n arena`. The hash in the name is the hash of the pod template.
- Explain it back: what is the difference between a Deployment and a ReplicaSet, and when do you see two ReplicaSets at once?

## Not now

- Animation and effects. That is v1-06 and v1-07.
