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
  assert.match(text, /蛋白质计算器/);
  assert.match(text, /生活类/);
  assert.match(text, /运动类/);
  assert.match(text, /微信/);
  assert.match(text, /GitHub/);
  assert.match(text, /YouTube/);
  assert.match(text, /loading="lazy"/);
  assert.doesNotMatch(text, /href="https:\/\/tiancexai\.com/);
  assert.doesNotMatch(text, /正在备考与探索|ongoing-column/);
});

// 2026-10-03：用户要求下架「Claude Code 中转服务」，链接与封面图一并移除。
// 断言钉住，避免后续误加回来。
test("retired service stays removed from the page", async () => {
  const { res, text } = await get("/");
  assert.equal(res.status, 200);
  assert.doesNotMatch(text, /Claude Code 中转服务/);
  assert.doesNotMatch(text, /xuedingtoken\.com/);
  assert.doesNotMatch(text, /claude-code-relay/);
  // 保留下来的服务卡仍在
  assert.match(text, /GPT 代充值/);
});

test("published project route renders its story and GitHub link", async () => {
  const { res, text } = await get("/projects/cny-us-rate-board/");
  assert.equal(res.status, 200);
  assert.match(text, /人民币兑美元汇率看板/);
  assert.match(text, /查看 GitHub 项目/);
  // 仓库名已由 cny-us-rate-board 改为 p036-cny-us-rate-board（2026-10-03 核实）
  assert.match(text, /wanghoufan\/p036-cny-us-rate-board/);
});

// 仓库改过名，旧的 repoUrl 会静默变成死链；这里钉住当前真实仓库名。
test("every project repoUrl points at a real renamed repository", async () => {
  const expected = {
    "cny-us-rate-board": "p036-cny-us-rate-board",
    "deepseek-balance-widget": "p010-deepseek-balance-windows",
    "deepseek-balance-mac": "p010-deepseek-balance-mac",
    "prompt-manager": "p006-prompt-manager",
    "nomad-seasons": "nomad-seasons",
    "50-haikou-cafes": "50-haikou-cafes",
    "a-share-index-valuation-report": "p023-a-share-index-valuation",
    "ai-resume-job-matcher": "ai-resume-job-matcher",
    "life-species-coze": "p002-life-species-test",
    "protein-calculator": "p027-protein-calculator",
    "roll-position-calculator": "p013-roll-position-calculator",
    "breakout-radar": "p014-doge-breakout-radar",
    "hongli-dixin-calc": "p022-hongli-dixin-calc",
    "video2obsidian": "p018-video2obsidian-mac",
    "family-insurance-dashboard": "p001-family-insurance-dashboard",
    "bar-games": "p039-bar-games",
    "party-night": "p028-party-night",
    "place-journal": "p011-place-journal",
    "nightrec": "p041-nightrec",
    "talent-showroom": "p040-talent-showroom",
    "stretch-routine": "p025-stretch-routine-app",
    "stretch-side-timer": "p020-stretch-side-timer",
    "photo-library": "p015-photo-library",
    "fill-light": "p026-yejian-buguangdeng",
    "ai-storyboard-studio": "p044-ai-storyboard-studio",
    "skill-system-map": "alw-002-skill-system-map",
    "orca-governance-template": "orca-v2.1-governance",
  };
  for (const [slug, repo] of Object.entries(expected)) {
    const { res, text } = await get(`/projects/${slug}/`);
    assert.equal(res.status, 200, `${slug} 路由应可访问`);
    assert.match(
      text,
      new RegExp(`wanghoufan/${repo}`),
      `${slug} 应链接到 github.com/wanghoufan/${repo}`,
    );
  }
});

test("storyboard project links to its public repo and live Vercel site", async () => {
  const { res, text } = await get("/projects/ai-storyboard-studio/");
  assert.equal(res.status, 200);
  // 仓库已转公开并补回源码，公网版改由 Vercel 托管（2026-10-06）
  assert.match(text, /wanghoufan\/p044-ai-storyboard-studio/);
  assert.match(text, /ai-storyboard-studio-zeta\.vercel\.app/);
  // 已停更的 ChatGPT Sites 旧地址不得再出现在页面上
  assert.doesNotMatch(text, /chatgpt\.site/);
  assert.doesNotMatch(text, /ai-storyboard-generator/);
  // 展示仍用它自己的真实运行截图
  assert.match(text, /ai-storyboard-studio-desktop\.jpg/);
  assert.match(text, /ai-storyboard-studio-mobile\.jpg/);
});

