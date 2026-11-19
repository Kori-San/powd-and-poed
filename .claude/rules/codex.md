---
paths:
  - "content/**"
---

# Codex entries

A codex entry explains one Kubernetes or platform concept to someone who has never seen it. The scanner shows it in the game.

## File

`content/codex/<id>.md`, starting with this front matter:

```yaml
---
id: pod
title: Pod
since: v0
in_game: Fighter
docs: https://kubernetes.io/docs/concepts/workloads/pods/
command: kubectl get pods -n arena
---
```

## Body

- 60 words or fewer.
- Sentence one says what the thing is, in plain words, with "is".
- Sentence two says what it does in this game's cluster.
- Sentence three says what happens when it breaks or goes missing.
- Define any term you need, or link another entry by its id.

## Accuracy

- Check every claim against the page in `docs`. Do not write from memory.
- The page is on kubernetes.io or on the official site of the project.
- The `command` runs against `kind-powd` and shows the thing.
- If the game simplifies how it works, add one line that starts with "Simplified:".

## When to add one

- A resource kind that is new in `deploy/` gets an entry in the same pull request.
- An entry needs a real resource in the cluster. No entries for things this repo does not run.
