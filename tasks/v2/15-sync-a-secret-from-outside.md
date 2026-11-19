# v2-15 Sync a secret from outside

Size: M
Needs: v2-14

## Goal

A Secret in `arena` is synced from a store outside the cluster by External Secrets Operator, and the game shows it arrive.

## Why

Secrets do not belong in git. An ExternalSecret keeps the real value in a secret store and copies it in.

## Steps

- [ ] Pick a secret store that runs locally at no cost. Check the current options and record the choice.
- [ ] Install External Secrets Operator. Add a `SecretStore` and an `ExternalSecret` (`external-secrets.io/v1`) in `arena` that produce a Secret named `cargo`.
- [ ] Mount `cargo` into the fleet pods as a file.
- [ ] Bridge: stream the sync status of the ExternalSecret, never the value. Add a kill route for the Secret.
- [ ] RBAC in `arena`: read ExternalSecrets, and `delete` on Secrets limited by `resourceNames` to `cargo`. No `get` on Secrets.
- [ ] Game: a courier carries a sealed crate. Shooting the crate deletes the Secret. A new courier arrives when the operator has recreated it.
- [ ] Update the safety model in `ARCHITECTURE.md` and `.claude/rules/security.md`. Add a decision entry and codex entries: secret, externalsecret, secretstore.

## Done when

- [ ] `git grep` for the secret value finds nothing.
- [ ] Shoot the crate: `kubectl get secret cargo -n arena -w` shows it deleted and created again.
- [ ] `kubectl auth can-i get secret/cargo -n arena --as=system:serviceaccount:powd:bridge` prints `no`. With `delete` it prints `yes`.
- [ ] Changing the value in the store updates the Secret within the refresh interval.

## Learn

- A Kubernetes Secret is only base64-encoded. The protection comes from who can read it and where the real value lives.
- Explain it back: why is committing a Secret manifest a problem even in a private repo?

## Not now

- Cloud secret managers. The local store teaches the same flow.
