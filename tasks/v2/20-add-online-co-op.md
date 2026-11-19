# v2-20 Add online co-op

Size: L
Needs: v2-19

## Goal

Two players on different devices share one sortie through a room code.

## Why

Powd and Poed should not need to sit at the same keyboard. Both already see the same cluster.

## Steps

- [ ] Design first, in `ARCHITECTURE.md`: rooms, what the bridge relays, what stays local, how kills are credited.
- [ ] Bridge: rooms with a short code and two seats. Relay player state at a fixed rate.
- [ ] The bridge has two replicas. Both players of a room must reach the same one, or rooms must work across replicas. Pick one and record it.
- [ ] Client: draw the remote player with interpolation and a small delay buffer.
- [ ] Join flow: create a room, share the code or link, the second player becomes Poed.
- [ ] Handle a player leaving, a reconnect, and a full room.
- [ ] Online co-op is live mode only. Say so in the menu when in sim mode.

## Done when

- [ ] Two phones on different networks finish a sortie together.
- [ ] A kill by either player shows for both within 200 ms on a normal connection.
- [ ] One player dropping does not end the sortie for the other.
- [ ] Tests cover joining, leaving, and a full room.

## Learn

- Connections that hold state and several replicas do not mix by default. You need sticky routing or shared state.
- Explain it back: the bridge has two replicas and keeps rooms in memory. What breaks? Name two ways to fix it.

## Not now

- More than two players, matchmaking, accounts.
