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

## 当前进度（2026-10-03 中午更新：三主题已上线并推送）

### 已完成且已推送（commit `dd2b4d1`，main）
1. **三主题切换**（本轮完成，此前只有深/浅两主题）：
   - `app/ThemeToggle.tsx`：重写为 `role="group"` 三选项分段控件——指挥舱（`dark`）/ 极光（`glass`）/ 剪报（`paper`），每项带 `data-theme-option` 便于自动化点击；沿用 `useSyncExternalStore` + `<html data-theme>` + `localStorage.theme`，**默认 dark**。
   - `app/layout.tsx`：`themeInitScript` 白名单扩为 `dark|light|glass|paper`（`light` 为历史兼容保留）。
   - `app/globals.css`：删掉旧 `.theme-toggle`，新增 `.theme-switch` / `.theme-option`（含 760px 窄屏档）；文件末尾追加 `html[data-theme="glass"]` 与 `html[data-theme="paper"]` 两个完整主题块（选择器清单照 `light` 块复制再改值）。
     - **glass 极光玻璃**：`#eef1fa` 浅底 + 四团极光 radial-gradient + `rgba(255,255,255,.58)` 毛玻璃卡片 + 靛青→青渐变 `--aurora-gradient`；卡片/筛选条/对话框统一 20px 圆角，chip 与主题切换器 999px 胶囊，激活态走渐变。
     - **paper 情报剪报**：`#f7f2e9` 纸底 + 墨色 `#1e1b16` + 报纸红 `#b3372e` / 墨绿 `#0f6b5f`；`--font-display` 改 Songti SC / Noto Serif CJK SC 衬线栈，去掉全部 `text-shadow` 与发光 `box-shadow`，`body::before` 网格 + `body::after` 扫描线 `display:none`，分隔线改单线/双线（`3px double`）。
2. **作品分类修正**（用户裁定）：`a-share-index-valuation-report`（A股估值分位报告）与 `life-species-coze`（生活物种）由 `ai` / `report` 改归 `web`。现为：网页应用 5、桌面工具 1、AI 应用 2；`report` 类暂无项目，筛选条按 `count>0` 自动隐藏该 chip（`ProjectCategory` 类型保留备用）。
3. 此前已完成并同批推送：浅色主题（`light`）、作品分类筛选 + 计数（`ProjectGallery.tsx`）。

### 本轮验证证据
- `npm test` 5/5 通过、`npm run lint` **0 error**（6 个 `no-img-element` warning 为历史遗留，非本轮引入）。
- Playwright（系统 Chrome，`channel: "chrome"`）**真实点击**分段切换器验证，1440×900 + 390×844 各三主题：`data-theme`、`aria-pressed` 激活项、`localStorage.theme` 三者一致；重载后 `glass` / `paper` 均正确保持（防闪烁脚本生效）。
- 截图证据落 `docs/qa/theme-shots/`：`{desktop,narrow}-{dark,glass,paper}.png` + 各自 `-filter.png` 筛选条特写。
- 本地预览 http://localhost:3000 在线（Next dev server）；3100 被 Docker prompt-manager 占用，本项目固定 3000。
- 已 push 到 `main`（`8874ffa..dd2b4d1`），Vercel 与 GitHub Pages 应已自动同步，**线上效果待用户抽查**。

### 既有基础（已核实，勿重复踩）
- **部署双线**：Vercel `https://houfan-xuezhang-site.vercel.app`（主）+ GitHub Pages `https://wanghoufan.github.io/p003-houfan-xuezhang-site/`，同一次 `main` push 自动同步。`next.config.ts` 的 `basePath` 由 `BASE_PATH` 环境变量条件注入，**改 basePath 相关代码必须同时验证两条线**。
- 本机网络出口限制：`*.vercel.app` curl 超时无法验证生产页，只能 `vercel ls` / `vercel inspect` 看状态；`*.github.io` 可正常抓取。
- **Playwright 截图脚本**：`temp/theme-shots.cjs`（`temp/` 已 gitignore）。本机 playwright-core 1.62.1 期望的 chromium build 未装，**必须传 `chromium.launch({ channel: "chrome" })` 用系统 Chrome**，否则报 `Executable doesn't exist`。
- **`next build` 会清空 `docs/qa/theme-shots/`** 之外的非产物目录不稳定：实测 `npm test`（含 build）后该目录内容会消失，截图证据需在 build 之后重新生成再入库。

## 下一步任务（按优先级）
1. **用户线上抽查**：GitHub Pages 地址打开首页，依次点三个主题按钮确认视觉与刷新保持；有问题回报具体主题 + 视口宽度。
2. （待用户定）**作品分类界面内自助编辑**：如需，在 `ProjectGallery.tsx` 加「编辑模式」：卡片上点分类徽章弹出 select，覆盖写 `localStorage`。**注意**：纯静态站只能存浏览器本地，不能跨设备/访客生效，需向用户说明。
3. （可选，未排期）`tests/rendered-html.test.mjs` 为 `deepseek-balance-widget` / `nomad-seasons` / `ai-storyboard-studio` 补独立路由回归用例；以及为三主题切换补一条渲染回归断言（如 themeInitScript 白名单含四个值、ThemeToggle 渲染三个 `data-theme-option`）。
4. （可选）若觉得 `report` 分类长期空置，可考虑把该 chip 保留但显示为「报告与指南」，或直接从 `projectCategoryLabels` 移除（需同步 `ProjectCategory` 类型）。

## 待办 / 风险
- 工作区当前应干净（`dd2b4d1` 已推送）；唯一未入库产物是 `docs/qa/theme-shots/` 截图（下一轮 build 会清掉，如需长期留证建议改名到 `docs/qa/theme-shots-归档/` 或写入 BUGS/QA 文档引用）。
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
