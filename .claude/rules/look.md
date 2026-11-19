---
paths:
  - "web/**"
  - "DESIGN.md"
---

# Look and UI

`DESIGN.md` says what the game looks like. This file lists what makes a game look generated or cheap, and what to do instead.

v0 is exempt. It draws cubes and plain text on purpose. These rules apply from task v1-01.

## Generated-looking UI

Never ship any of these:

- Inter, Roboto, Arial, or a system font as the visible typeface. Fonts come from `DESIGN.md`.
- Gradients as decoration. Gradient text. A purple-to-blue blend anywhere.
- Glass panels, blurred card backgrounds, glow outlines, soft drop shadows.
- A row of three equal cards. A page where everything is centered. One corner radius on everything.
- Emoji as icons. Icons from more than one set.
- The same fade-up animation on every element. A hover effect on everything.
- Filler copy: placeholder names, round made-up numbers, slogans.

## Cheap-looking 3D

- Washed-out or murky color caused by a wrong color space. See `web.md`.
- Highlights clipped to flat white. Bloom over the whole frame.
- Models from different packs that clash in style, scale, or texture detail.
- Stretched or blurry textures. Visible seams. Flickering overlapping surfaces.
- A blurry HDRI used as the visible backdrop.
- Particles that pop in or out without a fade.
- Default grey material under default lights.

## Do this instead

- Start from a real reference: film stills of the era, model shop photos, vector displays. Link it in the pull request.
- Take each choice from `DESIGN.md`: one type scale, one line weight, one phosphor color per HUD layer.
- Keep film effects subtle. If a viewer notices the grain, halve it.
- Design every state: loading, empty, error, disconnected, paused.
- Check on a phone and on a desktop. Add both screenshots to the pull request.
- Honor `prefers-reduced-motion`. Nothing flashes more than three times per second.
