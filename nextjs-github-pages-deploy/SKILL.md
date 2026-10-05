---
name: nextjs-github-pages-deploy
description: "Next.js 站点部署到 GitHub Pages 项目页的端到端手册：既覆盖「已上线 Vercel 的动态站如何改造为可静态导出」，也覆盖「静态导出站如何发布到 GitHub Pages」。含 basePath 子路径、asset() 图片前缀、外部 URL 不能加前缀、Vercel 双线部署冲突、Pages Source 必须选 GitHub Actions、.nojekyll 与 Jekyll 吞 _next、CDN 传播延迟、next/font 构建联网、国内访问波动，以及依赖与跨平台（macOS / Windows / Linux）说明。当需要「把 Next.js 站点发布到 GitHub Pages / 从 Vercel 迁移到 GitHub Pages / 排查 Pages 上白屏或图片 404 / 配置 Actions 自动部署」时使用。"
metadata:
  version: "1.1.0"
  language: zh-CN
  display_name: "Next.js 部署 GitHub Pages 避坑手册"
  display_name_en: "Next.js GitHub Pages Deploy"
  description_zh: "Next.js 从 Vercel 迁移并部署 GitHub Pages 的端到端流程与避坑手册"
  description_en: "Next.js to GitHub Pages: migrate from Vercel, workflow and pitfalls"
  visibility: user
  agent_created: true
---

# Next.js → GitHub Pages 部署与避坑手册

把一个 Next.js 站点发布到 GitHub Pages **项目页**（地址形如 `https://<用户名>.github.io/<仓库名>/`，**带子路径**）时，子路径是万恶之源。

本手册分两大阶段：

- **阶段 A（前置改造）**：项目当前跑在 Vercel 上，可能是 SSR / 动态站，先把它改成能静态导出（`output: "export"`）。
- **阶段 B（发布部署）**：把静态产物发布到 GitHub Pages，并完成验收。

每条坑都给出「症状 → 原因 → 解法」。**执行顺序：A → B → 验收。**

---

## 一、适用场景

- Next.js **App Router** 站点（其它框架思路类似但命令不同）
- 目标：发布到 GitHub Pages **项目页**，地址带 `/<仓库名>/` 子路径
- 现状之一是「已上线 Vercel，想同步再上线 GitHub Pages」，即**双线部署**
- 希望 push `main` 后自动构建部署

**不适用**：GitHub Pages **用户页**（`https://<用户名>.github.io/`，根路径，无需 `basePath`）；Pages 上纯静态 HTML 站点（无需本手册）。

**先确定关键值**（跨平台同一条命令）：

```bash
git remote -v
```

从远程 URL 解析出 `<用户名>` 与 `<仓库名>`。若仓库名等于 `<用户名>.github.io`，那是用户页，不需要 `basePath`，本手册后续 `basePath` 相关步骤可跳过。

---

## 二、核心概念

| 概念 | 说明 |
| --- | --- |
| 项目页子路径 | 项目页 URL 一定带 `/<仓库名>/`，所有资源路径都要带这个前缀 |
| `basePath` | Next.js 构建配置，给**路由**和 `_next/` 资源自动加前缀 |
| `asset()` helper | 自建函数，给**原生** `<img>`/`<a>` 和数据里的绝对路径手动加前缀 |
| `output: "export"` | 让 `next build` 产出纯静态 `out/` 目录 |

**关键认知**：`basePath` 只自动处理 `<Link>` 组件和 `_next/` 下的 JS/CSS。**原生 `<img src="/...">`、`<a href="/...">`、以及数据文件里的图片路径字符串，都不会自动加前缀，必须靠 `asset()` 手动包。**

---

## 三、阶段 A：从 Vercel 动态站改造为可静态导出

> 项目**已经**是 `output: "export"` 时，可跳过本节直接进入阶段 B。

### A0. 先探测有哪些阻塞点

静态导出不支持服务端运行时。用下面命令扫描（**跨平台对照**，按需选一种）：

```bash
# macOS / Linux / Git Bash
grep -rn "next/headers\|cookies(\|headers(\|use server\|revalidate\|force-dynamic" app src 2>/dev/null
find app src -name "middleware.ts" -o -name "middleware.js" -o -name "route.ts" 2>/dev/null
```

```powershell
# Windows PowerShell
Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx app,src -ErrorAction SilentlyContinue |
  Select-String -Pattern "next/headers","cookies\(","headers\(","use server","revalidate","force-dynamic"
Get-ChildItem -Recurse -Include middleware.ts,middleware.js,route.ts app,src -ErrorAction SilentlyContinue
```

