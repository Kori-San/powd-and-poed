---
description: Start or continue the current task from the tasks folder. Use when the user says "next task", "what now", or "continue".
---

# Next task

1. Read `tasks/README.md` and find the "Now" line.
2. If "Now" is empty, take the first unticked task on the current version board and write it on the "Now" line.
3. Open the task file. Check its "Needs" line. If a needed task is not ticked on its board, stop and say which one.
4. Tell the user three things, one line each: the goal, the size, and the first unticked step.
5. If you are on `main`, create the task branch. The naming rule is in `.claude/rules/git.md`.
6. Do the steps in order. Follow `.claude/rules/workflow.md` from "While you work" onward.
