# Implementation Notes: global-gpt-first-fork-governance

> **Status**: Active
> **Plan**: plans/plan-20260824-0514-global-gpt-first-fork-governance.md
> **Contract**: tasks/contracts/20260824-0514-global-gpt-first-fork-governance.contract.md
> **Review**: tasks/reviews/20260824-0514-global-gpt-first-fork-governance.review.md
> **Last Updated**: 2026-08-24 06:53
> **Lifecycle**: notes

## Design Decisions

- Keep explicit one-time browser/profile setup; make only post-setup task routing default-on.
- Bind Oracle turns to `gpt-5.6-sol` plus `extended`, with DOM evidence `Model GPT-5.6 Sol` and `Effort High` as the UI authority.
- Keep GPT Web advisory. Codex owns repository investigation, implementation, verification, acceptance, and external actions.
- Treat the operator fork as the sole editable authority; upstream updates land only through reviewed integration PRs.

## Deviations From Plan Or Spec

- None recorded.

## Tradeoffs Considered

| Option | Decision | Reason |
|--------|----------|--------|
| Per-task `gptweb` keyword | Rejected | Configured hosts should route non-trivial harness work automatically. |
| Direct npm-channel update | Rejected | It can bypass fork policy and the reviewed rollback SHA. |
| Automatic browser credential setup | Rejected | Browser auth remains explicit local state and must never enter Git. |

## Open Questions

- None.

## Evidence Links

- Checks: `.ai/harness/checks/latest.json`
- Run snapshots: `.ai/harness/runs/`
- Linux ext4 CI: `bun run check:ci` — 2991 pass, 2 platform skips, 0 fail; typecheck, projections, workflow gates, inspector, package dry-run, and tarball smoke passed.
- Focused GPT-first tests: 127 pass, 0 fail.
- Oracle dry-run secret scan: Gitleaks 8.30.1 passed over the exact 81,824-byte prompt bundle.
- Oracle review session: `chgpt_20260824_064911_global-gpt-first-fork-governance-review` — exact diff SHA-256 `ca1074a4c022ec3cd00b65b77f99bad1766d6a65bf17e3d8b4a907bc79707301`, verified GPT-5.6 Sol, UI Effort High, verdict PASS.
- Same-conversation follow-up: `chgpt_20260824_065042_global-gpt-first-fork-governance-final-verdict` — governance boundary re-check, verdict PASS.

## Promotion Filter

Promote a candidate to `tasks/lessons.md`, `docs/researches/`, or harness asset files only when all three hold: hard to reverse, surprising without local context, and a real trade-off existed. If any one is missing, keep it in this notes file instead.

## Promotion Candidates

- Promote to `tasks/lessons.md` only after a repeated correction or failure pattern.
- Promote to `docs/researches/` only when it is durable repo knowledge with evidence.
- Promote to harness asset files only after verification across more than one task or fixture.
