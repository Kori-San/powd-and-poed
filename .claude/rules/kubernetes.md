---
paths:
  - "deploy/**"
---

# Kubernetes manifests

`security.md` covers RBAC and cluster access. This file covers how manifests are written.

## Every workload

- Labels: `app.kubernetes.io/name`, `app.kubernetes.io/component`, and `app.kubernetes.io/part-of: powd-and-poed`.
- A released image is pinned by tag and digest: `name:1.2.3@sha256:...`. Never `latest`.
- An image built locally for `kind-powd` uses the git commit as its tag and `imagePullPolicy: IfNotPresent`.
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

`readOnlyRootFilesystem` is not part of the standard. We set it anyway. Mount an `emptyDir` on any path the app must write to.

If the image names its user instead of numbering it, also set `runAsUser` to the numeric id. Without it the container does not start.

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

Custom resources such as `HTTPRoute` need their own schemas. Pass them to kubeconform with `-schema-location`.

## Teach

From task v1-14 on, a resource kind that is new to this repo needs a codex entry in the same pull request. See `codex.md`.
