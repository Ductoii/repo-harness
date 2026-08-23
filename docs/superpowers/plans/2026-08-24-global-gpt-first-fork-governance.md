# Global GPT-First Fork Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make configured repo-harness hosts default to GPT-5.6 Sol High for non-trivial work and govern every future upstream update through a reviewed fork integration branch.

**Architecture:** Keep the durable fork checkout as the sole editable authority. Change the canonical root and ChatGPT skill packages plus their tests; preserve one-time explicit browser setup, but make task routing default-on after that setup. Add a canonical fork-update runbook and install/project the accepted fork commit into global runtime paths.

**Tech Stack:** TypeScript/Bun tests, Markdown skill packages, Git/GitHub remotes, Oracle browser provider, PowerShell operator environment.

**Spec:** `docs/superpowers/specs/2026-08-24-global-gpt-first-fork-governance-design.md`

## Global Constraints

- Durable checkout is the only editable source of truth; installed Bun and host skill paths are projections.
- `origin` is the operator fork and `upstream` is `https://github.com/Ancienttwo/repo-harness.git`.
- New and continued Oracle turns use `--model gpt-5.6-sol --thinking extended`; `heavy` is forbidden for UI High.
- Browser setup remains explicit and credential-free; after setup, non-trivial repo-harness work defaults to GPT-first without a keyword.
- GPT Web remains advisory; local contract, worktree, implementation, checks, acceptance, and external actions remain locally authoritative.
- Direct npm-channel `repo-harness update` is forbidden on the fork-managed host.
- Do not modify DmAube or commit browser profiles, cookies, tokens, or session storage.

---

### Task 1: Lock the new routing contract with failing tests

**Files:**
- Modify: `tests/skill-surface/chatgpt-package.test.ts`
- Modify: `tests/action-command-skills.test.ts`
- Modify: `tests/skill-routing-eval.test.ts`

**Interfaces:**
- Consumes: canonical Markdown packages under `SKILL.md` and `assets/skills/repo-harness-chatgpt/`.
- Produces: regression assertions for configured-host default routing and Sol/High command flags.

- [ ] **Step 1: Replace explicit-per-task expectations with configured-host default expectations**

Assert these exact semantic markers:

```ts
expect(semanticOrchestrate).toContain("configured host");
expect(semanticOrchestrate).toContain("default for every non-trivial repo-harness");
expect(semanticOrchestrate).toContain("local-only");
expect(semanticSetup).toContain("One-Time Host Enablement");
```

- [ ] **Step 2: Pin the canonical consult example**

```ts
expect(consult).toContain("--model gpt-5.6-sol");
expect(consult).toContain("--thinking extended");
expect(consult).not.toContain("--model gpt-5.5-pro");
```

- [ ] **Step 3: Add a routing-eval case**

Add one non-trivial active repo-harness feature prompt whose expected selected routes include both `repo-harness` and `repo-harness-chatgpt`, while ordinary Q&A still expects no harness route.

- [ ] **Step 4: Run the focused tests and verify red**

Run:

```bash
bun test tests/skill-surface/chatgpt-package.test.ts tests/action-command-skills.test.ts tests/skill-routing-eval.test.ts
```

Expected: failure on the old explicit-opt-in and `gpt-5.5-pro` content.

- [ ] **Step 5: Commit the red tests**

```bash
git add tests/skill-surface/chatgpt-package.test.ts tests/action-command-skills.test.ts tests/skill-routing-eval.test.ts
git commit -m "test: require global GPT-first routing"
```

### Task 2: Implement canonical GPT-first skill behavior

**Files:**
- Modify: `SKILL.md`
- Modify: `assets/skills/repo-harness-chatgpt/SKILL.md`
- Modify: `assets/skills/repo-harness-chatgpt/references/setup.md`
- Modify: `assets/skills/repo-harness-chatgpt/references/orchestrate.md`
- Modify: `assets/skills/repo-harness-chatgpt/references/consult.md`
- Modify: `assets/skills/repo-harness-chatgpt/references/continue.md`
- Modify: `docs/reference-configs/agentic-development-flow.md`

