# CLAUDE.md — Claude Code 入口

> 镜像 `AGENTS.md` 要点，供 Claude Code / 类 Claude 工具快速读取。完整规则以 `AGENTS.md` 为准。

## 项目
- 后翻学长个人网站（houfan-xuezhang-personal-site）：非求职导向的个人展示站，中文。
- 线上（双线，一次 push 同步；**对外一律给 GitHub Pages，国内打开更快**）：GitHub Pages（对外主地址）`https://wanghoufan.github.io/p003-houfan-xuezhang-site/`｜Vercel（镜像备用）`https://houfan-xuezhang-site.vercel.app`

## 技术栈
- React 19 + TypeScript + Next.js 16.2.6（App Router）+ Turbopack + Tailwind v4。
- `next.config.ts` 用 `output: "export"` 输出纯静态站到`out/`；`basePath` 由 `BASE_PATH` 注入（Pages 走子路径，Vercel 走根路径）。

## 常用命令
- `npm install` / `npm run dev`（需 Node >=22.13.0）/ `npm test` / `npm run build` / `npm lint`

## 源真值
- 内容：`app/content.ts`（8 个已发布项目 + 2 服务卡片）；联系方式：`app/ContactPanel.tsx`；照片：`public/photos/*.webp`；封面：`public/projects/`；照片指引：`照片替换说明.md`

## 硬性约定
- 不臆造项目 / 资质 / 联系方式 / 照片；不放置伪造或空 contact 链接。
- 不删除或移动 `public/photos/` 个人源照片（除非用户明确批准）。
- 一次 `git push` 到 `main` 同时更新 Vercel 与 GitHub Pages，不新建站点、不新增部署平台。
- 保持中文、语义标题、键盘可达、焦点态、alt、reduced motion、响应式。
- 首屏头像 eager，非首屏兴趣图 lazy。
- 提交 / 推送需用户明确授权，默认不自动 commit/push。

## 协作框架
- 角色规范：`docs/roles/*.md`；当前需求：`docs/pm/PLAN.md`；回归基线：`docs/qa/QA_CHECKLIST.md`；缺陷：`docs/qa/BUGS.md`；代码审查：`docs/review/CODE_REVIEW.md`；体验：`docs/review/PRODUCT_BACKLOG.md`；交接：`docs/handoff/HANDOFF.md`；启动提示词：`prompts/*.md`。
- 标准流：`【计划】`→`【开发】`→`【审查】`→`【测试】`→`【产品】`→`【修复】`→`【测试】`回归。
- 临时文件放 `scratch/`，不进 Git；`.env*`/密钥不提交。
