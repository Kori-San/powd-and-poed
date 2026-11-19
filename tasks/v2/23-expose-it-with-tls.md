# v2-23 Expose it with TLS

Size: M
Needs: v2-22

## Goal

The demo cluster serves the game on a real domain over HTTPS, and certificates renew by themselves.

## Why

A public service without HTTPS is not finished. Automated certificates are a standard platform task.

## Steps

- [ ] Point a domain or subdomain at the gateway. Manage the record in OpenTofu.
- [ ] Install cert-manager. Add a Let's Encrypt issuer: staging first, then production.
- [ ] Attach the certificate to the Gateway listener. Redirect HTTP to HTTPS.
- [ ] Check that the WebSocket works over TLS through the gateway.
- [ ] Add HSTS once HTTPS has worked for a full demo.
- [ ] Alert when a certificate has fewer than 14 days left.
- [ ] Add codex entries: certificate, issuer.

## Done when

- [ ] `curl -I https://<domain>` returns 200 with a valid certificate.
- [ ] `curl -I http://<domain>` redirects to HTTPS.
- [ ] `kubectl get certificate -A` shows `Ready`.
- [ ] A fresh `make cloud-up` gets its certificate with no manual step.

## Learn

- cert-manager is one more controller. You declare a Certificate, and it proves you own the domain and renews before expiry.
- Explain it back: why test with the Let's Encrypt staging issuer first?

## Not now

- A CDN or a web application firewall.
