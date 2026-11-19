# v1-20 Harden the workloads

Size: M
Needs: v1-19

## Goal

Both namespaces enforce the restricted Pod Security Standard, traffic is denied by default, and a kill no longer drops requests.

## Why

In v0-11 the uptime meter dipped when pods died. This task closes that gap and locks the namespaces down.

## Steps

- [ ] Label `arena` and `powd` with `pod-security.kubernetes.io/enforce: restricted`. Fix what breaks.
- [ ] Add NetworkPolicies: deny all traffic by default in both namespaces. Then allow only the paths the game needs, plus DNS.
- [ ] Check that the kind network plugin enforces NetworkPolicy. If it does not, switch to one that does and record why.
- [ ] Fleet shutdown: add a `preStop` sleep and a matching `terminationGracePeriodSeconds`, so a pod leaves the Service before it stops.
- [ ] Do the same for the bridge and the web. Point the bridge readiness probe at `/readyz`.
- [ ] Repeat the v0-11 measurement: one minute of kills, one at a time.
- [ ] Add codex entries: networkpolicy, serviceaccount, pod-security.

## Done when

- [ ] A pod without the required security context is rejected in `arena`: `kubectl run t --image=busybox -n arena --dry-run=server` fails.
- [ ] A script in `scripts/` starts a temporary pod in `arena` and shows it cannot connect to the bridge Service.
- [ ] The uptime meter reads 100.00% after one minute of single kills. The pull request has the number from before and after.

## Learn

- Deleting a pod starts two things at once: the container gets SIGTERM, and the pod is removed from the Service endpoints. A short `preStop` sleep lets the second finish first.
- Try it: remove the `preStop` hook, run the kill test, and watch the failed counter.
- Explain it back: why can a request still reach a pod after the pod was told to terminate?

## Not now

- Disruption budgets and spread rules. That is v2-06 and v2-07.
