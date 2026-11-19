# v2-19 Switch the stream to WebSocket

Size: M
Needs: v1-23

## Goal

The game and the bridge talk over one WebSocket, ready for messages in both directions.

## Why

Online co-op needs the client to send data many times per second. SSE only goes one way.

## Steps

- [ ] Write the message format in `ARCHITECTURE.md`: the existing events, plus `kill` and `evict` as client messages. Raise `protocol` to 2.
- [ ] Bridge: add `/api/ws`. Check the `Origin` header. Limit message size and rate per connection. Add ping and pong with a timeout.
- [ ] Run the bridge with two replicas and a disruption budget.
- [ ] Client: reconnect with backoff and jitter, then resync from a fresh snapshot.
- [ ] Check that the gateway keeps WebSocket connections open. Adjust its timeouts.
- [ ] Update the simulator and the contract tests. Remove the SSE and POST routes one release later.
- [ ] Load test with k6: 500 idle connections and 50 active ones. Write the pass thresholds in the test file.

## Done when

- [ ] The game plays over WebSocket with the same HUD numbers as before.
- [ ] Kill a bridge pod: clients reconnect to the other replica within 5 seconds and resync.
- [ ] A connection from another origin is refused.
- [ ] The k6 run meets its thresholds.

## Learn

- A WebSocket is a long-lived connection pinned to one pod. When that pod is replaced, all its clients reconnect at the same moment.
- Explain it back: why add random jitter to the reconnect delay?

## Not now

- Player-to-player messages. That is v2-20.