命中的每一类，按 A2–A5 处理。

### A1. 开启静态导出

`next.config.ts`：

```ts
import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,           // 静态托管必须，保证目录式路由 /projects/x/ 正确
  images: { unoptimized: true }, // 静态导出不支持图片优化
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
```

`basePath` 用环境变量条件注入：GitHub Pages 构建时设 `BASE_PATH`，Vercel 不设——两条线互不干扰。

### A2. 去掉 `headers()` / `cookies()` / `draftMode()`

这些来自 `next/headers`，静态导出没有请求上下文。典型用途是推断站点 URL、读鉴权信息。

- **推断站点 URL** → 改成环境变量兜底：

  ```ts
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  ```

- **鉴权 / 个性化** → 静态站无法在服务端做；改为客户端获取，或移除该逻辑。

### A3. 删除 `middleware.ts`

静态站没有中间件。文件直接删除；若它做重定向，改用 `next.config.ts` 的 `redirects()`（静态导出支持），或客户端跳转。

### A4. 删除或改造 `app/api/**/route.ts`

静态导出不支持 Route Handlers（API 路由）。二选一：

- 删除（若前端没用到）；
- 把逻辑挪到客户端直接调用外部 API / Serverless 平台。

### A5. 动态路由补 `generateStaticParams` + 关闭回退

`app/xxx/[slug]/page.tsx` 必须显式列出所有要生成的路径：

```ts
export function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

// 静态导出下，未列出的路径直接落到 404，不做按需生成
export const dynamicParams = false;
```

### A6. 图片与字体

- `next/image` → 配 `images: { unoptimized: true }`，或改用原生 `<img>`（本手册阶段 B 的 `asset()` 是针对原生 `<img>` 的）。
- `next/font/google` → 构建时联网下载字体，保证构建环境有网（见坑 9）。

### A7. 本地验证静态导出

```bash
npm run build        # 成功后应生成 out/
ls out               # Windows PowerShell: Get-ChildItem out
```

若测试脚本原本用 `next start` 起服务，改成对 `out/` 起静态服务（如 `python -m http.server --directory out`，或 `npx serve out`）。原则：**测试要针对静态产物，而不是 dev server。**

### A8. 确认 Vercel 不受影响

Vercel 侧**无需任何改动**：`basePath` 只在 GitHub Pages 构建时通过环境变量注入，Vercel 不设该变量，行为与改造前一致。改造后仍要回归验证 Vercel 那条线正常。

---

## 四、阶段 B：发布到 GitHub Pages

### B1. 建 `app/asset.ts`

```ts
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(p: string): string {
  if (/^https?:\/\//.test(p)) return p; // 外部 URL 原样返回，绝不能加前缀
  return BASE + p;
}
```

### B2. 找出所有需要 `asset()` 包裹的位置

**规则**：以 `/` 开头的**本地绝对路径**要包；`http(s)://` 外部 URL 不包；`#` 锚点不包；`<Link href>` 不包（自动加）。

扫描命令（跨平台对照）：

```bash
# macOS / Linux / Git Bash：原生 img / a / 数据里的路径
grep -rn "<img" app src 2>/dev/null
grep -rn 'src="/\|href="/' app src 2>/dev/null
grep -rn '"/photos/\|"/images/\|"/assets/\|"/projects/' app src 2>/dev/null
```

```powershell
# Windows PowerShell
Get-ChildItem -Recurse -Include *.ts,*.tsx app,src -ErrorAction SilentlyContinue |
  Select-String -Pattern '<img','src="/','href="/','"/photos/','"/images/','"/assets/','"/projects/'
```

对命中的**原生标签**和**数据里的路径**，在**渲染处**用 `asset()` 包裹（不要改数据源本身）：

```tsx
<img src={asset(project.cover)} alt={...} />
<img src={asset("/photos/profile.webp")} alt={...} />
```

`<Link href="/...">` 保持原样。

### B3. 建 `.github/workflows/deploy.yml`

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
          node-version: 22        # 改成项目 engines / .nvmrc 要求的版本
          cache: npm              # 用 yarn/pnpm 见第七节
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

把 `<仓库名>` / `<用户名>` 换成第一节 `git remote -v` 得到的实际值。

### B4. 把仓库 Pages 的 Source 设为 "GitHub Actions"

