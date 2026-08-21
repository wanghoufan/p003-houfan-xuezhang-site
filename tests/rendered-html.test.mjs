import assert from "node:assert/strict";
import test from "node:test";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const PROJECT = fileURLToPath(new URL("..", import.meta.url));
const PORT = 3123;
const BASE = `http://127.0.0.1:${PORT}`;
const NEXT = `${PROJECT}node_modules/.bin/next`;

let server;

async function waitReady() {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(BASE + "/");
      if (r.status) return;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("next start did not become ready in time");
}

test.before(async () => {
  server = spawn(NEXT, ["start", "-p", String(PORT)], {
    cwd: PROJECT,
    stdio: "ignore",
  });
  server.on("error", (err) => {
    throw err;
  });
  await waitReady();
});

test.after(() => {
  if (server) server.kill("SIGTERM");
});

async function get(path) {
  const res = await fetch(BASE + path, { headers: { accept: "text/html" } });
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
  const { res, text } = await get("/projects/cny-us-rate-board");
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
    const { res, text } = await get(`/projects/${slug}`);
    assert.equal(res.status, 200);
    assert.match(text, title);
  }
});

test("unknown project routes return the designed 404 response", async () => {
  const { res, text } = await get("/projects/not-a-real-project");
  assert.equal(res.status, 404);
  assert.match(text, /这一页还没有写进故事里。/);
  assert.match(text, /返回首页/);
});
