---
name: repo-harness-chatgpt
description: Canonical repo-harness ChatGPT rules for Oracle browser consults, GPT-first orchestration, MCP setup, bridge handoff, and invocation evidence.
when_to_use: "repo-harness-chatgpt, ChatGPT Web consult, GPT Pro consult, GPT Pro orchestrate, gptpro, browser GPT, ChatGPT MCP Connector, ChatGPT bridge, MCP read-back, GPT Pro delegate, delegate to ChatGPT, 外包给 GPT"
---

# repo-harness-chatgpt

Canonical owner for Oracle consult/continuation, MCP Connector/bridge setup,
and invocation evidence. Discoverable only after one-time
ChatGPT setup; never implied by either install profile. On a configured host,
orchestrate mode is the default for every non-trivial repo-harness task.
Router-only: mode protocol lives under `references/`.

## Mode Selection

- First-time Oracle browser or MCP Connector configuration -> `references/setup.md`.
- Default GPT-first orchestration on a configured host ->
  `references/orchestrate.md`; readiness/setup -> `references/setup.md`.
- Start a new local -> ChatGPT Web browser consult -> `references/consult.md`.
- Continue, read, or clean up a saved browser session -> `references/continue.md`.
- Verify or accept a ChatGPT MCP tool call as real evidence -> `references/read-back.md`.
- Operate the MCP Connector bridge (planner/executor/orchestrator/coding) -> `references/bridge.md`.
- Delegate a self-contained task to GPT Pro and independently accept the result -> `references/delegate.md`.

## Boundaries

- Installation remains explicit; no per-task `gptweb` keyword is required after setup.
- Never request or handle ChatGPT passwords, 2FA codes, cookies, browser storage, or session tokens; login/captcha/SSO stop and hand back to the user.
- Modes share these safety rules by reference; none shares secrets or auth state.
- Consult stays planning/review/critique only, never the code-edit executor; delegate is the sole approved path for code deliverables, and GPT Pro still never executes edits.
- Orchestrate is default advisory planning/review for non-trivial harness work;
  explicit local-only or purely mechanical work may skip it. GPT Pro never
  owns task, lease, writes, shell, or acceptance authority.
- A missing canonical reference fails closed; never synthesize replacement prose.
- Do not enable remote CDP or an orchestrator dev runner unless the user explicitly asks and the boundary is documented.
