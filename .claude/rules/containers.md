---
paths:
  - "**/Dockerfile"
  - "**/Dockerfile.*"
  - "**/.dockerignore"
---

# Container images

- Use a multi-stage build. The last stage holds the binary or the static files and nothing else.
- Pin every base image by digest: `FROM name:tag@sha256:...`.
- Bridge: a static Go binary (`CGO_ENABLED=0`, `-trimpath`) on a distroless static base.
- Web: the built files on an unprivileged static server image, listening on a port above 1024.
- Set a numeric non-root user, for example `USER 65532`. Kubernetes cannot verify a user given by name.
- The final image has no shell, no package manager, and no secrets.
- Copy lockfiles and install dependencies before copying the source, so the layer cache works.
- Every Dockerfile has a `.dockerignore` next to it.
- Set the labels `org.opencontainers.image.source`, `org.opencontainers.image.revision`, and `org.opencontainers.image.licenses`.
- Lint with `hadolint`.
- CI builds the image, scans it, writes an SBOM, and attests its provenance. See `ci.md`.
