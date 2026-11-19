# v2-24 Write the runbook and run a game day

Size: M
Needs: v2-12, v2-15, v2-21, v2-23

## Goal

A runbook covers the failures this system can have, and each one has been triggered on purpose once.

## Why

A runbook nobody has followed is a guess. Running the failures turns it into a tested procedure.

## Steps

1. [ ] Write `docs/RUNBOOK.md`: one section per alert, with the symptoms, the checks to run, and the fix.
2. [ ] Cover seven scenarios: bridge down, API server slow, fleet at zero, node lost, certificate expired, secret store down, abuse spike.
3. [ ] Trigger each scenario on the local or demo cluster. Follow the runbook as written. Fix it where it was wrong.
4. [ ] Link each alert to its runbook section.
5. [ ] Write one blameless postmortem of the most interesting scenario in `docs/postmortems/`, on one page.

## Done when

- [ ] Every alert has a runbook link that resolves.
- [ ] Each scenario has a date and a result line in the runbook.
- [ ] The postmortem has a timeline, a cause, and at most three actions.

## Learn

- A game day is a planned failure. You learn how the system and the team react while nothing is at stake.
- Explain it back: walk through one scenario as if you were paged at night. What do you check first?

## Not now

- An on-call rotation. There is one of you.
