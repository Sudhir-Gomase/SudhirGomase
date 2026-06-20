/**
 * Dev launcher — separate cache dir + Windows EPERM / port cleanup.
 */
import { existsSync, rmSync } from "fs";
import { spawn, execSync } from "child_process";
import { join } from "path";

const root = process.cwd();
const devDir = ".next-dev";
const port = process.env.PORT || "3000";

process.env.NEXT_TELEMETRY_DISABLED = "1";
process.env.NEXT_DIST_DIR = devDir;

function killPortWindows(targetPort) {
  if (process.platform !== "win32") return;
  try {
    const out = execSync(`netstat -ano | findstr :${targetPort}`, { encoding: "utf8" });
    const pids = new Set(
      out
        .split(/\r?\n/)
        .map((line) => line.trim().split(/\s+/).pop())
        .filter((pid) => pid && /^\d+$/.test(pid) && pid !== "0")
    );
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`Stopped stale process on port ${targetPort} (PID ${pid})`);
      } catch {
        /* already gone */
      }
    }
  } catch {
    /* port free */
  }
}

function cleanCacheDir(dirName) {
  const dirPath = join(root, dirName);
  if (!existsSync(dirPath)) return;

  const tracePath = join(dirPath, "trace");
  try {
    if (existsSync(tracePath)) rmSync(tracePath, { force: true });
  } catch {
    /* trace locked */
  }

  try {
    rmSync(dirPath, { recursive: true, force: true });
    console.log(`Cleared ${dirName}/`);
  } catch {
    console.warn(
      `Could not fully remove ${dirName}/ — close other terminals running npm run dev, then retry.`
    );
  }
}

killPortWindows(port);
cleanCacheDir(devDir);

const child = spawn("next", ["dev", "-p", port], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
