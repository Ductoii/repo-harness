---
name: repo-harness-check
description: Verification entrypoint for repo-harness workflow readiness. Runs workflow gates, task sync, contract checks, inspector, and migration dry-run before merge or release.
when_to_use: "repo-harness-check, check agentic workflow, verify harness, pre-merge workflow check, release readiness, validate tasks-first contract"
---

# repo-harness-check

Use this command when the user asks whether the harness, migration, or release surface is ready.

## Protocol

1. Confirm the repo path and report dirty-worktree boundaries.
2. Read the canonical required-check list from the target repo's root agent context (`CLAUDE.md` for Claude, `AGENTS.md` for Codex) `## Required Checks` section, then run that canonical required-check list exactly once through the global/package helper runtime. Do not append an aggregate gate or its constituent commands from a plan, contract, package script, or remembered repo convention; the root list is the sole execution authority. This self-host source repo may also use root `scripts/` for source-only maintenance commands only when those commands are themselves listed there. Example only, not a fixed list: `bun test`. If `## Required Checks` is missing or empty, report that as the first blocking finding instead of substituting a default list.
3. Run advisory readiness when available:
   - `repo-harness run check-agent-tooling --host both --json`
4. Treat missing CodeGraph or missing Codex `health`/`check`/`mermaid` as hard failures.
5. Treat Waza staging drift as a yellow readiness flag; report the fix or acceptance reason without failing the repo gate.
6. Report skill eval authority when release/readiness evidence depends on skill
   effectiveness:
   - authoritative: non-dry-run `bun run benchmark:skills --eval <slug>` with
     `full_test_count > 0`, `dry_run_ratio <= 30%`, and graders reported
   - non-authoritative: dry-run-heavy or all-dry-run evidence
   - unavailable: no current eval evidence; report the benchmark command needed
7. Summarize pass/fail evidence, yellow flags, eval authority metrics, and the next blocking command if any.

## Delegation Brief Evidence

A file-coupled `contract-run` worker is instructed to self-run every `exit_criteria` command and paste the exact command line plus output before reporting done. When checking such a run, confirm that evidence was actually pasted, not merely asserted, and re-run any criterion you cannot confirm from the transcript.

## Root Cause Evidence Review

For a `bugfix` contract, confirm `## Root Cause Evidence` states a testable `root_cause`, a working `repro`, a `regression_guard` that also appears under `exit_criteria.tests_pass`, and a `pre_fix_failure_artifact` showing a non-zero `PRE_FIX_EXIT=` line for that guard, not a passing run. Also check whether `task_profile` was mislabeled or left out entirely: an omitted `task_profile` defaults to legacy pass-through (non-bugfix) by design, so confirm that default is actually correct here rather than an evasion of the gate.

## Failure Modes

- If any required workflow gate fails, report the first blocking command and stop the readiness claim.
- When a full required-check command fails, retain that failure and do not automatically rerun the full required-check list. A single focused or isolated reproduction may classify a suspected flake, but it does not replace the failed gate or silently turn it into a pass.
- If advisory tooling times out, report advisory evidence as unavailable instead of passing it.
- If eval evidence is missing or all dry-run, mark it non-authoritative or unavailable for skill effectiveness and name the repair command.

## Boundaries

- Does not mutate repo files by default.
- Does not silently ignore CodeGraph readiness failures, advisory tooling hangs, or skipped checks.
- Does not claim skill-effectiveness authority from dry-run benchmark output.
- Does not claim release readiness if source repo and installed runtime copy are out of sync.
- Does not maintain its own copy of the required-check list; the target repo's root `## Required Checks` section is the single source of truth.
