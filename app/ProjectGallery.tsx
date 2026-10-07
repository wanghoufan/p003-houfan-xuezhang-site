"use client";

import { useMemo, useState } from "react";
import {
  projectCategoryLabels,
  type Project,
  type ProjectCategory,
} from "./content";
import { asset } from "./asset";

type FilterKey = "all" | ProjectCategory;

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filters = useMemo<{ key: FilterKey; label: string; count: number }[]>(
    () => [
      { key: "all", label: "全部", count: projects.length },
      ...(Object.keys(projectCategoryLabels) as ProjectCategory[])
        .map((key) => ({
          key: key as FilterKey,
          label: projectCategoryLabels[key],
          count: projects.filter((project) => project.category === key).length,
        }))
        .filter((item) => item.count > 0),
    ],
    [projects],
  );

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <>
      <div className="project-filter">
        <div className="filter-row" role="group" aria-label="按形态筛选作品">
          <span className="filter-label">按形态筛选</span>
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              className={filter === item.key ? "filter-chip is-active" : "filter-chip"}
              aria-pressed={filter === item.key}
              onClick={() => setFilter(item.key)}
            >
              {item.label}（{item.count}）
            </button>
          ))}
        </div>
        <p className="filter-count" role="status">
          当前显示 <strong>{visible.length}</strong> 个作品
        </p>
      </div>

      <div className="project-grid">
        {visible.map((project) => (
          <article className="project-card" key={project.slug}>
            {project.cover && (
              <div className="project-card-cover">
                <img
                  src={asset(project.cover)}
                  alt={`${project.title}项目封面`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <p className="project-meta">
              {project.year} · {projectCategoryLabels[project.category]}
            </p>
            <h3>{project.title}</h3>
            <p className="project-summary">{project.summary}</p>
            {/* 卡片只给两个「成果」入口：成品本身（网站或下载页）+ GitHub。 */}
            <div className="project-card-actions">
              {project.siteUrl ? (
                <a
                  className="project-action is-primary"
                  href={project.siteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  查看成品
                </a>
              ) : project.releaseUrl ? (
                <a
                  className="project-action is-primary"
                  href={project.releaseUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  下载应用
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
        ))}
      </div>
    </>
  );
}
