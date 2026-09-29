import assert from "node:assert/strict";
import test from "node:test";
import http from "node:http";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = fileURLToPath(new URL("..", import.meta.url));
const OUT = path.join(PROJECT, "out");
const PORT = 3123;
const BASE = `http://127.0.0.1:${PORT}`;

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
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

let server;

// 用静态文件目录提供服务，模拟国内静态托管平台（EdgeOne Pages / CNB Pages / CloudBase）的真实行为
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
      await sendFile(res, target);                              // 精确命中文件
    } catch {
      try {
        await sendFile(res, path.join(target, "index.html"));    // 目录式路由
      } catch {
        try {
          await sendFile(res, `${target}.html`);                 // 无斜杠路由
        } catch {
          await sendFile(res, path.join(OUT, "404.html"), 404);  // 静态托管的 404 页面
        }
      }
    }
  });
  await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));
});

test.after(() => {
  if (server) server.close();
});

async function get(pathname) {
  const res = await fetch(BASE + pathname, { headers: { accept: "text/html" } });
  return { res, text: await res.text() };
}

test("server-renders the complete personal homepage", async () => {
  const { res, text } = await get("/");
  assert.equal(res.status, 200);
  assert.match(text, /<html lang="zh-CN">/);
  assert.match(text, /后翻学长/);
  assert.match(text, /保持好奇，持续实践，把兴趣活成作品。/);
  assert.match(text, /2017\.09–2021\.06/);
  assert.match(text, /2021\.09–2025\.12/);
  assert.match(text, /2026\.01–至今/);
  assert.match(text, /AI 项目作品/);
  assert.match(text, /人民币兑美元汇率看板/);
  assert.match(text, /海口值得去的 50 家咖啡店/);
  assert.match(text, /A股十一大指数十年估值分位报告/);
  assert.match(text, /AI 简历岗位匹配助手/);
  assert.match(text, /生活类/);
  assert.match(text, /运动类/);
  assert.match(text, /微信/);
  assert.match(text, /GitHub/);
  assert.match(text, /YouTube/);
  assert.match(text, /loading="lazy"/);
  assert.doesNotMatch(text, /href="https:\/\/tiancexai\.com/);
  assert.doesNotMatch(text, /正在备考与探索|ongoing-column/);
});

test("published project route renders its story and GitHub link", async () => {
  const { res, text } = await get("/projects/cny-us-rate-board/");
  assert.equal(res.status, 200);
  assert.match(text, /人民币兑美元汇率看板/);
  assert.match(text, /查看 GitHub 项目/);
  assert.match(text, /wanghoufan\/cny-us-rate-board/);
});

test("new published project routes render their details", async () => {
  const routes = [
    ["50-haikou-cafes", /海口值得去的 50 家咖啡店/],
    ["a-share-index-valuation-report", /A股十一大指数十年估值分位报告/],
    ["ai-resume-job-matcher", /AI 简历岗位匹配助手/],
    ["life-species-coze", /生活物种/],
  ];
  for (const [slug, title] of routes) {
    const { res, text } = await get(`/projects/${slug}/`);
    assert.equal(res.status, 200);
    assert.match(text, title);
  }
});

test("unknown project routes return the designed 404 response", async () => {
  const { res, text } = await get("/projects/not-a-real-project/");
  assert.equal(res.status, 404);
  assert.match(text, /这一页还没有写进故事里。/);
  assert.match(text, /返回首页/);
});

test("static export ships every published project as its own folder", async () => {
  const expected = [
    "cny-us-rate-board",
    "deepseek-balance-widget",
    "nomad-seasons",
    "ai-storyboard-studio",
    "50-haikou-cafes",
    "a-share-index-valuation-report",
    "ai-resume-job-matcher",
    "life-species-coze",
  ];
  const dirs = (await readdir(path.join(OUT, "projects"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const slug of expected) {
    assert.ok(dirs.includes(slug), `已发布项目 ${slug} 应有独立静态目录`);
    const html = await readFile(path.join(OUT, "projects", slug, "index.html"), "utf8");
    assert.match(html, /<html lang="zh-CN">/);
    assert.match(html, /后翻学长/);
  }

  const home = await readFile(path.join(OUT, "index.html"), "utf8");
  assert.match(home, /后翻学长/);
  assert.match(home, /AI 项目作品/);

  const notFoundHtml = await readFile(path.join(OUT, "404.html"), "utf8");
  assert.match(notFoundHtml, /这一页还没有写进故事里。/);
});
