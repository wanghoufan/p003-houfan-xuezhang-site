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

## 当前进度（2026-10-03 13:18 已推送 main）

**本轮已 commit + push 到 `main`，双线部署由 push 自动触发。** 本地预览 http://localhost:3000 仍在线。

1. **三主题切换（原「浅色主题」已升级为三主题）**：
   - `app/ThemeToggle.tsx`：单按钮改为 `role="group"` 三选项分段控件（指挥舱 `dark` / 极光 `glass` / 剪报 `paper`），`useSyncExternalStore` 实现，写 `<html data-theme>` + `localStorage.theme`。历史 `light` 值仍被白名单接受，但 UI 无入口。
   - `app/layout.tsx`：`themeInitScript` 白名单扩到 `dark|light|glass|paper`，**默认深色**。
   - `app/globals.css`：`html[data-theme="light"]`（1728–1862 行，保留兼容）+ 新增 `glass`（1864–2125 行，64 条规则）与 `paper`（2127–2435 行，91 条规则）两大块，均照 light 块的选择器清单改写。
     - `glass`：浅底 `#eef1fa` + 4 团极光 radial 光斑 + 白毛玻璃卡片；`--radius-card: 20px`、`--radius-chip: 999px`；chip 与主题选项激活态为 `linear-gradient(120deg,#6366f1,#06b6d4)` 渐变 + 白字；`body::before` 网格关、扫描线改静态渐变条。
     - `paper`：米色纸底 `#f7f2e9` + 墨色 `#1e1b16` + 报纸红 `#b3372e` / 墨绿 `#0f6b5f`；`--font-display` 改衬线栈（Songti SC / Noto Serif CJK SC / SimSun）；全部 `text-shadow` 与发光 `box-shadow` 去除；`body::before` 网格与 `body::after` 扫描线 `display: none`；分隔线改双线（`3px double`）。
   - `eslint.config.mjs`：`globalIgnores` 补 `temp/**`、`scratch/**`、`二维码/**`（原先只忽略 `.next/out/build`，导致 `temp/` 下的 Playwright 脚本被 lint 报 3 个 `no-require-imports` error）。
2. **作品分类筛选 + 总数**（上午会话完成）：
   - `app/content.ts`：`ProjectCategory`（`web` / `desktop` / `ai` / `report`）+ `projectCategoryLabels` + `Project.category` 必填。当前归属：网页应用 3（cny-us-rate-board、nomad-seasons、50-haikou-cafes）、桌面工具 1（deepseek-balance-widget）、AI 应用 3（ai-storyboard-studio、ai-resume-job-matcher、life-species-coze）、数据报告 1（a-share-index-valuation-report）。
   - `app/ProjectGallery.tsx`：客户端筛选 chip + 计数；`page.tsx` 页头改为 `wordmark + .header-right(nav + ThemeToggle)`。

### 本轮验证证据
- `npm test` **5/5 通过**；`npm run lint` **0 error**（余 6 条历史 `<img>` warning，非本轮引入）。
- Playwright（Chrome，1440×900 + 390×844）三主题各截图，**真实点击** `[data-theme-option]` 切换而非直接写 dataset：
  - 三主题 `data-theme` 与 `localStorage.theme` 均与点击一致，`aria-pressed` / `.is-active` 标签正确（指挥舱 / 极光 / 剪报）。
  - 持久化实测：设 `glass` → reload 仍 `glass`；设 `paper` → reload 仍 `paper`。
  - 目检通过：hero、头像、项目卡、筛选条、联系区、子页 `/projects/ai-storyboard-studio`，桌面与 390px 窄屏均无错位 / 裁切 / 溢出 / 横向滚动。
  - 截图 18 张在 `temp/theme-shots/`（9.6MB，`temp/` 已 gitignore，**不入库**）；结论已落 `docs/qa/QA_CHECKLIST.md`「三主题切换回归」节。
- 本地预览 http://localhost:3000 在线（Next dev server，首页 200）；3100 被 Docker prompt-manager 占用，本项目固定 3000。
- **Playwright 不在本项目 node_modules**：需用托管 workspace 跑
  `NODE_PATH=/Users/zzymima0000/.workbuddy/binaries/node/workspace/node_modules /Users/zzymima0000/.workbuddy/binaries/node/versions/22.22.2-5/bin/node temp/theme-shots.cjs`
  （`channel: "chrome"` 用本机 Google Chrome，已安装）。

