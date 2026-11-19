# v1-17 Publish the sim demo

Size: S
Needs: v1-16

## Goal

The sim build is live on a public URL, and CI redeploys it on every merge to `main`.

## Why

A link that works on a phone in one tap is the most useful thing in this repo for a recruiter.

## Steps

- [ ] Add a GitHub Pages workflow: build `web/` with sim as the default mode, then deploy. Follow `.claude/rules/ci.md`.
- [ ] Set the Vite `base` path for the Pages URL.
- [ ] Add a Playwright smoke test: load the built site, start a sortie, get one kill. Run it before the deploy step.
- [ ] Put the link at the top of the README.

## Done when

- [ ] The public URL loads and is playable on a phone.
- [ ] A failing smoke test blocks the deploy.
- [ ] The title screen on the public site says `SIM`.

## Learn

- With continuous deployment, a merge to `main` is a release.
- Explain it back: what is the difference between continuous delivery and continuous deployment?

## Not now

- A public live cluster. That is v2-22.