新仓库默认是 "Deploy from a branch"，workflow 跑绿也不会部署。二选一：

```bash
# 方式一：gh CLI（跨平台，需已安装并 gh auth login）
gh api -X POST repos/<用户名>/<仓库名>/pages -f build_type=workflow
# 已启用过 Pages 则改用 -X PUT
```

- **方式二（无 gh CLI 也可）**：浏览器打开仓库 → Settings → Pages → Build and deployment → Source → 选 **GitHub Actions** 保存。

### B5. push `main`

```bash
git add -A && git commit -m "deploy: GitHub Pages 静态托管" && git push
```

Actions 自动跑：构建 → 上传 `out/` → 部署。之后每次 push `main` 自动更新。GitHub 仓库页 → Actions 可看进度。

---

## 五、避坑清单（按严重程度排序）

### 坑 1 → 白屏：忘了配 `basePath`
- **症状**：Pages 上页面一片空白，控制台一堆 `_next/static/...` 404。
- **原因**：项目页带子路径，资源却按根路径请求。
- **解法**：`next.config.ts` 配 `basePath`（用环境变量条件注入）。

### 坑 2 → 图片 404：`basePath` 管不到原生 `<img>`
- **症状**：页面能显示，但图片全裂。
- **原因**：`basePath` 只处理 `<Link>` 和 `_next/` 资源。
- **解法**：用 `asset()` 包所有原生图片路径（见 B2 扫描命令）。

### 坑 3 → 外部图片裂图：`asset()` 给外部 URL 也加了前缀
- **症状**：本地图片正常，引用外部图床（如 `raw.githubusercontent.com`）的图全裂，URL 变成 `/仓库名https://...`。
- **原因**：`asset()` 无脑 `BASE + p`。
- **解法**：`if (/^https?:\/\//.test(p)) return p;` 先判断外部 URL。

### 坑 4 → 双重前缀 404：`asset()` 被重复调用 / 检查脚本拼错
- **症状**：路径出现 `/仓库名/仓库名/...`。
- **原因**：对已带前缀的路径又拼一次 `BASE`；或写验证脚本时把「已含子路径的值」再拼一次「含子路径的 BASE」。
- **解法**：`asset()` 只包一次；写检查脚本时用「站点源域名 + 路径原值」拼接。

### 坑 5 → 双线部署打架：`basePath` 写死
- **症状**：GitHub Pages 正常，但 Vercel 上线后整个挂掉。
- **原因**：`basePath` 写死在配置里，Vercel 也中招。
- **解法**：只让 Pages 的构建设 `BASE_PATH`，Vercel 不设。

### 坑 6 → workflow 跑绿却不部署：Pages Source 不是 Actions
- **症状**：Actions 显示 success，但 Pages 地址还是旧内容或 404。
- **原因**：Pages Source 默认是 "Deploy from a branch"。
- **解法**：设为 "GitHub Actions"（见 B4）。

### 坑 7 → `_next/` 被吞：分支部署且缺 `.nojekyll`
- **症状**：用「把 `out/` 推到 `gh-pages` 分支」这种方式部署后，`_next/` 下 JS/CSS 全 404。
- **原因**：分支部署会跑 Jekyll，Jekyll 忽略 `_` 开头的目录。
- **解法**：产出目录放一个空的 `.nojekyll` 文件。**用 `deploy-pages` Actions 部署不走 Jekyll，无此问题。**

### 坑 8 → 刚部署完访问 404：CDN 传播延迟
- **症状**：Actions 成功但立刻访问部分路径 404，过一会儿又正常。
- **原因**：GitHub Pages CDN 传播有几十秒延迟。
- **解法**：部署后等 30–60 秒再判定成败。

### 坑 9 → 构建失败：`next/font/google` 需要联网
- **症状**：构建报 `module-not-found` 指向字体。
- **原因**：`next/font/google` 构建时从 Google 下载字体。
- **解法**：保证构建环境有网（Actions / Vercel 默认有）。本地断网构建失败属正常。

### 坑 10 → 本地测不出真机问题
- **症状**：本地 dev / 静态服务器一切正常，线上却有问题。
- **原因**：本地模拟不了 CDN 缓存、限流、传播延迟、真域名和子路径。
- **解法**：必须上线后逐条跑第六节验收清单。

