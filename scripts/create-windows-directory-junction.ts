#!/usr/bin/env bun
import { createWindowsDirectoryJunction } from "../src/cli/runtime/windows-directory-junction";

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error("usage: create-windows-directory-junction.ts <source> <destination>");
  process.exit(2);
}

try {
  createWindowsDirectoryJunction(args[0]!, args[1]!);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
