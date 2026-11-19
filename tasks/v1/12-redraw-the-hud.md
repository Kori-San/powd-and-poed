# v1-12 Redraw the HUD

Size: M
Needs: v1-06, v1-09

## Goal

The HUD looks like a vector display from the 1970s and shows the live cluster numbers.

## Why

The HUD carries the proof: pods, nodes, uptime. It is also where a game most often looks generated.

## Steps

1. [ ] Find five reference images of real vector and radar displays of the era. Link them in the pull request.
2. [ ] Confirm the two typefaces in `DESIGN.md`, or replace them. Self-host the `.woff2` files with their license.
3. [ ] Build the HUD in DOM and CSS: pods ready, nodes ready, uptime, recovery, kills, and `LIVE` or `SIM`.
4. [ ] Use one line weight, one color per layer, and fixed-width digits.
5. [ ] Design four connection states: connecting, live, reconnecting, disconnected.
6. [ ] Restyle the menus from v1-09 with the same type, line weight, and colors.
7. [ ] Check size and contrast on a phone outdoors.

## Done when

- [ ] The pull request lists which stream event feeds each number on the HUD.
- [ ] Stopping the bridge shows the disconnected state within two seconds.
- [ ] The HUD is readable on a screen 360 px wide. A screenshot is in the pull request.
- [ ] Nothing from "Generated-looking UI" in `.claude/rules/look.md` appears.
- [ ] The fonts are in `CREDITS.md`.

## Learn

- A status display is only useful if every number has one clear source.
- Explain it back: the HUD says 11 of 12 pods ready. Which two fields of the Deployment status would show the same thing in `kubectl`?

## Not now

- The scanner layer. That is v1-13.
