import type { ProjectCategory } from "./content";

export type Lang = "zh" | "en";

/** 壳层文案（导航、区块标题、按钮、状态字、图片替代文本）。正文内容不在这里。 */
export const ui = {
  skip: { zh: "跳到主要内容", en: "Skip to main content" },
  homeAria: { zh: "后翻学长首页", en: "Houfan — home" },
  langAria: { zh: "语言", en: "Language" },
  navAbout: { zh: "关于我", en: "About" },
  navProjects: { zh: "项目", en: "Projects" },
  navServices: { zh: "服务", en: "Services" },
  navInterests: { zh: "兴趣", en: "Interests" },
  navTopics: { zh: "专题", en: "Topics" },
  navContact: { zh: "联系", en: "Contact" },
  eyebrow: { zh: "海南海口 · 自由探索中", en: "Haikou, Hainan · exploring in the open" },
  heroIntro: {
    zh: "从长期学习到自由探索，我正在把阅读、生活经验与 AI 编程连接起来，在一次次真实实践中拓展自己的边界。",
    en: "From years of self-study to exploring on my own, I connect reading, everyday life and AI programming — pushing my own boundaries one real project at a time.",
  },
  portraitAlt: { zh: "后翻学长个人照片", en: "Portrait of Houfan" },
  portraitLabel: { zh: "个人照片", en: "Personal photo" },
  portraitHint: { zh: "待更新 · 建议竖版 4:5", en: "To be replaced · 4:5 portrait suggested" },
  portraitCaption: {
    zh: "把真实生活留在这里，让每一次探索都有迹可循。",
    en: "Real life stays here, so every experiment leaves a trace.",
  },
  kickerNow: { zh: "当下", en: "Right now" },
  focusTitle: { zh: "目前探索方向", en: "What I am exploring now" },
  focusValue: { zh: "AI 应用与编程", en: "AI apps and programming" },
  focusNote: {
    zh: "从使用工具，到亲手构建产品。",
    en: "From using tools to building products myself.",
  },
  sectionExperience: { zh: "我的经历", en: "My background" },
  sectionProjects: { zh: "AI 项目作品", en: "AI project work" },
  sectionServices: { zh: "我能帮你", en: "What I can do for you" },
  sectionInterests: { zh: "兴趣切片", en: "Life outside work" },
  sectionMilestones: { zh: "经历与认证", en: "Milestones and credentials" },
  sectionTopics: { zh: "曾研究的专题", en: "Topics I have researched" },
  interestGroupLife: { zh: "生活类", en: "Everyday life" },
  interestGroupSport: { zh: "运动类", en: "Sports" },
  interestLead: {
    zh: "工作之外，也在生活与运动中认识世界。",
    en: "Outside work I learn about the world through life and sport.",
  },
  photoPending: { zh: "照片待更新", en: "Photo to be replaced" },
  contactKicker: { zh: "保持联系", en: "Stay in touch" },
  contactTitleA: { zh: "因为好奇而相遇，", en: "We meet through curiosity," },
  contactTitleB: { zh: "因为实践而同行。", en: "we keep going through practice." },
  contactLead: {
    zh: "如果你也在探索 AI、学习方法、健康生活或任何有趣的问题，欢迎与我联系。",
    en: "If you are exploring AI, learning methods, healthy habits or any interesting problem, I would like to hear from you.",
  },
  footerMotto: {
    zh: "保持好奇，持续实践，把兴趣活成作品。",
    en: "Stay curious, keep building, turn hobbies into shipped work.",
  },
  filterLabel: { zh: "按形态筛选", en: "Filter by form" },
  filterAll: { zh: "全部", en: "All" },
  showingCount: { zh: "当前显示", en: "Showing" },
  projectsWord: { zh: "个作品", en: "projects" },
  viewSite: { zh: "查看成品", en: "View the site" },
  downloadApp: { zh: "下载应用", en: "Download the app" },
  coverAlt: { zh: "项目封面", en: "project cover" },
} as const;

