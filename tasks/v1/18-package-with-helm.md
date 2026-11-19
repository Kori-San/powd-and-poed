# v1-18 Package with Helm

Size: M
Needs: v0-12

## Goal

One Helm chart installs the arena and the bridge, and replaces the plain YAML from v0.

## Why

You wrote every manifest by hand in v0. Helm adds values, versions, and rollbacks on top of the same YAML.

## Steps

- [ ] Add Helm to `mise.toml`. Read the Helm 4 notes in `.claude/rules/dependencies.md`.
- [ ] Create `deploy/chart/`. Move the v0 manifests into templates. Keep names and labels unchanged.
- [ ] Add values for replicas, images and digests, the rate limit, and resources. Comment each one. Add `values.schema.json`.
- [ ] Add helm-unittest tests for the RBAC rules, the security context, and the replica count.
- [ ] Add `make deploy` using `helm upgrade --install --rollback-on-failure`. Remove `arena-up` and `bridge-up`.
- [ ] CI: `helm lint`, then render the chart and run kubeconform and kube-linter on the output.
- [ ] Delete `deploy/arena/` and `deploy/bridge/`.

## Done when

- [ ] `make demo` works on a clean cluster using only the chart.
- [ ] The rendered chart passes `kubeconform -strict` and `kube-linter` with no findings.
- [ ] A wrong value type, such as replicas given as text, fails `helm lint`.
- [ ] `helm unittest deploy/chart` passes.

## Learn

- Helm renders templates and values into the same YAML you wrote by hand, then tracks the result as a release you can roll back.
- Try it: `helm template deploy/chart | less`, then `helm history <release> -n powd`.
- Explain it back: what does Helm know about your app that `kubectl apply -f` does not?

## Not now

- GitOps. That is v2-14.
