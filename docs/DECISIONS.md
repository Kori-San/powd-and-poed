# Decisions

One row per choice between real options. Add new rows at the bottom.
To change a decision, add a new row that names the one it replaces. Do not edit old rows.

Rows D-01 to D-18 date from 2026-11-19, before any code was written. Later rows name the task that added them.

| ID | Decision | Why | Cost |
|---|---|---|---|
| D-01 | The bridge is written in Go with client-go. | client-go is the reference Kubernetes client. Its informers handle caching and reconnects. A static binary gives a small non-root image. | The repo has two languages. |
| D-02 | The stream is Server-Sent Events plus one POST route. WebSocket replaces both in v2-19. | SSE is plain HTTP, reconnects by itself, and can be tested with curl. Online co-op needs messages in both directions. | One protocol change in v2. |
| D-03 | A shot deletes the pod. An eviction weapon arrives in v2-07. | Delete is the simplest call and always works. Eviction respects disruption budgets, which is a lesson of its own. | Until v2-07, shots ignore disruption budgets. |
| D-04 | Deployment tooling grows in steps: plain YAML in v0, Helm in v1, GitOps in v2. | Each layer is easier to learn once the one below it is familiar. | The manifests are reworked twice. |
| D-05 | The local cluster is kind. | It runs several nodes in Docker, and its docs name CI as a use case. | It needs Docker. |
| D-06 | The targets are podinfo pods. | podinfo is small, maintained, and has health endpoints. Writing a target app would teach nothing new. | A dependency on an outside image. |
| D-07 | Namespaces: `arena` for the targets, `powd` for the game. | A Role in one namespace is the boundary for delete permission. | None. |
| D-08 | Rendering uses `WebGLRenderer`. | The three.js manual still calls `WebGPURenderer` experimental. | Possible migration work after v2-05. |
| D-09 | The game is a vertical shooter on a flat plane, drawn in 3D. | It is easy to aim on a phone, hit tests are cheap, and it works in portrait. | Less depth than free flight. |
| D-10 | Two players share one screen in v1. Online co-op is v2-20. | Local co-op needs no network code. | Touch stays single player. |
| D-11 | The free public demo runs a simulated cluster in the browser. | A live cluster needs paid hosting. A static site is free. Both modes use the same contract. | The public demo is not live, and the HUD says so. |
| D-12 | The live demo cluster is created on demand and destroyed after (v2-22). | A cluster that only exists during a demo costs a small fraction of an always-on one. | The live demo is not always on. |
| D-13 | Tool versions are pinned with mise. Commands run through Make. | One file pins every CLI. Make is already on most machines. | Two tools to know. |
| D-14 | The web package manager is npm. | It ships with Node, and Dependabot supports it. | None at this size. |
| D-15 | TypeScript is linted and formatted with Biome. | typescript-eslint does not support TypeScript 7 yet. Biome does both jobs in one tool. | Fewer lint rules than ESLint has. |
| D-16 | Git hooks run through lefthook, and a local script checks commit messages. | lefthook is one binary with no runtime. The commitlint gitmoji packages are unmaintained. | The repo owns the check script. |
| D-17 | Assets are CC0 first, and none are generated. | A public portfolio needs clean rights and one consistent look. | Fewer assets to choose from. |
| D-18 | The code is under the MIT License. | Chosen by the owner when the repo was created. | None. |
| D-19 | `mise.lock` covers Linux and macOS on x64 and arm64. Added in v0-01. | The Makefile needs a POSIX shell. Node builds for Alpine (musl) come from a separate, unofficial host. | Native Windows and Alpine are not supported. On Windows, use WSL. |
