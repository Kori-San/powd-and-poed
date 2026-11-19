# v1-14 Teach at the right moment

Size: M
Needs: v1-13

## Goal

The game names things the first time they happen, and asks one question after each sortie.

## Why

People remember what they had to recall. A question after the action does more than a tutorial before it.

## Steps

- [ ] Add an event detector in `src/sim/`: first kill, first respawn, first pending pod, first failed request, first deflected shot, first carrier scan.
- [ ] Each event shows one callout line, once, in the scanner color, with the codex id it belongs to.
- [ ] Add `question` and `answers` to the codex format, to the validator, and to the ten entries.
- [ ] End screen: list the concepts seen in this sortie under "You saw".
- [ ] End screen: ask one multiple-choice question about one of them.
- [ ] Add a setting that turns callouts and questions off.

## Done when

- [ ] A test shows each callout fires once per browser profile.
- [ ] With the setting off, no callout and no question appear.
- [ ] A test shows the question is always about a concept that appeared in the sortie.

## Learn

- Answering from memory makes knowledge stick better than reading the answer again.
- Explain it back: answer three end-screen questions in a row without using the scanner.

## Not now

- Scores, streaks, or badges for learning. Keep it to one question.
