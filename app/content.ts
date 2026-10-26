export type ProjectStatus = "draft" | "published";

// 作品形态分类：网页应用 / 桌面工具 / 移动应用 / AI 应用 / 数据报告 / 方法与体系
export type ProjectCategory =
  | "web"
  | "desktop"
  | "mobile"
  | "ai"
  | "report"
  | "method";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  web: "网页应用",
  desktop: "桌面工具",
  mobile: "移动应用",
  ai: "AI 应用",
  report: "数据报告",
  method: "方法与体系",
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  statusLabel: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  cover: string | null;
  tags: string[];
  role: string;
  background: string;
  challenge: string;
  solution: string;
  outcome: string;
  gallery: string[];
  links: ProjectLink[];
  /**
   * 卡片上的两个成果入口（不指向站内档案页）：
   * - `siteUrl`：已上线的网站地址；桌面应用没有网站，改用 `releaseUrl`。
   * - `releaseUrl`：GitHub Release 下载页（桌面工具用它代替网站）。
   * - `repoUrl`：GitHub 仓库。
   * 三者都是可选，卡片按实际有无渲染，不为了凑齐两个而编造链接。
   */
  siteUrl?: string;
  releaseUrl?: string;
  repoUrl?: string;
};

export const profile = {
  nickname: "后翻学长",
  location: "海南海口",
  tags: ["终身学习者", "读书爱好者", "AI 应用与编程探索者"],
  motto: "保持好奇，持续实践，把兴趣活成作品。",
};

export const experiences = [
  {
    period: "2017.09–2021.06",
    title: "国防科学技术大学学习",
    description: "在系统学习与集体生活中，建立解决问题、持续投入和自我管理的底层能力。",
  },
  {
    period: "2021.09–2025.12",
    title: "体制内工作",
    description: "在真实工作环境中积累经验，理解责任、协作与长期主义。",
  },
  {
    period: "2026.01–至今",
    title: "自由探索",
    description: "重新连接兴趣与行动，当前聚焦 AI 应用与编程，把想法做成可以使用的作品。",
  },
];

export const interests = [
  { name: "咖啡", mark: "COFFEE", category: "生活类", photo: "/photos/coffee.webp" },
  { name: "阅读", mark: "READ", category: "生活类", photo: "/photos/reading.webp" },
  { name: "吉他", mark: "GUITAR", category: "生活类", photo: "/photos/guitar.webp" },
  { name: "AI 编程", mark: "CODE", category: "生活类", photo: "/photos/ai-coding.webp" },
  { name: "健身", mark: "FITNESS", category: "运动类", photo: "/photos/fitness.webp" },
  { name: "篮球", mark: "BASKETBALL", category: "运动类", photo: "/photos/basketball.webp" },
  { name: "抖舞", mark: "DANCE", category: "运动类", photo: "/photos/dance.webp" },
  { name: "滑雪", mark: "SNOWBOARD", category: "运动类", photo: "/photos/snowboard.webp" },
  { name: "冲浪", mark: "SURF", category: "运动类", photo: "/photos/surf.webp" },
];

export const milestones = [
  "得到 900 分高分学员",
  "国家中级健身教练认证",
  "大疆无人机航拍认证",
  "原雅思（IELTS）杨帅口语班班长",
  "备考雅思考试",
  "备考国际健身认证（NSCA、ACE、NASM、ACSM）",
  "备考健康管理师",
  "自由冲浪、尾波冲浪入门",
  "单板滑雪入门",
];

export const topics = [
  { title: "健康与长寿", category: "LIFELONG HEALTH" },
  { title: "定投投资与保险", category: "PERSONAL FINANCE" },
  { title: "控糖饮食", category: "NUTRITION" },
  { title: "孩子近视预防", category: "VISION CARE" },
];

