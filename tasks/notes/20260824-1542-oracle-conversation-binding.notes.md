# Implementation Notes: oracle-conversation-binding

> **Status**: Review
> **Plan**: plans/plan-20260824-1542-oracle-conversation-binding.md
> **Contract**: tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md
> **Review**: tasks/reviews/20260824-1542-oracle-conversation-binding.review.md
> **Last Updated**: 2026-08-24 15:43
> **Lifecycle**: notes

## Design Decisions

- Prompt-bearing continuations use a new Oracle browser run at the exact saved `--chatgpt-url`; Oracle `--followup` and `--browser-tab` are not used because Oracle 0.16.1 clears the tab ref on follow-up and tab attachment depends on a live DevTools endpoint.
- The source `providerSessionId` is retained only as the metadata/recovery join key.
- Missing source URL fails before provider spawn. Missing or different returned URL fails before answer acceptance.
- Retry is bounded to one attempt and only follows Oracle errors proven to occur before prompt submission.

## Deviations From Plan Or Spec

- None recorded.

## Tradeoffs Considered

| Option | Decision | Reason |
|--------|----------|--------|
| Oracle `--followup` | Reject | It resets `browserTabRef` and reproduced cross-conversation reuse. |
| Oracle `--browser-tab` | Reject | It requires the correct live DevTools endpoint and failed the V3 canary after recovery. |
| New run at exact `--chatgpt-url` | Use | It navigates independently of the active tab and passed the V4 canary. |

## Open Questions

- None.

## Evidence Links

- Checks: `.ai/harness/checks/latest.json`
- Run snapshots: `.ai/harness/runs/`
- Pre-fix regression: `.ai/harness/runs/oracle-conversation-binding.pre-fix.log`
- Real canary: DmAube session `chgpt_20260824_162722_conversation-binding-v4-canary`, URL `6a8bce3e-e088-83ec-9312-09c595cfd689`.
- GPT Web final PASS: session `chgpt_20260824_164120_second-correction-round-in-this-same-review-conv`.

## Promotion Filter

Promote a candidate to `tasks/lessons.md`, `docs/researches/`, or harness asset files only when all three hold: hard to reverse, surprising without local context, and a real trade-off existed. If any one is missing, keep it in this notes file instead.

## Promotion Candidates

- Promote to `tasks/lessons.md` only after a repeated correction or failure pattern.
- Promote to `docs/researches/` only when it is durable repo knowledge with evidence.
- Promote to harness asset files only after verification across more than one task or fixture.
