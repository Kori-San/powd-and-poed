# v1-21 Test the loop in CI

Size: M
Needs: v1-20

## Goal

Every pull request creates a kind cluster in CI, installs the chart, kills pods through the bridge, and checks that the cluster recovers.

## Why

The core promise of the game becomes a test. If a change breaks the loop or the safety model, CI says so.

## Steps

1. [ ] Write the end-to-end test: wait for the fleet, open the stream, kill 10 pods at one per second through `/api/kill`.
2. [ ] Assert that each kill returns 202, each pod is replaced and ready within 30 seconds, and uptime stays at or above 99.9%.
3. [ ] Assert the safety model: an unknown UID returns 404, and the bridge ServiceAccount cannot delete a pod in `powd`.
4. [ ] Run the contract test suite from v1-16 against the live bridge.
5. [ ] Add the CI job with kind, using `helm/kind-action` pinned by SHA. Upload cluster logs when it fails.
6. [ ] Add `make e2e` to run the same test locally.

## Done when

- [ ] The job passes on a pull request in under 10 minutes.
- [ ] Removing the `delete` verb from the Role on a test branch makes the job fail.
- [ ] `make e2e` passes on your machine.

## Learn

- An end-to-end test on a throwaway cluster covers RBAC and networking, which unit tests cannot see.
- Explain it back: name one bug this test would catch that the bridge unit tests with the fake clientset would miss.

## Not now

- Load tests. That is v2-19 and v2-21.
