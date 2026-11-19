# Powd & Poed

A space shooter where every enemy is a real Kubernetes pod.
You shoot it, the pod is deleted for real, and the cluster brings it back.

> Status: planning. Nothing is playable yet. The roadmap is in [tasks/](tasks/README.md).

## Quick start

You need Git and Make.

1. Install [mise](https://mise.jdx.dev) and activate it in your shell.
2. Clone this repo and `cd` into it.
3. Run `mise install`. It installs each tool at the version pinned in `mise.toml`.
4. Run `make help`. It lists every command you can run.

## Why

The idea comes from a story. An engineer hands their boss a space shooter. The boss plays for a while and has fun. Then the engineer says: "Each ship you destroyed was a pod in production. The service never went down."

This repo builds that game as a way to learn platform engineering and to demonstrate it.
It covers Kubernetes, least-privilege access, CI and supply-chain security, observability, and GitOps.

## How it will work

1. Each fighter on screen is one pod in the `arena` namespace.
2. A hit asks a small Go service, the bridge, to delete that pod.
3. The ReplicaSet behind the Deployment creates a replacement, and a new fighter warps in.
4. A meter shows the share of requests the service still answered.

A scanner mode will explain what you hit: a pod, a node, or the Service in front of them.

Details are in [ARCHITECTURE.md](ARCHITECTURE.md) and [DESIGN.md](DESIGN.md).

## Roadmap

| Version | Goal | State |
|---|---|---|
| [v0](tasks/v0/README.md) | Prove the loop with cubes on a local cluster | In progress |
| [v1](tasks/v1/README.md) | A game that teaches: 1970s film look, sound, two players, scanner | Not started |
| [v2](tasks/v2/README.md) | Fast, observable, deployed by GitOps, online co-op | Not started |

## Docs

| File | What it covers |
|---|---|
| [DESIGN.md](DESIGN.md) | The game, the players Powd and Poed, the look |
| [ARCHITECTURE.md](ARCHITECTURE.md) | The parts, the API between them, the safety model |
| [docs/DECISIONS.md](docs/DECISIONS.md) | The choices made so far, and why |
| [CREDITS.md](CREDITS.md) | Every asset, its author, and its license |
| [tasks/](tasks/README.md) | The full task list |

## License

The code is under the [MIT License](LICENSE). Assets keep their own licenses, listed in [CREDITS.md](CREDITS.md).
