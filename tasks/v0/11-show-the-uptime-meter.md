# v0-11 Show the uptime meter

Size: M
Needs: v0-09, v0-10

## Goal

The screen shows the share of successful requests to the `fleet` Service, live, while you shoot.

## Why

This number is the punchline of the game. You destroy pods and the service stays up.

## Steps

- [ ] In the bridge, send a GET to the `fleet` Service every 100 ms with a 1 second timeout.
- [ ] Turn off HTTP keep-alive for this probe, so each request can land on a different pod.
- [ ] Count total and failed requests, overall and for the last 60 seconds. Send an `uptime` stream event every second.
- [ ] Show `UPTIME 100.00%` and `FAILED 0` on screen. Always show the real number, even when it is bad.
- [ ] Unit test the window math.

## Done when

- [ ] With nobody shooting, the meter reads 100.00% for one minute.
- [ ] Shoot pods one at a time for one minute. Write the number you get in the pull request. Below 100% is fine here. v1 fixes it.
- [ ] `kubectl scale deploy fleet -n arena --replicas=0` drives the meter down. Scaling back to 12 brings it back.

## Learn

- A Service sends each new connection to one ready pod. A pod that is not ready gets no traffic.
- Keep-alive hides failures: one open connection keeps hitting the same pod.
- Try it: `kubectl get endpointslices -n arena -w` while a pod dies. Watch its address leave the list.
- Explain it back: a pod is deleted while it is answering a request. What must be true for that request to succeed?

## Not now

- Prometheus, SLOs, error budgets. That is v2.
- Fixing dropped requests with shutdown hooks. That is v1.
