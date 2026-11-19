# v0-10 Run the bridge inside the cluster

Size: M
Needs: v0-07

## Goal

The bridge runs as a pod with its own identity. It can delete pods in `arena` and nothing else.

## Why

Running with your admin kubeconfig proves nothing. Least privilege is the part a platform engineer gets hired for.

## Steps

- [ ] Write `bridge/Dockerfile`: multi-stage build, static binary, distroless non-root base, base images pinned by digest.
- [ ] Write `deploy/bridge/`: the namespace `powd`, a ServiceAccount, a Deployment, and a Service.
- [ ] Add a Role in `arena` that allows `get`, `list`, `watch`, `delete` on pods. Bind it to the ServiceAccount.
- [ ] Add a ClusterRole that allows `get`, `list`, `watch` on nodes. Bind it to the ServiceAccount.
- [ ] Set the security context: non-root, read-only root filesystem, no privilege escalation, all capabilities dropped, `RuntimeDefault` seccomp.
- [ ] Add `make bridge-up`: build the image, `kind load docker-image`, apply, wait for the rollout.
- [ ] Change `make web-dev` to reach the bridge through `kubectl port-forward`.

## Done when

- [ ] `kubectl auth can-i delete pods -n arena --as=system:serviceaccount:powd:bridge` prints `yes`.
- [ ] The same command with `-n kube-system` prints `no`.
- [ ] `kubectl auth can-i delete deployments -n arena --as=system:serviceaccount:powd:bridge` prints `no`.
- [ ] The game works end to end with the bridge running in the cluster.

## Learn

- ServiceAccount: the identity a pod uses when it calls the API server.
- Role: a list of allowed verbs on resources in one namespace. A ClusterRole does the same for the whole cluster.
- Binding: the link between an identity and a Role.
- Try it: `kubectl auth can-i --list -n arena --as=system:serviceaccount:powd:bridge`
- Explain it back: why does reading nodes need a ClusterRole when deleting pods only needs a Role?

## Not now

- Helm. That is v1.
- Network policies and Pod Security labels. That is v1.
