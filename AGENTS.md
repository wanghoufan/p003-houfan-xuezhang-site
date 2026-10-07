# AGENTS.md — 项目总入口 · 公共规则 · 文档路由

<!-- ORCA-RULES-BLOCK:BEGIN -->
<!-- 本区块由治理母版 scripts/sync-old-projects.sh 于 2026-10-03 注入；只增不删，可重复运行原地更新。 -->
<!-- 本项目 AGENTS.md 的其余内容（项目专属规矩）保持原样，冲突时以本区块为准。 -->
## ORCA 规则增量（母版 2026-10-03-客户端无关）

> 本区块只写**对外通用**的机制增量；派工细节见 `docs/roles/`，账本口径见下方条目。

- **产品验收（2026-09-28 定）**：开发完成的判断来自**用户可见要求的覆盖证据**，不只看单测／构建／代码审查／工具调用成功。
  - 验收标准写在计划里：Phase1 给每条用户可见要求编一条可观察可测的**验收条目（AC）**，并标出**关键 AC**（对应 P0／blocking P1／核心用户路径／必要视觉交互呈现）；**关键 AC 集合不得为空**。
  - 证据落 `docs/qa/` 的**产品验收追踪矩阵**（照 `docs/qa/BUGS.template.md` 同名节）。
  - **不可放行三情形**（命中任一不得判 `PASS`）：①关键产品 DoD／AC 未测；②关键任务涉及的**每个**可见操作控件未实际点击并观察到页面／锚点／状态变化（只验 `href` 存在不算）；③验收证据缺失。
  - 视觉验收最小覆盖：关键用户任务逐条走通、按项目要求检查桌面与窄屏、用边界样本（奇偶条目数／长标题长正文／空状态）检验对齐·换行·裁切·溢出·可读性、留真实浏览器截图。
  - **用户签收**：发布类型为**首次发布**的，用户签收通过才算完成（签收前状态记未完成）；迭代更新与局部修复不强制签收。签收属 **Human Gate 范畴（用户参与）**，**不是新增 QA Gate**。
- **体系更新三件套（2026-09-29 定）**：①本项目规则文件改动后与母版对齐（用 `bash scripts/sync-old-projects.sh` 或按《迁移整理提示词》取包，**备份不覆盖**）；②账本内容**不重写**（实绩历史），只做 schema 校验 `node scripts/model/check-ledger.mjs docs/model`（须 `LEDGER-OK`）；③**HANDOFF 记一行**。**老项目无两包概念，故母版的「同步两包＋更新对外概览」不适用。**
- **派工跨目录禁令（2026-09-29 定）**：派 opencode 通道角色（supervisor／neat-freak／experience-recorder）时，任务里读写本仓以外目录（如 `/tmp`、`1.Active/` 等）会被 `external_directory` 权限自动拒、步骤静默失败，可能让角色误报已做也易反复盲试烧额度（禁盲试）；派单前处置二选一——①临时文件改到仓内已 gitignore 的 `temp/`，②先取得用户授权；codebuddy／codex 通道无此限制。
- **汇报与自决（2026-10-03 定）**：本项目 TM（编排者）**只报三件事**——① 目标完成没（计划内 AC 是否全部有证据）；② 用户安排的工作完成没（派工是否交付、发布上线是否已验证生效）；③ 大影响（功能上线/回滚、线上故障、数据或备份丢失、生产或他人项目被改动、需用户本人操作的账号授权/解密、任何不可逆删除）。
  - **默认自决自做、不问不报**（可逆、只在本项目内、不碰业务）：已合并本地分支删除、未跟踪残留、临时文件与日志、已 gitignore 的工具目录；文档/账本格式小错与状态表落后；调试密钥文件（如 `app/debug.keystore`，一律不入库、自动补 `.gitignore`）；既有 warning（lint 告警、无测试用例等）默认不修不报，除非阻塞本次目标。
  - **备份与旧文件**：确认不影响后续继续开发（无引用、非基线依赖）→ 直接删除、不问不报；确认会影响继续开发 → 保留到大阶段开发完成后再删，**不算待办、不上报、不催**。
  - **必须问的只有四类红线，且一次问全不分多轮**：① secrets 与正式凭据；② 删用户数据或任何不可逆删除；③ 生产环境/数据库/他人项目改动；④ commit/push 与远端写入授权（无明确指令一律不做，**不做也不上报**）。
  - **汇报形态**：单次汇报 ≤10 行＝三行心跳（目标/剩 P0/下一步）＋不超过 3 条要点；**禁把 pending/遗留/out-of-scope/未清除 warning 全量倒给用户**；遗留只列卡住本次目标的，其余进 HANDOFF 一行。**编排者啰嗦按违规打回**，supervisor 按同口径抽查。
