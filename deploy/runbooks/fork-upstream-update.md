# Fork-Controlled Upstream Update

Use this runbook on a fork-managed host where the durable source checkout is
the editable authority, `origin` is the operator fork, and `upstream` is
`https://github.com/Ancienttwo/repo-harness.git`.

Do not run the npm-channel `repo-harness update`. It bypasses fork review and
can replace the accepted source with an unreviewed package. Never commit
browser profiles, cookies, tokens, session storage, or ignored Oracle evidence.

## 1. Bind The Candidate

1. Require a clean accepted fork branch and verify both remote fetch/push URLs.
2. Fetch without merging:

   ```bash
   git fetch --prune upstream
   git fetch --prune origin
   ```

3. Record the accepted fork SHA, upstream old SHA, and upstream candidate SHA.
4. Create `update/upstream-YYYYMMDD-<upstream-sha>` from accepted fork `main`.
5. Merge the exact upstream candidate into that branch with a normal merge
   commit. Never resolve conflicts by discarding fork policy wholesale.

If a remote is unexpected, a SHA moves, or the accepted base is dirty, stop.

## 2. Review Before Resolution

Use the configured GPT-first Oracle lane with
`--model gpt-5.6-sol --thinking extended`. Bind the exact old/new upstream SHAs,
fork base SHA, commits, changed surfaces, release notes, and local policy delta.
Ask GPT Web for impact, security, migration, behavior, test, and rollback risks.

For conflicts, identify the invariant owned by each side. Preserve current fork
policy unless the upstream replacement is intentionally accepted. Resolve the
smallest coherent diff; do not keep parallel compatibility paths.

## 3. Verify The Integration Branch

Run targeted tests, every root `AGENTS.md` Required Check, then:

```bash
bun run check:ci
```

Run a clean install/adoption smoke test and a GPT Web Sol/High canary. Preserve
secret-free evidence outside tracked source. Any failing or missing required
check blocks publication.

## 4. Review The Exact Result

Push only the integration branch and open an integration PR against the fork's
`main`. Continue the same conversation used for the impact review. Give GPT Web
the exact pushed head SHA, complete branch diff, check results, smoke/canary
evidence, and rollback SHA. Require an explicit same-conversation diff-review
verdict; local checks and acceptance remain authoritative.

Report the PR URL, base/head SHAs, findings, residual risk, and rollback target.
Stop for explicit operator approval. Do not merge, tag, install, or publish from
the integration PR before that approval.

## 5. Accept, Install, Or Roll Back

After operator approval, merge the integration PR into fork `main`, tag the
accepted fork commit if desired, and project/install only from that durable
checkout. Record deployed and rollback SHAs in ignored operator state.

If post-install verification fails, reset deployment by projecting the recorded
rollback SHA from a clean durable checkout. Do not rewrite published history or
silently fall back to the npm channel.