### 既有基础（已核实，勿重复踩）
- **部署双线**：Vercel `https://houfan-xuezhang-site.vercel.app`（主）+ GitHub Pages `https://wanghoufan.github.io/p003-houfan-xuezhang-site/`，同一次 `main` push 自动同步。`next.config.ts` 的 `basePath` 由 `BASE_PATH` 环境变量条件注入，**改 basePath 相关代码必须同时验证两条线**。
- 本机网络出口限制：`*.vercel.app` curl 超时无法验证生产页，只能 `vercel ls` / `vercel inspect` 看状态；`*.github.io` 可正常抓取。
- **双线同步已实测确认（2026-10-03 15:15）**：`vercel ls --format json` 显示 Vercel 最新 6 个 production 部署的 `meta.githubCommitSha` 依次是 `4830555` `5ff07de` `82dc1c5` `fe3a201` `43751d3` `1223bd4`，`githubCommitRef` 全部为 `main`、`githubRepo` 全部为 `p003-houfan-xuezhang-site` —— 与本地当天 push 的 commit **一一对应且状态 READY**，证明 Vercel 的 Git 集成在线、push 后自动部署，无需手动操作。
  - 核查命令：`vercel ls --format json | python3 -c "import json,sys; ..."` 读 `meta.githubCommitSha` 比对 `git log --oneline`。
  - `vercel ls` 的 `Age` 列显示相对时间；`--format json` 里的 `created` 字段解析成本地时区会错位（显示 01-01 08:00），**判断是否同步要看 commit SHA，不要看时间**。
- **新增主题的固定流程**：在 `app/globals.css` 末尾照 `html[data-theme="light"]` 块的选择器清单复制一份改值 → 在 `app/layout.tsx` 的 `themeInitScript` 白名单加 ID → 在 `app/ThemeToggle.tsx` 的 `THEMES` 数组加一项。漏白名单会导致首屏闪烁回默认深色。

## 下一步任务（按优先级）
1. **作品分类归属修正**（用户原话：「目前没有办法修改形态的筛选，现在给我分配的是错的」）：
   - 已向用户逐项列出 8 个项目的当前归属，等用户指定哪个归错 → 直接改 `app/content.ts` 对应 `category` 字段（一行的事）。
   - 若用户想要界面内自助修改，再在 `ProjectGallery.tsx` 加「编辑模式」：卡片上点分类徽章弹出 select，覆盖写 `localStorage`（纯静态站只能存浏览器本地，需向用户说明不能跨设备 / 访客生效）。
2. **用户签收三主题**（ORCA 2026-09-28 产品验收红线）：用户在 http://localhost:3000 逐个切换三主题确认视觉与交互后，才算本轮收尾。
3. 用户确认后：commit（建议 `feat: 三主题切换与作品分类筛选`）→ 用户口令「现在推送」→ push 到 `main` → 用 GitHub Pages 地址抽查线上效果（Vercel 域名本机不可达）。
4. （可选，未排期）`tests/rendered-html.test.mjs` 为 `deepseek-balance-widget` / `nomad-seasons` / `ai-storyboard-studio` 补独立路由回归用例。

## 待办 / 风险
- **未提交改动清单**：`app/ThemeToggle.tsx`（新）、`app/ProjectGallery.tsx`（新）、`app/globals.css`、`app/layout.tsx`、`app/content.ts`、`app/page.tsx`、`eslint.config.mjs`、`docs/handoff/HANDOFF.md`、`docs/qa/QA_CHECKLIST.md`，以及 neat-freak 改的 `CLAUDE.md`、`README.md`、`docs/pm/PLAN.md`、`docs/qa/BUGS.md`、`prompts/00,01,02,06`、`国内托管部署清单.md`。
- **截图不入库**：`temp/theme-shots/` 18 张 9.6MB，`temp/` 已在 `.gitignore`，避免撑大仓库。
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
- 本轮相关文件：`app/ThemeToggle.tsx`（三主题分段切换器）、`app/ProjectGallery.tsx`（作品筛选）、`app/globals.css`（1728 行起 `light`，1864 起 `glass`，2127 起 `paper`）、`app/layout.tsx`（`themeInitScript` 白名单）、`eslint.config.mjs`（补 temp/scratch 忽略）
- 截图证据：`temp/theme-shots/`（不入库）；回归结论：`docs/qa/QA_CHECKLIST.md`「三主题切换回归」节

