# Setup Mode: Upgrade

Source facade: `assets/skill-commands/repo-harness-upgrade`.

Use when a repo already has a current harness surface but needs the latest
contract, helpers, templates, or policy. Run the shared preflight in
`../SKILL.md` first.

## Protocol

1. Confirm source repo versus installed runtime copy before changing anything.
2. On a fork-managed host, stop before package refresh and follow
   `deploy/runbooks/fork-upstream-update.md`: use an `update/upstream-` branch,
   integration PR, GPT review in the same conversation, `bun run check:ci`, and
   explicit operator approval. Do not run the npm-channel `repo-harness update`.
3. Otherwise, read `upgrade_plan` and
   `assets/workflow-contract.v1.json#migrations.upgrade.actions`.
4. Apply only manifest-owned actions through the migration engine.
5. Verify runtime manifest parity and workflow gates.

## Checkpoints

- Before applying upgrade actions, confirm the target repo and installed runtime copy are not being conflated.

## Failure Modes

- If `upgrade_plan` is empty, report no-op readiness instead of touching files.
- If the target is an installed Codex copy, verify source and installed paths separately before mutation.
- If fork ownership or either remote cannot be verified, stop before fetching,
  merging, installing, or publishing.

## Boundaries

- Delete only `known_generated` surfaces listed by the contract.
- Preserve `_ref/`, `_ops/`, secrets, local env, custom hooks, and user-authored legacy material.
- If the target is the Codex installed copy, verify source and installed paths separately.
