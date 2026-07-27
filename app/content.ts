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
  { name: "咖啡", mark: "COFFEE", description: "从一杯手作咖啡开始一天" },
  { name: "阅读", mark: "READ", description: "在书页之间校准认知" },
  { name: "吉他", mark: "GUITAR", description: "让节奏留住松弛的时刻" },
  { name: "健身", mark: "FITNESS", description: "用长期训练理解身体" },
  { name: "篮球", mark: "BASKETBALL", description: "在球场上保持专注与配合" },
  { name: "抖舞", mark: "DANCE", description: "在律动中打开新的表达" },
  { name: "滑雪", mark: "SNOWBOARD", description: "在雪线上学习平衡与勇气" },
  { name: "冲浪", mark: "SURF", description: "顺着海浪感受自由与敬畏" },
];

export const completedMilestones = [
  "得到 900 分高分学员",
  "国家中级健身教练认证",
  "大疆无人机航拍认证",
  "原雅思（IELTS）杨帅口语班班长",
  "自由冲浪、尾波冲浪入门",
  "单板滑雪入门",
];

export const ongoingExplorations = [
  "备考雅思考试",
  "备考国际健身认证（NSCA、ACE、NASM、ACSM）",
  "备考健康管理师",
];

export const topics = [
  { title: "健康与长寿", category: "LIFELONG HEALTH" },
  { title: "定投投资与保险", category: "PERSONAL FINANCE" },
  { title: "控糖饮食", category: "NUTRITION" },
  { title: "孩子近视预防", category: "VISION CARE" },
];

// 后续新增项目时，按 Project 类型填写完整资料，并将 status 设为 "published"。
export const projects: Project[] = [];
