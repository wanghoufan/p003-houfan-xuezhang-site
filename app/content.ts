export type ProjectStatus = "draft" | "published";

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
  {
    title: "Claude Code 中转服务",
    cover: "/services/claude-code-relay.png",
    coverWidth: 1539,
    coverHeight: 1168,
    coverVersion: "20260811",
    href: "https://shop.xuedingtoken.com/?dist=6SGDPWS6",
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
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/cny-us-rate-board",
      },
    ],
  },
  {
    slug: "deepseek-balance-widget",
    title: "DeepSeek 余额悬浮小工具",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
    summary:
      "一个面向 Windows 11 的 DeepSeek API 余额监控工具，集中展示余额变化、充值与赠送明细，并在余额异常时及时提醒。",
    cover:
      "https://raw.githubusercontent.com/wanghoufan/DeepSeekBalanceWidget/master/artifacts/ui-audit/02-after.png",
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
    links: [
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/DeepSeekBalanceWidget",
      },
      {
        label: "下载最新版本",
        href: "https://github.com/wanghoufan/DeepSeekBalanceWidget/releases/latest",
      },
    ],
  },
  {
    slug: "nomad-seasons",
    title: "候鸟 / Nomad Seasons",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
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
    gallery: [],
    links: [
      {
        label: "打开在线体验",
        href: "https://ai-storyboard-studio-2026.mortimerstephanie14.chatgpt.site/",
      },
    ],
  },
  {
    slug: "50-haikou-cafes",
    title: "海口值得去的 50 家咖啡店",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
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
    summary:
      "一份汇总 11 只 A 股核心指数十年估值分位的单页响应式报告，用统一标记展示当前估值水位。",
    cover:
      "https://raw.githubusercontent.com/wanghoufan/a-share-index-valuation-report/master/screenshots/preview-hero.png",
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
    links: [
      {
        label: "打开在线体验",
        href: "https://a-share-index-valuation-report.vercel.app",
      },
      {
        label: "查看 GitHub 项目",
        href: "https://github.com/wanghoufan/a-share-index-valuation-report",
      },
    ],
  },
  {
    slug: "ai-resume-job-matcher",
    title: "AI 简历岗位匹配助手",
    status: "published",
    statusLabel: "已发布",
    year: "2026",
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
    links: [
      {
        label: "打开在线体验",
        href: "https://ai-resume-job-matcher-houfan.vercel.app/",
      },
    ],
  },
];