### 分类与卡片链接（2026-10-03 12:40追加）
1. **分类修正**：`ai-storyboard-studio`、`ai-resume-job-matcher` 由 `category:"ai"` 改为 `"web"`（用户指出「AI 应用其实都是网页」）。现为**网页应用 7 / 桌面工具 1**；`ai` 与 `report` 计数归零，`ProjectGallery` 的 `.filter(count > 0)` 自动隐藏空分类 chip，属预期。
2. **曾做的`CategoryEditor` 已按用户要求整体删除**（`app/CategoryEditor.tsx` 已 trash）。删除理由：展示站的访客主路径上不该放开发者运维入口；纯静态站的内容修改应改`content.ts` 源真值 + push（双线一次同步），而非浏览器 localStorage 覆盖层。**教训已记入日志。**
3. **修 4 个失效 GitHub 链接**（`gh repo view` 核实，仓库均已改名，原链接是死链）：`cny-us-rate-board`→`p036-cny-us-rate-board`；`DeepSeekBalanceWidget`→`DeepSeekBalanceWidget-Windows`；`a-share-index-valuation-report`→`p023-a-share-index-valuation`；`life-species-coze-v1.3`→`p002-life-species-test`。另补 2 个缺失：`ai-storyboard-studio`→实际仓库 `ai-storyboard-generator`、`ai-resume-job-matcher` 补 GitHub 链接。
4. **`Project` 新增可选 `siteUrl?` / `repoUrl?`**（注释明确：不为凑两个而编造链接）。8 项目中 6 个有 site+repo；`cny-us-rate-board`、`deepseek-balance-widget` 只有 repo（前者未部署在线站、后者是桌面工具）。
5. **卡片底部只放两个「成果」入口**（用户第二次纠正：卡片不是作品集归档入口，而是**给访客看成果**）：
   - 按钮 1（主）= **查看成品** → `siteUrl`；桌面应用无网站则显示 **下载应用** → `releaseUrl`。
   - 按钮 2（次）= **GitHub 页面** → `repoUrl`。
   - **「项目档案」已按用户第三次要求彻底删除**（文字链接、标题链接、封面链接全部移除，封面改 `<div>` 纯展示，`next/link` 导入已去掉）。卡片只剩两个成果按钮。
   - `Project` 新增 `releaseUrl?`：`cny-us-rate-board`（无部署站点，`gh api deployments` 为空）与 `deepseek-balance-widget`（桌面工具）指向 `releases/latest`；其余 6 个走 `siteUrl`。
   - 外链均带 `target="_blank" rel="noreferrer noopener"`。`.project-card` 为 `display:flex; flex-direction:column`，按钮 `margin-top:auto` 贴底对齐。glass 胶囊 + 渐变主按钮，paper 方角 + 红底。
   - **教训：作品卡片的按钮语义应是「成果本身」，不是「站内导航」。**
6. **卡片极简化 + 4×2 一屏**（用户第三次要求：卡片太长、标签没用、一页只显示 3 个不行）：
   - 删掉 `.project-tags` 标签区（用户原话：「用户不关心你有什么标签」）。
   - 网格 3 列 → `repeat(4, minmax(0, 1fr))`；`.project-card` 去掉 `min-height: 350px`、padding 28→20px；封面 16/10→16/9；`h3` 26→20px；摘要 `.project-summary` 用 `-webkit-line-clamp: 3` 截断。
   - 响应式：1180px→3 列，1040px→2 列，760px→1 列。
   - 量测：1440×900 与 1280×800 均为 **4 列 2 行、8 个作品一屏全可见**（卡片 382px，网格区 809px < 视口高）；390px 1 列 8 行无横向滚动。
7. **下架「Claude Code 中转服务」**（用户要求删链接 + 相关内容）：`content.ts` 的 `services` 删除该条目；`public/services/claude-code-relay.png`（545KB）已 trash；无残留引用。`.service-grid` 由固定 `repeat(2, 480px)` 改为 `repeat(auto-fit, minmax(min(100%,420px), 520px))`（单卡时不占半边空位，加回第二张会自动并排）。新增测试 `retired service stays removed from the page` 钉住下架状态。服务卡现只剩 `GPT 代充值` 1 张。
8. **测试 7/7**：原用例 2 断言的正是那个死链，已更新为新仓库名；新增用例 `every project repoUrl points at a real renamed repository` 钉住 8 个真实仓库名，防再次静默变死链。`npm run lint` 0 error。
- 三主题参考：`~/Developer/coding/1.Active/017-ing-RSS聚合-个人信息雷达/apps/radar-web/design-concepts/concept-{a-dark-ops,b-aurora-glass,c-editorial}.html`（+ 同名 .png 截图）

