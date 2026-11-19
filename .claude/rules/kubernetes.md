---
paths:
  - "deploy/**"
---

# Kubernetes manifests

`security.md` covers RBAC and cluster access. This file covers how manifests are written.

## Every workload

- Labels: `app.kubernetes.io/name`, `app.kubernetes.io/component`, and `app.kubernetes.io/part-of: powd-and-poed`.
- The image is pinned by tag and digest: `name:1.2.3@sha256:...`. Never `latest`.
- Every container has CPU and memory requests, and a memory limit.
- Every container has a readiness probe and a liveness probe.
- `automountServiceAccountToken: false`, unless the pod calls the Kubernetes API. Only the bridge does.
- A pod that calls the API has its own ServiceAccount. Never the `default` one.

## Security context

Every container sets this. It passes the `restricted` Pod Security Standard.

```yaml
securityContext:
  runAsNonRoot: true
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]
  seccompProfile:
    type: RuntimeDefault
  readOnlyRootFilesystem: true
```

`readOnlyRootFilesystem` is not part of the standard. We set it anyway.

## Namespaces

- `arena` holds the targets. `powd` holds the game. Nothing goes in `default`.
- From task v1-20, both carry the label `pod-security.kubernetes.io/enforce: restricted`.

## API versions

| Need | Use |
|---|---|
| HTTP routing into the cluster | Gateway API: `Gateway`, `HTTPRoute`. Never `Ingress`. |
| Disruption budgets and evictions | `policy/v1` |
| Autoscaling | `autoscaling/v2` |
| External secrets | `external-secrets.io/v1` |

Check any API version against the docs for the cluster's Kubernetes version before you write it.

## Files

- One resource per file, named after its kind: `deployment.yaml`, `service.yaml`.
- Plain YAML in v0. One Helm chart in `deploy/chart/` from v1.
- Helm: every value in `values.yaml` has a comment, and `values.schema.json` validates the values.
- Helm: the chart `version` is SemVer. `appVersion` is a quoted string.

## Check

```sh
kubeconform -strict -summary <files>
kube-linter lint <files>
kubectl apply --dry-run=server -f <files> --context kind-powd
```

## Teach

A resource kind that is new to this repo needs a codex entry in the same pull request. See `codex.md`.
