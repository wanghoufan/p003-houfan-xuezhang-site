import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const siteUrl = host ? `${protocol}://${host}` : "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "后翻学长｜保持好奇，持续实践",
      template: "%s｜后翻学长",
    },
    description:
      "后翻学长的个人网站：记录学习、生活兴趣、专题研究，以及 AI 应用与编程实践。",
    keywords: ["后翻学长", "终身学习", "AI 应用", "编程", "阅读", "海南海口"],
    authors: [{ name: "后翻学长" }],
    creator: "后翻学长",
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: siteUrl,
      title: "后翻学长｜保持好奇，持续实践",
      description:
        "记录学习、生活兴趣、专题研究，以及 AI 应用与编程实践。",
      siteName: "后翻学长",
      images: [
        {
          url: "/og.png",
          width: 1735,
          height: 909,
          alt: "后翻学长：保持好奇，持续实践，把兴趣活成作品。",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "后翻学长｜保持好奇，持续实践",
      description:
        "记录学习、生活兴趣、专题研究，以及 AI 应用与编程实践。",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
