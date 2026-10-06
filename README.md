简体中文 | [English](./README.en.md)

# 后翻学长个人网站

一个非求职导向的个人展示网站：用杂志叙事的方式呈现个人经历、AI 应用与编程项目、兴趣生活、专题研究和联系方式。

![后翻学长个人网站首页](public/og.png)

- 线上地址（两条线内容一致，访客走 GitHub Pages，国内打开更快）：
  - GitHub Pages（对外主地址）：https://wanghoufan.github.io/p003-houfan-xuezhang-site/
  - Vercel（镜像备用）：https://houfan-xuezhang-site.vercel.app
- 已发布项目 24 个、服务卡片 1 张，界面语言为中文
- 纯静态站点，无数据库、无登录、无留言、无后台

## 站点能做什么

- **三套主题随时切换**：指挥舱（深色）、极光玻璃（浅色毛玻璃）、情报剪报（米色报纸）。选择会记在浏览器里，下次打开保持不变。
- **按形态筛选作品**：网页应用与桌面工具分组 chip，附当前显示数量；一次可看到全部 8 个作品。
- **每个作品两个出口**：直接打开成品网站（桌面工具则下载应用），以及查看GitHub 源码仓库。
- **项目详情页**：每个作品有独立的背景、挑战、方案与成果记录。
- **联系方式**：微信二维码、GitHub、YouTube。

## 快速开始（本地运行）

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

启动后访问 http://localhost:3000 。

提交或发布前运行：

```bash
npm test
```

该命令会先做正式构建，再校验首页内容、项目详情页、图片加载策略与关键链接，共7 项断言。代码风格检查：

```bash
npm run lint
```

## 改内容改哪里

| 要改的东西 | 文件或目录 |
| --- | --- |
| 个人资料、经历、兴趣、专题、项目与服务 | `app/content.ts` |
| 联系方式与微信二维码交互 | `app/ContactPanel.tsx` |
| 首页结构 | `app/page.tsx` |
| 作品卡片与分类筛选 | `app/ProjectGallery.tsx` |
| 项目详情页 | `app/projects/[slug]/page.tsx` |
| 主题切换控件 | `app/ThemeToggle.tsx` |
| 全站视觉样式（含三套主题） | `app/globals.css` |
| 头像与兴趣照片 | `public/photos/` |
| 项目封面 | `public/projects/` |
| 高清照片备份（不参与发布） | `assets/photo-originals/` |

`app/content.ts` 是内容唯一真值。项目只有标记为 `published` 才会出现在页面上。

照片替换步骤见 [照片替换说明.md](./照片替换说明.md)。网站加载 `public/photos/` 下的 WebP 图片，JPG、PNG 高清原图留在 `assets/photo-originals/`，不会进入公开站点。

### 新增一个作品

在 `app/content.ts` 的 `projects` 数组里加一条，填齐 `slug`、`title`、`category`、`summary`、`background`、`challenge`、`solution`、`outcome` 等字段，并把 `status` 设为 `"published"`。想让它在卡片上直接可点，填 `siteUrl`（已上线网站）或 `releaseUrl`（GitHub Release 下载页），再填 `repoUrl`（GitHub 仓库）。

## 内容约定

- 本站是个人数字名片，不使用求职、简历式表达，也不收录虚构项目。
- 「备考」「入门」等经历按原意表述，不改写为已获认证或已精通。
- 联系方式只展示真实有效的入口。
- 作品链接不编造：没有上线网站就不填 `siteUrl`，卡片会退回显示下载或仓库入口。

## 发布

源码只存 GitHub 一处，Vercel 和 GitHub Pages 都盯着`main` 分支自动构建。构建产物是纯静态文件，输出到 `out/`。

1. 修改本地内容或图片。
2. 运行 `npm test`。
3. 提交并推送到 `main`。

```bash
git add .
git commit -m "更新内容"
git push
```

两条线的差异只在路径前缀：Vercel 走根路径，GitHub Pages 因为仓库是项目页，带`/p003-houfan-xuezhang-site` 子路径。不需要登录任何平台后台，也不用新建站点。

## 技术说明

- React 19 + TypeScript
- Next.js 16.2.6（App Router）+ Turbopack
- Tailwind v4
- `output: "export"` 纯静态导出，产物在 `out/`
- 部署：GitHub Pages（对外主地址）+ Vercel（镜像备用），触发条件为 push 到 `main`

站内路由只有三个：首页 `/`、项目详情页 `/projects/[slug]/`、404 页。

仓库里还留着 Cloudflare Workers / OpenAI Sites 时代的文件（`worker/`、`build/`、`db/`、`drizzle/`、`examples/`、`vite.config.ts`、`.openai/`）。它们不参与构建、也不被页面引用，仅作回滚备用；其中除`.openai/hosting.json` 外已停止版本跟踪。