**Interfaces:**
- Consumes: explicit one-time ChatGPT host skill projection and Oracle readiness checks.
- Produces: a default-on advisory route plus exact Sol/High invocation contract.

- [ ] **Step 1: Route non-trivial active work from the root skill**

Add a concise action before setup/plan/execute:

```markdown
**GPT-first** — when the canonical ChatGPT skill is installed and browser readiness passes, route every non-trivial feature, bugfix, architecture, optimization, planning, and review task through its orchestrate mode by default. A `gptweb` keyword is not required. Skip only for explicit local-only or purely mechanical work; setup/readiness failure stops closed.
```

- [ ] **Step 2: Change ChatGPT router semantics**

Keep discovery explicit, but replace per-task opt-in wording with configured-host default-on wording and retain every existing authority/security boundary.

- [ ] **Step 3: Update setup and orchestration references**

Rename the setup section to `One-Time Host Enablement`, state that successful projection/readiness enables future default routing, and remove requirements that the user opt in again per repository/task.

- [ ] **Step 4: Pin consult and continuation commands**

The canonical new-turn example must include:

```bash
repo-harness chatgpt browser-consult --repo <repo> --provider oracle \
  --model gpt-5.6-sol --thinking extended --heartbeat 59 \
  --prompt "<prompt>" --write-output ".ai/harness/handoff/gptpro/gptpro-${stamp}-<slug>.md"
```

Continuation must repeat `--model gpt-5.6-sol --thinking extended`, preserve the same conversation, and require DOM evidence showing `Model GPT-5.6 Sol` plus `Effort High` while Oracle lacks first-class effort verification.

- [ ] **Step 5: Update the agentic flow reference**

Document `explicit one-time setup -> configured-host default-on task routing`; do not imply default browser credential installation.

- [ ] **Step 6: Run focused tests and verify green**

Run the Task 1 command. Expected: all selected tests pass.

- [ ] **Step 7: Commit canonical behavior**

```bash
git add SKILL.md assets/skills/repo-harness-chatgpt docs/reference-configs/agentic-development-flow.md
git commit -m "feat: default configured hosts to GPT-first orchestration"
```

### Task 3: Add fork-controlled upstream update governance

**Files:**
- Create: `deploy/runbooks/fork-upstream-update.md`
- Modify: `assets/skills/repo-harness-setup/references/upgrade.md`
- Modify: `tests/action-command-skills.test.ts`

**Interfaces:**
- Consumes: Git remotes `origin` and `upstream`, an accepted fork `main`, GPT-first review, root Required Checks.
- Produces: a fail-closed integration-branch update procedure and routing guard against direct npm refresh.

- [ ] **Step 1: Add failing runbook assertions**

Assert upgrade guidance contains `fork-managed host`, `update/upstream-`, `integration PR`, `same conversation`, `bun run check:ci`, `operator approval`, and forbids direct npm-channel update.

- [ ] **Step 2: Run the focused action-command test and verify red**

```bash
bun test tests/action-command-skills.test.ts
```

- [ ] **Step 3: Write the canonical runbook**

Document fetch, integration branch creation, old/new SHA binding, GPT impact review, merge/conflict policy, CI/smoke/canary, same-conversation review, operator approval, merge/tag/install, and rollback. Use Git commands only; do not add an overlay patch manager.

- [ ] **Step 4: Route fork-managed upgrades to the runbook**

Update `upgrade.md` so source-checkout/fork-managed requests stop before `repo-harness update` and follow the tracked runbook.

- [ ] **Step 5: Run focused tests and verify green**

```bash
bun test tests/action-command-skills.test.ts
```

- [ ] **Step 6: Commit governance**

