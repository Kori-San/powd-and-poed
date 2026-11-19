---
paths:
  - "web/**"
  - "bridge/**"
  - "scripts/**"
---

# Code

These rules apply to all code. Language rules are in `web.md` and `bridge.md`.

## Keep it small

- Write the simplest code that passes the task's checks.
- No options, layers, or helpers for needs that do not exist yet.
- A helper with one caller gets inlined.
- A change does one thing. A bug fix does not carry a refactor.

## Keep it honest

- Fix the cause. Do not patch the caller or the test to hide it.
- Never weaken or delete a test to make it pass.
- No stub that logs and returns success. No invented config keys. No placeholder data.
- Handle an error where you can act on it. Otherwise return it. Never catch it and continue as if it worked.
- No guard for a case that cannot happen.

## Keep it readable

- Comments say why. They never repeat the code and never narrate steps.
- No commented-out code. A `TODO` names a task id.
- Names say what the thing is. Avoid `data`, `info`, `temp`, `helper`, `manager`, `utils`.
- No emoji in code, comments, or logs.

## Every state exists

Any screen or overlay handles all of these: loading, empty, error, disconnected, paused.
