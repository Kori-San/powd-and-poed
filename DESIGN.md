# Design

Powd & Poed is a fast space shooter where every enemy is a real Kubernetes pod.
You shoot it, the pod is deleted for real, and the cluster brings it back.

## Pillars

When two ideas conflict, the one higher in this list wins.

1. Every target is real. One enemy is one pod, and there are no filler enemies.
2. Feel comes first. Input shows on screen in the same frame. The game never waits for the network.
3. The cluster comes back. The player causes the outage, and the uptime meter shows that the service survived it.
4. Shooting teaches. Each thing on screen stands for one platform concept, and the scanner explains it.
5. The numbers are honest. Every value on the HUD comes from the cluster, and the HUD always says `LIVE` or `SIM`.

## The loop

1. You shoot a fighter.
2. It flashes and breaks apart at once.
3. The bridge deletes the pod.
4. The Deployment sees one pod missing and starts a new one.
5. The new pod becomes ready and a new fighter warps in.

One loop takes a few seconds. The uptime meter should not move.
When it does move, the platform config has a gap, and closing that gap is a task.

## A sortie

- One run is a sortie. It lasts 90 seconds.
- Fighters fly patterns and fire back.
- A player ship takes three hits. Then it restarts after two seconds, like a crashed container.
- The end screen shows five numbers: kills, requests served, requests failed, uptime, and average recovery time.

## Players

One or two players. Player two can join at any time.

| | Powd | Poed |
|---|---|---|
| Seat | Player 1 | Player 2 |
| Livery | powder blue, seafoam green, dusty pink | black, acid green, deep purple |
| Starting colors | `#8FB8DE` `#7FC8A9` `#E8A0B4` | `#16161A` `#8FD14F` `#6B3FA0` |
| Shots | pink | green |

- The two ships have different silhouettes, so they read apart without color.
- The hex values are a starting point. Lock them in task v1-04.
- v0 has Powd only. v1 adds Poed on the same screen. v2 adds online co-op.

## What maps to what

| On screen | In the cluster | From |
|---|---|---|
| Fighter | Pod | v0 |
| Carrier | Node | v0 |
| Uptime meter | Share of good requests to the Service | v0 |
| Squadron markings | Deployment and its ReplicaSet | v1 |
| Warp-in ghost | Pod that is pending or not ready yet | v1 |
| Drifting wreck | Pod that is terminating | v1 |
| Relay beacon | Service | v1 |
| Shield | PodDisruptionBudget | v2 |
| Reinforcements | HorizontalPodAutoscaler | v2 |
| New paint mid-fight | Rolling update | v2 |
| Courier with a sealed crate | Secret synced by an ExternalSecret | v2 |

A new row here needs a codex entry. See `.claude/rules/codex.md`.

## Playfield and camera

- Play happens on a flat plane, like a classic vertical shooter.
- The scene is 3D. The camera sits low behind the players and looks up the field.
- Carriers hang at the far end. Fighters launch from the carrier that matches their node.
- It works in portrait and in landscape.

## Controls

| Action | Powd keys | Poed keys | Gamepad | Touch |
|---|---|---|---|---|
| Move | WASD | Arrows | Left stick | Drag |
| Fire | Space | Enter | A | Automatic |
| Scan | Left Shift | Right Shift | X | Scan button |
| Pause | Esc | Esc | Start | Pause button |

Touch is single player. In v0 the arrows also move Powd.

## Scanner (learning mode)

- Hold scan. Time slows down and the nearest target gets a data card.
- The card shows live values: kind, name, node, phase, age, restarts.
- One line says what the thing is. One line says why it came back.
- The first scan of each kind unlocks its codex entry.
- The first time something happens (first respawn, first failed request), a one-line callout names it.
- After a run, a recap lists what you saw and asks one question about it.

This follows what research on learning games recommends. The lesson sits inside the core mechanic, and information arrives at the moment the player needs it.
The recap question makes the player recall what they saw.

## Look

A 1970s space opera shot on film. The reference is the era and its techniques. No franchise is copied.

- Hulls look used: chipped paint and dirty panel lines.
- The scene is lit like a miniature shoot, with one hard key light and deep black shadows.
- Hulls are off-white and grey. Color appears only on liveries and markings.
- The image has fine film grain and slight halation on highlights. If you notice either, it is too strong.
- The star background is built from real star data.
- A Poly Haven HDRI lights the hulls and shows in their reflections. The backdrop is the star map.

## HUD

- The HUD is drawn like a vector display of the era: thin lines and no filled panels.
- Each layer has one phosphor color. The game layer is amber `#FFB000`. The scanner layer is blue-white `#CFE8FF`.
- Pink and green belong to the players' shots. The HUD never uses them.
- Titles use Michroma. Data uses Share Tech Mono. Both are under the SIL Open Font License. Task v1-11 confirms the choice.
- Always on screen: pods ready, nodes ready, uptime, kills, and `LIVE` or `SIM`.
- HUD text is short and uppercase. Digits are fixed-width, so numbers do not shift as they change.

## Sound

- Sounds come from analog synths, with tape saturation.
- Shots are short and loud. Carriers have a low rumble.
- Every sound is CC0. No samples from films or other games.

## Never

- Ship designs, names, logos, fonts, music, or sound effects from an existing franchise.
- Images, textures, models, audio, or voices made by a generative model.
- Decorative gradients, glass panels, glow outlines, or emoji in the UI.
- The untouched three.js look: grey standard material under default lights.
- Bloom on everything.
- Asset packs with clashing styles in one scene.

## Comfort

- `prefers-reduced-motion` turns off screen shake and flashes.
- Nothing flashes more than three times per second (WCAG 2.3.1).
- No information by color alone. Shape or text carries it too.
- Keys can be remapped. Pause works at any time. Music and effects have separate volume sliders.

## Targets

- 60 fps on a mid-range phone.
- A hit shows feedback in the same frame as the collision.
- Size and draw-call budgets are set and enforced in v2-01.
