import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：构建产物在 out/，可同时部署到 Vercel 与国内静态托管平台
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