- **客户端无关与派工口自动探测（2026-10-03 定）**：本体系不绑定 Orca 或任何特定客户端。每轮开工先跑 `bash scripts/detect-client.sh` 认当前客户端，按 `mode` 派工、**不找用户填**——`window_subagent`＝该客户端有原生子代理（Orca／Trae／Qoder／Codex／Claude Code／opencode 等），窗口内直派、享真 resume／并行／worktree 隔离；`channel_cli`＝无原生子代理或未识别（保守默认），走通道 CLI 直调，只在汇报里带一句「当前客户端未识别，按 CLI 通道派」。表内 Runtime 列写「当前客户端窗口（自动探测）」即客户端无关，**一套包通用于任何客户端**；新客户端跑一次该脚本校准后加进映射即可。
- **何时起本体系（2026-10-03 定）**：多阶段需 Human Gate／要产品验收留痕（AC 矩阵）／跨周或会交接／要发布上线留回执／多角色并行——命中任一才算大项目，按包内 README＋归位表**铺包**进项目根再开工（禁"复制一份规则再改"）；都不命中＝小活直接干，不铺包、不建账本、不起 Gate。**半套（套了却不落 AC/账本）按红线打回**。
- **升级口径（2026-10-05 补，覆盖项目正文旧口径）**：计数单元＝**同一 task id（含返工子任务）**，只数 **supervisor 判 FAIL/打回该 Task 交付** 的次数（QA 自身任务判 FAIL 不计）；累计 2 次自动升 senior-expert（当次生效，不打断用户）；**senior 接手后被打回 2 次即停线找人**（不再升）。与项目正文旧口径（如"builder 连续失败 2 次"）冲突时**以本区块为准**。
- **Phase Integrity 补两条抽查（2026-10-05）**：supervisor 复检须抽查①派工口是否由 `detect-client.sh` 的 `mode` 决定、禁通道角色套进客户端 subagent；②派工前是否跑过 `check-channel-preflight.sh` 且非 `CHANNEL-STALE`（STALE 仍派即打回）。详见 `docs/roles/supervisor.md` 第 8/9 条。
- **红线（2026-09-29 增补）**：产品验收未落盘或关键 AC 未测、不得报完工/收工；首次发布未取得用户签收、不得报完工/收工；汇报只报三类小事自决（口径见上「汇报与自决」）。
- **本项目迁移状态**：`docs/model/GOVERNANCE-STATE.json`（`rules_version`／`synced_at`／`project_phase_field`／`task_ledger_rows`／`agents_block_injected`／`product_acceptance_ac_added`）。
- **存量项目待办（不自动做，需项目 TM 判断）**：本项目实绩 Plan 需补「视觉与交互验收标准（AC 编号）＋关键 AC 集合＋发布类型」，否则新规则下收尾会被判**计划缺项**；完成后把 `product_acceptance_ac_added` 置 `true`。
<!-- ORCA-RULES-BLOCK:END -->


> 本文件是 AI 多 Agent 协作的总入口。任何 Agent 开始工作前必须先读取本文件，再按需读取 `docs/roles/` 下的角色规范与 `docs/` 下的项目文档。
> 协作规范基线：`AI编程项目模板-v2.2`（交接上下文 V1.0，2026-08-17 对齐）。

## 项目档案
- **项目名称**：后翻学长个人网站（houfan-xuezhang-personal-site）
- **定位**：非求职导向的个人展示站，以杂志叙事呈现个人经历、AI 应用与编程项目、兴趣生活、专题研究与联系方式。
- **线上地址**（双线，同一次 `main` push 自动同步，内容一致；**对外一律给 GitHub Pages，国内打开更快**）：
  - GitHub Pages（对外主地址）：https://wanghoufan.github.io/p003-houfan-xuezhang-site/
  - Vercel（镜像备用，项目 `houfan-xuezhang-site`）：https://houfan-xuezhang-site.vercel.app
- **发布平台**：GitHub Pages（构建产物 `out/`，`.github/workflows/deploy.yml`）+ Vercel（镜像，项目 `houfan-xuezhang-site`）；OpenAI Sites 为历史平台，已停止更新
- **当前语言**：中文
- **维护原则**：保留事实措辞，不臆造项目、资质、联系方式或个人照片。

