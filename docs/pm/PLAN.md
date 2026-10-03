# PLAN.md — 当前需求与验收标准

> 由【计划】技术规划师维护。本文件只记录「当前进行中」的需求；长期回归基线见 `../qa/QA_CHECKLIST.md`。
> 入口总规则见 `../../AGENTS.md`。

## 当前状态（neat-freak 核对于 2026-10-03，以代码事实为准）
- 公开首页已上线，**双线部署**：Vercel（主）`https://houfan-xuezhang-site.vercel.app` + GitHub Pages `https://wanghoufan.github.io/p003-houfan-xuezhang-site/`；同一次 `main` push 自动同步。
- 已发布项目 **8 个**（`app/content.ts` `status:"published"`，唯一真值）：
  `cny-us-rate-board`、`deepseek-balance-widget`、`nomad-seasons`、`ai-storyboard-studio`、`50-haikou-cafes`、`a-share-index-valuation-report`、`ai-resume-job-matcher`、`life-species-coze`。
- 服务卡片 **1 个**：GPT 代充值（`app/content.ts` `services`）。原「Claude Code 中转服务」已于 2026-10-03 按用户要求下架。
- 联系方式：微信二维码 / GitHub / YouTube 均已实现（`app/ContactPanel.tsx`，微信二维码 `public/contact/wechat-qr.png`）。
- 运行验证（2026-10-03 实测）：`npm test` 通过，5/5 用例（见 `QA_CHECKLIST.md`）。
- 当前无进行中的功能开发需求。

## 下一发版（Release）验收标准（DoD）
- [ ] 沿用现有双线地址（Vercel + GitHub Pages），不新建站点或部署平台。
- [ ] `npm test` 通过（= `next build` + `node --test tests/rendered-html.test.mjs`），5/5。
- [ ] Pages 构建注入 `BASE_PATH=/p003-houfan-xuezhang-site`，Vercel 构建不注入；两条线资源路径均无 404。
- [ ] 内容改动仅发生在 `app/content.ts`；联系方式改动仅发生在 `app/ContactPanel.tsx`；不臆造项目 / 资质 / 联系方式。
- [ ] 照片：新增/替换走 `照片替换说明.md`，WebP 落 `public/photos/`，高清原图备份 `assets/photo-originals/`，不进公开站。
- [ ] 中文文案一致、无空 / 伪造链接。
- [ ] 提交 / 推送需用户明确授权。

## 如何进行中的需求（模板）
<!-- 每一条需求复制以下结构 -->
### [需求标题]
- 目标：
- 范围 / 影响文件：
- 验收标准（DoD）：
- 是否触碰照片 / 联系方式：是 / 否
- 回归项：
- 状态：TODO / IN_PROGRESS / VERIFY / CLOSED
- 关联：BUGS.md / CODE_REVIEW.md / PRODUCT_BACKLOG.md 编号

## 规则
- 第一次正式 PLAN 形成或新增核心功能 / 实体时，【计划】必须检查并补充 `../qa/QA_CHECKLIST.md` 第一版回归基线。
- 开发者自测不能替代独立 QA；修复后需独立 QA 回归方可 CLOSED。
