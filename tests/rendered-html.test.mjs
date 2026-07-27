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
  assert.match(html, /Tak is cheap\. Show me the product\./);
  assert.match(html, /生活类/);
  assert.match(html, /运动类/);
  assert.match(html, /联系方式将在确认后开放/);
  assert.match(html, /\/photos\/profile\.jpg/);
  assert.match(html, /\/photos\/coffee\.jpg/);
  assert.match(html, /\/photos\/surf\.jpg/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /mailto:|中\s*\/\s*EN/);
  assert.doesNotMatch(html, /正在备考与探索|ongoing-column/);
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
