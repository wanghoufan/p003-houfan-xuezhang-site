import assert from "node:assert/strict";
import test from "node:test";

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

function environment() {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
}

test("server-renders the complete personal homepage", async () => {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    environment(),
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /后翻学长/);
  assert.match(html, /保持好奇，持续实践，把兴趣活成作品。/);
  assert.match(html, /2017\.09–2021\.06/);
  assert.match(html, /2021\.09–2025\.12/);
  assert.match(html, /2026\.01–至今/);
  assert.match(html, /AI 项目作品/);
  assert.match(html, /人民币兑美元汇率看板/);
  assert.match(html, /\/projects\/cny-us-rate-board\.png/);
  assert.match(html, /生活类/);
  assert.match(html, /运动类/);
  assert.match(html, /微信/);
  assert.match(html, /GitHub/);
  assert.match(html, /YouTube/);
  assert.match(html, /\/photos\/profile\.webp/);
  assert.match(html, /\/photos\/coffee\.webp/);
  assert.match(html, /\/photos\/basketball\.webp/);
  assert.match(html, /\/photos\/dance\.webp/);
  assert.match(html, /\/photos\/snowboard\.webp/);
  assert.match(html, /\/photos\/surf\.webp/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /fetchPriority="high"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /mailto:|中\s*\/\s*EN/);
  assert.doesNotMatch(html, /正在备考与探索|ongoing-column/);
});

test("published project route renders its story and GitHub link", async () => {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request("http://localhost/projects/cny-us-rate-board", {
      headers: { accept: "text/html" },
    }),
    environment(),
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /人民币兑美元汇率看板/);
  assert.match(html, /查看 GitHub 项目/);
  assert.match(html, /wanghoufan\/cny-us-rate-board/);
});

test("unknown project routes return the designed 404 response", async () => {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request("http://localhost/projects/not-a-real-project", {
      headers: { accept: "text/html" },
    }),
    environment(),
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /这一页还没有写进故事里。/);
  assert.match(html, /返回首页/);
});
