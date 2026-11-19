# v2-23 Expose it with TLS

Size: M
Needs: v2-22

## Goal

The demo cluster serves the game on a real domain over HTTPS, and certificates renew by themselves.

## Why

A public service without HTTPS is not finished. Automated certificates are a standard platform task.

## Steps

1. [ ] Point a domain or subdomain at the gateway. Manage the record in OpenTofu.
2. [ ] Install cert-manager. Add a Let's Encrypt issuer: staging first, then production.
3. [ ] Attach the certificate to the Gateway listener. Redirect HTTP to HTTPS. Add HSTS once HTTPS has worked for a full demo.
4. [ ] Check that the WebSocket works over TLS through the gateway.
5. [ ] Let's Encrypt limits how many identical certificates it issues per week. Save the certificate Secret outside the cluster before teardown, and restore it on the next `make cloud-up`.
6. [ ] Alert when a certificate has fewer than 14 days left.
7. [ ] Add codex entries: certificate, issuer.

## Done when

- [ ] `curl -I https://<domain>` returns 200 with a valid certificate.
- [ ] `curl -I http://<domain>` redirects to HTTPS.
- [ ] `kubectl get certificate -A` shows `Ready`.
- [ ] A fresh `make cloud-up` serves HTTPS with no manual step, with a restored certificate or a new one.

## Learn

- cert-manager is one more controller. You declare a Certificate, and it proves you own the domain and renews before expiry.
- Explain it back: why test with the Let's Encrypt staging issuer first?

## Not now

- A CDN or a web application firewall.
