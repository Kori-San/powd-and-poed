# v1-20 Harden the workloads

Size: M
Needs: v1-19

## Goal

Both namespaces enforce the restricted Pod Security Standard, traffic is denied by default, and a kill no longer drops requests.

## Why

In v0-11 the uptime meter may have dipped when pods died. This task makes clean shutdown explicit and locks the namespaces down.

## Steps

1. [ ] Label `arena` and `powd` with `pod-security.kubernetes.io/enforce: restricted`. Fix what breaks.
2. [ ] Add NetworkPolicies: deny all traffic by default in both namespaces. Then allow only the paths the game needs, plus DNS.
3. [ ] Check that the kind network plugin enforces NetworkPolicy. If it does not, switch to one that does and record why.
4. [ ] Fleet shutdown: add a `preStop` sleep and a matching `terminationGracePeriodSeconds`, so a pod leaves the Service before it stops.
5. [ ] Do the same for the bridge and the web.
6. [ ] Repeat the v0-11 measurement: one minute of kills, one at a time.
7. [ ] Add codex entries: networkpolicy, serviceaccount, role, pod-security.

## Done when

- [ ] A pod without the required security context is rejected in `arena`: `kubectl run t --image=busybox -n arena --dry-run=server` fails.
- [ ] A script in `scripts/` starts a temporary pod in `arena` and shows it cannot connect to the bridge Service.
- [ ] `UPTIME` stays at 100.00% during one minute of single kills. The pull request shows it next to the number from v0-11.

## Learn

- Deleting a pod starts two things at once: the container gets SIGTERM, and the pod is removed from the Service endpoints. A short `preStop` sleep lets the second finish first.
- Try it: remove the `preStop` hook, run the kill test again, and compare the `FAILED` counter.
- Explain it back: why can a request still reach a pod after the pod was told to terminate?

## Not now

- Disruption budgets and spread rules. That is v2-06 and v2-07.
