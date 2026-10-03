# AGENTS.md — 项目总入口 · 公共规则 · 文档路由

<!-- ORCA-RULES-BLOCK:BEGIN -->
<!-- 本区块由治理母版 scripts/sync-old-projects.sh 于 2026-09-29 注入；只增不删，可重复运行原地更新。 -->
<!-- 本项目 AGENTS.md 的其余内容（项目专属规矩）保持原样，冲突时以本区块为准。 -->
## ORCA 规则增量（母版 2026-09-29-产品验收）

> 本区块只写**对外通用**的机制增量；派工细节见 `docs/roles/`，账本口径见下方条目。

- **产品验收（2026-09-28 定）**：开发完成的判断来自**用户可见要求的覆盖证据**，不只看单测／构建／代码审查／工具调用成功。
  - 验收标准写在计划里：Phase1 给每条用户可见要求编一条可观察可测的**验收条目（AC）**，并标出**关键 AC**（对应 P0／blocking P1／核心用户路径／必要视觉交互呈现）；**关键 AC 集合不得为空**。
  - 证据落 `docs/qa/` 的**产品验收追踪矩阵**（照 `docs/qa/BUGS.template.md` 同名节）。
  - **不可放行三情形**（命中任一不得判 `PASS`）：①关键产品 DoD／AC 未测；②关键任务涉及的**每个**可见操作控件未实际点击并观察到页面／锚点／状态变化（只验 `href` 存在不算）；③验收证据缺失。
  - 视觉验收最小覆盖：关键用户任务逐条走通、按项目要求检查桌面与窄屏、用边界样本（奇偶条目数／长标题长正文／空状态）检验对齐·换行·裁切·溢出·可读性、留真实浏览器截图。
  - **用户签收**：发布类型为**首次发布**的，用户签收通过才算完成（签收前状态记未完成）；迭代更新与局部修复不强制签收。签收属 **Human Gate 范畴（用户参与）**，**不是新增 QA Gate**。
- **体系更新三件套（2026-09-29 定）**：①本项目规则文件改动后与母版对齐（用 `bash scripts/sync-old-projects.sh` 或按《迁移整理提示词》取包，**备份不覆盖**）；②账本内容**不重写**（实绩历史），只做 schema 校验 `node scripts/model/check-ledger.mjs docs/model`（须 `LEDGER-OK`）；③**HANDOFF 记一行**。**老项目无两包概念，故母版的「同步两包＋更新对外概览」不适用。**
- **派工跨目录禁令（2026-09-29 定）**：派 opencode 通道角色（supervisor／neat-freak／experience-recorder）时，任务里读写本仓以外目录（如 `/tmp`、`1.Active/` 等）会被 `external_directory` 权限自动拒、步骤静默失败，可能让角色误报已做也易反复盲试烧额度（禁盲试）；派单前处置二选一——①临时文件改到仓内已 gitignore 的 `temp/`，②先取得用户授权；codebuddy／codex 通道无此限制。
- **红线（2026-09-29 增补）**：产品验收未落盘或关键 AC 未测、不得报完工/收工；首次发布未取得用户签收、不得报完工/收工。
- **本项目迁移状态**：`docs/model/GOVERNANCE-STATE.json`（`rules_version`／`synced_at`／`project_phase_field`／`task_ledger_rows`／`agents_needs_manual_merge`／`product_acceptance_ac_added`）。
- **存量项目待办（不自动做，需项目 TM 判断）**：本项目实绩 Plan 需补「视觉与交互验收标准（AC 编号）＋关键 AC 集合＋发布类型」，否则新规则下收尾会被判**计划缺项**；完成后把 `product_acceptance_ac_added` 置 `true`。
<!-- ORCA-RULES-BLOCK:END -->


> 本文件是 AI 多 Agent 协作的总入口。任何 Agent 开始工作前必须先读取本文件，再按需读取 `docs/roles/` 下的角色规范与 `docs/` 下的项目文档。
> 协作规范基线：`AI编程项目模板-v2.2`（交接上下文 V1.0，2026-08-17 对齐）。

## 项目档案
- **项目名称**：后翻学长个人网站（houfan-xuezhang-personal-site）
- **定位**：非求职导向的个人展示站，以杂志叙事呈现个人经历、AI 应用与编程项目、兴趣生活、专题研究与联系方式。
- **线上地址**（双线，同一次 `main` push 自动同步，内容一致）：
  - Vercel（主）：https://houfan-xuezhang-site.vercel.app
  - GitHub Pages：https://wanghoufan.github.io/p003-houfan-xuezhang-site/
