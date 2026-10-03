# QA_CHECKLIST.md — 长期核心回归基线

> 单项目专属的长期回归资产，由【计划】建立第一版、【测试】持续补充、【收尾】修剪去重。
> 入口总规则见 `../../AGENTS.md`。

## 使用说明
- 本清单是「每次发布前都应跑一遍」的核心回归项，与 `../pm/PLAN.md` 的专项测试互补。
- 已按本站实际代码事实（2026-10-03 neat-freak 核对）更新。

## 运行状态（2026-10-03 实测）
- 构建层：纯 Next.js 16.2.6 + Turbopack，`next.config.ts` 设 `output: "export"`，产物 `out/`。
- 部署：双线。Vercel `https://houfan-xuezhang-site.vercel.app`（根路径）+ GitHub Pages `https://wanghoufan.github.io/p003-houfan-xuezhang-site/`（`BASE_PATH` 注入子路径）。两者由 `.github/workflows/deploy.yml` 在 `main` push 时各自构建。
- `npm test`（= `next build` + `node --test tests/rendered-html.test.mjs`，测试以 `next start` 起服务后HTTP fetch 校验）→ **5/5 通过**。
- 当前 5 个用例：① 首页完整内容（含教育时间线、分类、联系方式、无 `tiancexai` 外链、图片加载策略）② `/projects/cny-us-rate-board` 路由（含 GitHub 链接）③ 新发布项目路由（`50-haikou-cafes` / `a-share-index-valuation-report` / `ai-resume-job-matcher` / `life-species-coze`）④ 未知项目 → 404 ⑤ 静态导出含全部 8 个已发布项目的独立目录。
- 历史约束（已解除）：2026-08-17 时 `npm test` 因 `sites` vite 插件的 `genie-trash` 二进制超时（ETIMEDOUT）退出非 0；迁移为纯 Next.js 后不再出现。

## 核心回归基线（P0/P1）
- [ ] `npm test` 通过（5/5：首页 + 路由 + 404 + 静态导出）。
- [ ] 双线可用：Vercel `houfan-xuezhang-site.vercel.app` 与 Pages `wanghoufan.github.io/p003-houfan-xuezhang-site/` 均返回 200，首页标题一致。
- [ ] Pages 线资源路径带 `/p003-houfan-xuezhang-site` 前缀且无 404；Vercel 线走根路径无前缀。
- [ ] 首页桌面 / 平板 / 手机竖屏均无横向滚动条，排版不破。
- [ ] 首屏头像 `profile.webp` eager 加载（`fetchPriority="high"`），非首屏兴趣图 lazy 加载（`loading="lazy"`）。
- [ ] 照片资源存在且路径正确：`public/photos/` 含 profile、coffee、reading、guitar、fitness、basketball、dance、snowboard、surf 共 9 张 WebP。
- [ ] 联系方式真实有效：微信二维码（`public/contact/wechat-qr.png`）、GitHub（`github.com/wanghoufan`）、YouTube（`youtube.com/@币圈学长/featured`，2026-08-21 修正后）均可达，无空 / 伪造链接。
- [ ] 照片缺位时显示杂志式占位框，不出现破图。
- [ ] 键盘可达、焦点态可见、alt 完整、reduced motion 生效。
- [ ] 中文文案一致、无错别字、无占位文字；无 `mailto:`、无中/EN 语言切换残留（见测试 `doesNotMatch` 断言）。
- [ ] 内容与 `app/content.ts` 真值一致，已发布项目共 8 个、服务卡片 2 个，无臆造项目 / 资质 / 联系方式。
- [ ] `tests/rendered-html.test.mjs` 覆盖的路由回归：首页、`/projects/cny-us-rate-board`、`/projects/50-haikou-cafes`、`/projects/a-share-index-valuation-report`、`/projects/ai-resume-job-matcher`、`/projects/life-species-coze`、未知项目 → 404。

## 已知覆盖缺口（建议补充，非当前阻断）
- [ ] `deepseek-balance-widget`、`nomad-seasons`、`ai-storyboard-studio` 三个已发布项目**尚未纳入常态化测试 `tests/rendered-html.test.mjs`** 的独立路由用例（仅在用例⑤的静态目录存在性检查中被覆盖）。建议补入 `new published project routes` 用例（标题分别为「DeepSeek 余额悬浮小工具」「候鸟 / Nomad Seasons」「AI 图文短剧分镜生成器」）。
- [ ] 服务卡片 `GPT 代充值` 不应在页面暴露原始 `tiancexai.com` 外链（测试 `doesNotMatch(/href="https:\/\/tiancexai\.com/)`），发布前保留该断言。
- [ ] 本机网络出口受限，Vercel 域名（`*.vercel.app`）无法从本机 curl 验证；Pages 域名（`*.github.io`）可验证。Vercel 侧状态需用 `vercel ls` / `vercel inspect` 核对。

## 补充回归项（持续累积）
<!-- 【测试】在此追加高价值回归项 -->

## 规则
- 开发者自测不能替代独立 QA。
- neat-freak 在重要阶段负责修剪、去重和更新本清单。
