# Contributing to Awesome Rabta

Thanks for helping the Rabta ecosystem grow. This list covers projects built on the [Rabta Protocol](https://github.com/rabta-protocol/rabta) — not unrelated projects that share the name.

## What belongs

- **Nodes** — free, no-signup instances that meet the requirements below.
- **Apps** — end-user experiences built on a Rabta node.

## Entry format

Add one bullet to the right section of `README.md`:

```markdown
- [Name](https://example.com) - One sentence describing what it does and why it matters.
```

Guidelines:

- Start the description with a capital letter and end with a period.
- Keep it factual and concise; no marketing superlatives.
- Link to the project's public home page or repository, not a URL shortener.
- Add one project per pull request.
- Disclose if the project is yours.

## Quality bar

- The project must actually use Rabta — the API, relay, SDK, or a public node.
- The link must be public and working.
- The project should be maintained or clearly usable; abandoned entries may be removed.
- No duplicates, affiliate links, or referral links.

## Nodes

To list a node, it must:

- be reachable over public HTTPS with a valid certificate;
- run a recent Rabta release without protocol changes;
- return `{"status":"ok"}` from `GET /api/v1/health`;
- be free to use without an invite, signup, or payment;
- be operated by you, or submitted with the operator's permission;
- name its operator and disclose retention, storage, and rate limits;
- accept best-effort uptime, if that is the case.

Add the node to the table under **Nodes** in `README.md`.

Public nodes are shared, unauthenticated infrastructure. Never encourage users to send plaintext secrets to one, and encrypt payloads client-side.

## Before you open a pull request

1. Fork the repository.
2. Add or update one entry.
3. Run `npx awesome-lint` and fix any findings.
4. Open a pull request titled `Add <project>` or `Add <node>`.

## Keeping the list accurate

If a project or node changes URL, goes offline, or is no longer maintained, open a pull request to update or remove it. Dead entries may be removed by maintainers.

This list is licensed under the MIT License.