## 技术栈
- React 19 + TypeScript
- Next.js 16.2.6（App Router）+ Turbopack，构建层已由 vinext + Cloudflare Workers迁移至纯 Next.js（2026-08-21）
- `next.config.ts` 用 `output: "export"` 输出纯静态站点到 `out/`，以同时支持 Vercel 与 GitHub Pages
- `basePath` 由环境变量 `BASE_PATH` 注入：GitHub Pages 构建注入 `/p003-houfan-xuezhang-site`（仓库是项目页，带子路径），Vercel 不注入（走根路径）
- Tailwind v4（`app/globals.css`）

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
- 一次 `git push`到 `main` 同时更新 Vercel 和 GitHub Pages 两条线，不新建站点、不新增部署平台。
- 保持中文文案与界面，除非用户明确要求改变。
- 保留语义标题、键盘可达、焦点态、alt 文本、reduced motion、响应式。
- 首屏头像 eager/high-priority 加载；非首屏兴趣图 lazy 加载。
- **不删除或移动** `public/photos/` 个人源照片（除非用户明确批准）。
- **不暴露**伪造或空的 contact 链接；不臆造项目 / 资质 / 联系方式。
- 提交 / 推送需用户明确授权，默认**不自动 commit/push**。

## 当前状态
- 公开首页已上线；**本站已发布项目共 27 个**（2026-10-07 按 `app/content.ts` 实测，以下 `status:"published"`；原记「8 个」为 2026-10-03 前的陈旧数字）：
  1. `cny-us-rate-board` 人民币兑美元汇率看板
  2. `deepseek-balance-widget` DeepSeek 余额悬浮小工具
  3. `deepseek-balance-mac` DeepSeek 额度悬浮窗（Mac 版）
  4. `prompt-manager` 提示词管理器
  5. `nomad-seasons` 候鸟 / Nomad Seasons
  6. `ai-storyboard-studio` AI 图文短剧分镜生成器
  7. `50-haikou-cafes` 海口值得去的 50 家咖啡店
  8. `a-share-index-valuation-report` A股十一大指数十年估值分位报告
  9. `ai-resume-job-matcher` AI 简历岗位匹配助手
  10. `life-species-coze` 生活物种 · 测测你是什么生活物种
  11. `protein-calculator` 蛋白质计算器
  12. `roll-position-calculator` 滚仓计算器
  13. `breakout-radar` PEPE / DOGE 突破雷达
  14. `hongli-dixin-calc` 红利打新底仓计算器
  15. `video2obsidian` 懒得笔记 · 本地视频转文字
  16. `family-insurance-dashboard` 家庭保单数据看板
  17. `bar-games` 酒吧游戏
  18. `party-night` 聚会游戏 Party Night
  19. `place-journal` 地点手账
  20. `nightrec` 夜间现场录音
  21. `talent-showroom` 才艺展示厅
  22. `stretch-routine` 拉伸语音播报
  23. `stretch-side-timer` 拉伸换边计时器
  24. `photo-library` 摄影作品库
  25. `fill-light` 夜间补光灯
  26. `skill-system-map` Skill 能力地图（分类：方法与体系）
  27. `orca-governance-template` ORCA 治理模板（分类：方法与体系）
- **作品分类筛选**：`app/content.ts` 的 `ProjectCategory` 新增 `method`（显示名「方法与体系」），两条方法类作品（`skill-system-map`、`orca-governance-template`）就用这个分类，直接出现在「02 AI 项目作品」那面墙里，靠筛选条上的「方法与体系（2）」标签区分——**不另开区块**，首页区块仍是 01 经历 / 02 AI 项目作品 / 03 我能帮你 / 04 兴趣切片 / 05 经历与认证 / 06 曾研究的专题。
- **与 GitHub 个人主页已对齐**：主页 README 27 条（提交 `83ca42d`）＝本站 27 条，逐条仓库名集合 diff 为空。`CodexBar`（上游 `steipete/CodexBar`）与 `p042-aihot`（上游 `KKKKhazix/AIHOT`）是 fork，按用户 2026-10-07 决定**暂不计入作品**，对账时不算漏项。
- 服务卡片 1 个：GPT 代充值（`app/content.ts` `services`）。**2026-10-03 起「Claude Code 中转服务」已按用户要求下架**（链接、封面图、测试断言一并移除，回归用例 `retired service stays removed from the page` 钉住）。
- 联系方式：微信二维码（`public/contact/wechat-qr.png`）、GitHub、YouTube 均已实现（`app/ContactPanel.tsx`）。
- 下一发版：沿用现有双线地址，必须通过 `npm test`；新增/调整项目内容改 `app/content.ts`，联系方式改 `app/ContactPanel.tsx`。
- 已知测试覆盖缺口：`tests/rendered-html.test.mjs` 已覆盖首页 + `cny-us-rate-board` + `50-haikou-cafes` / `a-share-index-valuation-report` / `ai-resume-job-matcher` / `life-species-coze` 路由，但尚未为 `deepseek-balance-widget` / `nomad-seasons` / `ai-storyboard-studio` 增加独立路由回归（见 `docs/qa/QA_CHECKLIST.md`）。
