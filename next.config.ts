import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // 纯静态导出：构建产物在 out/，可同时部署到 Vercel 与国内静态托管平台
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // GitHub Pages 项目页带子路径 /<repo>/，Vercel 部署在根路径无需 basePath
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
