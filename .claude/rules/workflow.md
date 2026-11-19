# Workflow

How to pick a task, work on it, and finish it. One task at a time.

## Pick the work

1. Open `tasks/README.md`. The "Now" line names the current task.
2. Open that task file. Do that task and nothing else.
3. If "Now" is empty, take the first unticked task on the current version board and write it on the "Now" line.

## While you work

- Follow the steps in order. Tick each step in the task file when it is finished.
- An idea outside the task goes into `tasks/IDEAS.md` as one line. Then go back to the task.
- If the task is wrong, blocked, or bigger than its size, stop and say so. Do not swap in a different plan without asking.

## Before you say done

1. Run every "Done when" line and read the output.
2. Run `make check`.
3. Update the docs the change touches:

| You changed | Update |
|---|---|
| Parts, namespaces, or the bridge API | `ARCHITECTURE.md` |
| Gameplay, controls, look, HUD | `DESIGN.md` |
| An asset or a font | `CREDITS.md` |
| A choice between real options | `docs/DECISIONS.md` |

4. Tick the task on its board. Move the "Now" line to the next task.
5. Open a pull request. Copy the "Done when" list into it, with the result of each line.

## Teach while you build

The owner is learning Kubernetes and platform engineering through this repo.

- When a task introduces a concept, explain it in the pull request in three sentences or fewer.
- Give one command the owner can run to see the concept on the cluster.
- Leave the "Explain it back" question unanswered. It is for the owner.
- Choose the standard, readable way over the clever way. Someone will read this code to learn.

## Report honestly

- A check failed? Say so and paste the output.
- You skipped a step? Say which one and why.
- Never report a command as passing unless you ran it in this session.