/** 详情页与联系面板的界面词（第二批）。 */
export const uiDetail = {
  navAria: { zh: "项目页面导航", en: "Project page navigation" },
  backToList: { zh: "← 返回项目列表", en: "← Back to all projects" },
  siteName: { zh: "后翻学长", en: "Houfan" },
  myRole: { zh: "我的角色", en: "My role" },
  techUsed: { zh: "使用技术", en: "Built with" },
  techJoin: { zh: "、", en: ", " },
  cover: { zh: "项目封面", en: "Project cover" },
  coverPending: { zh: "项目封面待更新", en: "Cover to be added" },
  imagePending: { zh: "PROJECT IMAGE · 待更新", en: "PROJECT IMAGE · to be added" },
  background: { zh: "背景", en: "Background" },
  challenge: { zh: "挑战", en: "Challenge" },
  approach: { zh: "方案与过程", en: "Approach" },
  outcome: { zh: "成果", en: "Outcome" },
  gallery: { zh: "项目图片", en: "Project images" },
  galleryAlt: { zh: "项目图片", en: "project image" },
  notFound: { zh: "项目未找到", en: "Project not found" },
  channelsAria: { zh: "联系方式", en: "Ways to reach me" },
  wechat: { zh: "微信", en: "WeChat" },
  viewQr: { zh: "查看二维码", en: "View the QR code" },
  visitHome: { zh: "访问主页 ↗", en: "Visit ↗" },
  homePending: { zh: "主页链接待补充", en: "Link to be added" },
  visitChannel: { zh: "访问频道 ↗", en: "Visit the channel ↗" },
  channelPending: { zh: "频道链接待补充", en: "Channel link to be added" },
  closeQr: { zh: "关闭微信二维码", en: "Close the WeChat QR code" },
  wechatTitle: { zh: "微信联系", en: "Reach me on WeChat" },
  qrAlt: { zh: "后翻学长的微信二维码", en: "My WeChat QR code" },
  qrPending: { zh: "二维码待补充", en: "QR code to be added" },
  qrReplace: { zh: "稍后替换为真实微信二维码", en: "Will be replaced with the real QR code" },
} as const;

export type UiKey = keyof typeof ui;

export type UiDetailKey = keyof typeof uiDetail;

export const categoryLabelsEn: Record<ProjectCategory, string> = {
  web: "Web app",
  desktop: "Desktop tool",
  mobile: "Mobile app",
  ai: "AI app",
  report: "Data report",
  method: "Methods & systems",
};

