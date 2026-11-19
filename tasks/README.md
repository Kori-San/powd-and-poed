# Tasks

The whole roadmap lives here. One file per task. One task at a time.

Now: [v0-01 Bootstrap the repo](v0/01-bootstrap-the-repo.md)

## How to use this

1. Open the task on the "Now" line.
2. Do its steps in order. Tick them as you go.
3. When every "Done when" line passes, tick the task on its board.
4. Move the "Now" line to the next task.

With Claude Code, type `/next-task`.

## Versions

| Version | Goal | When it is done you can say |
|---|---|---|
| [v0](v0/README.md) | Prove the loop | "I shoot a cube, a real pod dies, and the cluster brings it back." |
| [v1](v1/README.md) | Make it a game that teaches | "Two people can play it on a phone or a laptop, and the scanner explains what they hit." |
| [v2](v2/README.md) | Make it fast, observable, and online | "It runs on a real cluster through GitOps, with SLOs, signed images, and online co-op." |

Finish a version before you start the next one.

## Sizes

| Size | Meaning |
|---|---|
| S | One sitting, about an hour |
| M | Half a day |
| L | A full day. Split it if you can. |

Sizes assume one person who is learning as they go.

## House rules

- One task in progress at a time.
- Commands in tasks assume your kubectl context is `kind-powd`. Check with `kubectl config current-context`.
- A new idea goes into [IDEAS.md](IDEAS.md) as one line. Then go back to the task.
- Each task ends with an "Explain it back" question. Answer it out loud or in writing. It is interview practice.
- The v1 and v2 tasks were written before any code existed. Re-read a task before you start it, and fix it if the code has moved on.
- Every task follows [_TEMPLATE.md](_TEMPLATE.md).