### 坑 11 → 国内访问慢/不稳：GitHub 基础设施固有波动
- **症状**：`github.io` 和 `raw.githubusercontent.com` 国内加载 1–13 秒波动，图片「半天出不来」。
- **原因**：GitHub 基础设施国内访问不稳定，非代码问题。
- **解法**（按性价比）：① 首屏关键图片（如头像）转 **base64 内联**进 bundle；② 非首屏图片保持 `loading="lazy"`；③ 外部图床图接受波动或改成本地图。

### 坑 12 → 静态导出的功能限制
- 不能用 `headers()` / `cookies()` / `middleware` / Route Handlers / Server Actions；
- 动态路由必须 `generateStaticParams`，并加 `export const dynamicParams = false`；
- 站点 URL 不能从请求头推断，用 `NEXT_PUBLIC_SITE_URL` 环境变量兜底。

---

## 六、验收清单（上线后逐条实测）

> 命令跨平台对照见第七节。**不要只看 CI 绿灯，必须实测线上。**

- [ ] 首页 HTTP 200，关键文案可见
- [ ] 每个详情页 200，内容正确
- [ ] 未知路径返回 404 页面
- [ ] 全站图片逐张 200（本地图 + 外部图都查，注意坑 3/4）
- [ ] CSS / JS 资源 200（抽 `_next/` 路径验证）
- [ ] **Vercel 那条线同样正常**（确认 basePath 没串味）
- [ ] 窄屏与桌面都看一眼布局

---

## 七、依赖与跨平台说明

**依赖**

- **Node.js**：版本 ≥ 项目要求（读 `package.json` 的 `engines` 或 `.nvmrc`），workflow 的 `node-version` 要与之匹配。
- **锁文件**：workflow 用 `npm ci`，要求仓库有 `package-lock.json`。
  - 用 **yarn**：改 `cache: yarn` + `yarn install --frozen-lockfile` + `yarn build`。
  - 用 **pnpm**：先 `uses: pnpm/action-setup@v4`，再 `cache: pnpm` + `pnpm install --frozen-lockfile` + `pnpm build`。
- **gh CLI**：仅 B4 自动化需要，可选。无它就用网页端手动设置 Pages Source。
- **Python 3**：仅本地静态预览（`python -m http.server`）用，可选；无 Python 用 `npx serve out` 替代。

**跨平台命令对照**

| 用途 | macOS / Linux | Windows |
| --- | --- | --- |
| 看远程仓库 | `git remote -v` | `git remote -v` |
| 搜索代码 | `grep -rn "关键词" app` | PowerShell：`Select-String`（见 A0/B2） |
| 列目录 | `ls out` | `dir out` 或 `Get-ChildItem out` |
| 测 HTTP 状态 | `curl -sI <url>` | `curl.exe -sI <url>`（PowerShell 里要写 `curl.exe`）或 `Invoke-WebRequest -Method Head <url>` |
| 静态预览 | `python -m http.server --directory out` | 同左（装了 Python）或 `npx serve out` |

**红线**：本 Skill 不写入任何机器专属绝对路径；所有路径均为仓库内相对路径。若需用户提供密钥（如平台 Token），只说明官方获取位置，不得写入文件或提交。

---

## 八、本项目当前实际配置（参考值）

> 以下为「后翻学长个人网站」的实例，仅供对照，**换项目时按前七节的通用规则重新推导**。

- 用户名：`wanghoufan`，仓库名：`p003-houfan-xuezhang-site`
- GitHub Pages 地址：`https://wanghoufan.github.io/p003-houfan-xuezhang-site/`
- 静态导出：`next.config.ts`（`output: "export"` + 条件 `basePath`）
- 图片前缀 helper：`app/asset.ts`
- 部署 workflow：`.github/workflows/deploy.yml`
- 头像内联：`app/profile-inline.ts`（base64，规避坑 11）
- 源真值：`app/content.ts`（图片路径在此定义，在渲染处用 `asset()` 包）

---

## 九、调用提示词

> 请按 `nextjs-github-pages-deploy` 手册执行：先做阶段 A 把当前 Next.js 项目改造为可静态导出（扫阻塞点 → 改 `next.config.ts` → 处理 headers/cookies/中间件/API 路由/动态路由 → 本地验证 `out/`），再做阶段 B 发布到 GitHub Pages（`asset()` 包图片 → 建 workflow → 设 Pages Source 为 GitHub Actions → push `main`），最后逐条完成第六节验收清单并回归验证 Vercel 那条线。注意子路径、`asset()` 外部 URL、双线部署这三个高危点。