```bash
git add deploy/runbooks/fork-upstream-update.md assets/skills/repo-harness-setup/references/upgrade.md tests/action-command-skills.test.ts
git commit -m "docs: govern forked upstream updates"
```

### Task 4: Verify the source candidate

**Files:**
- Modify only generated/projection files produced by canonical sync commands when the repo requires them.

**Interfaces:**
- Consumes: Tasks 1-3 candidate.
- Produces: CI-equivalent and clean projection evidence.

- [ ] **Step 1: Run skill/package checks**

```bash
bun test tests/skill-surface/chatgpt-package.test.ts tests/action-command-skills.test.ts tests/skill-routing-eval.test.ts tests/cli/chatgpt-browser.test.ts
```

- [ ] **Step 2: Run root Required Checks**

Run every command listed in root `AGENTS.md` under `## Required Checks`.

- [ ] **Step 3: Run CI-equivalent gate**

```bash
bun run check:ci
```

- [ ] **Step 4: Run clean install/adoption smoke**

Create a disposable repo outside the source checkout, initialize it from this source candidate, confirm canonical skill projection points to the durable checkout, and confirm a non-trivial repo-harness prompt routes GPT-first without `gptweb`.

- [ ] **Step 5: Commit required projections**

Stage only manifest-owned outputs changed by canonical sync commands and commit them with their owning source changes.

### Task 5: Create the GitHub fork and publish the candidate

**Files:**
- No source files beyond accepted Tasks 1-4.

**Interfaces:**
- Consumes: authenticated GitHub CLI, clean verified branch.
- Produces: operator-owned fork with `origin` pointing to it and `upstream` pointing to Ancienttwo.

- [ ] **Step 1: Install and authenticate GitHub CLI**

Install `gh` through the system package manager. If authentication is absent, open the browser device flow and let the user complete it; never request or print a token.

- [ ] **Step 2: Create or reuse the authenticated user's fork**

Use `gh repo fork Ancienttwo/repo-harness --clone=false --remote=false`, then resolve the authenticated login via `gh api user --jq .login`.

- [ ] **Step 3: Set remotes safely**

Rename the current official remote to `upstream`; add the authenticated fork as `origin`; verify fetch/push URLs before pushing.

- [ ] **Step 4: Push the feature branch and open a PR to fork main**

Push `codex/global-gpt-first` to the fork and open an integration PR targeting the fork's `main`. Do not open a PR against Ancienttwo unless the user separately requests upstream contribution.

- [ ] **Step 5: Stop for operator merge approval**

Report the PR URL, exact head SHA, checks, canary status, and rollback target. Do not merge the PR without explicit approval.

### Task 6: Install the accepted fork globally and verify Sol/High

**Files:**
- User-level managed runtime and host skill projections only; no downstream repo edits.

**Interfaces:**
- Consumes: operator-approved fork commit.
- Produces: global CLI/skills sourced from the durable checkout and real browser evidence.

- [ ] **Step 1: Project from the durable checkout**

Run the checkout's update entrypoint without fetching npm CLI code, then project the canonical ChatGPT skill to both hosts. Verify every junction/symlink target resolves inside the durable checkout.

- [ ] **Step 2: Run global doctors**

Verify CLI source/version, ChatGPT Oracle readiness, CodeGraph readiness, and host skill discovery without printing credentials.

- [ ] **Step 3: Run dry-run Sol/High projection**

Expected Oracle command contains `gpt-5.6-sol`, `--browser-model-strategy select`, and `--browser-thinking-time extended`.

- [ ] **Step 4: Run a real browser canary**

Create a real ChatGPT Web conversation, require exact canary output, verify model selection and DOM `Effort High`, and retain ignored evidence outside source commits.

- [ ] **Step 5: Record deployed SHA and rollback SHA**

Record only non-secret commit identities in the operator runtime state; never store browser profile paths or tokens in Git.
