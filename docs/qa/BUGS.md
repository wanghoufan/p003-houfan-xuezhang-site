# BUGS.md — 缺陷记录

> 由【测试】记录，【修复】处理后标记 VERIFY / CLOSED。
> 入口总规则见 `../../AGENTS.md`。

## 记录格式（模板）
<!-- 复制以下结构 -->
### BUG-0001 [P0/P1/P2/P3] 简述
- 现象：
- 复现步骤：
- 期望：
- 影响文件 / 行号：
- 来源：QA / Code Review / Product Review
- 状态：OPEN / VERIFY / CLOSED
- 修复提交 / 关联：

## 当前记录

### BUG-0001 [P1] 联系方式 YouTube 链接失效（404）— 已关闭
- 现象：首页「联系」区 YouTube 入口原目标 `https://www.youtube.com/@布圈学长` 经 2026-08-21 curl（含浏览器 UA）与 WebFetch 双重确认返回 404，频道页面不存在。
- 根因：频道名手误，「币」写成「布」。
- 修复：2026-08-21 commit `96d9cdb`，`app/ContactPanel.tsx` 的 `youtubeUrl` 改为 `https://www.youtube.com/@%E5%B8%81%E5%9C%88%E5%AD%A6%E9%95%BF/featured`（即 `@币圈学长/featured`），已 push 到 `main`。
- 状态：CLOSED
- 备注：2026-10-03 neat-freak 收尾时确认代码与提交历史均已修复，本条文档状态此前误记为 OPEN，已更正。本机网络出口受限无法直接 curl 复验，但 URL 与用户提供的正确频道完全一致。

### BUG-0002 [P2] 构建/运行实现与文档不一致（vinext vs Next.js）— 已关闭
- 现象：`AGENTS.md` 技术栈描述曾为「vinext / Vite（Next.js 兼容路由）」，但 `package.json` 实际脚本为 `next dev/build/start`（Next.js 16.2.6 + Turbopack），`npm test` 亦调用 `next start`；`vite.config.ts` 中的 `vinext()` 插件未被任何构建脚本引用。
- 修复：2026-10-03 neat-freak 收尾，`AGENTS.md` / `CLAUDE.md` / `README.md` / `docs/handoff/HANDOFF.md` / `docs/pm/PLAN.md` 的技术栈与部署描述全部对齐当前 Next.js + 双线托管事实。
- 状态：CLOSED（文档层）
- 遗留：`vite.config.ts`、`worker/`、`build/`、`db/`、`drizzle/`、`examples/`、`.openai/` 等历史文件仍在仓库（`tsconfig.json` 已 exclude、不参与构建），清理需用户确认，见 HANDOFF「待办/ 风险」。
