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
  { name: "咖啡", mark: "COFFEE", category: "生活类", photo: "/photos/coffee.jpg" },
  { name: "阅读", mark: "READ", category: "生活类", photo: "/photos/reading.jpg" },
  { name: "吉他", mark: "GUITAR", category: "生活类", photo: "/photos/guitar.jpg" },
  { name: "健身", mark: "FITNESS", category: "运动类", photo: "/photos/fitness.jpg" },
  { name: "篮球", mark: "BASKETBALL", category: "运动类", photo: "/photos/basketball.jpg" },
  { name: "抖舞", mark: "DANCE", category: "运动类", photo: "/photos/dance.jpg" },
  { name: "滑雪", mark: "SNOWBOARD", category: "运动类", photo: "/photos/snowboard.jpg" },
  { name: "冲浪", mark: "SURF", category: "运动类", photo: "/photos/surf.jpg" },
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
];
