"use client";

import { useMemo, useState } from "react";
import {
  projectCategoryLabels,
  type Project,
  type ProjectCategory,
} from "./content";
import { asset } from "./asset";
import { useLang, useT } from "./LangToggle";
import { categoryLabelsEn, projectEn } from "./i18n";

type FilterKey = "all" | ProjectCategory;

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const lang = useLang();
  const t = useT();

  const labelFor = (key: ProjectCategory) =>
    lang === "en" ? categoryLabelsEn[key] : projectCategoryLabels[key];

  const filters = useMemo<{ key: FilterKey; label: string; count: number }[]>(
    () => [
      { key: "all", label: t("filterAll"), count: projects.length },
      ...(Object.keys(projectCategoryLabels) as ProjectCategory[])
        .map((key) => ({
          key: key as FilterKey,
          label: labelFor(key),
          count: projects.filter((project) => project.category === key).length,
        }))
        .filter((item) => item.count > 0),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects, lang],
  );

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <>
      <div className="project-filter">
        <div className="filter-row" role="group" aria-label={t("filterLabel")}>
          <span className="filter-label">{t("filterLabel")}</span>
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              className={filter === item.key ? "filter-chip is-active" : "filter-chip"}
              aria-pressed={filter === item.key}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
              {lang === "en" ? ` (${item.count})` : `（${item.count}）`}
            </button>
          ))}
        </div>
        <p className="filter-count" role="status">
          {t("showingCount")} <strong>{visible.length}</strong> {t("projectsWord")}
        </p>
      </div>

      <div className="project-grid">
        {visible.map((project) => {
          const copy = lang === "en" ? projectEn[project.slug] : undefined;
          const title = copy?.title ?? project.title;
          const summary = copy?.summary ?? project.summary;
          return (
            <article className="project-card" key={project.slug}>
              {project.cover && (
                <div className="project-card-cover">
                  <img
                    src={asset(project.cover)}
                    alt={
                      lang === "en"
                        ? `${title} ${t("coverAlt")}`
                        : `${title}${t("coverAlt")}`
                    }
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <p className="project-meta">
                {project.year} · {labelFor(project.category)}
              </p>
              <h3>{title}</h3>
              <p className="project-summary">{summary}</p>
              {/* 卡片只给两个「成果」入口：成品本身（网站或下载页）+ GitHub。 */}
              <div className="project-card-actions">
                {project.siteUrl ? (
                  <a
                    className="project-action is-primary"
                    href={project.siteUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {t("viewSite")}
                  </a>
                ) : project.releaseUrl ? (
                  <a
                    className="project-action is-primary"
                    href={project.releaseUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {t("downloadApp")}
                  </a>
                ) : null}
                {project.repoUrl && (
                  <a
                    className="project-action"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
