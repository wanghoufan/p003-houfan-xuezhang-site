import assert from "node:assert/strict";
import test from "node:test";
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const PROJECT = fileURLToPath(new URL("..", import.meta.url));
const OUT = path.join(PROJECT, "out");
const PORT = 3124;
const BASE = `http://127.0.0.1:${PORT}`;
const SERVICE_URL = "https://tiancexai.com/?aff=HOUFAN";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

let server;
let browser;

async function sendFile(res, filePath, status = 200) {
  const body = await readFile(filePath);
  res.writeHead(status, {
    "content-type": MIME[path.extname(filePath)] ?? "application/octet-stream",
  });
  res.end(body);
}

test.before(async () => {
  server = http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, BASE).pathname);
    const target = path.join(OUT, urlPath);
    try {
      await sendFile(res, target);
    } catch {
      try {
        await sendFile(res, path.join(target, "index.html"));
      } catch {
        try {
          await sendFile(res, `${target}.html`);
        } catch {
          await sendFile(res, path.join(OUT, "404.html"), 404);
        }
      }
    }
  });
  await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));
  browser = await chromium.launch({ channel: "chrome", headless: true });
});

test.after(async () => {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
});

// 2026-10-07 用户反馈「点了没反应」：真点击回归——服务卡必须是能在真实浏览器里点开的链接。
// 用系统本机 Google Chrome（channel: "chrome"），不下载 Playwright 自带浏览器。
test("service card opens the recharge link when clicked", async (t) => {
  let page;
  try {
    page = await browser.newPage();
  } catch (err) {
    if (/chrome|executable|not found/i.test(String(err))) {
      t.skip(`本机没有可用的 Google Chrome，跳过真点击用例：${err.message}`);
      return;
    }
    throw err;
  }

  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("a.service-card-link");

  const [popup] = await Promise.all([
    page.waitForEvent("popup", { timeout: 10000 }),
    page.click("a.service-card-link"),
  ]);

  try {
    await popup.waitForURL((url) => url.href.startsWith(SERVICE_URL), {
      timeout: 15000,
      waitUntil: "commit",
    });
  } finally {
    await popup.close();
    await page.close();
  }

  assert.ok(
    popup.url().startsWith(SERVICE_URL),
    `点击后应打开 ${SERVICE_URL}，实际为 ${popup.url()}`,
  );
});