test("new published project routes render their details", async () => {
  const routes = [    ["50-haikou-cafes", /海口值得去的 50 家咖啡店/],
    ["a-share-index-valuation-report", /A股十一大指数十年估值分位报告/],
    ["ai-resume-job-matcher", /AI 简历岗位匹配助手/],
    ["life-species-coze", /生活物种/],
    ["deepseek-balance-mac", /DeepSeek 额度悬浮窗（Mac 版）/],
    ["prompt-manager", /提示词管理器/],
    ["protein-calculator", /蛋白质计算器/],
    ["roll-position-calculator", /滚仓计算器/],
    ["breakout-radar", /突破雷达/],
    ["hongli-dixin-calc", /红利打新底仓计算器/],
    ["video2obsidian", /懒得笔记/],
    ["family-insurance-dashboard", /家庭保单数据看板/],
    ["bar-games", /酒吧游戏/],
    ["party-night", /聚会游戏 Party Night/],
    ["place-journal", /地点手账/],
    ["nightrec", /夜间现场录音/],
    ["talent-showroom", /才艺展示厅/],
    ["stretch-routine", /拉伸语音播报/],
    ["stretch-side-timer", /拉伸换边计时器/],
    ["photo-library", /摄影作品库/],
    ["fill-light", /夜间补光灯/],
    ["skill-system-map", /Skill 能力地图/],
    ["orca-governance-template", /ORCA 治理模板/],
  ];
  for (const [slug, title] of routes) {
    const { res, text } = await get(`/projects/${slug}/`);
    assert.equal(res.status, 200);
    assert.match(text, title);
  }
});

// 封面与详情图用站内本地图（外链图床在国内访客侧不可靠）；文件名一改就会静默空图，这里钉住。
test("protein calculator ships its own screenshots from the site", async () => {
  const { res, text } = await get("/projects/protein-calculator/");
  assert.equal(res.status, 200);
  assert.match(text, /protein-calculator\.png/);
  assert.match(text, /protein-calculator-ranking\.png/);
  assert.match(text, /protein-calculator-dark-home\.png/);
  // 下载入口指向真实存在的 tag 页：只有预发布版时 /releases/latest 会 404
  assert.match(text, /releases\/tag\/styleB-20260920/);
  for (const file of [
    "protein-calculator.png",
    "protein-calculator-ranking.png",
    "protein-calculator-dark-home.png",
  ]) {
    const bytes = await readFile(path.join(OUT, "projects", file));
    assert.ok(bytes.length > 10_000, `${file} 应随静态导出一起发布`);
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
    "deepseek-balance-mac",
    "prompt-manager",
    "nomad-seasons",
    "ai-storyboard-studio",
    "50-haikou-cafes",
    "a-share-index-valuation-report",
    "ai-resume-job-matcher",
    "life-species-coze",
    "protein-calculator",
    "roll-position-calculator",
    "breakout-radar",
    "hongli-dixin-calc",
    "video2obsidian",
    "family-insurance-dashboard",
    "bar-games",
    "party-night",
    "place-journal",
    "nightrec",
    "talent-showroom",
    "stretch-routine",
    "stretch-side-timer",
    "photo-library",
    "fill-light",
    "skill-system-map",
    "orca-governance-template",
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

test("方法与体系 是筛选标签，两条作品就在同一面作品墙里", async () => {
  const { text } = await get("/");
  const wall = text
    .slice(
      text.indexOf('aria-labelledby="projects-title"'),
      text.indexOf('aria-labelledby="services-title"'),
    )
    .replace(/<!--.*?-->/g, "");
  assert.match(wall, /方法与体系（2）/, "筛选条应出现「方法与体系（2）」标签");
  assert.match(wall, /全部（27）/, "全部计数应含两条新增作品");
  for (const title of ["Skill 能力地图", "ORCA 治理模板"]) {
    assert.ok(wall.includes(`<h3>${title}</h3>`), `${title} 应作为卡片出现在作品墙内`);
  }
});

test("生活类兴趣含 AI 编程且照片资源存在", async () => {
  const { text } = await get("/");
  const plain = text.replace(/<!--.*?-->/g, "");
  const at = plain.indexOf("生活类");
  const group = plain.slice(at, plain.indexOf("运动类"));
  assert.match(group, /4 项兴趣/, "生活类应为 4 项");
  for (const name of ["咖啡", "阅读", "吉他", "AI 编程"]) {
    assert.ok(group.includes(name), `生活类应包含 ${name}`);
  }
  assert.ok(group.includes("/photos/ai-coding.webp"), "AI 编程应指向 ai-coding.webp");
  const img = await fetch(`${BASE}/photos/ai-coding.webp`);
  assert.equal(img.status, 200, "AI 编程照片应随构建产出");
});
