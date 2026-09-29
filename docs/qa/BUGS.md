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

### BUG-0001 [P1] 联系方式 YouTube 链接失效（404）
- 现象：首页「联系」区 YouTube 入口目标 `https://www.youtube.com/@布圈学长` 经 curl（含浏览器 UA）与 WebFetch 双重确认返回 404 Not Found，频道页面不存在。
- 复现步骤：打开首页 → 联系区 → 点击 YouTube 入口。
- 期望：点击进入真实可用的 YouTube 频道页；或该入口按「待补充」占位模式隐藏，不出现死链。
- 影响文件 / 行号：`app/ContactPanel.tsx` 中 `youtubeUrl`。
- 来源：QA（2026-08-21 自动化回归，外部链接探测 13 项中 1 项失败）。
- 状态：OPEN
- 修复提交 / 关联：待定（需用户确认正确频道 handle，或确认移除该入口）。

### BUG-0002 [P2] 构建/运行实现与文档不一致（vinext vs Next.js）
- 现象：`AGENTS.md` 技术栈描述仍为「vinext / Vite（Next.js 兼容路由）」，但 `package.json` 实际脚本为 `next dev/build/start`（Next.js 16.2.6 + Turbopack），`npm test` 亦调用 `next start`；`vite.config.ts` 中的 `vinext()` 插件当前未被构建脚本使用。
- 复现步骤：对照 `package.json` scripts 与 `AGENTS.md` 技术栈段落。
- 期望：文档与实际构建方式一致，避免误导后续维护。
- 影响文件 / 行号：`AGENTS.md` 技术栈段落；`vite.config.ts`（残留 vinext 插件）。
- 来源：QA（2026-08-21 报告 P2）。
- 状态：OPEN
- 修复提交 / 关联：优化时校正文档（见 QA_CHECKLIST.md 运行状态段）；`vite.config.ts` 残留可择机清理。
