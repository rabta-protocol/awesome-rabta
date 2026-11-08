# Awesome Rabta [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<p align="center">
  <img src="assets/rabta-og.jpg" alt="Rabta — signed events, content-addressed blobs" width="720">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
</p>

**Rabta** is a self-hosted relay for signed events and content-addressed files. It verifies Ed25519 signatures, stores opaque payloads in SQLite, syncs with peer nodes, and expires data automatically — one Rust container, no accounts, no database server, no cloud. Clients own their keys and encryption.

This list covers projects built on the Rabta Protocol, not unrelated projects that share the name.

## Contents

- [Public nodes](#public-nodes)
- [Official](#official)
- [Apps and demos](#apps-and-demos)
- [Self-hosting](#self-hosting)
- [Protocol and learning](#protocol-and-learning)
- [Community](#community)

## Public nodes

Free, no-signup relays you can use today. Each card carries live badges; the table below is a snapshot refreshed weekly by CI.

<!-- node-stats:start -->
Last checked **2026-11-08 11:55 UTC** by the weekly stats workflow. Badges stay live between runs.

| Node           | Status | Events | Blobs | Storage | Uptime  | Stats                                        |
| -------------- | ------ | ------ | ----- | ------- | ------- | -------------------------------------------- |
| 1.rabta.space  | live   | 74     | 1     | 3.9 MB  | 12h 27m | [stats](https://1.rabta.space/api/v1/stats)  |
| rabta.t3nk.com | live   | 74     | 1     | 3.9 MB  | 1h 19m  | [stats](https://rabta.t3nk.com/api/v1/stats) |
<!-- node-stats:end -->

### [1.rabta.space](https://1.rabta.space)

[![health status](https://img.shields.io/website?url=https%3A%2F%2F1.rabta.space%2Fapi%2Fv1%2Fhealth&label=status&up_message=live&down_message=offline)](https://1.rabta.space/api/v1/health)
![live events](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2F1.rabta.space%2Fapi%2Fv1%2Fhealth&query=live_events&label=events&color=blue)
![live blobs](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2F1.rabta.space%2Fapi%2Fv1%2Fhealth&query=live_blobs&label=blobs&color=purple)

The relay behind the [rabta.space](https://rabta.space) demos. Free, no signup, best-effort.

### [rabta.t3nk.com](https://rabta.t3nk.com)

[![health status](https://img.shields.io/website?url=https%3A%2F%2Frabta.t3nk.com%2Fapi%2Fv1%2Fhealth&label=status&up_message=live&down_message=offline)](https://rabta.t3nk.com/api/v1/health)
![live events](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Frabta.t3nk.com%2Fapi%2Fv1%2Fhealth&query=live_events&label=events&color=blue)
![live blobs](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Frabta.t3nk.com%2Fapi%2Fv1%2Fhealth&query=live_blobs&label=blobs&color=purple)

Community node operated by [@T3NK](https://github.com/T3NK). Free, no signup, best-effort.

**Public means public.** These nodes are unauthenticated by design: anyone can read and write, and operators can see metadata. Encrypt payloads client-side, never post secrets, and run your own node for private data.

## Official

- [Rabta](https://github.com/rabta-protocol/rabta) - The relay: signed events, content-addressed blobs, peer sync, and TTL retention in one Rust container.
- [API reference](https://github.com/rabta-protocol/rabta/blob/main/api.md) - Every route, the event envelope, signing rules, the blob plane, limits, and client examples.
- [Website source](https://github.com/rabta-protocol/website) - Source for rabta.space and its four browser-side demos.
- [Container image](https://github.com/rabta-protocol/rabta/pkgs/container/rabta) - Multi-arch images for Linux/amd64 and Linux/arm64.

## Apps and demos

- [Canvas](https://rabta.space/paint.html) - Realtime 1000×1000 collaborative board; every stroke is signed in the browser.
- [Share](https://rabta.space/share.html) - End-to-end encrypted file sharing for up to eight files and a note; the key stays in the URL fragment.
- [World](https://rabta.space/world.html) - A world map where anyone can pin a signed comment to exact coordinates.
- [Shoutbox](https://rabta.space/shout.html) - A public board where every message is signed in the browser.

## Self-hosting

- [Quick start](https://github.com/rabta-protocol/rabta#docker--podman-install) - Docker and Podman one-liners, storage limit, and the first health check.
- [Compose stack](https://github.com/rabta-protocol/rabta/blob/main/compose.yml) - Ready Portainer and Docker Compose example.

## Protocol and learning

- [OpenAPI 3.1](https://1.rabta.space/api/v1/openapi.json) - Machine-readable description of every public route, served by a live node.
- [llms.txt](https://rabta.space/llms.txt) - Compact, machine-readable summary of Rabta for AI agents.
- [Client examples](https://github.com/rabta-protocol/rabta/blob/main/api.md#client-examples) - Node.js signing, publishing, and blob upload snippets from the API reference.
- [Not a Nostr relay](https://github.com/rabta-protocol#not-a-nostr-relay) - How Rabta differs from Nostr, and why a Nostr client cannot use it.

## Community

- [GitHub organization](https://github.com/rabta-protocol) - Source, issues, releases, and the public instance list.
- [Issues](https://github.com/rabta-protocol/rabta/issues) - Bug reports, feature requests, and questions.
- [GitHub topic: rabta](https://github.com/topics/rabta) - Browse repositories tagged with the topic.

## Contributing

Contributions are welcome. Add apps, clients, tools, self-hosting guides, or public nodes. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the entry format and quality bar.

---

Licensed under MIT. Public nodes are independently operated; listing is not an endorsement or an uptime guarantee.
