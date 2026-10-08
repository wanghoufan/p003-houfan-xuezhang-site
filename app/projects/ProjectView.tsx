"use client";

import Link from "next/link";
import { projectCategoryLabels, type Project } from "../content";
import { asset } from "../asset";
import { LangToggle, useLang, useTd, useT } from "../LangToggle";
import { categoryLabelsEn, projectEn } from "../i18n";
import { linkLabelEn, projectDetailEn } from "../i18n.detail";

export function ProjectView({ project }: { project: Project }) {
  const lang = useLang();
  const t = useT();
  const td = useTd();
  const en = lang === "en";
  const copy = en ? projectEn[project.slug] : undefined;
  const detail = en ? projectDetailEn[project.slug] : undefined;
  const title = copy?.title ?? project.title;
  const summary = copy?.summary ?? project.summary;
  const category = en
    ? categoryLabelsEn[project.category]
    : projectCategoryLabels[project.category];
  const joiner = td("techJoin");

  return (
    <main className="project-page">
      <nav className="project-nav" aria-label={td("navAria")}>
        <Link href="/#projects">{td("backToList")}</Link>
        <Link href="/">{td("siteName")}</Link>
        <LangToggle />
      </nav>

      <header className="project-hero">
        <p>
          {project.year} · {category}
        </p>
        <h1>{title}</h1>
        <div className="project-hero-summary">
          <p>{summary}</p>
          <dl>
            <div>
              <dt>{td("myRole")}</dt>
              <dd>{detail?.role ?? project.role}</dd>
            </div>
            <div>
              <dt>{td("techUsed")}</dt>
              <dd>{(detail?.tags ?? project.tags).join(joiner)}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div
        className="project-cover"
        aria-label={project.cover ? td("cover") : td("coverPending")}
      >
        {project.cover ? (
          <img
            src={asset(project.cover)}
            alt={en ? `${title} ${t("coverAlt")}` : `${title}${t("coverAlt")}`}
            decoding="async"
          />
        ) : (
          <span>{td("imagePending")}</span>
        )}
      </div>

      <article className="project-story">
        {(
          [
            ["01", td("background"), detail?.background ?? project.background],
            ["02", td("challenge"), detail?.challenge ?? project.challenge],
            ["03", td("approach"), detail?.solution ?? project.solution],
            ["04", td("outcome"), detail?.outcome ?? project.outcome],
          ] as const
        ).map(([number, heading, body]) => (
          <section key={number}>
            <span>{number}</span>
            <div>
              <h2>{heading}</h2>
              <p>{body}</p>
            </div>
          </section>
        ))}
      </article>

      {project.gallery.length > 0 && (
        <section className="project-gallery" aria-labelledby="gallery-title">
          <h2 id="gallery-title">{td("gallery")}</h2>
          {project.gallery.map((image, index) => (
            <img
              key={image}
              src={asset(image)}
              alt={
                en
                  ? `${title} ${td("galleryAlt")} ${index + 1}`
                  : `${project.title}${td("galleryAlt")} ${index + 1}`
              }
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
              {en ? (linkLabelEn[link.label] ?? link.label) : link.label} ↗
            </a>
          ))}
        </footer>
      )}
    </main>
  );
}
