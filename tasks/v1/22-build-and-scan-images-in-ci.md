# v1-22 Build and scan images in CI

Size: M
Needs: v1-19

## Goal

CI builds both images, scans them, attaches an SBOM and a provenance attestation, and pushes them to GHCR from `main`.

## Why

Anyone can then check where an image came from. That is the base of supply-chain security.

## Steps

1. [ ] Check that hadolint covers both Dockerfiles.
2. [ ] Build with `docker/build-push-action`. Push to GHCR only from `main` and from tags.
3. [ ] Generate an SBOM and scan each image. Pick the scanner at task time: Grype, Trivy, or Docker Scout. Fail on fixable high or critical findings.
4. [ ] Attest the build provenance with `actions/attest`.
5. [ ] Check that `dependabot.yml` covers every ecosystem in the repo.
6. [ ] Check that CodeQL default setup lists Go, JavaScript and TypeScript, and Actions.
7. [ ] The chart references released images by digest. `make demo` still builds locally.

## Done when

- [ ] `gh attestation verify oci://ghcr.io/<owner>/<image>:<tag> -R <owner>/<repo>` succeeds for both images.
- [ ] A Dockerfile with `FROM alpine:latest` fails CI.
- [ ] The SBOM of each image can be downloaded from the workflow run.

## Learn

- Provenance is a signed statement of where, how, and from which commit an image was built.
- An SBOM lists what is inside the image.
- Try it: run the verify command and read its output.
- Explain it back: an attacker pushes an image with the right name and tag. What would stop the cluster from running it?

## Not now

- Signing with cosign and enforcing it in the cluster. That is v2-16 and v2-17.
