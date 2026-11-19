# v0-10 Run the bridge inside the cluster

Size: M
Needs: v0-09

## Goal

The bridge runs as a pod with its own identity. It can delete pods in `arena` and nothing else.

## Why

Running with your admin kubeconfig proves nothing about safety. Least privilege is a core skill of platform work, and this task is where the repo shows it.

## Steps

1. [ ] Write `bridge/Dockerfile`: multi-stage build, static binary, distroless non-root base, base images pinned by digest.
2. [ ] Write `deploy/bridge/`: the namespace `powd`, a ServiceAccount, a Service, and a Deployment. Its liveness probe uses `/healthz` and its readiness probe uses `/readyz`.
3. [ ] Add a Role in `arena` that allows `get`, `list`, `watch`, `delete` on pods. Bind it to the ServiceAccount.
4. [ ] Add a ClusterRole that allows `get`, `list`, `watch` on nodes. Bind it to the ServiceAccount.
5. [ ] Set the security context from `.claude/rules/kubernetes.md`.
6. [ ] Add `make bridge-up`: build the image with the git commit as its tag, `kind load docker-image`, apply, wait for the rollout.
7. [ ] Change `make web-dev` to reach the bridge through `kubectl port-forward`. Add hadolint to CI and `docker` to `dependabot.yml`.

## Done when

- [ ] `kubectl auth can-i delete pods -n arena --as=system:serviceaccount:powd:bridge` prints `yes`.
- [ ] The same command with `-n kube-system` prints `no`.
- [ ] `kubectl auth can-i delete deployments -n arena --as=system:serviceaccount:powd:bridge` prints `no`.
- [ ] With the bridge running in the cluster, shooting a cube terminates its pod, as in v0-09.

## Learn

- ServiceAccount: the identity a pod uses when it calls the API server.
- Role: a list of allowed verbs on resources in one namespace. A ClusterRole does the same for the whole cluster.
- Binding: the link between an identity and a Role.
- Try it: `kubectl auth can-i --list -n arena --as=system:serviceaccount:powd:bridge`
- Explain it back: why does reading nodes need a ClusterRole when deleting pods only needs a Role?

## Not now

- Helm. That is v1.
- Network policies and Pod Security labels. That is v1.
