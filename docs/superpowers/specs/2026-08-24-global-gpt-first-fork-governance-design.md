# Global GPT-First Fork Governance Design

## Goal

Maintain a durable personal fork of `Ancienttwo/repo-harness` that makes GPT Web the default high-value reasoning lane for non-trivial repo-harness work on configured hosts, pins every Oracle browser turn to GPT-5.6 Sol with ChatGPT UI High effort, and reviews every future upstream update before it reaches the installed global runtime.

## Source Of Truth

- The durable Git checkout is the only editable source of truth.
- `origin` is the authenticated operator's GitHub fork.
- `upstream` is the read-only `https://github.com/Ancienttwo/repo-harness.git` remote.
- Installed Bun packages and `~/.codex/skills` / `~/.claude/skills` are projections from an accepted fork commit, never edit targets.
- The deployed fork commit SHA is recorded during each projection so rollback can restore the previous accepted commit.

## Global GPT-First Policy

After the operator explicitly completes ChatGPT browser setup and projects the canonical `repo-harness-chatgpt` skill, GPT-first orchestration is the default for every non-trivial repo-harness feature, bugfix, architecture, optimization, planning, and review task. The user does not need to repeat `gptweb`.

Exceptions are limited to an explicit local-only request and purely mechanical actions. Missing login, model or effort evidence, generation completion, session continuation, prompt secret scan, or exact-context binding stops the GPT-first task; the local coordinator does not silently replace the missing GPT Web judgment.

GPT Web owns problem framing, diagnosis, architecture, planning, risk analysis, acceptance criteria, and same-conversation exact-diff review. The local coordinator owns deterministic repo state, context preparation and secret scanning, contract compatibility, implementation, real local checks, evidence binding, and external actions. Repo-harness remains the control-plane authority.

## Model And Effort Contract

- Every new Oracle consult passes `--model gpt-5.6-sol --thinking extended`.
- Every follow-up stays in the same conversation and repeats the same requested model and effort metadata.
- Oracle's `extended` level maps to the ChatGPT UI's High effort; `heavy` maps to Extra High and is not used for this policy.
- A real canary must retain transport-native model evidence plus a bounded pre-submit DOM diagnostic showing `Model GPT-5.6 Sol` and `Effort High` until Oracle exposes a first-class verified effort receipt.
- Model or effort ambiguity fails closed.

## Canonical Surfaces

The fork changes only canonical framework surfaces and their tests:

- Root `SKILL.md`: route non-trivial active repo-harness work through the configured GPT-first lane by default.
- `assets/skills/repo-harness-chatgpt/SKILL.md`: own the default-on authority and fail-closed rules.
- `assets/skills/repo-harness-chatgpt/references/setup.md`: distinguish one-time explicit host setup from default task routing after setup.
- `assets/skills/repo-harness-chatgpt/references/orchestrate.md`: replace per-task explicit opt-in with configured-host default-on orchestration.
- `assets/skills/repo-harness-chatgpt/references/consult.md` and `continue.md`: pin Sol/High flags and evidence.
- `docs/reference-configs/agentic-development-flow.md`: describe the configured-host default.
- Existing skill-surface, routing, and ChatGPT browser tests: assert the new contract and prevent regression to `gpt-5.5-pro` or per-task keyword activation.

No DmAube file, downstream repo template, browser credential, cookie, session token, or machine-specific path becomes part of the fork.

## Upstream Update Governance

Every upstream update is an integration PR, never an in-place package refresh:

1. Fetch `upstream` without changing the accepted fork branch.
2. Create `update/upstream-<version-or-date>` from the fork's accepted `main`.
3. Record the old accepted SHA, upstream target SHA/tag, changelog range, commit list, and exact three-dot diff.
4. Send the secret-scanned update packet to GPT-5.6 Sol High for impact analysis. Require explicit findings for authority routing, ChatGPT/Oracle integration, workflow contracts, migrations, hooks, security, and release behavior.
5. Merge the upstream target into the integration branch with no automatic publication. Resolve conflicts in favor of current invariants unless the operator approves a deliberate policy change.
6. Run targeted tests, root Required Checks, `bun run check:ci`, package/install smoke, a clean temporary repository adoption smoke, and the real Sol/High canary.
7. Return the exact merged diff and check evidence to the same GPT Web conversation for final review.
8. Stop for explicit operator approval. Only then merge the integration PR into the fork's `main`.
9. Tag the previous accepted commit, project/install from the newly accepted fork commit, record the deployed SHA, and rerun global doctor plus clean-repo smoke.

Direct `repo-harness update` against the npm channel is forbidden on a fork-managed host because it bypasses this review boundary. Update requests route to the tracked fork-update runbook instead. The flow uses standard Git branches and PRs; it does not add a second package manager, overlay patch system, or dual source of truth.

## Failure And Rollback

The update stops before merging or installing when the fork is dirty, upstream cannot be verified, GPT Web/model evidence is missing, the current GPT-first policy disappears, a required check fails, the clean-repo projection differs from canonical assets, or the operator has not approved.

Rollback checks out the previous accepted tag/SHA in the durable fork and reruns the same projection/install path. Browser auth and ignored runtime evidence are never rolled into Git.

## Verification

- Canonical skill and routing tests pass with default-on semantics.
- No canonical instruction retains `gpt-5.5-pro` as the standard Oracle example.
- Dry-run command projection contains `gpt-5.6-sol`, model strategy `select`, and browser thinking time `extended`.
- A real browser canary produces the expected output with Sol/High evidence.
- A disposable repo initialized from the fork discovers the global skills and follows GPT-first routing without a `gptweb` keyword.
- `bun run check:ci` passes before the fork branch is eligible for installation.

## Out Of Scope

- Giving GPT Web local shell, lease, write, acceptance, merge, push, or deployment authority.
- Automatically installing browser credentials or bypassing ChatGPT login and plan controls.
- Automatically publishing upstream updates without a human-controlled integration PR.
- Modifying or depending on DmAube's temporary GPT-first worktree.
