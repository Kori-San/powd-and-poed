# v2-19 Switch the stream to WebSocket

Size: L
Needs: v1-23

## Goal

The game and the bridge talk over one WebSocket, ready for messages in both directions.

## Why

Online co-op needs the client to send data many times per second. SSE only goes one way.

## Steps

1. [ ] Write the message format in `ARCHITECTURE.md`: the existing events, plus one client message for each POST route. Raise `protocol` to 2.
2. [ ] Bridge: add `/api/ws`. Check the `Origin` header. Limit message size and rate per connection. Add ping and pong with a timeout.
3. [ ] Run the bridge with two replicas and a disruption budget.
4. [ ] Two replicas must agree on the uptime counters and the kill limit. Choose leader election or shared state, and record the choice.
5. [ ] Client: reconnect with backoff and jitter, then resync from a fresh snapshot.
6. [ ] Check that the gateway keeps WebSocket connections open. Update the simulator and the contract tests.
7. [ ] Load test with k6: 500 idle connections and 50 active ones. Write the pass thresholds in the test file.

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
- Removing the SSE and POST routes. Do that one release later.
