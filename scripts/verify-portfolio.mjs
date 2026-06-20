/**
 * Quick visual check at 1440×900 — run while dev server is up:
 *   npm run dev
 *   node scripts/verify-portfolio.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../.verify-screenshots");

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await (
    await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    })
  ).newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: path.join(OUT, "01-hero.png"), fullPage: false });

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.85));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, "02-skills.png"), fullPage: false });

  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, "03-about.png"), fullPage: false });

  await browser.close();
  console.log("Saved screenshots to .verify-screenshots/");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
