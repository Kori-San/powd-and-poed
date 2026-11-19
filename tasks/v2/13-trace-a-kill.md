# v2-13 Trace a kill

Size: M
Needs: v2-11

## Goal

One trace shows a kill from the HTTP request to the moment the replacement pod is ready.

## Why

Metrics say recovery got slower. A trace says which step took the time.

## Steps

- [ ] Add OpenTelemetry to the bridge: HTTP server spans, Kubernetes client spans, and one span that ends when the replacement is ready.
- [ ] Deploy an OpenTelemetry Collector and a trace backend. Pick the backend at task time and record the choice.
- [ ] Accept a W3C `traceparent` header from the browser request.
- [ ] Put the trace id in the bridge log lines.
- [ ] Link from the Grafana dashboard to a trace.
- [ ] Keep every kill trace locally. Sample them in public mode.
- [ ] Add a codex entry: tracing.

## Done when

- [ ] A kill in the game produces one trace with the kill request, the API delete, and the wait for the replacement.
- [ ] The trace duration matches the `RECOVERY` value for that kill.
- [ ] The log line of that kill can be found from the trace id.

## Learn

- Logs say what happened. Metrics say how often. Traces say where the time went.
- Explain it back: recovery time doubled overnight. Which of the three do you open first, and why?

## Not now

- Tracing inside the browser beyond the one header.
