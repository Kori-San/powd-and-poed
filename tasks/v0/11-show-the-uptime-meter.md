# v0-11 Show the uptime meter

Size: M
Needs: v0-10

## Goal

The screen shows the share of successful requests to the `fleet` Service, live, while you shoot.

## Why

This number is the punchline of the game. You destroy pods and the service stays up.

## Steps

1. [ ] In the bridge, send a GET to the `fleet` Service every 100 ms with a 1 second timeout.
2. [ ] Turn off HTTP keep-alive for this probe, so each request can land on a different pod.
3. [ ] Count total and failed requests, overall and for the last 60 seconds. Send an `uptime` stream event every second.
4. [ ] Show `UPTIME` from the 60 second window and `FAILED` as the total since start. Always show the measured number, even when it is bad.
5. [ ] Unit test the window math.

## Done when

- [ ] With nobody shooting, the meter reads 100.00% for one minute.
- [ ] Shoot pods one at a time for one minute. Write the lowest `UPTIME` you saw in the pull request. Below 100% is fine here. Task v1-20 comes back to it.
- [ ] `kubectl scale deploy fleet -n arena --replicas=0` drives the meter down. Scaling back to 12 brings it back.

## Learn

- A Service sends each new connection to one ready pod. A pod that is not ready gets no traffic.
- Keep-alive hides failures: one open connection keeps hitting the same pod.
- Try it: delete a pod, then run `kubectl get endpointslices -n arena -o yaml` and find its entry. Its `ready` condition is `false` while it terminates.
- Explain it back: a pod is deleted while it is answering a request. What must be true for that request to succeed?

## Not now

- Prometheus, SLOs, error budgets. That is v2.
- Fixing dropped requests with shutdown hooks. That is v1.
