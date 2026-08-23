# Implementation Notes: global-gpt-first-fork-governance

> **Status**: Active
> **Plan**: docs/superpowers/plans/2026-08-24-global-gpt-first-fork-governance.md
> **Spec**: docs/superpowers/specs/2026-08-24-global-gpt-first-fork-governance-design.md
> **Last Updated**: 2026-08-24
> **Lifecycle**: notes

## Decisions

- Keep one durable operator fork as the editable source; installed CLI and
  host skills are projections.
- After one-time host setup, non-trivial repo-harness work defaults to GPT Web
  orchestration with `gpt-5.6-sol` and `extended` (UI High).
- GPT Web owns advisory planning/critique and same-conversation diff review;
  local Codex retains implementation, checks, acceptance, and external actions.
- Review upstream changes on `update/upstream-*` through an integration PR;
  never refresh a fork-managed host directly from the npm channel.

## Evidence

- Focused Linux tests: 127 passed, 0 failed.
- `scripts/check-deploy-sql-order.sh`: pass.
- `scripts/check-architecture-sync.sh`: pass.
- Remaining root/CI gates and GitHub publication are pending.

## Rollback

- Restore the accepted fork SHA and re-project the durable checkout. Browser
  auth/session data is never committed.
