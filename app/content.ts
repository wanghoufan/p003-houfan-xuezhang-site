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

export type Service = {
  title: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  coverVersion: string;
  href: string;
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

// 新增服务时，只需在这里补充一张服务卡片。
export const services: Service[] = [
  {
    title: "GPT 代充值",
    cover: "/services/gpt-recharge.png",
    coverWidth: 1064,
    coverHeight: 1153,
    coverVersion: "20260811",
    href: "https://tiancexai.com/?aff=HOUFAN",
  },
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
    statusLabel: "源码公开",
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
      "完成本地网页端与 MCP 接入，支持局域网多端实时同步与 Docker 自托管，源码公开在 GitHub。暂无公网演示站；站内封面取自应用内置的「示例知识库」只读视图，不含任何真实使用数据。",
    gallery: [],
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
    siteUrl: "https://5dnqscfrmp.coze.site/",
    repoUrl: "https://github.com/wanghoufan/p002-life-species-test",
    links: [
      {
        label: "打开在线体验",
        href: "https://5dnqscfrmp.coze.site/",
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
    releaseUrl:
      "https://github.com/wanghoufan/p027-protein-calculator/releases/tag/styleB-20260920",
    repoUrl: "https://github.com/wanghoufan/p027-protein-calculator",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p027-protein-calculator",
      },
      {
        label: "下载安卓安装包",
        href: "https://github.com/wanghoufan/p027-protein-calculator/releases/tag/styleB-20260920",
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
    tags: ["PWA", "React 18 + Vite", "Supabase 同步", "本地优先"],
    role: "独立产品设计与开发",
    background:
      "照片攒了一堆，想按「我去过哪些地方」回看却没有结构。这个手账把每次记录变成有地点、有标签、能检索的条目。",
    challenge:
      "AI 供应商要能换（OpenRouter / DeepSeek / OpenCode 三个适配器，12 秒降级）；多端同时改要有冲突裁决；分享出去的快照绝不能带出私密内容。",
    solution:
      "拍照加语音记一笔，AI 提炼地点与标签；按地点、时间线、标签回顾，支持自然语言搜地点；分享有单卡、清单、地图三种形态且私密字段默认不外泄；数据先写本机 IndexedDB，再由 outbox 同步 Supabase，另配 Expo 安卓壳。",
    outcome:
      "PWA 已上线并通过验收。云同步、地图与 AI 都需自备 Key，不填也能当纯本机手账用。",
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
    releaseUrl:
      "https://github.com/wanghoufan/p025-stretch-routine-app/releases/tag/v1.2.0",
    repoUrl: "https://github.com/wanghoufan/p025-stretch-routine-app",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p025-stretch-routine-app",
      },
      {
        label: "下载安卓安装包",
        href: "https://github.com/wanghoufan/p025-stretch-routine-app/releases/tag/v1.2.0",
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
    releaseUrl:
      "https://github.com/wanghoufan/p026-yejian-buguangdeng/releases/tag/v2.1.0",
    repoUrl: "https://github.com/wanghoufan/p026-yejian-buguangdeng",
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/p026-yejian-buguangdeng",
      },
      {
        label: "下载安卓安装包",
        href: "https://github.com/wanghoufan/p026-yejian-buguangdeng/releases/tag/v2.1.0",
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
    title: "ORCA 治理模板",
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
];
