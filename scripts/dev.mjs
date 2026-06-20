/**
 * Dev launcher — uses a separate cache dir and clears stale trace locks on Windows.
 */
import { existsSync, rmSync } from "fs";
import { spawn } from "child_process";
import { join } from "path";

const root = process.cwd();
const devDir = ".next-dev";

process.env.NEXT_TELEMETRY_DISABLED = "1";
process.env.NEXT_DIST_DIR = devDir;

for (const dir of [devDir, ".next"]) {
  const tracePath = join(root, dir, "trace");
  if (existsSync(tracePath)) {
    try {
      rmSync(tracePath, { force: true });
    } catch {
      /* locked — next dev will recreate in .next-dev */
    }
  }
}

const child = spawn("next", ["dev"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
