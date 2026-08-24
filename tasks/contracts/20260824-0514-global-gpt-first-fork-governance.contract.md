# Task Contract: global-gpt-first-fork-governance

> **Status**: Active
> **Plan**: plans/plan-20260824-0514-global-gpt-first-fork-governance.md
> **Task Profile**: bugfix
> <!-- legal values: code-change | docs-only | ledger-closeout | migration | eval-only | delegated-run | bugfix (omit for legacy passthrough); see docs/reference-configs/sprint-contracts.md -->
> **Owner**: root
> **Capability ID**: root
> **Last Updated**: 2026-08-24 05:38
> **Review File**: `tasks/reviews/20260824-0514-global-gpt-first-fork-governance.review.md`
> **Notes File**: `tasks/notes/20260824-0514-global-gpt-first-fork-governance.notes.md`
> **Exemplar**: `docs/reference-configs/contract-brief-example.md`

## Why

Configured hosts currently require per-task GPT Web opt-in and can silently
fall back to local-only reasoning. Direct npm updates can also replace personal
policy without a reviewed fork merge, breaking the operator's intended control
plane and rollback path.

## Goal

Make one-time-configured hosts default to GPT-5.6 Sol High advisory
orchestration for non-trivial repo-harness work, and govern upstream updates
through a reviewed operator fork integration PR before global projection.

## Scope

- In scope: root/ChatGPT skill routing, exact Oracle model/thinking flags,
  same-conversation review evidence, fork update runbook, regression tests,
  operator fork publication, and accepted global projection.
- Out of scope: DmAube changes/worktrees, automatic credential setup, upstream
  Ancienttwo PRs, automatic PR merge, and an overlay/patch manager.
- Taste constraints: keep one source of truth, fail closed, and add no steady-
  state compatibility path.

## Stop Conditions

- Stop and hand back to the parent if the change would require editing a path outside Allowed Paths.
- Stop if an Exit Criteria command cannot be run in this environment.
- Stop if Goal, Scope, or Exit Criteria are internally contradictory.

## Falsifier

The direction is wrong if default routing triggers before explicit host setup,
captures ordinary Q&A, loses local acceptance authority, or Oracle cannot bind
`gpt-5.6-sol` plus `extended`. The cheapest proof is the focused skill/browser
test suite and an Oracle dry-run before any real conversation.

## Root Cause Evidence

- root_cause: Windows projection combined Unix-only assumptions: bare `bash` resolution in `src/cli/commands/global-runtime.ts` and `src/cli/runtime/helper-runner.ts`, POSIX-only link/copy modes in `scripts/sync-codex-installed-copies.sh`, and forward-slash/extensionless executable probes in `src/cli/installer/install-profile.ts` plus `scripts/check-agent-tooling.sh`.
- repro: `bun test tests/cli/windows-installed-copy-junction.test.ts --timeout 60000`
- regression_guard: `tests/cli/windows-installed-copy-junction.test.ts`
- pre_fix_failure_artifact: `tasks/evidence/20260824-windows-junction-install-pre-fix.log`

## Workflow Inventory

- Source plan: `plans/plan-20260824-0514-global-gpt-first-fork-governance.md`
- Deferred-goal ledger: `tasks/todos.md`
- Review file: `tasks/reviews/20260824-0514-global-gpt-first-fork-governance.review.md`
- Notes file: `tasks/notes/20260824-0514-global-gpt-first-fork-governance.notes.md`
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
  - SKILL.md
  - assets/skills/repo-harness-chatgpt/
  - assets/skills/repo-harness-setup/references/upgrade.md
  - assets/reference-configs/agentic-development-flow.md
  - deploy/runbooks/fork-upstream-update.md
  - docs/reference-configs/agentic-development-flow.md
  - docs/superpowers/
  - docs/spec.md
  - plans/
  - scripts/create-windows-directory-junction.ts
  - scripts/sync-codex-installed-copies.sh
  - tasks/evidence/20260824-windows-junction-install-pre-fix.log
  - tasks/todos.md
  - tasks/contracts/20260824-0514-global-gpt-first-fork-governance.contract.md
  - tasks/reviews/20260824-0514-global-gpt-first-fork-governance.review.md
  - tasks/notes/20260824-0514-global-gpt-first-fork-governance.notes.md
  - .ai/context/capabilities.json
  - .claude/templates/
  - src/
  - tests/
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
    - deploy/runbooks/fork-upstream-update.md
    - docs/superpowers/specs/2026-08-24-global-gpt-first-fork-governance-design.md
  artifacts_exist:
    - .ai/harness/checks/latest.json
    - tasks/notes/20260824-0514-global-gpt-first-fork-governance.notes.md
  tests_pass:
    - path: tests/skill-surface/chatgpt-package.test.ts
    - path: tests/action-command-skills.test.ts
    - path: tests/skill-routing-eval.test.ts
    - path: tests/cli/chatgpt-browser.test.ts
    - path: tests/cli/windows-installed-copy-junction.test.ts
    - path: tests/cli/windows-protected-helper-runtime-smoke.test.ts
    - path: tests/check-agent-tooling.test.ts
    - path: tests/install-profiles.test.ts
    - path: tests/unit/windows-directory-junction.test.ts
    - path: tests/unit/windows-protected-helper-platform-contract.test.ts
  commands_succeed:
    - bun test --timeout 60000
    - bash scripts/check-deploy-sql-order.sh
    - bash scripts/check-architecture-sync.sh
    - bash scripts/check-task-sync.sh
    - bun src/cli/index.ts run check-task-workflow --strict
    - bun scripts/inspect-project-state.ts --repo . --format text
    - bun src/cli/index.ts init --repo . --dry-run
    - bun run check:ci
```

## Acceptance Notes (Human Review)

- Functional behavior:
- Edge cases:
- Regression risks:

## Rollback Point

- Commit / checkpoint: `75f50b90` (upstream v0.17.0 source base).
- Revert strategy: restore the last accepted fork SHA and re-project the
  durable checkout; never recover through an unreviewed npm refresh.
