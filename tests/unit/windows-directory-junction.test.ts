import { afterEach, describe, expect, test } from "bun:test";
import { existsSync, lstatSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { createWindowsDirectoryJunction } from "../../src/cli/runtime/windows-directory-junction";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe.skipIf(process.platform !== "win32")("Windows directory junction", () => {
  test("links an absent destination to an existing source directory", () => {
    const root = mkdtempSync(join(tmpdir(), "repo-harness-junction-"));
    roots.push(root);
    const source = join(root, "source");
    const destination = join(root, "installed", "repo-harness");
    mkdirSync(source);
    mkdirSync(join(root, "installed"));
    writeFileSync(join(source, "sentinel.txt"), "managed\n");

    createWindowsDirectoryJunction(source, destination, "win32");

    expect(lstatSync(destination).isSymbolicLink()).toBe(true);
    expect(realpathSync(destination)).toBe(realpathSync(source));
    expect(existsSync(join(destination, "sentinel.txt"))).toBe(true);
  });

  test("refuses to replace an existing destination", () => {
    const root = mkdtempSync(join(tmpdir(), "repo-harness-junction-"));
    roots.push(root);
    const source = join(root, "source");
    const destination = join(root, "installed");
    mkdirSync(source);
    mkdirSync(destination);

    expect(() => createWindowsDirectoryJunction(source, destination, "win32"))
      .toThrow("destination already exists");
  });
});
