# v2-17 Enforce policy at admission

Size: M
Needs: v2-16

## Goal

The cluster refuses workloads that break the rules: unsigned images, `latest` tags, missing resource requests.

## Why

Rules in a document depend on people reading them. Rules at admission apply to every request.

## Steps

- [ ] Choose the engine. Candidates: the built-in ValidatingAdmissionPolicy for field rules, Kyverno for signature checks. Check what each can do today. Record the choice.
- [ ] Policy: images in `powd` and `arena` must be signed by this repo's release workflow.
- [ ] Policy: no `latest` tag, a digest is required, resource requests are required.
- [ ] Local builds are unsigned. Add a dev values file that relaxes only the signature policy, and use it only on `kind-powd`.
- [ ] Start in audit mode. Fix the findings. Then switch to enforce.
- [ ] Test the policies in CI against good and bad manifests.
- [ ] Add codex entries: admission-control, policy.

## Done when

- [ ] `kubectl run bad --image=nginx:latest -n arena` is denied, and the message names the policy.
- [ ] The released chart installs cleanly with every policy enforcing.
- [ ] The policy tests run in CI.

## Learn

- RBAC decides who may send a request. Admission decides whether the request itself is acceptable.
- Explain it back: RBAC already limits who can create pods. Why add admission policies?

## Not now

- Runtime security tools. They are a different layer.