/** 作品标题与摘要的英文版（详情页长文暂未翻译）。 */
export const projectEn: Record<string, { title: string; summary: string }> = {
  "cny-us-rate-board": {
    title: "CNY/USD Rate Board",
    summary:
      "A lightweight board for the yuan-dollar rate: current purchase price, official midpoint and where today sits in the historical range, on plain cards.",
  },
  "deepseek-balance-widget": {
    title: "DeepSeek Balance Widget (Windows)",
    summary:
      "A DeepSeek API balance monitor for Windows 11: balance changes, top-ups and granted credit in one place, with an alert when something looks off.",
  },
  "deepseek-balance-mac": {
    title: "DeepSeek Balance Widget (Mac)",
    summary:
      "The macOS version: DeepSeek balance and ChatGPT Plus usage sit in a desktop corner, auto-hide at the edge, shrink to a mini capsule or stay in the menu bar, and warn you when quota behaves oddly.",
  },
  "prompt-manager": {
    title: "Prompt Manager",
    summary:
      "Turn scattered prompts into searchable cards: paste a body and it gets a title and tags, copy counts are obvious, and a retrieval code lets an AI coding agent start working from it directly.",
  },
  "nomad-seasons": {
    title: "Nomad Seasons",
    summary:
      "A stay-abroad decision tool for Chinese digital nomads: filter and rank cities at home and abroad by month, climate preference, budget, connectivity and transport.",
  },
  "ai-storyboard-studio": {
    title: "AI Storyboard Studio",
    summary:
      "A creation tool for short-video writers, directors and creators: turn a theme, a script and a style preference into an actionable illustrated shot list.",
  },
  "50-haikou-cafes": {
    title: "50 Cafés Worth Visiting in Haikou",
    summary:
      "A city guide for people willing to walk down an alley for one café, listing 50 real coffee shops in Haikou.",
  },
  "a-share-index-valuation-report": {
    title: "A-Share Valuation Percentile Report (11 Indexes, 10 Years)",
    summary:
      "A single responsive page summarising ten-year valuation percentiles for eleven core A-share indexes, with a consistent marker for where each one sits today.",
  },
  "ai-resume-job-matcher": {
    title: "AI Resume & Job Matcher",
    summary:
      "An AI tool for job hunting: upload a resume and a target role, and it maps your experience and abilities against what the posting actually asks for.",
  },
  "life-species-coze": {
    title: "Life Species Quiz",
    summary:
      "A cartoon-animal personality test in Chinese: 24 questions reveal your life species, with 2 hidden secondary personalities and a shareable permanent result page.",
  },
  "protein-calculator": {
    title: "Protein Calculator",
    summary:
      "An Android tool with no sign-up and no network: work out daily protein needs from body weight, then close the gap for this meal against a high-protein food list.",
  },
  "roll-position-calculator": {
    title: "Rolling Position Calculator",
    summary:
      "How much to add at each step, how much leverage, and where it breaks — played out in front of you: one simulation table plus local history and live records, entirely in the browser, offline.",
  },
  "breakout-radar": {
    title: "PEPE / DOGE Breakout Radar",
    summary:
      "Quantitative research turned into a live market radar: six independent scoring layers and a ten-state machine, and every signal carries its value, evidence source, timestamp and data freshness.",
  },
  "hongli-dixin-calc": {
    title: "Dividend IPO Base-Position Calculator",
    summary:
      "A complete IPO base-position loop one person can run: valuation call, official constituent check, shares per position, a frozen order plan, phone-assisted ordering, then tracing back to the real portfolio.",
  },
  video2obsidian: {
    title: "Lazy Notes · Local Video to Text",
    summary:
      "Stop letting course and podcast videos rot on a drive: drop them in a folder and your own machine transcribes and splits them into searchable Markdown notes, with nothing uploaded.",
  },
  "family-insurance-dashboard": {
    title: "Family Insurance Dashboard",
    summary:
      "Finally be able to explain the family policies: who is under-covered, which one is close to renewal, how much is due this year — no more digging through drawers for contracts.",
  },
  "bar-games": {
    title: "Bar Games",
    summary:
      "The anti-silence tool for bar nights: agree on headcount, limits and landmines first, then it rotates the prompts automatically — open it on your phone to start, and it keeps going offline.",
  },
  "party-night": {
    title: "Party Night",
    summary:
      "Truth or dare and 'who is most likely to…', rotating through the group so the silences are its job: open on a phone to start, or install it as an Android app and bring it along.",
  },
  "place-journal": {
    title: "Place Journal",
    summary:
      "Take a photo and write a line for the places you have been, and it becomes a journal you can flip through, search and share — back to how that day felt, by place and by tag.",
  },
  nightrec: {
    title: "Nightrec",
    summary:
      "A whole late-night DJ set as one continuous recording: step away mid-set without breaking it, identify tracks while it records, and the next day a song title jumps you back to last night's moment.",
  },
  "talent-showroom": {
    title: "Talent Showroom",
    summary:
      "Keep practised songs and scores in separate libraries with their keys, loop and slow down with a practice partner, and carry the whole setlist on your phone — start cold offline, no network.",
  },
  "stretch-routine": {
    title: "Stretch Voice Coach",
    summary:
      "No staring at a screen counting seconds while you stretch: it reads the moves and the beat out loud, so you just follow along and finish the round.",
  },
  "stretch-side-timer": {
    title: "Stretch Side Timer",
    summary:
      "Stop counting seconds yourself: it pings when this side is done so you switch, runs one segment after another to the end, and a little animal practises alongside you.",
  },
  "photo-library": {
    title: "Photo Library",
    summary:
      "Photos become work you can find: filter by location, style and composition to get the set you like, then send one link and someone else sees exactly that set.",
  },
  "fill-light": {
    title: "Night Fill Light",
    summary:
      "When there is no lamp around, a second phone is your fill light: full screen at constant brightness, colour and intensity on a dial. The two phones never pair and there is no remote control.",
  },
  "skill-system-map": {
    title: "Skill Map",
    summary:
      "Turn the methods you pick up at work, in study and in life into reusable Skills, and see on one page where your capabilities sit, where they came from and how the flows connect.",
  },
  "orca-governance-template": {
    title: "ORCA Multi-Agent Dev System",
    summary:
      "Multi-agent collaboration that follows one template: a single page of rules for everyone, role cards, plan and acceptance templates, ledger checks — advancing by phase without drifting.",
  },
  "mahjong-quick-guide": {
    title: "Mahjong Quick Guide",
    summary:
      "Before your first game of Hainan mahjong, get 'when can I win' straight: every rule comes with real tile faces, so you can follow along with no prior knowledge — just open it on your phone.",
  },
};
