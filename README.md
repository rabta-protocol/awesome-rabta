<div align="center">

# Awesome Rabta [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

**A curated list of public relays, apps, tools, and resources for [Rabta](https://github.com/rabta-protocol/rabta), the self-healing sync relay for local-first apps and peer meshes.**

[Rabta](https://github.com/rabta-protocol/rabta) · [Website](https://rabta.space/) · [API Reference](https://github.com/rabta-protocol/rabta/blob/main/api.md)

</div>

## What is Rabta?

Rabta is an append-only, content-addressed sync relay for signed events and encrypted files. It ships as a single lightweight binary or Docker container with no external dependencies, no database servers, and no schema migrations.

- **Signed events**: every event is Ed25519-signed, so relays and peers can't forge or tamper with records.
- **Zero-knowledge blobs**: files are encrypted client-side, and relays never hold decryption keys.
- **Autonomous P2P sync**: point nodes at each other with one environment variable and they heal missing records on their own.

Want to run your own relay? See the [Quick Start](https://github.com/rabta-protocol/rabta#quick-start).

## Contents

- [Public Relays](#public-relays)
- [Apps](#apps)
- [Libraries & SDKs](#libraries--sdks)
- [Tools](#tools)
- [Contributing](#contributing)

## Public Relays

Community-run relays you can connect to right away.

| Relay | URL |
| ----- | --- |
| rabta.gupt.app | https://rabta.gupt.app/ |
| 1.rabta.space | https://1.rabta.space/ |

> Public relays are operated by third parties, and availability isn't guaranteed. Data is signed, and files are encrypted client-side, but for anything important consider running your own node or syncing across several with the `SYNC` option.

## Apps

Applications built on Rabta.

- **[GUPT](https://github.com/besoeasy/gupt/)**: Self-hosted, end-to-end encrypted messenger. A privacy-first alternative to Telegram, Signal, WhatsApp, and Discord.

## Libraries & SDKs

Client libraries for talking to a Rabta relay.

*Nothing here yet. [Add the first one!](#contributing)*

## Tools

Dashboards, monitoring, deployment recipes, and other utilities for running or inspecting Rabta nodes.

*Nothing here yet. [Add the first one!](#contributing)*

## Contributing

Contributions are welcome! To add an entry:

1. Fork this repository.
2. Add your item to the right section, in alphabetical order.
3. Use this format: `- **[Name](link)**: One-sentence description.`
4. Open a pull request.

**Guidelines**

- Entries must be working, publicly accessible, and actually use or support Rabta.
- Keep descriptions short, factual, and free of marketing language.
- For relays, include the public URL and make sure the node is online (`/api/v1/health` returns OK) when you submit.
- One item per pull request, please.

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related rights to this work.
