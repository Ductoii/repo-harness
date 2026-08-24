import { describe, expect, test } from "bun:test";
import { lstatSync, mkdirSync, mkdtempSync, readdirSync, rmSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { spawnSync } from "child_process";
import { resolveProtectedHelperPlatform } from "../../src/cli/runtime/protected-helper-platform";

const ROOT = join(import.meta.dir, "..", "..");

function msysPath(pathValue: string): string {
  const normalized = pathValue.replace(/\\/g, "/");
  return normalized.replace(/^([A-Za-z]):/, (_, drive: string) => `/${drive.toLowerCase()}`);
}

function removeTopLevelJunctions(root: string): void {
  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    if (lstatSync(path).isSymbolicLink()) unlinkSync(path);
  }
}

describe.skipIf(process.platform !== "win32")("Windows installed-copy junction fallback", () => {
  test("syncs source-backed skill surfaces without rsync or Developer Mode symlinks", () => {
    const temp = mkdtempSync(join(tmpdir(), "repo-harness-installed-junction-"));
    const codexSkills = join(temp, "codex-skills");
    const claudeSkills = join(temp, "claude-skills");
    mkdirSync(codexSkills);
    mkdirSync(claudeSkills);

    try {
      const runtime = resolveProtectedHelperPlatform();
      const result = spawnSync(runtime.bashBin, [join(ROOT, "scripts", "sync-codex-installed-copies.sh")], {
        cwd: ROOT,
        encoding: "utf-8",
        env: {
          ...process.env,
          AGENTIC_DEV_SOURCE_ROOT: msysPath(ROOT),
          AGENTIC_DEV_LINK_INSTALLED_COPIES: "1",
          REPO_HARNESS_INSTALL_PROFILE: "minimal",
          CODEX_SKILLS_ROOT: msysPath(codexSkills),
          CLAUDE_SKILLS_ROOT: msysPath(claudeSkills),
        },
      });

      expect(result.status, result.stderr).toBe(0);
      expect(lstatSync(join(codexSkills, "repo-harness")).isSymbolicLink()).toBe(true);
      expect(lstatSync(join(claudeSkills, "repo-harness")).isSymbolicLink()).toBe(true);
    } finally {
      removeTopLevelJunctions(codexSkills);
      removeTopLevelJunctions(claudeSkills);
      rmSync(temp, { recursive: true, force: true });
    }
  }, 60_000);
});
