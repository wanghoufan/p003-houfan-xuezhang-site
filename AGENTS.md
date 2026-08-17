# AGENTS.md — 项目总入口 · 公共规则 · 文档路由

> 本文件是 AI 多 Agent 协作的总入口。任何 Agent 开始工作前必须先读取本文件，再按需读取 `docs/roles/` 下的角色规范与 `docs/` 下的项目文档。
> 协作规范基线：`AI编程项目模板-v2.2`（交接上下文 V1.0，2026-08-17 对齐）。

## 项目档案
- **项目名称**：后翻学长个人网站（houfan-xuezhang-personal-site）
- **定位**：非求职导向的个人展示站，以杂志叙事呈现个人经历、AI 应用与编程项目、兴趣生活、专题研究与联系方式。
- **线上地址**：https://houfan-xuezhang.mortimerstephanie14.chatgpt.site
- **发布平台**：OpenAI Sites（已关联 `.openai/hosting.json` 的 `project_id`）
- **当前语言**：中文
- **维护原则**：保留事实措辞，不臆造项目、资质、联系方式或个人照片。

## 技术栈
- React 19 + TypeScript
- vinext / Vite（Next.js 兼容路由）
- Cloudflare Workers 运行时
- Tailwind v4（`app/globals.css`）
- 托管：OpenAI Sites；基础设施文件沿用 Sites/vinext，保留可选 D1 示例（当前网站未启用数据库或鉴权）

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
- 沿用现有 Sites `project_id`，不新建第二个站点。
- 保持中文文案与界面，除非用户明确要求改变。
- 保留语义标题、键盘可达、焦点态、alt 文本、reduced motion、响应式。
- 首屏头像 eager/high-priority 加载；非首屏兴趣图 lazy 加载。
- **不删除或移动** `public/photos/` 个人源照片（除非用户明确批准）。
- **不暴露**伪造或空的 contact 链接；不臆造项目 / 资质 / 联系方式。
- 提交 / 推送需用户明确授权，默认**不自动 commit/push**。

## 当前状态
- 公开首页已上线；已发布项目共 7 个（`app/content.ts` 为唯一真值，以下 `status:"published"`）：
  1. `cny-us-rate-board` 人民币兑美元汇率看板
  2. `deepseek-balance-widget` DeepSeek 余额悬浮小工具
  3. `nomad-seasons` 候鸟 / Nomad Seasons
  4. `ai-storyboard-studio` AI 图文短剧分镜生成器
  5. `50-haikou-cafes` 海口值得去的 50 家咖啡店
  6. `a-share-index-valuation-report` A股十一大指数十年估值分位报告
  7. `ai-resume-job-matcher` AI 简历岗位匹配助手
- 服务卡片 2 个：GPT 代充值、Claude Code 中转服务（`app/content.ts` `services`）。
- 联系方式：微信二维码（`public/contact/wechat-qr.png`）、GitHub、YouTube 均已实现（`app/ContactPanel.tsx`）。
- 下一发版：沿用同一公开 URL，必须通过 `npm test`；新增/调整项目内容改 `app/content.ts`，联系方式改 `app/ContactPanel.tsx`。
- 已知测试覆盖缺口：`tests/rendered-html.test.mjs` 已覆盖首页 + `cny-us-rate-board` + `50-haikou-cafes` / `a-share-index-valuation-report` / `ai-resume-job-matcher` 路由，但尚未为 `deepseek-balance-widget` / `nomad-seasons` / `ai-storyboard-studio` 增加独立路由回归（见 `docs/qa/QA_CHECKLIST.md`）。

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
├── .openai/             # OpenAI Sites 托管配置（hosting.json）
├── app/                 # 源码（vinext 约定：页面/组件/内容真值）
│   ├── content.ts       # 内容唯一真值
│   ├── ContactPanel.tsx # 联系方式
│   ├── globals.css      # 全站样式（Tailwind v4）
│   ├── page.tsx         # 首页
│   └── projects/[slug]/page.tsx
├── worker/              # Cloudflare Workers 入口
├── build/               # Sites vite 插件等构建辅助
├── db/ drizzle/         # 可选 D1 示例 / drizzle 配置
├── examples/ tests/     # 示例 / 测试（tests/rendered-html.test.mjs）
├── public/              # 静态资源（photos/*.webp、projects/）
├── assets/              # 高清原图备份（photo-originals/，不进公开站）
├── docs/                # 协作文档（本规范对齐新增）
│   ├── roles/           # 5 个角色规范
│   ├── pm/PLAN.md
│   ├── qa/QA_CHECKLIST.md、BUGS.md
│   ├── review/CODE_REVIEW.md、PRODUCT_BACKLOG.md
│   └── handoff/HANDOFF.md
├── prompts/             # 8 个启动提示词
└── scratch/             # 临时/实验文件（不进 Git）
```
> 注：源码按 vinext 约定置于 `app/`（非规范模板默认的 `src/`），以兼容 `vite.config.ts`、`npm test` 与 OpenAI Sites 托管，故未做迁移。

## 约束
- Agent 工作前必须先读 `AGENTS.md`。
- Agent 只读取当前任务真正需要的角色规范与项目文档，避免无关上下文膨胀。
- 禁止随意新增重复的项目管理 Markdown；同类信息只维护一个权威位置。
- 临时脚本、实验副本、一次性分析、截图、中间文件统一放 `scratch/`，且不进 Git。
- `.env*`、密钥、Token、私密配置不得提交。
- 开发者自测不能替代独立 QA；QA 不得仅凭 build/lint/单测/主流程成功就判定完整测试通过。
- 产品体验审查不退化成传统代码审查。
- 提交 / 推送需用户明确授权。
