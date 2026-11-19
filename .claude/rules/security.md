# Security

This project deletes things in real clusters. Follow these rules without exception.

## The kill path

- The browser never talks to the Kubernetes API. Only the bridge does.
- The bridge deletes pods in the `arena` namespace only. No flag or variable may widen that.
- The bridge acts on a UID it already holds in its cache. It never deletes by a name sent by a client.
- Every kill request passes the rate limit before anything else happens.
- The bridge uses its mounted, short-lived ServiceAccount token. Never create a long-lived token Secret. Never send a token to the browser.

## RBAC

- No wildcard (`*`) in verbs, resources, or API groups.
- No `cluster-admin`. No ClusterRole where a Role works.
- A new permission needs an entry in `docs/DECISIONS.md` in the same pull request.

## Your own cluster access

The Makefile and every script name their cluster on each call. They never rely on the current context.

| Tool | Flag |
|---|---|
| kubectl | `--context kind-powd` |
| helm | `--kube-context kind-powd` |
| kind | `--name powd` |

- When you run a command from a task yourself, add the flag.
- Commands printed in tasks are short on purpose. They assume the owner's current context is `kind-powd`.
- Never run a delete, drain, or uninstall against a cluster this repo did not create. Ask first.

## Secrets

- No secrets, tokens, or kubeconfig files in the repo. No `.env` files.
- A leaked secret is rotated first and cleaned from history second.

## Web

- Pod and node names are untrusted text. Write them with `textContent`, never `innerHTML`.
- The game and the bridge share one origin. No CORS wildcard.

## Supply chain

- Pin everything. See `dependencies.md`.
- Workflow rules are in `ci.md`. Image rules are in `containers.md`.

## When unsure

Stop and ask. A wrong delete costs more than a late feature.