- **发布平台**：Vercel（主，项目 `houfan-xuezhang-site`）+ GitHub Pages（构建产物 `out/`，`.github/workflows/deploy.yml`）；OpenAI Sites 为历史平台，已停止更新
- **当前语言**：中文
- **维护原则**：保留事实措辞，不臆造项目、资质、联系方式或个人照片。

## 技术栈
- React 19 + TypeScript
- Next.js 16.2.6（App Router）+ Turbopack，构建层已由 vinext + Cloudflare Workers迁移至纯 Next.js（2026-08-21）
- `next.config.ts` 用 `output: "export"` 输出纯静态站点到 `out/`，以同时支持 Vercel 与 GitHub Pages
- `basePath` 由环境变量 `BASE_PATH` 注入：GitHub Pages 构建注入 `/p003-houfan-xuezhang-site`（仓库是项目页，带子路径），Vercel 不注入（走根路径）
- Tailwind v4（`app/globals.css`）

## 常用命令
- 安装依赖：`npm install`
- 本地开发：`npm run dev`（需 Node.js >=22.13.0）
- 正式构建 + 测试：`npm test`（构建首页、项目详情页、图片策略、关键链接）
- 仅构建：`npm run build`
- 代码检查：`npm lint`

## 源真值（Single Source of Truth）
- 个人 / 经历 / 兴趣 / 专题 / 项目内容：`app/content.ts`
- 联系方式 UI 与链接：`app/ContactPanel.tsx`
- 运行照片：`public/photos/*.webp`
- 项目封面：`public/projects/`
- 照片替换指引：`照片替换说明.md`
- 网站用 `public/photos/*.webp`（WebP）；JPG/PNG 高清原图备份在 `assets/photo-originals/`，不进公开站。

## 约定
- 一次 `git push`到 `main` 同时更新 Vercel 和 GitHub Pages 两条线，不新建站点、不新增部署平台。
- 保持中文文案与界面，除非用户明确要求改变。
- 保留语义标题、键盘可达、焦点态、alt 文本、reduced motion、响应式。
- 首屏头像 eager/high-priority 加载；非首屏兴趣图 lazy 加载。
- **不删除或移动** `public/photos/` 个人源照片（除非用户明确批准）。
- **不暴露**伪造或空的 contact 链接；不臆造项目 / 资质 / 联系方式。
- 提交 / 推送需用户明确授权，默认**不自动 commit/push**。

## 当前状态
- 公开首页已上线；已发布项目共 8 个（`app/content.ts` 为唯一真值，以下 `status:"published"`）：
  1. `cny-us-rate-board` 人民币兑美元汇率看板
  2. `deepseek-balance-widget` DeepSeek 余额悬浮小工具
  3. `nomad-seasons` 候鸟 / Nomad Seasons
  4. `ai-storyboard-studio` AI 图文短剧分镜生成器
  5. `50-haikou-cafes` 海口值得去的 50 家咖啡店
  6. `a-share-index-valuation-report` A股十一大指数十年估值分位报告
  7. `ai-resume-job-matcher` AI 简历岗位匹配助手
  8. `life-species-coze` 生活物种 · 测测你是什么生活物种
- 服务卡片 1 个：GPT 代充值（`app/content.ts` `services`）。**2026-10-03 起「Claude Code 中转服务」已按用户要求下架**（链接、封面图、测试断言一并移除，回归用例 `retired service stays removed from the page` 钉住）。
- 联系方式：微信二维码（`public/contact/wechat-qr.png`）、GitHub、YouTube 均已实现（`app/ContactPanel.tsx`）。
- 下一发版：沿用现有双线地址，必须通过 `npm test`；新增/调整项目内容改 `app/content.ts`，联系方式改 `app/ContactPanel.tsx`。
- 已知测试覆盖缺口：`tests/rendered-html.test.mjs` 已覆盖首页 + `cny-us-rate-board` + `50-haikou-cafes` / `a-share-index-valuation-report` / `ai-resume-job-matcher` / `life-species-coze` 路由，但尚未为 `deepseek-balance-widget` / `nomad-seasons` / `ai-storyboard-studio` 增加独立路由回归（见 `docs/qa/QA_CHECKLIST.md`）。

## 角色体系与文档路由
常驻 4 角色 + 复杂任务规划 + 修复模式 + 收尾模式。长规则独立放在 `docs/roles/`，Agent 只读取当前任务所需。

