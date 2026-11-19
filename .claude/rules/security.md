# Security

This project deletes things in real clusters. Follow these rules without exception.

## The kill path

- The browser never talks to the Kubernetes API. Only the bridge does.
- The bridge deletes pods in the `arena` namespace only. No flag or variable may widen that.
- The bridge acts on a UID it already holds in its cache. It never deletes by a name sent by a client.
- Every kill passes the rate limit first.
- The bridge uses its mounted, short-lived ServiceAccount token. Never create a long-lived token Secret. Never send a token to the browser.

## RBAC

- No wildcard (`*`) in verbs, resources, or API groups.
- No `cluster-admin`. No ClusterRole where a Role works.
- A new permission needs an entry in `docs/DECISIONS.md` in the same pull request.

## Your own cluster access

- Every `kubectl`, `helm`, and `kind` call in the Makefile and in scripts names its target: `--context kind-powd`.
- Never rely on the current kubectl context.
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
