import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <main className="project-page">
      <nav className="project-nav" aria-label="项目页面导航">
        <Link href="/#projects">← 返回项目列表</Link>
        <Link href="/">后翻学长</Link>
      </nav>

      <header className="project-hero">
        <p>{project.year} · {project.statusLabel}</p>
        <h1>{project.title}</h1>
        <div className="project-hero-summary">
          <p>{project.summary}</p>
          <dl>
            <div>
              <dt>我的角色</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>使用技术</dt>
              <dd>{project.tags.join("、")}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="project-cover" aria-label={project.cover ? "项目封面" : "项目封面待更新"}>
        {project.cover ? (
          <img
            src={project.cover}
            alt={`${project.title}项目封面`}
            decoding="async"
          />
        ) : (
          <span>PROJECT IMAGE · 待更新</span>
        )}
      </div>

      <article className="project-story">
        <section>
          <span>01</span>
          <div>
            <h2>背景</h2>
            <p>{project.background}</p>
          </div>
        </section>
        <section>
          <span>02</span>
          <div>
            <h2>挑战</h2>
            <p>{project.challenge}</p>
          </div>
        </section>
        <section>
          <span>03</span>
          <div>
            <h2>方案与过程</h2>
            <p>{project.solution}</p>
          </div>
        </section>
        <section>
          <span>04</span>
          <div>
            <h2>成果</h2>
            <p>{project.outcome}</p>
          </div>
        </section>
      </article>

      {project.gallery.length > 0 && (
        <section className="project-gallery" aria-labelledby="gallery-title">
          <h2 id="gallery-title">项目图片</h2>
          {project.gallery.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${project.title}项目图片 ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </section>
      )}

      {project.links.length > 0 && (
        <footer className="project-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
        </footer>
      )}
    </main>
  );
}
