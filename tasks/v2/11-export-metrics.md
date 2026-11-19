# v2-11 Export metrics

Size: M
Needs: v1-23

## Goal

The bridge exposes Prometheus metrics, and a Grafana dashboard shows kills, recovery time, and uptime.

## Why

The HUD shows the present. Metrics keep the history, and SLOs and alerts are built on them.

## Steps

- [ ] Add `/metrics` to the bridge on its own port: kills by result, a recovery time histogram, stream clients, probe results.
- [ ] Follow the Prometheus naming rules: base units, `_total` on counters, no pod names as labels.
- [ ] Add `make observability-up`, which installs kube-prometheus-stack on the local cluster.
- [ ] Add a ServiceMonitor for the bridge. Allow the scrape in the NetworkPolicy.
- [ ] Build one Grafana dashboard. Store it as JSON in the chart.
- [ ] Add codex entries: metrics, servicemonitor.

## Done when

- [ ] The dashboard shows a kill spike within 30 seconds of a sortie.
- [ ] `curl` on `/metrics` shows the recovery histogram.
- [ ] The metrics port cannot be reached through the gateway.

## Learn

- A counter only goes up. A gauge goes both ways. A histogram counts observations in buckets.
- Try it: in Grafana Explore, run `rate()` over one minute on the kills counter.
- Explain it back: why is a pod name a bad metric label?

## Not now

- Alerts and SLOs. That is v2-12.
