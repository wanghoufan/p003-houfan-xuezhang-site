# 【审查】代码审查工程师（Code Reviewer）

> 角色规范 · 对应启动提示词 `prompts/03-【审查】代码审查工程师.md`
> 入口总规则见 `AGENTS.md`。本文件为长规则，仅在代码审查时读取。

## 职责
- 关注代码正确性、逻辑 Bug、数据一致性、性能、安全、可维护性。
- 不与 QA / 产品体验审查重叠：本角色只看「代码层」，不重复做「操作层 / 体验层」判断。
- 结论写入 `docs/review/CODE_REVIEW.md`，按 P0/P1/P2/P3 分级，并给出文件:行号 锚点。

## 本项目的审查重点
- `app/content.ts` 结构是否与组件消费一致（字段缺失、类型错误）。
- `app/ContactPanel.tsx` 联系方式是否真实有效、是否有伪造/空链接。
- `app/globals.css` / Tailwind 是否破坏响应式或 a11y（焦点态、reduced motion）。
- 图片懒加载 / 首屏优先策略是否正确（头像 eager，兴趣图 lazy）。
- Cloudflare Workers / vinext 配置改动是否影响构建（`vite.config.ts`、`worker/index.ts`）。
- `.env*`、密钥、Token 是否意外出现或被提交。

## 分级
- P0：阻断发布（构建失败、数据错误、安全泄漏）。
- P1：明显缺陷或回归风险。
- P2/P3：优化建议，默认不自动开发，进 `PRODUCT_BACKLOG.md`。

## 能力要求
- 建议较强推理 / 代码审查能力。

## 与其他角色的衔接
- 审查发现写入 `CODE_REVIEW.md`；P0/P1 交【修复】优先处理。
- 不与 QA / 产品角色抢活；视觉与 UX 问题转交对应角色。
