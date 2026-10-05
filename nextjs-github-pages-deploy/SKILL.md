---
name: nextjs-github-pages-deploy
description: "Next.js 静态导出（output: export）部署到 GitHub Pages 项目页的完整流程与避坑手册：basePath 子路径、asset() 图片前缀、外部 URL 不能加前缀、Vercel 双线部署冲突、Pages Source 必须选 GitHub Actions、.nojekyll 与 Jekyll 吞 _next、CDN 传播延迟、next/font 构建联网、国内访问波动。当需要「把 Next.js 站点发布到 GitHub Pages / 排查 Pages 上白屏或图片 404 / 配置 Actions 自动部署」时使用。"
metadata:
  version: "1.0.0"
  language: zh-CN
  display_name: "Next.js 部署 GitHub Pages 避坑手册"
  display_name_en: "Next.js GitHub Pages Deploy"
  description_zh: "Next.js 静态导出部署 GitHub Pages 的流程与避坑手册"
  description_en: "Next.js static export to GitHub Pages: workflow and pitfalls"
  visibility: user
  agent_created: true
---

# Next.js → GitHub Pages 部署与避坑手册

把 Next.js（`output: "export"`）静态站点发布到 GitHub Pages 项目页时，**子路径**是万恶之源。本手册按「先流程、再避坑、后验收」组织，每条坑都给出「症状 → 原因 → 解法」。

---

## 一、适用场景

- Next.js App Router 站点，用 `output: "export"` 产出 `out/` 静态目录
- 发布到 GitHub Pages **项目页**（地址形如 `https://<用户名>.github.io/<仓库名>/`，带子路径）
- 同时还要保留 Vercel（或其它根路径平台）部署，即**双线部署**
- 需要 push `main` 后自动构建部署

不适用：发布到 GitHub Pages **用户页**（`https://<用户名>.github.io/`，根路径，无需 `basePath`）。

---

## 二、核心概念

| 概念 | 说明 |
| --- | --- |
| 项目页子路径 | 项目页 URL 一定带 `/<仓库名>/`，所有资源路径都要带这个前缀 |
| `basePath` | Next.js 构建配置，给路由和 `_next/` 资源自动加前缀 |
| `assetPrefix` | 一般不需要；`basePath` 已覆盖 `_next/` 资源 |
| `asset()` helper | 自建函数，给**原生** `<img>`/`<a>` 里的绝对路径手动加前缀 |

**关键认知**：`basePath` 只自动处理 `<Link>` 组件和 `_next/` 下的 JS/CSS。**原生 `<img src="/...">`、`<a href="/...">`、以及数据里的图片路径字符串，都不会自动加前缀，必须靠 `asset()` 手动包。**

---

## 三、完整流程

### 1. 配置 `next.config.ts`

```ts
import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,          // 静态托管必须，保证目录式路由 /projects/x/ 正确
  images: { unoptimized: true },// 静态导出不支持图片优化
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
```

用环境变量条件注入 `basePath`：GitHub Pages 构建时设 `BASE_PATH`，Vercel 不设——这样两条线互不干扰。

### 2. 创建 `app/asset.ts`

```ts
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(p: string): string {
  if (/^https?:\/\//.test(p)) return p; // 外部 URL 原样返回，绝不能加前缀
  return BASE + p;
}
```

### 3. 所有原生图片路径过 `asset()`

包括首页、项目详情页、卡片组件、二维码弹窗，以及**数据文件里的图片路径字符串**（在渲染处包，不要改数据源）。

```tsx
<img src={asset(project.cover)} alt={...} />
<img src={asset("/photos/profile.webp")} alt={...} />
```

`<Link href="/...">` 不用包，Next.js 自动加前缀。

### 4. 建 `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          BASE_PATH: /<仓库名>
          NEXT_PUBLIC_BASE_PATH: /<仓库名>
          NEXT_PUBLIC_SITE_URL: https://<用户名>.github.io/<仓库名>
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

把 `<仓库名>` / `<用户名>` 换成实际值。

### 5. 把仓库 Pages 的 Source 设为 "GitHub Actions"

新仓库默认是 "Deploy from a branch"，workflow 跑绿了也不会部署。用命令设置：

```bash
gh api -X POST repos/<用户名>/<仓库名>/pages -f build_type=workflow
```

（已启用过 Pages 则用 `-X PUT`；也可在仓库 Settings → Pages → Build and deployment → Source 手动选。）

### 6. push `main`

Actions 自动跑：构建 → 上传 `out/` → 部署。之后每次 push `main` 自动更新。

---

## 四、避坑清单（按严重程度排序）

### 坑 1 → 白屏：忘了配 `basePath`
- **症状**：Pages 上页面一片空白，控制台一堆 `_next/static/...` 404。
- **原因**：项目页带子路径，资源却按根路径请求。
- **解法**：`next.config.ts` 配 `basePath`（本项目用环境变量条件注入）。

### 坑 2 → 图片 404：`basePath` 管不到原生 `<img>`
- **症状**：页面能显示，但图片全裂。
- **原因**：`basePath` 只处理 `<Link>` 和 `_next/` 资源，原生 `<img src="/...">` 和普通字符串路径不处理。
- **解法**：用 `asset()` 包所有原生图片路径。

