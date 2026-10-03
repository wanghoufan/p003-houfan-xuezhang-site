# HANDOFF.md — 交接上下文

> 在重要阶段完成、MVP / Release、长会话交接或文档失配时由【收尾】neat-freak 更新。
> 入口总规则见 `../../AGENTS.md`。

## 项目一页纸
- 项目名称：后翻学长个人网站（houfan-xuezhang-personal-site）
- 定位：非求职导向的个人展示站（杂志叙事呈现经历 / AI 应用与编程项目 / 兴趣生活 / 专题研究 / 联系方式）。
- 技术栈：React 19 + TypeScript + Next.js 16.2.6（App Router）+ Turbopack + Tailwind v4；`output: "export"` 纯静态导出到 `out/`。
- 源真值：`app/content.ts`（内容，8 个已发布项目 + 2 服务卡片，项目含 `category` 分类字段）、`app/ContactPanel.tsx`（联系方式）、`public/photos/*.webp`（照片）、`public/projects/`（封面）、`public/contact/wechat-qr.png`（微信二维码）。
- 常用命令：`npm install` / `npm run dev` / `npm test` / `npm run build` / `npm lint`。
- 发布：一次 push 到 `main` 同时更新 Vercel 与 GitHub Pages，发布前 `npm test`。

## 当前进度（2026-10-03 中午「小交接」更新）

### 已完成（未 commit，待用户确认推送）
1. **浅色主题**（上午会话完成，此前只有深色）：
   - `app/ThemeToggle.tsx`：客户端切换按钮（`useSyncExternalStore` 实现，规避 lint `react-hooks/set-state-in-effect`），写 `<html data-theme>` + `localStorage.theme`。
   - `app/layout.tsx`：`<head>` 注入防闪烁内联脚本，渲染前读 `localStorage.theme`；**默认深色**。
   - `app/globals.css` 末尾（1728–1846 行）`html[data-theme="light"]` 覆盖块：全套 CSS 变量 + 约 15 处硬编码深色选择器覆盖。**后续新增主题就照这个块的结构复制改写**。
2. **作品分类筛选 + 总数**（上午会话完成）：
   - `app/content.ts`：`ProjectCategory`（`web` / `desktop` / `ai` / `report`）+ `projectCategoryLabels` + `Project.category` 必填。当前归属：网页应用 3（cny-us-rate-board、nomad-seasons、50-haikou-cafes）、桌面工具 1（deepseek-balance-widget）、AI 应用 3（ai-storyboard-studio、ai-resume-job-matcher、life-species-coze）、数据报告 1（a-share-index-valuation-report）。
   - `app/ProjectGallery.tsx`：客户端筛选 chip + 计数；`page.tsx` 页头改为 `wordmark + .header-right(nav + ThemeToggle)`。
3. **三主题方案调研（中午会话，只调研未写码）**：用户指定参考项目 `~/Developer/coding/1.Active/017-ing-RSS聚合-个人信息雷达/apps/radar-web/design-concepts/` 的 3 个概念稿，要求移植到本站并可切换：
   - `concept-a-dark-ops.html` **雷达指挥舱**：深藏青 `#060b17` + 青 `#22d3ee` / 蓝 `#38bdf8` + 等宽字体细节（≈ 本站现有深色主题，可直接作为「指挥舱」主题）。
   - `concept-b-aurora-glass.html` **极光玻璃**：浅底 `#eef1fa` + 极光色团（radial-gradient 大光斑 blur）+ 白色毛玻璃卡片 `rgba(255,255,255,.58)` + `backdrop-filter: blur(20px) saturate(1.3)` + 靛青→青渐变 `#6366f1→#06b6d4` + 圆角 14–20px / 胶囊 chip。
   - `concept-c-editorial.html` **情报剪报**：米色纸底 `#f7f2e9` + 墨色 `#1e1b16` + 报纸红 `#b3372e` / 墨绿 `#0f6b5f` + 衬线标题（Songti SC / Noto Serif CJK SC）+ 双线 / 细分隔线，**无发光无玻璃**。
   - 三份概念稿同目录还有对应 PNG 截图（`concept-*.png`）可快速预览效果。

### 本轮验证证据
- `npm test` 5/5 通过、`npm run lint` 0 error（上午会话数据，中午未改代码）。
- 本地预览 http://localhost:3000 在线（Next dev server，首页 200，`theme-toggle` 已渲染）；3100 被 Docker prompt-manager 占用，本项目固定 3000。

### 既有基础（已核实，勿重复踩）
- **部署双线**：Vercel `https://houfan-xuezhang-site.vercel.app`（主）+ GitHub Pages `https://wanghoufan.github.io/p003-houfan-xuezhang-site/`，同一次 `main` push 自动同步。`next.config.ts` 的 `basePath` 由 `BASE_PATH` 环境变量条件注入，**改 basePath 相关代码必须同时验证两条线**。
- 本机网络出口限制：`*.vercel.app` curl 超时无法验证生产页，只能 `vercel ls` / `vercel inspect` 看状态；`*.github.io` 可正常抓取。

