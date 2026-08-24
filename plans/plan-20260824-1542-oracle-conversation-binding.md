# Plan: Oracle Conversation Binding

> **Status**: Approved
> **Created**: 20260824-1542
> **Slug**: oracle-conversation-binding
> **Planning Source**: user-approved-plan
> **Orchestration Kind**: host-plan
> **Source Ref**: (none)
> **Artifact Level**: work-package
> **Promotion Reason**: human_decision_boundary
> **Verification Boundary**: Commands named in the captured planning output plus `repo-harness run verify-contract --contract tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md --strict`.
> **Rollback Surface**: Before execution remove `plans/plan-20260824-1542-oracle-conversation-binding.md`; after execution revert branch `codex/oracle-conversation-binding` or the explicitly reviewed diff.
> **Spec**: `docs/spec.md`
> **Research**: See `docs/researches/`
> **Task Contract**: `tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md`
> **Task Review**: `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md`
> **Implementation Notes**: `tasks/notes/20260824-1542-oracle-conversation-binding.notes.md`

## Agentic Routing
- Selected route: planning
- Routing reason: Captured from user-approved-plan planning output.
- Source ref: (none)
- Due diligence:
  - P1 map: See captured planning output below.
  - P2 trace: See captured planning output below.
  - P3 decision rationale: See captured planning output below.

## Workflow Inventory
Complete this inventory before implementation. If any line is unknown, keep the plan in Draft and fill it before projection.

- Active plan: `plans/plan-20260824-1542-oracle-conversation-binding.md`
- Sprint contract: `tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md`
- Sprint review: `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md`
- Implementation notes: `tasks/notes/20260824-1542-oracle-conversation-binding.notes.md`
- Deferred-goal ledger: `tasks/todos.md`
- Current checks: `.ai/harness/checks/latest.json`
- Run snapshots: `.ai/harness/runs/`
- Scope authority: `tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md` `allowed_paths`
- Concurrency rule: `.ai/harness/active-plan` selects the active plan for this worktree when present; `.ai/harness/active-worktree` records the owning worktree. If another worktree already owns active work, open or switch to the matching worktree instead of serializing unrelated plans.
- Execution isolation: approved contract-level work projects through `repo-harness run plan-to-todo --plan plans/plan-20260824-1542-oracle-conversation-binding.md` and may start `repo-harness run contract-worktree start --plan plans/plan-20260824-1542-oracle-conversation-binding.md`.

## Approach
### Strategy
Use the captured planning output below as the execution source of truth.

### Trade-offs
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Captured plan | Preserves the approved Codex Plan or Waza think decision | Requires the captured text to be concrete enough to execute | Use |

## Detailed Design
### File Changes
| File | Action | Description |
|------|--------|-------------|
| See captured planning output | Follow | Implement only the approved scope named below |

### Code Snippets
See captured planning output.

### Data Flow
See captured planning output.

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Captured plan lacks enough detail | Medium | Execution may need clarification | Stop before implementation if the captured output contradicts repo rules or lacks concrete file targets |

## Task Contracts
- Contract file: `tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md`
- Review file: `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md`
- Implementation notes file: `tasks/notes/20260824-1542-oracle-conversation-binding.notes.md`
- Template: `.claude/templates/contract.template.md`
- Verification command: `repo-harness run verify-contract --contract tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md --strict`
- Active plan rule: this captured plan is written to `.ai/harness/active-plan` and the owning worktree is written to `.ai/harness/active-worktree` unless --no-active is used. Do not infer active execution from the latest non-archived plan.

## Handoff

- Checks file: `.ai/harness/checks/latest.json`
- Session handoff: `.ai/harness/handoff/current.md`

## Promotion Gate

- **Merge/PR unit**: Captured plan `plans/plan-20260824-1542-oracle-conversation-binding.md` is the proposed mergeable execution unit; revise before execute if this is only a checklist step.
- **Rollback surface**: Before execution remove `plans/plan-20260824-1542-oracle-conversation-binding.md`; after execution revert branch `codex/oracle-conversation-binding` or the explicitly reviewed diff.
- **Verification boundary**: Commands named in the captured planning output plus `repo-harness run verify-contract --contract tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md --strict`.
- **Review/acceptance boundary**: `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md` must record pass against the captured acceptance criteria.
- **High-risk surface**: Risks named in captured planning output; keep the plan Draft if risk ownership is not concrete.
- **Why not checklist row**: human_decision_boundary

## Evidence Contract

- **State/progress path**: `plans/plan-20260824-1542-oracle-conversation-binding.md` task breakdown, `tasks/todos.md` deferred-goal ledger, `tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md`, `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md`, and `tasks/notes/20260824-1542-oracle-conversation-binding.notes.md`
- **Verification evidence**: `.ai/harness/checks/latest.json`, `.ai/harness/runs/`, and the commands named in the captured planning output
- **Evaluator rubric**: `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md` must record a passing Waza /check style recommendation
- **Stop condition**: all task breakdown items are complete, sprint verification passes, and the review recommends pass
- **Rollback surface**: Before execution remove `plans/plan-20260824-1542-oracle-conversation-binding.md`; after execution revert branch `codex/oracle-conversation-binding` or the explicitly reviewed diff.

## Captured Planning Output

## Goal
Prevent Oracle follow-ups from attaching to a different ChatGPT conversation, and recover once without duplicating a submitted prompt.

## Success Criteria
- Follow-ups bind the exact stored conversation URL instead of the current browser tab.
- If the expected tab is unavailable, reopen the source session and retry at most once.
- Retry only when read-back proves the current prompt was not submitted; otherwise harvest or fail closed.
- Existing timeout/heartbeat recovery remains intact.

## Scope
- `src/cli/chatgpt-browser/oracle-provider.ts`
- `tests/cli/chatgpt-browser.test.ts`

## Non-Scope
- Oracle upstream internals, DmAube source, browser profile migration, multi-provider fallback.

## P1/P2/P3
- P1: Never accept or resend against a mismatched conversation.
- P2: Exact URL binding and one bounded safe retry.
- P3: Preserve existing Oracle command and session metadata compatibility.

## Fragile Assumption
Oracle 0.16.1 honors `--browser-tab <full conversation URL>` or fails before submission. If false, the wrapper must fail closed rather than reuse the current tab.

## Rejected Alternative
A global single-session lock does not fix stale active-tab reuse after an earlier run completes.

## Verification
Red/green regression for cross-conversation binding and bounded retry; adjacent Oracle recovery tests; browser CLI suite; TypeScript check; real two-conversation canary.

## Rollback
Revert the patch commit; no persisted schema or user data migration.

## Task Breakdown
- [ ] Add failing cross-conversation binding/retry regression.
- [ ] Bind follow-ups to the stored conversation and add one safe retry.
- [ ] Run focused and browser-suite verification.
- [ ] Run GPT Web review and a real two-conversation canary.

## Annotations
<!-- [NOTE]: prefixed inline. Claude processes all and revises. -->

## Task Breakdown
- [ ] Add failing cross-conversation binding/retry regression.
- [ ] Bind follow-ups to the stored conversation and add one safe retry.
- [ ] Run focused and browser-suite verification.
- [ ] Run GPT Web review and a real two-conversation canary.
