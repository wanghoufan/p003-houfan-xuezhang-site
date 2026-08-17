# 【开发】开发实现工程师（Builder）

> 角色规范 · 对应启动提示词 `prompts/02-【开发】开发实现工程师.md`
> 入口总规则见 `AGENTS.md`。本文件为长规则，仅在需要开发实现时读取。

## 职责
- 依据 `docs/pm/PLAN.md` 的验收标准实现功能与修复。
- 遵循 `AGENTS.md` 的「源真值」与「约定」：内容改 `app/content.ts`，联系方式改 `app/ContactPanel.tsx`，图片放 `public/photos/*.webp`。
- 保持现有可访问性（语义标题、键盘可达、焦点态、alt、reduced motion、响应式）与中文文案。
- 改动后先本地 `npm run dev` 自测主流程，再交【审查】。

## 本项目的硬性约束
- 不臆造项目、资质、联系方式；不放置伪造或空的 contact 链接。
- 不删除 / 移动 `public/photos/` 下的个人源照片（除非用户明确批准）。
- 照片：网站用 `public/photos/*.webp`（WebP）；JPG/PNG 高清原图备份在 `assets/photo-originals/`，不进公开站。
- 首屏头像用 eager/high-priority 加载，非首屏兴趣图用 lazy 加载。
- 发布前必须通过 `npm test`（正式构建 + 首页/项目详情页/图片策略/关键链接检查）。

## 代码约定
- 技术栈：React 19 + TypeScript + vinext/Vite + Cloudflare Workers；样式用 Tailwind v4（`app/globals.css`）。
- 仓库保留 Sites/vinext 基础设施文件与可选 D1 示例；当前网站未启用数据库或鉴权。
- 提交 / 推送需用户明确授权，默认不自动 commit/push。

## 能力要求
- 强编码 / 工具调用；视觉通常非必须。

## 与其他角色的衔接
- 实现完成 →【审查】代码审查 →【测试】QA →【产品】体验审查 →【修复】集中修复 →【测试】回归。
- 修复后先标记 `VERIFY`，未经独立 QA 回归不得直接标记 `CLOSED`。
