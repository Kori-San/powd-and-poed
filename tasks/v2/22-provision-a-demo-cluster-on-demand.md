# v2-22 Provision a demo cluster on demand

Size: L
Needs: v2-14

## Goal

`make cloud-up` creates a real multi-node cluster and deploys the game. `make cloud-down` removes all of it, and the bill stops.

## Why

A cluster that runs all month costs money all month. One that exists for a two-hour demo costs a small fraction of that.

## Steps

- [ ] Compare providers on today's hourly price for three small nodes. Put the table in `docs/DECISIONS.md` with the date. Pick one.
- [ ] Write the infrastructure with OpenTofu: nodes, network, firewall. Use remote state with locking.
- [ ] Install Kubernetes: a managed service, or k3s on plain machines. Then bootstrap the GitOps controller, which installs the rest.
- [ ] Credentials are short-lived where the provider allows it. None are in the repo.
- [ ] Cost guard: a budget alert at the provider, and an automatic teardown after a set number of hours.
- [ ] Add `make cloud-up`, `make cloud-down`, and `make cloud-cost`.
- [ ] Measure the cost of one two-hour demo and write it in the README.

## Done when

- [ ] `make cloud-up` goes from nothing to a playable URL in under 15 minutes with no manual step.
- [ ] After `make cloud-down`, the provider console and `tofu state list` show nothing billable.
- [ ] Running `make cloud-up` a second time changes nothing.

## Learn

- Infrastructure as code makes a cluster disposable, in the way a Deployment makes a pod disposable.
- Explain it back: what is state in OpenTofu, and what goes wrong when two people apply at once without a lock?

## Not now

- A domain and HTTPS. That is v2-23.