## 2026-10-03 收尾：洁癖清理 + push（已完成）

**已推送 commit：**
- `43751d3feat: 作品分类修正、卡片极简化与下架中转服务`
- `fe3a201 fix: 封面图外链统一用改后的仓库名`

**清理清单（自主判定）：**
| 项 | 处理 | 理由 |
| --- | --- | --- |
| `docs/qa/theme-shots/` 12 张截图（5.4MB） | 从索引移除 + 删工作区 | 误入库；`temp/theme-shots/` 已有 37 张副本且已 gitignore |
| `.glass-panel` 死代码（1 主规则 + 3 主题覆盖） | 删除 | 全项目 0 处引用 |
| Cloudflare 时代残留 9 文件（`worker/ db/ build/ drizzle/ examples/ vite.config.ts drizzle.config.ts`） | `git rm --cached` + `.gitignore` | 只互相引用、对构建零参与（`tsconfig.json` 已 exclude）；**文件保留在工作区**，彻底删除前需用户确认。`.openai/hosting.json` 保留入库（记录原 Sites project_id） |
| 临时验证脚本 `temp/verify-*.cjs` | trash | 一次性产物；`temp/theme-shots/` 保留作证据 |
| 文档表述不一致（服务卡 2 个） | 同步 4 处 | `AGENTS.md` / `README.md` / `docs/pm/PLAN.md` / `docs/qa/QA_CHECKLIST.md` |

**核查后决定保留**：4 个封面图外链原用改名前的仓库名，靠 GitHub 重定向仍 200；已顺手统一为真实仓库名（`p023-a-share-index-valuation` / `DeepSeekBalanceWidget-Windows`），新路径 curl 验证 200。

**最终状态**：`npm test` **7/7**、`npm run lint` 0 error（6 条历史 `<img>` warning）。GitHub Pages 构建 `success`，线上抽查：中转服务 0 残留、旧仓库名 0 残留、三主题齐全、8 个新仓库名全部上线。

## 仍待用户处理
1. **失效的成品站点**（用户 2026-10-03 12:31 提到「有一些项目现在打不开了，我会再整理一下」）：
   - `ai-resume-job-matcher-houfan.vercel.app`（AI 简历岗位匹配助手）
   - `ai-storyboard-studio-2026.mortimerstephanie14.chatgpt.site`（AI 分镜生成器，ChatGPT 临时域名，长期易失效，建议换自有域名）
   - `5dnqscfrmp.coze.site`（生活物种，Coze 分享链接，平台改动即失效）
   本机 curl 测 `*.vercel.app` 全部返回 000（已知网络限制），线上实际是否活着本机无法确认。
2. **Git 历史有一条不干净的记录**：`dd2b4d1` / `1223bd4` 两个 commit 由外部（非本智能体）创建且已推到 origin，其中 `1223bd4` 曾把 12 张截图入库；`43751d3` 已把这些截图移出索引，但 **`.git` 历史里仍留有约 5.4MB 截图对象**（`.git` 总 63M）。如需彻底瘦身需 rewrite history + force push，风险与影响面须先评估。
3. `docs/model/GOVERNANCE-STATE.json` 的 `product_acceptance_ac_added` 仍为 `false`；账本 `docs/model/*.jsonl` 的 `_example` 行未删。
4. `deepseek-balance-widget` / `nomad-seasons` / `ai-storyboard-studio` 三条路由仍未纳入 `tests/rendered-html.test.mjs` 独立用例。
- 2026-10-07（项目管家会话）：新增首页分区「03 方法与体系」，收录 Skill 能力地图（`skill-system-map`，已发布、在线站实测 200）与 ORCA 治理模板（`orca-governance-template`，源码公开、无在线站故 `cover:null`）；`Project` 加 `section` 字段、`ProjectCategory` 加 `template`，后续区块编号顺延至 07；`npm test` 10/10 通过（含三处钉桩与新区块断言）；1440 与 500 两档实测封面等高（159 / 230.1px）、卡片零重叠、无横向溢出；已发布条目 25 → 27，与 GitHub 主页 README 27 条对齐。fork 仓 `CodexBar`、`p042-aihot` 按用户决定暂不计入作品。
