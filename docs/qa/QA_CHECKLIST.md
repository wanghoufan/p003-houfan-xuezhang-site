# QA_CHECKLIST.md — 长期核心回归基线

> 单项目专属的长期回归资产，由【计划】建立第一版、【测试】持续补充、【收尾】修剪去重。
> 入口总规则见 `../../AGENTS.md`。

## 使用说明
- 本清单是「每次发布前都应跑一遍」的核心回归项，与 `../pm/PLAN.md` 的专项测试互补。
- 已按本站实际代码事实（2026-08-17 neat-freak 核对）预置第一版基线。

## 运行状态（2026-08-17 实测）
- 构建：`vinext build` 编译通过（138 模块，~435ms）。
- 运行回归：直接用 `node --test tests/rendered-html.test.mjs`（已构建 `dist/server/index.js`）→ **4/4 通过**。
- ⚠️ 环境约束：`npm test`（= build + node --test）在本沙箱整体退出非 0，原因是 `sites` vite 插件的 safe-delete 步骤调用 WorkBuddy `genie-trash` 二进制超时（ETIMEDOUT），**属环境问题，非代码缺陷**。在开发机（trash 正常）应可正常跑完。发布前请在开发机执行 `npm test` 复核。

## 核心回归基线（P0/P1）
- [ ] 构建编译通过；运行回归 4/4 通过（首页 + 路由 + 404）。
- [ ] 首页桌面 / 平板 / 手机竖屏均无横向滚动条，排版不破。
- [ ] 首屏头像 `profile.webp` eager 加载（`fetchPriority="high"`），非首屏兴趣图 lazy 加载（`loading="lazy"`）。
- [ ] 照片资源存在且路径正确：`public/photos/` 含 profile、coffee、reading、guitar、fitness、basketball、dance、snowboard、surf 共 9 张 WebP。
- [ ] 联系方式真实有效：微信二维码（`public/contact/wechat-qr.png`）、GitHub（`github.com/wanghoufan`）、YouTube 频道链接均可达，无空 / 伪造链接。
- [ ] 照片缺位时显示杂志式占位框，不出现破图。
- [ ] 键盘可达、焦点态可见、alt 完整、reduced motion 生效。
- [ ] 中文文案一致、无错别字、无占位文字；无 `mailto:`、无中/EN 语言切换残留（见测试 `doesNotMatch` 断言）。
- [ ] 内容与 `app/content.ts` 真值一致，已发布项目共 7 个、服务卡片 2 个，无臆造项目 / 资质 / 联系方式。
- [ ] `tests/rendered-html.test.mjs` 覆盖的路由回归：首页、`/projects/cny-us-rate-board`、`/projects/50-haikou-cafes`、`/projects/a-share-index-valuation-report`、`/projects/ai-resume-job-matcher`、未知项目 → 404。

## 已知覆盖缺口（建议补充，非当前阻断）
- [ ] `deepseek-balance-widget`、`nomad-seasons`、`ai-storyboard-studio` 三个已发布项目**尚未纳入独立路由回归测试**（测试只断言首页汇总，未逐路由校验标题 / 链接）。建议在 `tests/rendered-html.test.mjs` 的 `new published project routes` 用例中补三条。
- [ ] 服务卡片 `GPT 代充值` 不应在页面暴露原始 `tiancexai.com` 外链（测试 `doesNotMatch(/href="https:\/\/tiancexai\.com/)`），发布前保留该断言。

## 补充回归项（持续累积）
<!-- 【测试】在此追加高价值回归项 -->

## 规则
- 开发者自测不能替代独立 QA。
- neat-freak 在重要阶段负责修剪、去重和更新本清单。