// 后续新增项目时，按 Project 类型填写完整资料，并将 status 设为 "published"。
export const projects: Project[] = [
  {
    slug: "posture-guard",
    title: "姿势守护 PostureGuard",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "把手机放在身体侧面，用前置摄像头在本地盯着头前伸、躯干前倾和持续低头，并在你坐太久时提醒起身；画面不保存、不上传，App 不联网。",
    cover: "/projects/posture-guard.png",
    tags: ["Android", "Kotlin / Compose", "MediaPipe", "本地推理", "久坐管理"],
    role: "独立设计与开发",
    background:
      "长时间坐在电脑前，头会慢慢前伸、上身慢慢塌下去，自己往往察觉不到；久坐更是从上午一路坐到下班。市面上的方案要么需要额外硬件，要么把画面交给云端，而这两点都让人不愿意长期开着。",
    challenge:
      "要在手机端实时跑视觉推理，同时守住「画面不出手机」；还要把「坐着 / 起身 / 看不到人」分清楚，关键点缺失时如实标「无法判断」，不能拿 0 冒充正常；窄屏、大字体、深浅色与中英双语都要能用，且切换主题和语言不丢监测状态。",
    solution:
      "CameraX 取景加 MediaPipe Pose / Face Landmarker 本地推理，以 6–10 秒校准采集的个人基线判断头前伸、躯干前倾、持续低头三类偏移；久坐计时用单调时钟，只有明确识别为坐着才累计，起身要连续达到设定时长才确认；提醒分久坐与姿态两条独立通道，中文语音说明原因与建议动作，通知不震动；界面为 Compose 三页，主题三态与中英双语可在设置里切换。",
    outcome:
      "已在 Android 真机上完成机位、校准、提醒与久坐统计的验收，安装包可直接下载体验；App 内「设置 → 关于 → 开源许可」列出 188 个第三方组件与四份许可证全文。不是医疗器械，不做诊断，也不打健康分。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/posture-guard-site/",
    links: [
      {
        label: "打开项目官网",
        href: "https://wanghoufan.github.io/posture-guard-site/",
      },
    ],
  },
  {
    slug: "cny-us-rate-board",
    title: "人民币兑美元汇率看板",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "一个聚焦人民币兑美元汇率的轻量看板，用直观卡片展示当前购汇价格、官方中间价和历史区间位置。",
    cover: "/projects/cny-us-rate-board.png",
    tags: ["汇率数据", "信息可视化", "Web 应用"],
    role: "独立设计与开发",
    background:
      "在购汇和观察汇率时，单一数字很难说明当前价格处于什么位置。这个项目希望把即时价格与长期区间放在同一视图里，降低判断成本。",
    challenge:
      "需要在有限空间内同时呈现当前汇率、官方中间价，以及近 1 年、2 年、3 年和 5 年的相对位置，并保持信息层级清晰。",
    solution:
      "以单张信息卡为核心，将当前汇率作为视觉主角，辅以官方中间价和历史区间提示，让用户快速完成扫读与比较。",
    outcome:
      "完成可用的人民币兑美元汇率看板，并将项目代码公开在 GitHub，作为 AI 应用与编程实践的第一项作品记录。",
    gallery: [],
    releaseUrl:
      "https://github.com/wanghoufan/p036-cny-us-rate-board/releases/latest",
    repoUrl: "https://github.com/wanghoufan/p036-cny-us-rate-board",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p036-cny-us-rate-board",
      },
    ],
  },
  {
    slug: "deepseek-balance-widget",
    title: "DeepSeek 余额悬浮小工具",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "desktop",
    summary:
      "一个面向 Windows 11 的 DeepSeek API 余额监控工具，集中展示余额变化、充值与赠送明细，并在余额异常时及时提醒。",
    cover:
      "https://raw.githubusercontent.com/wanghoufan/p010-deepseek-balance-windows/master/artifacts/ui-audit/02-after.png",
    tags: ["Windows 11", ".NET 8", "WPF", "API 监控"],
    role: "独立设计与开发",
    background:
      "API 服务的余额变化往往分散在控制台和通知里，难以在日常使用中持续关注。这个项目把 DeepSeek 账户状态收进桌面边角，让余额成为随时可见的信息。",
    challenge:
      "需要在不打断工作流的前提下，同时呈现余额、变化趋势、充值与赠送明细，并兼顾完整卡片、迷你胶囊和系统托盘等不同使用场景。",
    solution:
      "以 Windows 桌面悬浮窗为核心，提供完整卡片与迷你胶囊模式，支持定时轮询、低余额及异常下降提醒、拖动定位、置顶、托盘和开机自启。API Key 使用 Windows DPAPI CurrentUser 加密保存在本地。",
    outcome:
      "完成一个可独立运行的 Windows x64 自包含单文件工具，并通过 GitHub Actions 持续检查构建与测试；发布包无需目标电脑预装 .NET Runtime。",
    gallery: [],
    releaseUrl:
      "https://github.com/wanghoufan/p010-deepseek-balance-windows/releases/latest",
    repoUrl: "https://github.com/wanghoufan/p010-deepseek-balance-windows",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p010-deepseek-balance-windows",
      },
      {
        label: "下载最新版本",
        href: "https://github.com/wanghoufan/p010-deepseek-balance-windows/releases/latest",
      },
    ],
  },
  {
    slug: "deepseek-balance-mac",
    title: "DeepSeek 额度悬浮窗（Mac 版）",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "desktop",
    summary:
      "macOS 版：DeepSeek 余额和 ChatGPT Plus 用量摆在桌面角落，贴边自动隐藏、可缩成迷你胶囊、也能常驻菜单栏，额度异常会提示。",
    cover: "/projects/deepseek-balance-mac.jpg",
    tags: ["macOS 桌面工具", "Avalonia / .NET 8", "额度监控", "菜单栏常驻"],
    role: "独立设计与开发",
    background:
      "和 Windows 版同一个出发点：API 余额与用量分散在控制台里，不盯就超。这一条是 macOS 端的独立实现，也是独立仓库。",
    challenge:
      "要在 macOS 12+ 上做悬浮窗：贴边自动隐藏、菜单栏常驻、完整卡片与迷你胶囊两态切换；ChatGPT 侧还要分清高峰/非高峰，以及每个账号的 5 小时额度与周额度各自的恢复时间。",
    solution:
      "用 Avalonia + .NET 8 实现界面与轮询，展示 DeepSeek 余额、变化幅度与 ChatGPT Plus 剩余额度；支持开机自启、拖动定位、置顶与异常状态提示；发布成 Apple Silicon 与 Intel 两种 zip，解压把 .app 拖进「应用程序」即可，无需预装 .NET。",
    outcome:
      "已发 Release v0.6.0，提供两种架构的安装包。Windows（WPF）端已拆到独立仓库单独维护，本仓库只负责 macOS。",
    gallery: [],
    releaseUrl:
      "https://github.com/wanghoufan/p010-deepseek-balance-mac/releases/latest",
    repoUrl: "https://github.com/wanghoufan/p010-deepseek-balance-mac",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p010-deepseek-balance-mac",
      },
      {
        label: "下载最新版本",
        href: "https://github.com/wanghoufan/p010-deepseek-balance-mac/releases/latest",
      },
    ],
  },
  {
    slug: "prompt-manager",
    title: "提示词管理器",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "把散落各处的提示词存成能搜的卡片：粘贴正文就自动起标题、打标签，复制过几次一目了然，设个调取码还能让 AI 编程助手直接按它开工。",
    cover: "/projects/prompt-manager.jpg",
    tags: ["本地网页端", "SQLite", "MCP 接入", "提示词知识库"],
    role: "独立设计与开发",
    background:
      "提示词散在聊天记录、备忘录、本地 txt 里，想复用时找不到；每次想让 AI 换个角色又要重贴一大段；电脑 A 整理的电脑 B 看不到；哪个最常用也没有数据支撑。",
    challenge:
      "多台电脑共用一份数据要秒级互推；编辑要「失焦即存」但不能每次失焦都生成版本快照；搜索既要覆盖标题、正文、标签、备注，又要支持按调取码直达，高亮还得在暗色与亮色两套主题下都够对比度。",
    solution:
      "数据存本机 SQLite；搜索框 300ms 防抖，支持 `@code` 按调取码直达与命中计数，高亮用 CSS 变量分别适配两套主题；手动复制与 MCP 调取共用次数统计；正文保存自动存档最多 10 版可回滚；主题三档跟随系统并用首屏内联脚本防闪烁；再通过 MCP 让 WorkBuddy 等 Agent 用一句「调取 <码>」把卡片正文注入为系统提示词直接执行。",
    outcome:
      "完成本地网页端与 MCP 接入，支持局域网多端实时同步与 Docker 自托管；已上线 GitHub Pages 试用版，数据只保存在浏览器里，AI、云同步与 MCP 在试用版中关闭，源码公开在 GitHub。站内封面取自应用内置的「示例知识库」只读视图，不含任何真实使用数据。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/p006-prompt-manager/",
    repoUrl: "https://github.com/wanghoufan/p006-prompt-manager",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p006-prompt-manager",
      },
    ],
  },
  {
    slug: "nomad-seasons",
    title: "候鸟 / Nomad Seasons",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "面向中国数字游民的城市旅居决策工具，根据月份、气候偏好、预算、网络和交通条件筛选与排名国内外城市。",
    cover:
      "https://raw.githubusercontent.com/wanghoufan/nomad-seasons/main/public/readme-preview.png",
    tags: ["React", "Vite", "数据决策", "数字游民"],
    role: "独立产品设计与开发",
    background:
      "当旅居目的地同时受到季节、体感气候、预算、网络和交通影响时，单纯浏览城市介绍很难快速做出选择。这个项目希望把旅行灵感整理成一条可解释的决策路径。",
    challenge:
      "需要在同一个响应式界面中处理 12 个月切换、气候门槛、预算与网络筛选、国内外城市榜单，以及 2—3 座城市的混合对比，同时保持旅行杂志般的阅读体验。",
    solution:
      "以月份选择器和偏好面板为入口，实时刷新国内榜单，并通过“包含海外城市”开关显示独立海外榜；城市卡片保留推荐理由、证据标签和数据快照，让排序结果可理解、可比较。",
    outcome:
      "完成一个中文响应式城市旅居筛选与对比工具，覆盖国内 12 城和海外 12 城，支持完整的 12 个月数据、无障碍交互和 Vercel 在线体验。",
    gallery: [],
    siteUrl: "https://nomad-seasons.vercel.app",
    repoUrl: "https://github.com/wanghoufan/nomad-seasons",
    links: [
      {
        label: "打开在线体验",
        href: "https://nomad-seasons.vercel.app/#method",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/nomad-seasons",
      },
    ],
  },
  {
    slug: "ai-storyboard-studio",
    title: "AI 图文短剧分镜生成器",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "面向短视频编剧、导演和内容创作者的智能创作工具，把短剧主题、剧本和风格偏好转化为可执行的图文分镜方案。",
    cover: "/projects/ai-storyboard-studio.png",
    tags: ["AI 创作", "图文分镜", "短视频", "图像生成"],
    role: "独立产品设计与开发",
    background:
      "短剧从文字剧本走向拍摄执行时，创作者需要反复拆解场景、镜头和画面气氛。这个项目尝试把剧本理解与视觉预演连接起来，缩短从文字到画面的距离。",
    challenge:
      "需要同时处理主题、剧本内容和风格偏好，并让自动生成的文字分镜与对应画面保持一致，最终输出清晰、直观、方便继续创作的镜头方案。",
    solution:
      "用户输入短剧主题、剧本和风格后，系统自动完成文字分镜拆解，并为每个镜头生成电影感画面，形成按镜头组织的图文创作工作区。",
    outcome:
      "完成一款面向短视频创作流程的 AI 分镜工具，帮助创作者快速把剧本转化为可理解、可讨论、可执行的视觉方案。",
    gallery: [
      "/projects/ai-storyboard-studio-desktop.jpg",
      "/projects/ai-storyboard-studio-mobile.jpg",
      "/projects/ai-storyboard-studio-lightbox.jpg",
    ],
    siteUrl: "https://ai-storyboard-studio-zeta.vercel.app",
    repoUrl: "https://github.com/wanghoufan/p044-ai-storyboard-studio",
    links: [
      {
        label: "打开在线体验",
        href: "https://ai-storyboard-studio-zeta.vercel.app",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p044-ai-storyboard-studio",
      },
    ],
  },
  {
    slug: "50-haikou-cafes",
    title: "海口值得去的 50 家咖啡店",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "一份给愿意为一家咖啡店走一条巷子的人的城市指南，收录海口 50 家真实咖啡店。",
    cover:
      "https://raw.githubusercontent.com/wanghoufan/50-haikou-cafes/master/assets/preview/desktop-home.png",
    tags: ["海口", "城市指南", "地图", "静态站点"],
    role: "独立设计与开发",
    background:
      "想把分散在街巷与不同区域的咖啡店，整理成一份适合探索城市、也适合反复使用的指南。",
    challenge:
      "需要让 50 家店的地点、营业时间、评价与图片便于查找，同时兼顾地图浏览和移动端使用。",
    solution:
      "用结构化店铺数据驱动静态站点，提供区域与距离筛选、打卡和收藏、随机推荐、店铺详情以及全量地图总览。",
    outcome:
      "完成覆盖海口多个区域的 50 家咖啡店城市指南，并提供响应式在线体验。",
    gallery: [],
    siteUrl: "https://10-haikou-cafes.vercel.app",
    repoUrl: "https://github.com/wanghoufan/50-haikou-cafes",
    links: [
      {
        label: "打开在线体验",
        href: "https://10-haikou-cafes.vercel.app",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/50-haikou-cafes",
      },
    ],
  },
  {
    slug: "a-share-index-valuation-report",
    title: "A股十一大指数十年估值分位报告",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "一份汇总 11 只 A 股核心指数十年估值分位的单页响应式报告，用统一标记展示当前估值水位。",
    cover:
      "https://raw.githubusercontent.com/wanghoufan/p023-a-share-index-valuation/master/screenshots/preview-hero.png",
    tags: ["A股", "估值分析", "数据可视化", "HTML"],
    role: "独立设计与开发",
    background:
      "不同指数的估值信息分散且口径不一，难以快速横向比较当前所处的估值位置。",
    challenge:
      "需要在一个页面中清晰呈现宽基与红利指数的多项估值分位、价格位置和数据时效，同时说明数据边界。",
    solution:
      "以 JSON 驱动展示，将估值分位、当前收盘价、历史回撤、雷达图与迷你走势整合进响应式页面。",
    outcome:
      "完成涵盖宽基与红利指数的估值汇总报告，提供在线查看、横向比较与数据时效提示；数据不构成投资建议。",
    gallery: [],
    siteUrl: "https://a-share-index-valuation-report.vercel.app",
    repoUrl: "https://github.com/wanghoufan/p023-a-share-index-valuation",
    links: [
      {
        label: "打开在线体验",
        href: "https://a-share-index-valuation-report.vercel.app",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p023-a-share-index-valuation",
      },
    ],
  },
  {
    slug: "ai-resume-job-matcher",
    title: "AI 简历岗位匹配助手",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "一个面向求职准备的 AI 工具，上传简历和目标岗位后，帮助梳理经历、能力与岗位要求之间的匹配关系。",
    cover: "/projects/ai-resume-job-matcher.png",
    tags: ["AI 应用", "简历分析", "求职工具", "Web 应用"],
    role: "独立设计与开发",
    background:
      "简历经历、目标岗位和下一步准备往往分散在不同材料中，求职者很难快速判断哪些能力最值得补强。",
    challenge:
      "需要让用户用一份简历和一个目标岗位描述，快速得到清晰、可执行的匹配分析。",
    solution:
      "通过简历 PDF 与目标岗位描述输入，结合用户选择的模型和自带 API Key，对经历、能力与机会进行重新连线，并给出下一步准备建议。",
    outcome:
      "完成一个可在线体验的 AI 简历岗位匹配助手，让求职准备从泛泛修改简历转向围绕目标岗位校准。",
    gallery: [],
    siteUrl: "https://ai-resume-job-matcher-houfan.vercel.app/",
    repoUrl: "https://github.com/wanghoufan/ai-resume-job-matcher",
    links: [
      {
        label: "打开在线体验",
        href: "https://ai-resume-job-matcher-houfan.vercel.app/",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/ai-resume-job-matcher",
      },
    ],
  },
  {
    slug: "life-species-coze",
    title: "生活物种 · 测测你是什么生活物种",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "一个面向中文用户的动物卡通人格测试，24 道题带你发现自己的生活物种，附带 2 个隐藏副人格与可分享的永久结果页。",
    cover: "/projects/life-species-coze.png",
    tags: ["Coze", "AI Bot", "人格测试", "互动产品"],
    role: "独立产品设计与开发",
    background:
      "想做一款轻松、可分享的人格测试。市面上大多数测试偏文艺或玄学，希望借动物卡通的梗把测试结果变成可以发给朋友聊两句的谈资。",
    challenge:
      "需要在 Coze 平台上把 24 道题、24 个生活物种和 2 个隐藏副人格组织成一条稳定可复现的测试流程，同时让结果既能收藏也能二次传播。",
    solution:
      "搭建生活物种动物卡通人格宇宙，在扣子 Coze 上编写测试流程与提示词，设计 24 道生活场景化题库与物种结果映射，加入隐藏副人格触发机制；结果侧配套 Supabase 后端规范与 24 张物种素材，并提供长期可访问的永久结果页与物种分布图鉴。",
    outcome:
      "完成一个 3–5 分钟即可完成的中文人格测试 Bot，发布在扣子 Coze 平台并提供在线体验与可分享结果页；交付包含 Coze 提示词、Supabase 后端规范与 24 张物种素材，代码已开源在 GitHub。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/p002-life-species-test/",
    repoUrl: "https://github.com/wanghoufan/p002-life-species-test",
    links: [
      {
        label: "打开在线体验",
        href: "https://wanghoufan.github.io/p002-life-species-test/",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p002-life-species-test",
      },
    ],
  },
  {
    slug: "protein-calculator",
    title: "蛋白质计算器",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "不用注册、不用联网的 Android 小工具：按体重算出每天该吃多少蛋白质，再对照高蛋白食物榜把这顿饭还差多少算清楚。",
    cover: "/projects/protein-calculator.png",
    tags: ["Android", "Expo / React Native", "离线单机", "中英双语"],
    role: "独立设计与开发",
    background:
      "健身或关注饮食的人想知道每天大概需要多少蛋白质，以及几块鸡胸肉、几个鸡蛋、一瓶牛奶分别提供多少。查成分表麻烦，在线工具要注册还要联网，判断成本比问题本身还高。",
    challenge:
      "要在手机屏幕上同时容纳每日目标计算（四种目标模式、低档与高档两个取值）、30 种常见食物的蛋白排行、按克 / 毫升 / 个 / 瓶等混合单位录入，外加深浅色与中英双语，并且全程离线可用。",
    solution:
      "输入体重并选择目标模式即得到每日目标克数；高蛋白食物榜按每 100g 蛋白含量排序，点「+」可连续加入，页面实时汇总本顿摄入、还差多少并用进度条表示。预设食物的营养值与常用份量能按实际包装改写，也可新增自定义食物并恢复默认；体重、系数、数量与自定义食物都存在本机，杀进程重开可以接着用，数据损坏时自动回落默认而不闪退。",
    outcome:
      "完成一款仅 Android 的单机 App，支持中英双语与跟随系统的深浅色；榜单数据取自中国疾病预防控制中心营养与健康所《中国食物成分表》查询平台（核验 2026-09），App 内保留来源与说明卡并声明不代表全库排名；源码与运行截图已公开在 GitHub。",
    gallery: [
      "/projects/protein-calculator-ranking.png",
      "/projects/protein-calculator-dark-home.png",
    ],
    siteUrl: "https://wanghoufan.github.io/protein-calculator-site/",
    repoUrl: "https://github.com/wanghoufan/p027-protein-calculator",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p027-protein-calculator",
      },
      {
        label: "打开官网",
        href: "https://wanghoufan.github.io/protein-calculator-site/",
      },
    ],
  },
  {
    slug: "roll-position-calculator",
    title: "滚仓计算器",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "每级涨多少、加多少杠杆、走到哪会崩，先演给你看：一张滚仓推演表配本地历史和实盘记录，全程在浏览器里跑，不联网。",
    cover: "/projects/roll-position-calculator.jpg",
    tags: ["纯前端单文件", "零依赖", "滚仓推演", "本地存储"],
    role: "独立设计与开发",
    background:
      "滚仓要同时盯每一级的涨幅、杠杆、仓位和资产变化，在表格软件里改一格就要重算一轮，也留不下每次推演的版本，更没法把真实成交和假设摆在一起对照。",
    challenge:
      "在「单个 HTML 文件、零依赖、不联网」的前提下，文字记录要存 localStorage、截图要存 IndexedDB（原图与缩略图双份），还要处理隐私模式写入失败、窄屏下宽表格读不动这些真实情况。",
    solution:
      "四项输入生成 12 阶段推演表，规则是涨幅 × 上一阶段杠杆 = 1、资产逐级翻倍；本地历史快照最多 100 条可回退，支持 JSON 导出导入；实盘记录做盈亏台账与总收益，可原地编辑不产生重复；截图留证支持点击、拖拽、Ctrl+V 三种录入，用 canvas 压到 1600 与 320 两档；680px 断点把表格转成卡片。",
    outcome:
      "已上线并线上实测通过，代码无待修 Bug。未计入手续费、资金费率、滑点与强平风险，不构成任何投资建议；所有数据留在本机浏览器，不上传。",
    gallery: [],
    siteUrl: "https://roll-position-calculator-houfan.vercel.app",
    repoUrl: "https://github.com/wanghoufan/p013-roll-position-calculator",
    links: [
      {
        label: "打开在线体验",
        href: "https://roll-position-calculator-houfan.vercel.app",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p013-roll-position-calculator",
      },
    ],
  },
  {
    slug: "breakout-radar",
    title: "PEPE / DOGE 突破雷达",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "把历史量化研究做成一台能实时看的行情观测雷达：六层独立评分加十态状态机，每个信号都带值、证据来源、时间戳和数据新鲜度。",
    cover: "/projects/breakout-radar.jpg",
    tags: ["Next.js 16", "量化研究", "可解释信号", "回测"],
    role: "独立产品设计与开发",
    background:
      "山寨币突破这件事，多数工具只给一个「像不像要涨了」的模糊结论。这个项目想反过来做：用严格时点对齐、无未来数据污染的方法，把判断过程摊开给人看，包括失败的样本。",
    challenge:
      "时点必须对齐——回看窗口取 42 根 4H，MFE/MAE 从突破收盘起算，窗口不含突破那根 K 线；历史样本口径要冻结，不能为了让结论好看而扩容；交易所接口既要避开 CORS 又不能暴露密钥；网络不可用时得诚实降级，不能拿快照冒充实时。",
    solution:
      "用 Rolling Breakout 配 EMA、ATR、量比、相对 BTC 强度与资金费率把币种归入十态状态机，再拆成环境闸门、Setup、Trigger、Follow-through、Risk、Hard Veto 六层独立评分；收录 21 个历史波段事件矿场与成功/失败冻结样本做 walk-forward 检验；另配相似性引擎回答「当前最像哪一波」。",
    outcome:
      "已上线 Vercel，73 项单测加 21 事件回归通过。不输出胜率、准确率、假突破概率或任何收益承诺，回测指标只作为研究诚实性证据呈现；行情取自 OKX / Binance 公开接口，不构成投资建议。",
    gallery: [],
    siteUrl: "https://pepe-doge-breakout-radar.vercel.app",
    repoUrl: "https://github.com/wanghoufan/p014-doge-breakout-radar",
    links: [
      {
        label: "打开在线体验",
        href: "https://pepe-doge-breakout-radar.vercel.app",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p014-doge-breakout-radar",
      },
    ],
  },
  {
    slug: "hongli-dixin-calc",
    title: "红利打新底仓计算器",
    status: "published",
    statusLabel: "本机自托管版",
    year: "2026",
    category: "web",
    summary:
      "一个人也能跑完的打新底仓闭环：从估值判断、官方成分核对，到算出每只买多少股、冻结下单计划、手机辅助下单，再回到真实持仓追溯。",
    cover: "/projects/hongli-dixin-calc.jpg",
    tags: ["Python 标准库", "SQLite", "红利指数", "打新底仓"],
    role: "独立设计与开发",
    background:
      "配底仓打新时，估值、成分权重、资金分配、下单数量、持仓追溯散落在不同地方，一个人很难一次算清还核得准。这个工具把它们串成一条本机就能走完的流程。",
    challenge:
      "估值与回撤要双源核验：同指数 inner join、缺失率不超 0.5%、误差不超 0.10%，任一不过就显示「暂无数据」而不是凑一个数；行情走三路五态契约（3 秒超时、2 次退避、72 小时陈旧判定）；下单计划要能冻结，也要允许人工确认与修正。",
    solution:
      "服务端只用 Python 标准库 http.server 加 SQLite 账本，前端是单文件页面；官方成分与权重做三层缓存；资金到下单数量由四生命周期计划引擎算出，手机端提供 checklist 四态辅助下单；持仓与现金从账本视图重建，手动覆盖价不参与账本定价。",
    outcome:
      "完成 V1.3 全流程闭环，在 Mac Mini 本机自托管、可选 Docker 部署。它只做计划、记录和核对，不接券商接口、不自动交易；行情仅供资金测算，正式下单以券商盘口为准，不构成投资建议。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p022-hongli-dixin-calc",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p022-hongli-dixin-calc",
      },
    ],
  },
  {
    slug: "video2obsidian",
    title: "懒得笔记 · 本地视频转文字",
    status: "published",
    statusLabel: "macOS 本机版",
    year: "2026",
    category: "desktop",
    summary:
      "课程和播客视频不再烂在硬盘里：丢进一个文件夹，本机自动转写、分段整理成能搜的 Markdown 笔记，数据全程不上传。",
    cover: "/projects/video2obsidian.jpg",
    tags: ["macOS 桌面工具", "本机语音转写", "Obsidian", "离线无 API 费用"],
    role: "独立设计与开发",
    background:
      "手头攒了不少课程和播客视频，想变成能搜的笔记，但不想把文件上传到云服务、也不想按分钟付 API 费用。于是把转写搬到本机跑。",
    challenge:
      "已有笔记不能被覆盖；刚拷进文件夹的视频要等约 7 秒写稳才能入队，否则会把半个文件送去转写；重启后监听状态不恢复；长视频端到端要能重试、能预览，还得让人看清每一步卡在哪。",
    solution:
      "拆成 stage1–12 的分阶段流水线，本机用 mlx-whisper（large-v3-turbo 冻结版）加 ffmpeg 提音频转写，watchdog 监听文件夹自动排队；词汇区填「错词 → 正词」可重跑；整理成分段 Markdown，填了笔记库目录就镜像写入 Obsidian，不填只留在数据目录；任务列表按发现 → 听写 → 整理 → 成稿 → 入库展示状态。",
    outcome:
      "冻结版已打 tag `v1.0-mac`。只需 Apple Silicon Mac、Python 3.12 与 ffmpeg，不需要任何 API Key；Windows 版在同一仓库独立开发，尚未发布。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p018-video2obsidian-mac",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p018-video2obsidian-mac",
      },
    ],
  },
  {
    slug: "family-insurance-dashboard",
    title: "家庭保单数据看板",
    status: "published",
    statusLabel: "本地演示版",
    year: "2026",
    category: "web",
    summary:
      "家里买了哪些保险终于说得清：谁保障不够、哪张快到期、今年要交多少钱，不用再翻箱倒柜找合同。",
    cover: "/projects/family-insurance-dashboard.png",
    tags: ["纯前端单文件", "离线可用", "数据脱敏", "家庭财务"],
    role: "独立设计与开发",
    background:
      "家庭保单往往分散在不同保司、不同年份的合同里，想知道「谁的保障不够、哪张快到期、今年一共交多少」只能一份份翻。",
    challenge:
      "要守住一个边界：身份证号和合同附件永远只存本机，不联网时完全离线可用；同时开启云同步后，离线期间的改动不能丢；单文件页面还要避免主题切换时闪一下白。",
    solution:
      "原生 HTML / CSS / JavaScript 单文件，零依赖零构建：保单字段存 localStorage，合同附件存 IndexedDB；到期提醒配桌面通知，费率趋势看同比；可选 Supabase 云同步，用记录级写入队列与 outbox 排队补传，并以 INITIAL_SESSION 守卫防止刷新循环；备份走 WebCrypto 加密，可导出 Excel 模板与 JSON。",
    outcome:
      "MVP 已完成并通过验收，可用 nginx / Docker 自托管。内置示例数据全部脱敏（示例投保人甲 / 乙、示例保单号），真实保单只留在本机浏览器，绝不上传。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p001-family-insurance-dashboard",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p001-family-insurance-dashboard",
      },
    ],
  },
  {
    slug: "bar-games",
    title: "酒吧游戏",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "酒吧聚会怕冷场就用它：人数、尺度、雷区先说好，玩法自动轮着出题，手机打开就开局，断网也能继续。",
    cover: "/projects/bar-games.jpg",
    tags: ["移动 PWA", "Next.js 16", "离线可用", "聚会游戏"],
    role: "独立产品设计与开发",
    background:
      "聚会开局最怕冷场，也最怕题目越过界。这个 PWA 把「先说好人数、关系、尺度和雷区」放在开局第一步，再把出题和轮次交给程序。",
    challenge:
      "整局题目要在开局前一次性预生成，断网也能继续玩；API Key 只能留在本机，得加密存储、经同源代理转发，自定义 Provider 还要阻断私网地址防 SSRF；玩法引擎与游戏包必须解耦，玩家才能自己加包。",
    solution:
      "真心话、谁最可能、我从来没有等多种玩法混着玩；题库可纯本地，也可接 DeepSeek / OpenAI Compatible 出题；支持自定义游戏包、随机点名分组与 8 种酒桌规则库；局中能调强度，散场生成总结。",
    outcome:
      "完成移动 PWA，并另配 Capacitor 安卓壳。V1 明确不做账号、支付、云同步、多人房间与数据导出，是一款免费离线工具。",
    gallery: [],
    siteUrl: "https://p039-bar-games.vercel.app",
    repoUrl: "https://github.com/wanghoufan/p039-bar-games",
    links: [
      { label: "打开在线体验", href: "https://p039-bar-games.vercel.app" },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p039-bar-games",
      },
    ],
  },
  {
    slug: "party-night",
    title: "聚会游戏 Party Night",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "真心话大冒险、谁最可能一轮轮换着上，冷场交给它：手机打开就开局，也能装成安卓应用带去现场。",
    cover: "/projects/party-night.jpg",
    tags: ["移动 PWA", "Next.js 16", "Capacitor", "离线可用"],
    role: "独立产品设计与开发",
    background:
      "同一批朋友反复聚会，题目容易越玩越尬。这个工具把玩法、轮次和尺度控制做成可离线继续的移动端 PWA，开局不用讲规则。",
    challenge:
      "整局 Deck 要能离线生成、断网续玩；AI 出的题必须校验过才敢上屏；Key 只能存本机；玩法要能中途切换，又要允许玩家自己加游戏包。",
    solution:
      "真心话大冒险、谁最可能、我从来没有、AI 即兴混玩，另有二选一、转瓶子等单玩并支持局中切换；题库可本地或接 DeepSeek / OpenAI Compatible；Key 用 AES-GCM 存 IndexedDB；Engine 与 Game Pack 解耦，AI 输出走 Zod 校验；再配随机点名分组与 8 种酒桌规则库。",
    outcome:
      "完成 V1 并部署上线，同时有 Capacitor 安卓壳。不含账号、支付与云同步，数据留在本机。",
    gallery: [],
    siteUrl: "https://party-night-v1-2.vercel.app",
    repoUrl: "https://github.com/wanghoufan/p028-party-night",
    links: [
      { label: "打开在线体验", href: "https://party-night-v1-2.vercel.app" },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p028-party-night",
      },
    ],
  },
  {
    slug: "place-journal",
    title: "地点手账",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "去过的地方拍张照、写两句，自动整理成一本能翻、能找、能分享的地点手账，按地点和标签回到那天的感觉。",
    cover: "/projects/place-journal.jpg",
    tags: ["PWA", "React 18 + Vite", "Supabase 同步", "本地优先", "Expo + RN 安卓端"],
    role: "独立产品设计与开发",
    background:
      "照片攒了一堆，想按「我去过哪些地方」回看却没有结构。这个手账把每次记录变成有地点、有标签、能检索的条目。",
    challenge:
      "AI 供应商要能换（OpenRouter / DeepSeek / OpenCode 三个适配器，12 秒降级）；多端同时改要有冲突裁决；分享出去的快照绝不能带出私密内容。",
    solution:
      "拍照加语音记一笔，AI 提炼地点与标签；按地点、时间线、标签回顾，支持自然语言搜地点；分享有单卡、清单、地图三种形态且私密字段默认不外泄；数据先写本机 IndexedDB，再由 outbox 同步 Supabase；另有一个功能同构的 Expo + React Native 安卓 App，本机用 SQLite、登录同一账号即同步。",
    outcome:
      "已发 GitHub Release v0.1.0 并挂可直接下载的通用 APK（Android 7.0+，自建发布密钥签名）。网页版已上线并通过验收；云同步、地图与 AI 都需自备 Key，不填也能当纯本机手账用。",
    gallery: [],
    siteUrl: "https://place-journal-xi.vercel.app",
    repoUrl: "https://github.com/wanghoufan/p011-place-journal",
    links: [
      { label: "打开在线体验", href: "https://place-journal-xi.vercel.app" },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p011-place-journal",
      },
    ],
  },
  {
    slug: "nightrec",
    title: "夜间现场录音",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "mobile",
    summary:
      "整夜 DJ 现场录成一条不断带的录音：中途暂离不拆场，边录边识曲，第二天点歌名就跳回昨晚那一段。",
    cover: "/projects/nightrec.jpg",
    tags: ["Android", "Kotlin / Compose", "Media3", "现场记录"],
    role: "独立设计与开发",
    background:
      "想留住的是那一晚完整的声音现场，而不是一份零散的歌单。所以录音从「一场」出发，而不是从「一首」出发。",
    challenge:
      "长时间录音要能中途暂离、回来仍算同一场；识曲接口必须节流并去重，否则一晚下来请求爆掉；AI 净化只能当保守 Beta，任何异常都得保住原始录音。",
    solution:
      "Kotlin + Jetpack Compose 界面，Media3 负责录制，Room 存场次；AudD 连续识曲并去重，整晚一条进度条配 Marker 跳转回听，WorkManager 维持后台任务；识别失败保留未知段并可重新识别。",
    outcome:
      "完成 Android App（minSdk 29），真机验证截图入库。AI 净化为 Beta，识曲依赖 AudD 共享额度，插有线耳机时无法识曲；未做签名发布，源码与验证记录公开在仓库。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p041-nightrec",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p041-nightrec",
      },
    ],
  },
  {
    slug: "talent-showroom",
    title: "才艺展示厅",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "mobile",
    summary:
      "练的歌和谱分库记下调性，循环变速陪练，整场节目单装进手机，出门没网也能冷启动直接开演。",
    cover: "/projects/talent-showroom.jpg",
    tags: ["Capacitor", "离线优先", "曲库管理", "练习工具"],
    role: "独立设计与开发",
    background:
      "带着手机去演出或练习，现场常常没有网络，临时翻抖音找谱很狼狈。这个曲库的目标就是：没网也能直接播、直接练。",
    challenge:
      "离线是硬要求：下载要能断点重试，操作要能排队等网络恢复再同步；曲谱 PDF 必须随包打开，不能依赖在线服务。",
    solution:
      "吉他与唱歌分库并记录调性和 Capo；练习播放器支持循环与变速；一键下载全部到本地；批量分类配断网操作队列；从视频里裁出跳舞音乐，支持抖音链接收录；再配「今晚节目单」与演出模式。React 19 + Vite 前端、node:sqlite 后端、Capacitor 8 打包，PDF.js 随 APK 内置。",
    outcome:
      "完成 Web 与安卓双形态，尚未部署公网服务；吉他模块已于 2026-10-03 冻结。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p040-talent-showroom",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p040-talent-showroom",
      },
    ],
  },
  {
    slug: "stretch-routine",
    title: "拉伸语音播报",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "做拉伸不用盯屏幕数时间：动作和节拍靠语音念给你听，跟着走完一轮就行。",
    cover: "/projects/stretch-routine.jpg",
    tags: ["Android", "Expo / React Native", "语音播报", "离线 SQLite"],
    role: "独立设计与开发",
    background:
      "拉伸时盯着倒计时很别扭，手机放远处又看不清。把动作和节拍交给语音念出来，人就能闭眼跟着走完一轮。",
    challenge:
      "计时不能被「用户改系统时钟」搞丢档；启动不能白闪一下；整套动作库要能按场景和部位筛，还得允许自己编排流程。",
    solution:
      "59 种动作按场景与部位动态筛选，流程编辑器支持批量录入与训练类型；跟练页用 TTS 播报动作与节拍，配倒计时背景音与中英双语；历史统计累计时长按类型分类；数据全部存本机 SQLite。计时改由自写 Kotlin 模块读 elapsedRealtime 与开机次数，真机实测 ±1 天跳钟误差 4 秒；启动用 SplashScreen 防白闪并在首帧后隐藏。",
    outcome:
      "已发 GitHub Release v1.2.0 并挂 APK，可直接下载安装。音频全部由项目自行程序化合成，正式播报走系统 TTS 引擎；仅 Android，后台加固与部分统计口径仍按挂账处理。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/stretch-routine-site/",
    repoUrl: "https://github.com/wanghoufan/p025-stretch-routine-app",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p025-stretch-routine-app",
      },
      {
        label: "打开官网",
        href: "https://wanghoufan.github.io/stretch-routine-site/",
      },
    ],
  },
  {
    slug: "stretch-side-timer",
    title: "拉伸换边计时器",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "mobile",
    summary:
      "拉伸不用自己数秒：这边响完提醒换那边，一段接一段跑完全程，还有小动物陪着练。",
    cover: "/projects/stretch-side-timer.jpg",
    tags: ["Android", "Expo / React Native", "拉伸", "计时提醒"],
    role: "独立设计与开发",
    background:
      "左右对称的拉伸和筋膜放松，最难的是记住「这边够了没、该不该换边」。数秒会分心，干脆交给提示音。",
    challenge:
      "锁屏之后计时还要准；安卓桌面图标要显示英文名，得自己写 config plugin 才能做到。",
    solution:
      "分段循环倒计时配换边响铃，跑完一段自动接下一段；陪伴小动物用 emoji 做五状态动画；4 套主题、8 种换边音与 9 种背景音、中英文跟随系统，历史记录存 AsyncStorage；锁屏计时用结束时间戳回校。",
    outcome:
      "完成 Android APK 并在真机验收（无 iOS）。背景音使用 Incompetech 的 CC BY 4.0 署名素材；安装包未发 GitHub Release，源码与真机运行证明公开在仓库。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p020-stretch-side-timer",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p020-stretch-side-timer",
      },
    ],
  },
  {
    slug: "photo-library",
    title: "摄影作品库",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "web",
    summary:
      "拍过的照片变成找得到的作品：按地点、风格、构图筛出满意的一批，链接一甩就能给别人看同一批结果。",
    cover: "/projects/photo-library.jpg",
    tags: ["React 19 + Vite", "PWA", "分面筛选", "本地优先"],
    role: "独立设计与开发",
    background:
      "照片按文件夹存着就再也找不到了。这个项目把它变成一座私人收藏馆：图片是主角，靠标签和分面把「满意的那一批」随时捞出来。",
    challenge:
      "六个维度的筛选要能叠加并实时显示命中数；筛选条件还得编进 URL，别人打开链接看到的是同一批结果；写入要先落本地、登录后再按依赖顺序推云端，删除必须反序。",
    solution:
      "瀑布流与网格两种画廊配灯箱；地点、风格、构图、年份、方向、收藏六维分面，支持单张与批量导入、标签改名与删除；IndexedDB 本地优先加 outbox 待推送队列，Google 登录后同步到自建 Supabase 的独立 schema；筛选状态写进 URL 用于分享；PWA 可安装，移动优先、桌面增强。",
    outcome:
      "完成可用系统并以 Docker 自托管，未公开部署站点地址。演示图走 Unsplash 外链，离线会空；「导出数据」按钮尚未实现。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p015-photo-library",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p015-photo-library",
      },
    ],
  },
  {
    slug: "fill-light",
    title: "夜间补光灯",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "手边没灯时，第二台手机就是补光灯：全屏常亮，颜色和强度随手调，两台手机不用配对、也不能远程控制。",
    cover: "/projects/fill-light.jpg",
    tags: ["Android", "Expo / React Native", "补光", "离线单机"],
    role: "独立设计与开发",
    background:
      "一台手机既要拍又要补光就冲突；手电筒光质偏硬刺眼，专业补光灯又贵。把闲置的第二台手机变成灯最省事。",
    challenge:
      "上架包要求 0 权限，网络权限只能留在 debug 构建里；语言偏好写入要串行，否则并发会丢；色轮贴图得用脚本生成而不是手摆。",
    solution:
      "全屏补光画布默认暖白常亮；8 组预设色加 HSV 色轮自定义；颜色强度与屏幕亮度双滑条；操作面板 5 秒自动收起避免误触；状态本地持久化，中英双语；Expo + React Native 实现，仅本机生效。",
    outcome:
      "已发 GitHub Release v2.1.0 并挂 app-release.apk，真机 release 截图入库。仅 Android，iOS 未实装。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/fill-light-site/",
    repoUrl: "https://github.com/wanghoufan/p026-yejian-buguangdeng",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p026-yejian-buguangdeng",
      },
      {
        label: "打开官网",
        href: "https://wanghoufan.github.io/fill-light-site/",
      },
    ],
  },
  {
    slug: "skill-system-map",
    title: "Skill 能力地图",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "method",
    summary:
      "把工作、学习和生活中的方法整理成可复用的 Skill，一张图看清能力分布、来源和流程之间怎么衔接。",
    cover: "/projects/skill-system-map.png",
    tags: ["静态网页", "GitHub Pages", "能力盘点", "Skill 治理"],
    role: "独立设计与维护",
    background:
      "方法攒了不少，却看不出自己到底会什么、它们彼此怎么接上。这块地图把可复用的 Skill 按能力领域、来源和流程铺开，让盘点变成看一眼的事。",
    challenge:
      "统计口径要防漂移：数据合并中央登记档案与个人已安装清单并按名称去重；插件自带 Skill、角色流程和项目专用规范不计入 Skill 总数；迭代热力图只统计有日期的变更登记，不代表质量或投入时长。",
    solution:
      "页面分三块：持续改进看变更登记热力图与近期更新；工作与生活的流程地图把生活管理与项目交付各环节连起来，点任一环节可跳到对应 Skill；能力盘点按能力领域浏览，支持按自建、官方上游、社区待核验三种来源筛选并搜索名称与用途。",
    outcome:
      "已发布到 GitHub Pages，打开即看、无需安装。公开快照登记 75 个 Skill：自建 38、官方上游 24、社区待核验 13，覆盖生活管理、出行服务、需求澄清、项目协作、UI 设计、内容创作、学习与知识管理、数据分析、效率自动化、测试、部署运维与 Skill 治理等领域。",
    gallery: ["/projects/skill-system-map-iterations.png"],
    siteUrl: "https://wanghoufan.github.io/alw-002-skill-system-map/",
    repoUrl: "https://github.com/wanghoufan/alw-002-skill-system-map",
    links: [
      {
        label: "打开在线地图",
        href: "https://wanghoufan.github.io/alw-002-skill-system-map/",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/alw-002-skill-system-map",
      },
    ],
  },
  {
    slug: "orca-governance-template",
    title: "ORCA 多智能体开发系统",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "method",
    summary:
      "多智能体协作照着它开工：一页全员规则、角色卡、计划与验收模板、账本校验，按阶段推进不跑偏。",
    cover: "/projects/orca-governance-template.png",
    tags: ["多智能体协作", "治理模板", "客户端无关", "验收留痕"],
    role: "独立设计与维护",
    background:
      "体系不绑定 Orca，也不绑定任何客户端：Orca、Trae、Qoder、Codex、CodeArts Agent、opencode、Claude Code 随便切，规则、角色卡、账本和验收口径必须是同一套。",
    challenge:
      "规则要一处改动全项目同步：各项目根的分工表用软链指向母版真源，禁拷实文件，跨机器断链时才拷实文件并记交接；模板名冻结，版本真相以仓库 Git 提交历史为准，版本标记文件只是指针。",
    solution:
      "开工读盘顺序全体系唯一：全员规则 → 本次角色卡 → 模型表 → 交接现状 → 经验一句话，任务目标放最后。每轮开工先自动探测当前客户端再选派工口，有原生子代理就在窗口内直派，没有就走通道 CLI 直调，用户不填配置也不指派角色；用户只需记住三个口令：第一阶段计划、第二阶段开发、变更请求。",
    outcome:
      "分发版已公开在 GitHub，含中英文导航、角色规范、计划与验收模板和账本校验脚本；模型与通道口径以根目录那张表为唯一准，导航里不复述模型 ID，避免与表漂移。",
    gallery: [
      "/projects/orca-governance-template-chain.png",
    ],
    repoUrl: "https://github.com/wanghoufan/orca-v2.1-governance",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/orca-v2.1-governance",
      },
    ],
  },
  {
    slug: "mahjong-quick-guide",
    title: "麻将小白助手",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "第一次上桌打海南麻将之前，先把「什么情况下能胡」看明白：规则全部配真实牌面，不懂麻将也能照着上手，手机打开就能看。",
    cover: "/projects/mahjong-quick-guide.jpg",
    tags: ["纯静态网页", "PWA 可离线", "中英双语", "规则速查"],
    role: "独立设计与开发",
    background:
      "第一次上桌前总卡在同一批问题上：这手牌到底能不能胡、为什么不能胡，以及顺子、刻子、碰、吃、杠这些词究竟指什么。这个项目不做番种大全，只把上桌前真正会卡住的几件事讲清楚，每条规则都配真实牌面。",
    challenge:
      "要让完全不懂麻将的人也能看懂：术语第一次出现就地解释，不留没解释的专业词；牌面要真实可辨，还得把海南玩法的四条条件（眼是二/五/八、座位对花、风牌箭牌凑三张、有番才能点炮）逐条讲透；同时保持零依赖、零联网，双击就能打开。",
    solution:
      "纯静态页面（index.html + app.js + app.css + i18n.js + data/*.js），无框架、无构建、无外链；「什么情况下能胡」「为什么不能胡」各占一页，8 条真实牌例与术语表都配牌面；另附座次表、牌桌大屏两个小工具；中英双语可跟随系统，浅色/深色/跟随系统三态外观，切换不丢当前页面；PWA 可安装、断网可看，SW_VERSION 控制缓存版本、新版本接管后自动刷新。",
    outcome:
      "线上版已发布，手机上可「添加到主屏幕」当 App 用、断网也能看。玩法只覆盖海南麻将这一档；不是判牌引擎，只呈现 8 条已审核的静态牌例；规则来自公开资料与本地玩法整理，不含任何下注、计分或赌博功能。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/p046-mahjong-beginner-assistant/",
    repoUrl: "https://github.com/wanghoufan/p046-mahjong-beginner-assistant",
    links: [
      {
        label: "打开在线体验",
        href: "https://wanghoufan.github.io/p046-mahjong-beginner-assistant/",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p046-mahjong-beginner-assistant",
      },
    ],
  },
  {
    slug: "kegel-trainer",
    title: "盆底肌训练",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "戴上耳机跟着语音做凯格尔训练：收紧、保持、放松全程念给你听，六级进阶自动排课，不用盯屏幕、不用心里数数。",
    cover: "/projects/kegel-trainer.jpg",
    tags: ["Android", "Kotlin / Jetpack Compose", "语音引导", "离线本机数据"],
    role: "独立设计与开发",
    background:
      "凯格尔（盆底肌）训练最难的不是动作，而是坚持：传统 App 要盯着屏幕看倒计时、心里默数次数，练起来麻烦又容易分心。",
    challenge:
      "语音要能扛住锁屏、来电和切后台不中断；计时与播报必须严格对齐；摸底全程不能要求用户手动计数；训练中途还要留得出安全出口。",
    solution:
      "Kotlin + Jetpack Compose 实现，音频走 Media3 前台媒体服务；每级按「每天几场 × 每场几次」定义，每场固定「1 个耐力组 + 1 个快速回合」，次数每次一致；「各级标准」页用耐力 / 快速 / 每日总计三张表列出；5 项摸底全部内置计时与语音引导并给出 L1–L6 等级建议；新增历史页，展示训练总计与每日时长 / 每日次数柱状图。支持低调模式、半量与中英双语、主题三态，数据仅存本机、无联网无账号。",
    outcome:
      "已发 GitHub Release v1.1 并挂可直接下载的正式签名 APK（Android 12+）；产品验收全部通过，历史页提供训练统计与图表。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/kegel-trainer-site/",
    repoUrl: "https://github.com/wanghoufan/p045-kegel-training",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p045-kegel-training",
      },
      {
        label: "打开官网",
        href: "https://wanghoufan.github.io/kegel-trainer-site/",
      },
    ],
  },
  {
    slug: "socialmate",
    title: "SocialMate 外语社交系统",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "web",
    summary:
      "练前挑话题自然开场、按场景和难度模拟口语，聊完把真实交流整理成人物档案，数据全部保存在本机 Markdown 文件里。",
    cover: "/projects/socialmate.jpg",
    tags: ["本地优先", "Markdown", "Node.js", "Docker", "自托管"],
    role: "独立设计与开发",
    background:
      "练外语社交最麻烦的不是开口，而是记不住聊过的东西：交流散落在聊天记录里，下次再见同一个人，上次聊过什么、聊到哪一步，全靠翻记录。",
    challenge:
      "数据要只存本机、不依赖账号和云端；人物档案的修改要走预览确认，不能让 AI 直接覆盖文件；话题阅读、口语练习和档案整理之间来回切换还得顺手，不能每一步都跳页。",
    solution:
      "纯前端加 Node 内置 HTTP 服务实现，Markdown 文件是唯一数据真源：wiki 式界面左侧放功能导航、右侧内容直达；话题库支持搜索并记住上次读到的话题；口语练习按场景配五档难度，一键生成提示词交给 ChatGPT Live；人物主档修改须经预览确认后落盘；提供晨光、墨夜、松林三套主题，Docker 部署只监听 127.0.0.1。",
    outcome:
      "源码已公开，并在本机 Docker 常驻运行；本地服务验收测试全部通过，人物主档编辑须经过 Review 预览确认，互动记录不可被审阅接口覆盖。",
    gallery: [],
    repoUrl:
      "https://github.com/wanghoufan/alw-001-foreign-language-social-system",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/alw-001-foreign-language-social-system",
      },
    ],
  },
  {
    slug: "bitetempo",
    title: "慢食刻",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "吃饭太快的人用它慢下来：光球计时全程静音，慢食提示只显示不响铃；饭后说两句心得，AI 只去口水词；每顿饭自动留档，统计页摊开累计餐数与达标率，数据全留在本机。",
    cover: "/projects/bitetempo.jpg",
    tags: ["Android", "Expo / React Native", "静音计时", "离线本机数据"],
    role: "独立设计与开发",
    background:
      "吃饭快、注意力被手机带走，想记点感受又懒得打字，过几天连吃了什么都想不起来。",
    challenge:
      "计时要扛住锁屏和切后台不跑偏；部分小米机型的系统语音识别拿不到结果，得能退回键盘语音或手动输入且不丢内容；AI 只能去口水词，不能改意思、不能加建议。",
    solution:
      "Expo / React Native 实现，计时用单调时钟加挂钟校正的状态机，锁屏回来按真实时间恢复；提醒只显示文字、不出声音；心得支持语音或手输，AI 整理走统一接口接 DeepSeek，原文与整理稿对照确认后才保存，Key 只存在手机安全存储里；数据全部存本机 SQLite，无账号、无云同步；用餐记录与统计同样在本机聚合，按本地时区分组、避开跨日界线的错算。",
    outcome:
      "已发 GitHub Release v1.0.0 并挂可直接下载的通用 APK（Android 7.0+，debug 签名，对应首发版本）；随后的用餐历史与统计可从源码构建；中英双语、主题三态，两台真机跑通并留有逐项截图证据。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/bitetempo-site/",
    repoUrl: "https://github.com/wanghoufan/p047-mindful-eating",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p047-mindful-eating",
      },
      {
        label: "打开官网",
        href: "https://wanghoufan.github.io/bitetempo-site/",
      },
    ],
  },
  {
    slug: "curated-skills",
    title: "精选 Skill 开源仓库",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "method",
    summary:
      "把在真实项目里跑通过的 AI Skill 集中放一处：每项讲清它解决什么问题、要什么前提、安全边界划在哪，适不适合你的工作流程一眼能判。",
    cover: "/projects/curated-skills.jpg",
    tags: ["AI Skill", "中英双语", "SKILL.md", "真实项目验证"],
    role: "独立筛选、整理与维护",
    background:
      "仓库简介里那句就是它的定位：精选经真实项目验证的 AI 技能，说明每项工具解决的问题、使用前提和安全边界，帮助开发者判断是否适合自己的工作流程。README 开头还写了一句更硬的口径——每项都先在具体工作中验证，再整理成别人看得懂、能照着用的指令。",
    challenge:
      "难的不是写指令，是把边界划清楚：展示同步那颗写明不做全账号作品盘点，工作范围只限用户点名的一个项目；文档维护那颗要求无法证实的内容标成待确认、不许补猜，没有真实界面图就列为发布阻断项；Next.js 部署那颗则承认依赖服务器运行时的功能不能只靠静态导出保留。收录的门槛同样卡在这里——没验证过的不进来。",
    solution:
      "首页一张目录表给每项留一句话，往下每颗单开一节：一句定位、一张按当前仓库与线上状态核验过的成果图、适合什么场景、怎么触发，再链到完整 SKILL.md。三颗 Skill 与首页 README 都做成中英对照，展示同步那颗另附双语同步流程、封面取材、链接实测、交付前检查四份附属文件和一个只读校验脚本，按需读而不用一次读完。",
    outcome:
      "当前收录 3 颗 Skill、仓库 25 个跟踪文件：16 份 Markdown（中英各 8）、6 张成果截图（中英各 3）、1 个只读双语校验脚本和 1 份 MIT 许可证。内容按 MIT 授权，每颗 Skill 的适用范围继续逐项核对。",
    gallery: [],
    repoUrl:
      "https://github.com/wanghoufan/alw-003-curated-skill-open-source",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/alw-003-curated-skill-open-source",
      },
    ],
  },
  {
    slug: "audiobook-cabin",
    title: "妹妹的听书小屋",
    status: "published",
    statusLabel: "源码公开",
    year: "2026",
    category: "mobile",
    summary:
      "把家里已有的听书课程变成手机上的私人听书小屋：按学科和难度找课、逐集点播、睡前定时关闭、没网也能继续听。不用装 App、不用登录，音频永远不出家门。",
    cover: "/projects/audiobook-cabin.jpg",
    tags: ["离线收听", "睡眠定时", "中英双语", "家庭私有"],
    role: "独立设计与全栈开发，交付家人日常使用",
    background:
      "仓库简介里那句就是它的定位：把家里的听书课程变成手机上的私人听书小屋，按学科和难度找课、睡前定时关闭、没网也能继续听。买回来的课程文件一直躺在硬盘里，孩子想听一次得先经过电脑，这个项目就是为了让手机点开即听。",
    challenge:
      "README 把边界写得很明白：课程清单、真实音频与扫描明细只保留在本机，不进入仓库——对外能看到的界面一律用占位课程数据渲染。离线缓存存在手机浏览器里，清除网站数据会删掉缓存但收听记录要保留；4 份损坏源文件要在界面上标成不可播放而不影响其余内容。",
    solution:
      "家里电脑跑一个本地服务：课程 API 加 HTTP Range 流式分发，音频只在局域网走；手机侧是 React PWA，学科栏配难度页签和搜索，倍速、循环模式、睡眠定时、断点续听齐全，整课可下载、可暂停续传，装到桌面后断网播放已下载分集。界面中英双语、浅色深色跟随系统。",
    outcome:
      "已装到妹妹的安卓手机日常使用：整课下载后断网可听，收听进度跨页面保留；损坏源文件在界面明确标注不可播放。代码与文档公开在 GitHub，真实课程数据不在仓库内。",
    gallery: [],
    repoUrl: "https://github.com/wanghoufan/p051-sister-audiobook-cabin",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p051-sister-audiobook-cabin",
      },
    ],
  },
  {
    slug: "blinkguard",
    title: "眨眼守护",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "把闲置的安卓手机变成盯屏护眼提醒器：前置摄像头在手机本地数你的完整眨眼，盯太久没眨就响一声、说一句「眨眨眼」，用眼趋势和护眼小技巧都在同一台手机上看，画面不联网、不外传。",
    cover: "/projects/blinkguard.jpg",
    tags: ["Android", "本地识别", "离线无网络", "护眼提醒"],
    role: "独立设计与开发",
    background:
      "仓库简介里那句就是它的定位：把闲置的安卓手机架在显示器旁替你盯着眨眼，盯屏太久没眨眼就响一声、说一句「眨眨眼」提醒你，每天用眼趋势也帮你记下来，画面只在手机上处理、不联网、不外传。真机上还被反馈过一个更具体的场景——「我戴着眼镜，往右上角看屏幕的时候，我眨眼睛，它是识别不到的」。",
    challenge:
      "最难的一类场景正是那条反馈：分析画面只有 640×480、侧看超过 18° 就被判成转头、要连续两帧闭眼才算一次眨眼，戴眼镜往屏幕右上角看时漏得最多。提醒节奏同样有坑：人脸短暂离开画面会把 30 秒重复冷却重置，实测 12 秒连发三条。跨设备那一段还得依赖第三方转发链路，能不能到桌面不由本应用决定。",
    solution:
      "CameraX 前置取景加 ML Kit 本地人脸检测，只有完整的「闭眼—睁开」才计一次；分析画面提到 1280×960，提供 1.0/1.2/1.5× 三档变焦，侧看 30–40° 时按较闭合的那只眼判断、一只眼概率缺失时兜底另一只。提醒走 30 秒与 90 秒冷却加 2 秒最小间隔，上次提醒时间随会话状态持久化，离脸再回来也不重置。界面是监测/统计/技巧/设置四页底栏，统计页把未眨眼提醒（红）与低频提醒（黄）叠在同一根柱子上、柱高即提醒总数，覆盖今天 24 小时、近 7 天与近 30 天三档视图，配四项 KPI 卡、一句话洞察和占比环形图，点任意柱子看该时段明细；频率统一按「次 / 有效分钟」，有效时长不足 60 秒显示 0。提醒触发时另外发一条静音、纯文字的系统通知，跨设备转发到电脑桌面经实测未能打通，已按用户决定放弃，手机本机的提示音与语音提醒不受影响。",
    outcome:
      "真机（Redmi Note 11T Pro+ / Android 14）实测：戴眼镜 30 次人工对照 30/30，不戴眼镜 26/30（低一次，已作为已知限制记录）；同一进程连续运行 2 小时 03 分、0 崩溃、37.6°C、电量 90%→75%。29 个测试类 303 条单元测试全绿，lint 0 error；交付 APK 只申请 CAMERA 与 POST_NOTIFICATIONS，没有 INTERNET。验收矩阵 71 条：42 条通过、26 条待补证、2 条被外部条件阻塞、1 条按用户决定关闭，首次发布已于 2026-10-21 由用户签收通过（带已知限制）。对外安装走官网落地页的蒲公英扫码分发（公开安装、无需登录）；源码仓库不提供公开下载。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/blinkguard-site/",
    links: [
      {
        label: "打开官网",
        href: "https://wanghoufan.github.io/blinkguard-site/",
      },
    ],
  },
  {
    slug: "p049-haikou-travel-daily",
    title: "海口去哪玩",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "web",
    summary:
      "每天汇总海口值得去的活动、展览、演出和社群聚会，按今晚、本周末、未来一个月分好，并告诉你去之前要先做什么。",
    cover: "/projects/haikou-go.png",
    tags: ["海口", "城市指南", "活动日历", "PWA"],
    role: "独立设计与开发",
    background:
      "海口的活动信息分散在官方发布、票务平台、公众号和小红书 / 抖音里，想找今天或周末去哪玩，往往要在十几个来源之间来回翻。",
    challenge:
      "既要覆盖多个来源，又要核对时间与场馆、避免过期和错配；采集端还要遵守平台风控（限速、只复用已登录标签）；最终要整理成手机上能一眼决策的页面。",
    solution:
      "多源采集 + 去重 + 时效分档 + 排序生成每日指南；小红书 / 抖音只作发现源，需官方或票务等非 UGC 第二来源交叉印证；输出为移动优先的 PWA，按今晚 / 本周末 / 未来 7 天 / 未来 30 天分档，每条给出明确的下一步动作。",
    outcome:
      "已上线公网站点，并配置每天 07:30 自动更新：采集 → 生成 → 打开 → 逐项核对（日期是否为当天、是否命中平台风控、来源数量是否异常、页面是否真的更新），核对不过如实报错。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/haikou-go/",
    links: [
      {
        label: "打开在线体验",
        href: "https://wanghoufan.github.io/haikou-go/",
      },
    ],
  },
  {
    slug: "dance-master",
    title: "舞蹈大师",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    category: "mobile",
    summary:
      "把想学的抖音舞蹈攒成一份清单，再用自己合法拿到的视频按八拍一段一段练：只循环副歌、慢放看清脚下、镜像跟着跳，导入过的视频还能存成离线副本，断网也能接着练。",
    cover: "/projects/dance-master.png",
    tags: ["八拍分段", "离线练习", "Android", "本地存储"],
    role: "独立设计与开发",
    background:
      "仓库 README 里那句就是它的定位：把想学的舞存成一份清单，再用自己合法拿到的视频按八拍一段一段练熟。刷到想学的舞，一般只有两条路——反复拖进度条找副歌，或者存进相册后再也找不到；这个项目就是为了把「攒清单」和「练动作」分开。",
    challenge:
      "最难的一段只有真机能暴露：Android WebView 会对拦截器返回的 206 响应再执行一次 Range 跳过，正文已经切好的字节被二次偏移，表现是整文件下载校验完全一致、但播放三秒就报 MEDIA_ERR_DECODE（code=3）。定位过程排除了编码与采样率猜测，最后用「源文件 offset 1000 的 16 字节」逐字节对照才锁定。另一条线是数据安全：记录要原子写（临时文件、回读校验、备份、rename），迁移前必须拿到可核查的原始备份，批量写失败不能出现半批状态。",
    solution:
      "Android 侧是 Capacitor 壳加自写原生插件：系统选择器多选、应用私有媒体目录的 200/206/416 Range 服务、记录原子写与损坏自愈；206 按上游同类做法加「虚拟前缀」吸收二次跳过，并去掉重复的 Content-Type 与 Content-Length。前端 React 19 做记录层：状态与三态标签的组合筛选、批量整卡勾选与只改所选、回收站、离线副本保存与删除、JSON 备份预览后再导入；练舞页支持整曲合练与分段学习、循环或单次、BPM 与首拍决定八拍、镜像与 0.5/0.75/1 倍速、手动微调分段点。",
    outcome:
      "30 条产品验收全部有可核查证据：真机（Redmi Note 12 Pro / Android 14）实测覆盖 10 条多选导入、批量三态标签、软删恢复与永久删（源文件哈希前后一致）、断网加杀进程冷启动播离线副本、100 MB 大文件保存（PSS 峰值 317 MB 后回落稳定）、受控故障注入（空间不足、复制失败、记录写失败）与完整播放链路；Web 端 16 项回归无控制台报错。前端 152 项单测与 Java 单测（Range 解析、虚拟前缀、故障状态、资产 ID）全绿。已知限制照实写在 README：仅简体中文、离线副本不可跨设备、自动 BPM 有大小与时长上限、只在一台真机上验证。",
    gallery: [],
    siteUrl: "https://wanghoufan.github.io/dance-master-site/",
    links: [
      {
        label: "打开官网",
        href: "https://wanghoufan.github.io/dance-master-site/",
      },
    ],
  },
];