## 下一步任务（按优先级）
1. **实现三主题切换**（用户已明确需求，调研已完成，直接写码）：
   - 重写 `app/ThemeToggle.tsx`：单按钮改成 3 选项切换器（建议 `role="group"` 分段控件：指挥舱 dark / 极光 glass / 剪报 paper），沿用 `data-theme` + `localStorage.theme` 机制。
   - `app/layout.tsx` 的 `themeInitScript`：白名单从 `"light"|"dark"` 扩到 `"dark"|"light"|"glass"|"paper"`（保留 light 兼容已存储用户）。
   - `app/globals.css` 末尾追加 `html[data-theme="glass"]` 和 `html[data-theme="paper"]` 两个块：**完整复制现有 light 块的选择器清单**再按上面色板改值；glass 另需卡片/筛选条圆角化 + 胶囊 chip + chip 激活态渐变；paper 另需 `--font-display` 改衬线、去全部 text-shadow/box-shadow 发光、`body::before/::after` 网格与扫描线关掉。
   - 默认主题保持深色（指挥舱）。改完跑 `npm test` + `npm run lint`，再用 Playwright 三主题各截图验证（窄屏 390px 也要过一遍）。
2. **作品分类可编辑**（用户原话：「目前没有办法修改形态的筛选，现在给我分配的是错的」）：
   - 先问用户哪个项目归错了 → 直接改 `app/content.ts` 对应 `category` 字段（一行的事）；或
   - 若用户想要界面内自助修改，再在 `ProjectGallery.tsx` 加「编辑模式」：卡片上点分类徽章弹出 select，覆盖写 `localStorage`（纯静态站只能存浏览器本地，需向用户说明不能跨设备/访客生效）。
3. 用户确认后：commit（建议 `feat: 新增浅色主题与作品分类筛选` 或合并三主题后 `feat: 三主题切换与作品分类筛选`）→ 用户口令「现在推送」→ push 到 `main` → 用 GitHub Pages 地址抽查线上效果（Vercel 域名本机不可达）。
4. （可选，未排期）`tests/rendered-html.test.mjs` 为 `deepseek-balance-widget` / `nomad-seasons` / `ai-storyboard-studio` 补独立路由回归用例。

## 待办 / 风险
- **未提交改动清单（含上午 + 更早轮次）**：`app/content.ts`、`app/page.tsx`、`app/layout.tsx`、`app/globals.css`、`app/ProjectGallery.tsx`（新）、`app/ThemeToggle.tsx`（新）、`docs/handoff/HANDOFF.md`、`.gitignore`、以及 neat-freak 改的 `AGENTS.md`、`CLAUDE.md`、`README.md`、`docs/pm/PLAN.md`、`docs/qa/*`、`prompts/00,01,02,06`。
- 提交 / 推送需用户明确授权；推送口令「现在推送」，撤回即停。**不自动 commit/push**。
- 用户验收红线（ORCA 2026-09-28 产品验收规则）：关键用户可见操作须真实点击观察到结果，留证据；**用户预览确认前不得报完工**。
- `docs/model/GOVERNANCE-STATE.json` 的 `product_acceptance_ac_added` 仍为 `false`；账本 `docs/model/*.jsonl` 的 `_example` 行未删。
- 测试覆盖缺口：`deepseek-balance-widget`、`nomad-seasons`、`ai-storyboard-studio` 三条路由未纳入回归测试。
- 不删除 / 移动个人源照片；不臆造内容或联系方式；不暴露伪造 contact 链接。
- macOS 本机规矩：删文件用 `/usr/bin/trash`；不动 3100 端口的 Docker 服务。

## 关键文件索引
- 总入口：`AGENTS.md`；Claude 入口：`CLAUDE.md`
- 角色规范：`docs/roles/*.md`；启动提示词：`prompts/*.md`
- 当前需求 / 验收：`docs/pm/PLAN.md`
- 回归基线：`docs/qa/QA_CHECKLIST.md`；缺陷：`docs/qa/BUGS.md`
- 审查：`docs/review/CODE_REVIEW.md`；体验：`docs/review/PRODUCT_BACKLOG.md`
- 部署说明：`README.md`「发布」段、`国内托管部署清单.md`
- 照片指引：`照片替换说明.md`
- 本轮相关文件：`app/ThemeToggle.tsx`（主题切换）、`app/ProjectGallery.tsx`（作品筛选）、`app/globals.css`（1728 行起为主题覆盖块）
- 三主题参考：`~/Developer/coding/1.Active/017-ing-RSS聚合-个人信息雷达/apps/radar-web/design-concepts/concept-{a-dark-ops,b-aurora-glass,c-editorial}.html`（+ 同名 .png 截图）
