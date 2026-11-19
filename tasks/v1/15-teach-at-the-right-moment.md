# v1-15 Teach at the right moment

Size: M
Needs: v1-14

## Goal

The game names things the first time they happen, and asks one question after each sortie.

## Why

Recalling something helps you keep it. The source is in the scanner section of `DESIGN.md`. So the game asks after the action instead of explaining before it.

## Steps

1. [ ] Add an event detector in `src/sim/`: first kill, first respawn, first pending pod, first failed request, first deflected shot, first carrier scan.
2. [ ] Each event shows one callout line, once, in the scanner color, with the codex id it belongs to.
3. [ ] Add `question` and `answers` to the codex format, to the validator, and to the ten entries.
4. [ ] End screen: list the concepts seen in this sortie under "You saw".
5. [ ] End screen: ask one multiple-choice question about one of them.
6. [ ] Add a row to the settings screen that turns callouts and questions off.

## Done when

- [ ] A test shows each callout fires once per browser profile.
- [ ] With the setting off, no callout and no question appear.
- [ ] A test shows the question is always about a concept that appeared in the sortie.

## Learn

- Answering from memory makes knowledge stick better than reading the answer again.
- Explain it back: answer three end-screen questions in a row without using the scanner.

## Not now

- Scores, streaks, or badges for learning. Keep it to one question.
