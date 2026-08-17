# HANDOFF.md — 交接上下文

> 在重要阶段完成、MVP / Release、长会话交接或文档失配时由【收尾】neat-freak 更新。
> 入口总规则见 `../../AGENTS.md`。

## 项目一页纸
- 项目名称：后翻学长个人网站（houfan-xuezhang-personal-site）
- 定位：非求职导向的个人展示站（杂志叙事呈现经历 / AI 应用与编程项目 / 兴趣生活 / 专题研究 / 联系方式）。
- 技术栈：React 19 + TypeScript + vinext/Vite + Cloudflare Workers + Tailwind v4；OpenAI Sites 托管。
- 源真值：`app/content.ts`（内容，7 个已发布项目 + 2 服务卡片）、`app/ContactPanel.tsx`（联系方式）、`public/photos/*.webp`（照片）、`public/projects/`（封面）、`public/contact/wechat-qr.png`（微信二维码）。
- 常用命令：`npm install` / `npm run dev` / `npm test` / `npm run build` / `npm lint`。
- 发布：沿用 `.openai/hosting.json` 的 `project_id`，不新建站点；发布前 `npm test`。

## 当前进度（neat-freak 更新于 2026-08-17）
- 协作框架已就位：`AGENTS.md`(总入口) + `CLAUDE.md`(镜像) + `README.md` + `docs/`(roles/pm/qa/review/handoff) + `prompts/`(8 启动提示词) + `scratch/`。
- 文档与代码事实对齐完成：原 `AGENTS.md`/`README.md`「当前状态」仅写 `cny-us-rate-board` 已上线，实际已发布 7 个项目 + 2 服务卡片；已更正（以 `app/content.ts` 为唯一真值）。
- 运行验证：构建编译通过（138 模块）；`node --test tests/rendered-html.test.mjs` 4/4 通过。
- 源码按 vinext 约定留在 `app/`，未迁移到规范模板默认的 `src/`（详见 `模板冲突与优化方案.md`）。

## 待办 / 风险
- 提交 / 推送需用户明确授权，默认不自动 commit/push（当前 `docs/`、`prompts/`、`CLAUDE.md`、`.gitignore`、`AGENTS.md` 改动均未提交）。
- 不删除 / 移动个人源照片；不臆造内容或联系方式。
- 测试覆盖缺口：`deepseek-balance-widget`、`nomad-seasons`、`ai-storyboard-studio` 路由未纳入独立回归（见 `QA_CHECKLIST.md`）。
- 环境约束：`npm test` 在本沙箱因 `sites` 插件 safe-delete 调 WorkBuddy trash 超时而非 0；发布前请在开发机复核。
- 视觉 / 浏览器回归建议由具备视觉能力的 Agent 执行，否则明确标记未覆盖。

## 关键文件索引
- 总入口：`AGENTS.md`；Claude 入口：`CLAUDE.md`
- 角色规范：`docs/roles/*.md`；启动提示词：`prompts/*.md`
- 当前需求 / 验收：`docs/pm/PLAN.md`
- 回归基线：`docs/qa/QA_CHECKLIST.md`；缺陷：`docs/qa/BUGS.md`
- 审查：`docs/review/CODE_REVIEW.md`；体验：`docs/review/PRODUCT_BACKLOG.md`
- 模板冲突分析：`模板冲突与优化方案.md`
- 照片指引：`照片替换说明.md`
