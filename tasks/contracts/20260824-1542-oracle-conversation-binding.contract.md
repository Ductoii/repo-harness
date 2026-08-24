# Task Contract: oracle-conversation-binding

> **Status**: Active
> **Plan**: plans/plan-20260824-1542-oracle-conversation-binding.md
> **Task Profile**: bugfix
> <!-- legal values: code-change | docs-only | ledger-closeout | migration | eval-only | delegated-run | bugfix (omit for legacy passthrough); see docs/reference-configs/sprint-contracts.md -->
> **Owner**: AI Agent
> **Capability ID**: root
> **Last Updated**: 2026-08-24 15:43
> **Review File**: `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md`
> **Notes File**: `tasks/notes/20260824-1542-oracle-conversation-binding.notes.md`
> **Exemplar**: `docs/reference-configs/contract-brief-example.md`

## Why

Oracle follow-ups can attach to the active ChatGPT tab from another repository, causing cross-session review contamination or a false completion. The workflow must preserve exact conversation identity before it can safely orchestrate GPT-first work.

## Goal

Bind every Oracle follow-up to the source session's exact ChatGPT conversation URL and retry at most once only when the prompt is proven absent.

## Scope

- In scope: Oracle command construction, exact conversation validation, one bounded safe retry, canonical continuation guidance, and regression coverage.
- Out of scope: Oracle upstream internals, DmAube source, profile migration, or fallback providers.
- Taste constraints: YAGNI; one validation authority and no compatibility path.

## Stop Conditions

- Stop and hand back to the parent if the change would require editing a path outside Allowed Paths.
- Stop if an Exit Criteria command cannot be run in this environment.
- Stop if Goal, Scope, or Exit Criteria are internally contradictory.

## Falsifier

If Oracle 0.16.1 does not navigate a new browser run to `--chatgpt-url <full conversation URL>` or expose the final URL for validation, the direction is invalid; test the real two-conversation canary before acceptance.

## Root Cause Evidence

Required when Task Profile is `bugfix`; leave as-is otherwise.

- root_cause: `buildOracleCommand` in `src/cli/chatgpt-browser/oracle-provider.ts` passes only `--followup` and a URL through `--chatgpt-url`, so Oracle 0.16.1 may reuse the active tab from another repo instead of the source conversation.
- repro: run a DmAube follow-up after a repo-harness GPT Web review; Oracle session `final-review-context-chunk-1-2` requested `6a8bce3e...` but attached to `6a8bff21...`.
- regression_guard: tests/cli/chatgpt-browser.test.ts
- pre_fix_failure_artifact: .ai/harness/runs/oracle-conversation-binding.pre-fix.log

## Workflow Inventory

- Source plan: `plans/plan-20260824-1542-oracle-conversation-binding.md`
- Deferred-goal ledger: `tasks/todos.md`
- Review file: `tasks/reviews/20260824-1542-oracle-conversation-binding.review.md`
- Notes file: `tasks/notes/20260824-1542-oracle-conversation-binding.notes.md`
- Checks file: `.ai/harness/checks/latest.json`
- Run snapshots: `.ai/harness/runs/`
- Scope gate: edit only paths listed under `allowed_paths`; update this contract before widening scope.
- Completion gate: run `verify-sprint --prepare-acceptance`, record one typed AcceptanceReceipt under the frozen policy below, then run `verify-sprint`; review Markdown is projection only.

## Change Assessment

```json
{"protocol":1,"oracles":[]}
```

## Acceptance Policy

```json
{"protocol":1,"reviewer":"Claude","user_waiver":"allowed"}
```

## Allowed Paths

```yaml
allowed_paths:
  - plans/plan-20260824-1542-oracle-conversation-binding.md
  - tasks/contracts/20260824-1542-oracle-conversation-binding.contract.md
  - tasks/reviews/20260824-1542-oracle-conversation-binding.review.md
  - tasks/notes/20260824-1542-oracle-conversation-binding.notes.md
  - assets/skills/repo-harness-chatgpt/references/continue.md
  - assets/skills/repo-harness-chatgpt/references/delegate.md
  - docs/repo-harness-chatgpt-browser-engine.md
  - src/cli/chatgpt-browser/engine.ts
  - src/cli/chatgpt-browser/oracle-provider.ts
  - tests/cli/chatgpt-browser.test.ts
  - tasks/todos.md
```

## Evidence Requirements

```yaml
evidence_requirements:
  # Set benchmark to required when this contract consumes the harness profile benchmark matrix.
  benchmark: not_applicable
```

## Delegation Contract

```yaml
delegation:
  budget:
    tokens: null
    runner_invocations: null
    wall_time_minutes: null
  permission_scope:
    mode: inherit_allowed_paths
    writable_paths: []
    network: inherited
  roles:
    parent:
      mode: narrate_and_gatekeep
      purpose: approval_checkpoint_owner
    explorer:
      mode: read_only
      purpose: codebase_research
    worker:
      mode: edit_within_allowed_paths
      purpose: implementation
    verifier:
      mode: read_only
      purpose: exit_criteria_review
  runner:
    preferred:
      - subagent
    fallback: null
    brief_is_authoritative: true
```

## Exit Criteria (Machine Verifiable)

```yaml
exit_criteria:
  files_exist:
    - docs/spec.md
  artifacts_exist:
    - .ai/harness/checks/latest.json
    - tasks/notes/20260824-1542-oracle-conversation-binding.notes.md
  tests_pass:
    - path: tests/cli/chatgpt-browser.test.ts
  commands_succeed:
    - bun test tests/cli/chatgpt-browser.test.ts --timeout 60000
    - bun run check:type
```

## Acceptance Notes (Human Review)

- Functional behavior: exact source conversation binding and one safe recovery attempt.
- Edge cases: unavailable browser, stale answer, prompt already submitted, mismatched conversation URL.
- Regression risks: Oracle CLI versions with incompatible exact-URL navigation; conversation validation must fail closed.

## Rollback Point

- Commit / checkpoint: branch `codex/oracle-stall-harvest` before conversation-binding changes.
- Revert strategy: revert the conversation-binding commit; no schema migration is required.
