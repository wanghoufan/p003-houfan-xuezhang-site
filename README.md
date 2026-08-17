# 后翻学长个人网站

一个非求职导向的个人展示网站，用杂志叙事的方式呈现个人经历、AI 应用与编程项目、兴趣生活、专题研究和联系方式。

- 线上地址：https://houfan-xuezhang.mortimerstephanie14.chatgpt.site
- 已发布项目（以 `app/content.ts` 为准，共 7 个）：`cny-us-rate-board`、`deepseek-balance-widget`、`nomad-seasons`、`ai-storyboard-studio`、`50-haikou-cafes`、`a-share-index-valuation-report`、`ai-resume-job-matcher`
- 服务卡片（2 个）：GPT 代充值、Claude Code 中转服务
- 当前语言：中文
- 当前发布平台：OpenAI Sites

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

提交或发布前运行：

```bash
npm test
```

该命令会完成正式构建，并检查首页、项目详情页、图片加载策略和关键链接。

## 常用修改位置

| 要修改的内容 | 文件或目录 |
| --- | --- |
| 个人资料、经历、兴趣、专题、项目资料 | `app/content.ts` |
| 联系方式与微信二维码交互 | `app/ContactPanel.tsx` |
| 首页结构 | `app/page.tsx` |
| 项目详情页 | `app/projects/[slug]/page.tsx` |
| 全站视觉样式 | `app/globals.css` |
| 头像与兴趣照片 | `public/photos/` |
| 高清照片备份（不参与网站发布） | `assets/photo-originals/` |
| 项目封面 | `public/projects/` |

照片文件名、比例和替换步骤见 [照片替换说明.md](./照片替换说明.md)。网页实际加载 `public/photos/` 中的 WebP 图片；JPG、PNG 高清原图存放在 `assets/photo-originals/`，不会被复制进公开网站。替换后请保留清晰的替代文字，并继续使用现有的首屏优先加载与非首屏懒加载策略。

## 内容约定

- 本站是个人数字名片，不使用求职、简历或虚构项目表达。
- 项目只有标记为已发布时才公开显示；项目资料以 `app/content.ts` 为准。
- “备考”或“入门”经历应按原意表述，不能改写为已获得认证或精通。
- 联系方式只展示真实有效的入口。
- 当前没有数据库、登录、留言、统计或后台管理功能。

## 发布

站点已在 `.openai/hosting.json` 关联现有 Sites 项目。更新时必须沿用该项目，不能重复创建新站点。

发布流程：

1. 修改本地内容或图片。
2. 运行 `npm test`。
3. 将准确的当前源码推送到该 Sites 项目的源码仓库。
4. 保存新版本并部署该版本。
5. 检查线上页面和部署状态。

构建目录、依赖目录和临时目录均已写入 `.gitignore`，不应提交。

## 技术说明

- React 19
- TypeScript
- Next.js 兼容路由
- vinext / Vite
- Cloudflare Workers 运行时
- OpenAI Sites 托管

仓库中保留了 Sites/vinext 的基础设施文件和可选 D1 示例；当前网站本身未启用数据库或身份验证。
