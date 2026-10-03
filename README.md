# 后翻学长个人网站

![后翻学长个人网站示意图](public/og.png)

一个非求职导向的个人展示网站，用杂志叙事的方式呈现个人经历、AI 应用与编程项目、兴趣生活、专题研究和联系方式。

- 线上地址（双线，同一次 push 自动同步，内容一致）：
  - Vercel（主）：https://houfan-xuezhang-site.vercel.app
  - GitHub Pages：https://wanghoufan.github.io/p003-houfan-xuezhang-site/
- 已发布项目（以 `app/content.ts` 为准，共 8 个）：`cny-us-rate-board`、`deepseek-balance-widget`、`nomad-seasons`、`ai-storyboard-studio`、`50-haikou-cafes`、`a-share-index-valuation-report`、`ai-resume-job-matcher`、`life-species-coze`
- 服务卡片（1 个）：GPT 代充值
- 当前语言：中文
- 当前发布平台：Vercel（主）+ GitHub Pages（镜像）

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

网站源码只存GitHub 一处，Vercel 和 GitHub Pages 盯着同一个 `main` 分支自动构建。构建产物是纯静态文件，输出到 `out/`。

发布流程：

1. 修改本地内容或图片。
2. 运行 `npm test`。
3. 提交并推送到 `main`。
4. 等Vercel 和 GitHub Pages 各自构建完成（1～3 分钟），两条线内容一致。

```bash
git add .
git commit -m "更新内容"
git push
```

两条线的地址：

| 通道 | 地址 | 说明 |
| --- | --- | --- |
| Vercel | `https://houfan-xuezhang-site.vercel.app` | 主部署 |
| GitHub Pages | `https://wanghoufan.github.io/p003-houfan-xuezhang-site/` | 仓库是项目页，带`/p003-houfan-xuezhang-site` 子路径 |

不需要登录任何平台后台，也不需要新建站点。构建目录、依赖目录和临时目录均已写入 `.gitignore`，不应提交。

## 技术说明

- React 19
- TypeScript
- Next.js 16.2.6（App Router）+ Turbopack
- Tailwind v4
- `output: "export"` 纯静态导出，产物在 `out/`
- 托管：Vercel + GitHub Pages

仓库中还留着 Cloudflare Workers / OpenAI Sites 时代的文件（`worker/`、`build/`、`db/`、`drizzle/`、`examples/`、`vite.config.ts`、`.openai/`），它们不参与构建、也不被页面引用，属于回滚备用。当前网站本身未启用数据库或身份验证。
