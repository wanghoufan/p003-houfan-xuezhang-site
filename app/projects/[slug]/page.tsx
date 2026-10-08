import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "../../content";
import { ProjectView } from "../ProjectView";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// 静态导出只生成 generateStaticParams 列出的路径，未列出的路径直接落到 404 页面
export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.status === "published")
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(
    (item) => item.slug === slug && item.status === "published",
  );

  if (!project) {
    return { title: "项目未找到" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find(
    (item) => item.slug === slug && item.status === "published",
  );

  if (!project) {
    notFound();
  }

  return <ProjectView project={project} />;
}