| 角色 | 关键词 | 规范 | 记录位置 |
| --- | --- | --- | --- |
| 技术规划师 | `【计划】` | `docs/roles/planner.md` | `docs/pm/PLAN.md` |
| 开发实现工程师 | `【开发】` | `docs/roles/builder.md` | （代码） |
| 代码审查工程师 | `【审查】` | `docs/roles/code-reviewer.md` | `docs/review/CODE_REVIEW.md` |
| 质量测试工程师 | `【测试】` | `docs/roles/qa.md` | `docs/qa/BUGS.md`、`docs/qa/QA_CHECKLIST.md` |
| 产品体验审查员 | `【产品】` | `docs/roles/product-reviewer.md` | `docs/review/PRODUCT_BACKLOG.md` |
| 修复（集中） | `【修复】` | `docs/roles/builder.md` | 同上 |
| 收尾 | `【收尾】` | `prompts/07-【收尾】neat-freak.md` | `docs/handoff/HANDOFF.md` |

启动提示词合集：`prompts/00-全部角色启动提示词合集.md`。

## 关键流程
- **标准开发流**：`【计划】` → 更新 `PLAN.md` → `【开发】` → `【审查】` → `【测试】` → `【产品】` → `【修复】` → `【测试】` 回归。
- **规划基线**：第一次正式 `PLAN.md` 形成或新增核心功能 / 实体时，【计划】必须检查并补充 `docs/qa/QA_CHECKLIST.md` 第一版回归基线。
- **缺陷分级**：Code Review / QA 的 P0、P1 与产品体验 P1 优先处理；P2/P3/Future 默认不自动开发。
- **修复闭环**：修复后先标记 `VERIFY`，未经独立 QA 回归不得直接标记 `CLOSED`。
- **收尾时机**：neat-freak 只在较大阶段完成、MVP/Release、长会话交接、文档失配或最终交付时运行，不在每次小改动后运行。

## 文件结构（实际）
```text
houfan-xuezhang-personal-site/
├── AGENTS.md            # 项目总入口（本文件）
├── CLAUDE.md            # Claude Code 入口（镜像本文件要点）
├── README.md            # 项目说明
├── 照片替换说明.md       # 照片替换指引
├── .gitignore
├── .github/workflows/deploy.yml  # push main → 构建 → 部署 GitHub Pages
├── .vercel/             # Vercel 项目关联（project.json，不进 Git）
├── next.config.ts       # output:"export" + 可选 basePath
├── app/                 # 源码（Next.js App Router：页面/组件/内容真值）
│   ├── content.ts       # 内容唯一真值
│   ├── ContactPanel.tsx # 联系方式
│   ├── globals.css      # 全站样式（Tailwind v4）
│   ├── page.tsx         # 首页
│   └── projects/[slug]/page.tsx
├── tests/               # 回归测试（rendered-html.test.mjs）
├── public/              # 静态资源（photos/*.webp、projects/、og.png）
├── assets/              # 高清原图备份（photo-originals/，不进公开站）
├── docs/                # 协作文档
│   ├── roles/           # 角色规范
│   ├── model/           # 治理状态与账本
│   ├── pm/PLAN.md
│   ├── qa/QA_CHECKLIST.md、BUGS.md
│   ├── review/CODE_REVIEW.md、PRODUCT_BACKLOG.md
│   ├── sop/             # 基础设施 SOP（docker/sqlite/supabase/webqa 等）
│   └── handoff/HANDOFF.md
├── prompts/             # 8 个启动提示词
├── out/                 # 静态导出产物（构建生成，不进 Git）
└── scratch/             # 临时/实验文件（不进 Git）
```

> 历史残留（Cloudflare Workers / OpenAI Sites 时代，已不参与构建，`tsconfig.json` 已 exclude）：
> `worker/`、`build/`、`db/`、`drizzle/`、`examples/`、`vite.config.ts`、`drizzle.config.ts`、`.openai/`。
> 保留原因：`.openai/hosting.json` 记录原 Sites `project_id`（仍入库）；其余为回滚备用。
> **2026-10-03 起其余残留已停止跟踪**（`.gitignore` 已加 `/worker/`、`/db/`、`/build/`、`/drizzle/`、`/examples/`、`vite.config.ts`、`drizzle.config.ts`），文件仍保留在工作区，彻底删除前需用户确认。
> 注：源码置于 `app/`（非规范模板默认的 `src/`），以兼容现有 `next.config.ts`、`npm test` 与双线托管，故未做迁移。

## 约束
- Agent 工作前必须先读 `AGENTS.md`。
- Agent 只读取当前任务真正需要的角色规范与项目文档，避免无关上下文膨胀。
- 禁止随意新增重复的项目管理 Markdown；同类信息只维护一个权威位置。
- 临时脚本、实验副本、一次性分析、截图、中间文件统一放 `scratch/`，且不进 Git。
- `.env*`、密钥、Token、私密配置不得提交。
- 开发者自测不能替代独立 QA；QA 不得仅凭 build/lint/单测/主流程成功就判定完整测试通过。
- 产品体验审查不退化成传统代码审查。
- 提交 / 推送需用户明确授权。
