# v2-16 Sign and attest images

Size: M
Needs: v1-22

## Goal

Every released image is signed, and anyone can verify it with the commands in `SECURITY.md`.

## Why

v1-22 recorded where images came from. A signature lets the cluster refuse anything else.

## Steps

1. [ ] Sign images in CI with cosign in keyless mode. No private key exists anywhere.
2. [ ] Attach the SBOM as an attestation. Keep the provenance attestation from v1-22.
3. [ ] Move the image build into a reusable workflow. Read the current GitHub docs on what SLSA build level that gives.
4. [ ] Turn on immutable releases in the repo settings.
5. [ ] Document verification in `SECURITY.md`: the exact `cosign verify` and `gh attestation verify` commands.
6. [ ] Add codex entries: image-signature, sbom.

## Done when

- [ ] `cosign verify` succeeds for both images with the documented command.
- [ ] The same command fails for an image built on your laptop.
- [ ] The commands in `SECURITY.md` work when pasted unchanged.

## Learn

- Keyless signing ties the signature to the identity of the workflow that built the image, and records it in a public log.
- Explain it back: what does a signature prove about an image, and what does it not prove?

## Not now

- Enforcing signatures in the cluster. That is v2-17.