### 坑 3 → 外部图片裂图：`asset()` 给外部 URL 也加了前缀
- **症状**：本地图片正常，但引用外部图床（如 `raw.githubusercontent.com`）的图全裂，URL 变成 `/仓库名https://...`。
- **原因**：`asset()` 无脑 `BASE + p`。
- **解法**：`if (/^https?:\/\//.test(p)) return p;` 先判断外部 URL。

### 坑 4 → 双重前缀 404：`asset()` 被重复调用 / 检查脚本拼错
- **症状**：路径出现 `/仓库名/仓库名/...`。
- **原因**：对已带前缀的路径又拼一次 `BASE`；或写验证脚本时把「已含子路径的 img 值」再拼一次「含子路径的 BASE」。
- **解法**：`asset()` 只包一次；写检查脚本时用「站点源域名 + img 原值」拼接，不要用「含子路径的 BASE + img 值」。

### 坑 5 → 双线部署打架：`basePath` 写死
- **症状**：GitHub Pages 正常，但 Vercel 上线后整个挂掉（资源全带子路径前缀）。
- **原因**：`basePath` 写死在配置里，Vercel 也中招。
- **解法**：只让 Pages 的构建设 `BASE_PATH` 环境变量，Vercel 不设。

### 坑 6 → workflow 跑绿却不部署：Pages Source 不是 Actions
- **症状**：Actions 显示 success，但 Pages 地址还是旧内容或 404。
- **原因**：仓库 Pages 的 Source 默认是 "Deploy from a branch"。
- **解法**：设为 "GitHub Actions"（见流程第 5 步）。

### 坑 7 → `_next/` 被吞：分支部署且缺 `.nojekyll`
- **症状**：改用「把 `out/` 推到 `gh-pages` 分支」这种部署方式后，`_next/` 下 JS/CSS 全 404。
- **原因**：GitHub Pages 对分支部署会跑 Jekyll，而 Jekyll 忽略 `_` 开头的目录。
- **解法**：在产出目录放一个空的 `.nojekyll` 文件。**用 `deploy-pages` Actions 部署不走 Jekyll，无此问题。**

### 坑 8 → 刚部署完访问 404：CDN 传播延迟
- **症状**：Actions 成功但立刻访问部分路径 404，过一会儿又正常。
- **原因**：GitHub Pages 的 CDN 传播有几十秒延迟。
- **解法**：部署后等 30–60 秒再判定成败，别急着回滚。

### 坑 9 → 构建失败：`next/font/google` 需要联网
- **症状**：构建报 `module-not-found` 指向字体。
- **原因**：`next/font/google` 在构建时从 Google 下载字体。
- **解法**：保证构建环境有网（Actions / Vercel 默认有）。本地断网构建会失败，属正常。

### 坑 10 → 本地测不出真机问题
- **症状**：本地 `next dev` 或 `python -m http.server` 一切正常，线上却有问题。
- **原因**：本地模拟不了 CDN 缓存、限流、传播延迟、真域名和子路径。
- **解法**：必须上线后实测首页、详情页、图片、CSS/JS、404。

### 坑 11 → 国内访问慢/不稳：GitHub 基础设施的固有波动
- **症状**：`github.io` 和 `raw.githubusercontent.com` 国内加载 1–13 秒波动，图片「半天出不来」。
- **原因**：GitHub 基础设施国内访问不稳定，非代码问题。
- **解法**（按性价比）：
  1. 首屏关键图片（如头像）转 **base64 内联**进 bundle，消除该请求；
  2. 非首屏图片保持 `loading="lazy"`；
  3. 外部图床图接受波动，或改成随站点部署的本地图。

### 坑 12 → 静态导出的功能限制
- 不能用 `headers()` / `cookies()` / 中间件 / 服务端运行时逻辑；
- 动态路由必须 `generateStaticParams`，并加 `export const dynamicParams = false`；
- 站点 URL 不能从请求头推断，改用一个 `NEXT_PUBLIC_SITE_URL` 环境变量兜底。

---

## 五、验收清单（上线后逐条实测）

- [ ] 首页 HTTP 200，关键文案可见
- [ ] 每个详情页 200，内容正确
- [ ] 未知路径返回 404 页面
- [ ] 全站图片逐张 200（本地图 + 外部图都查，注意坑 3/4）
- [ ] CSS / JS 资源 200（抽 `_next/` 路径验证）
- [ ] Vercel 那条线同样正常（验证 basePath 没串味）
- [ ] 窄屏和桌面都看一眼布局

---

## 六、本项目当前实际配置（参考值）

- 用户名：`wanghoufan`
- 仓库名：`p003-houfan-xuezhang-site`
- GitHub Pages 地址：`https://wanghoufan.github.io/p003-houfan-xuezhang-site/`
- 静态导出：`next.config.ts`（`output: "export"` + 条件 `basePath`）
- 图片前缀 helper：`app/asset.ts`
- 部署 workflow：`.github/workflows/deploy.yml`
- 头像内联：`app/profile-inline.ts`（base64，规避坑 11）
- 源真值：`app/content.ts`（图片路径在此定义，在渲染处用 `asset()` 包）

---

## 七、调用提示词

> 请按 `nextjs-github-pages-deploy` 的流程和避坑清单，把这个 Next.js 站点部署到 GitHub Pages，并逐条完成验收清单；注意子路径、asset() 外部 URL、双线部署这三个高危点。