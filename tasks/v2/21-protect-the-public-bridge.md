# v2-21 Protect the public bridge

Size: M
Needs: v2-12, v2-19

## Goal

A bridge on the public internet cannot be used to hammer the cluster or its API server.

## Why

Anyone with the URL can send kills. The limits must hold when someone tries to break them.

## Steps

1. [ ] Write `docs/THREAT-MODEL.md` on one page: what to protect, the ways in, who might abuse them, the defenses.
2. [ ] Add limits per connection and per IP, and a global kill budget per minute. Keep the values in config.
3. [ ] Issue anonymous session tokens signed by the bridge, so limits survive a reconnect.
4. [ ] Cap concurrent players. Over the cap, new visitors watch the stream without kill rights.
5. [ ] On the web server in the cluster, send a Content-Security-Policy without inline script, `X-Content-Type-Options`, and `Referrer-Policy`.
6. [ ] Add a kill switch: one config change puts the bridge in read-only mode.
7. [ ] Alert on limit hits and on API server errors.

## Done when

- [ ] A k6 abuse script sends 1000 kills per second from one client. The API server receives no more than the budget.
- [ ] Uptime stays above the SLO during that script.
- [ ] Read-only mode stops kills in under one minute without a redeploy.
- [ ] Every defense in the threat model links to code or config.

## Learn

- Rate limiting protects what is behind you. Here that is the API server, which every other controller also depends on.
- Explain it back: why is a per-IP limit not enough without a global budget?

## Not now

- User accounts and logins.
