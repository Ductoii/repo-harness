import { existsSync, lstatSync, realpathSync, rmSync, symlinkSync } from "fs";
import { dirname, resolve } from "path";

function normalizedRealPath(pathValue: string): string {
  return realpathSync(pathValue).toLowerCase();
}

export function createWindowsDirectoryJunction(
  source: string,
  destination: string,
  platform: NodeJS.Platform = process.platform,
): void {
  if (platform !== "win32") throw new Error("Windows directory junctions require win32");

  const sourcePath = resolve(source);
  const destinationPath = resolve(destination);
  const sourceStat = lstatSync(sourcePath);
  if (!sourceStat.isDirectory() || sourceStat.isSymbolicLink()) {
    throw new Error(`source must be a real directory: ${sourcePath}`);
  }
  if (existsSync(destinationPath)) {
    throw new Error(`destination already exists: ${destinationPath}`);
  }

  const parent = dirname(destinationPath);
  const parentStat = lstatSync(parent);
  if (!parentStat.isDirectory() || parentStat.isSymbolicLink()) {
    throw new Error(`destination parent must be a real directory: ${parent}`);
  }

  symlinkSync(realpathSync(sourcePath), destinationPath, "junction");
  try {
    if (normalizedRealPath(destinationPath) !== normalizedRealPath(sourcePath)) {
      throw new Error(`junction readback mismatch: ${destinationPath}`);
    }
  } catch (error) {
    rmSync(destinationPath, { force: true });
    throw error;
  }
}
