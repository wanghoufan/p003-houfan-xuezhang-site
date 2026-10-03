"use client";

import Link from "next/link";
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
        {visible.map((project, index) => (
          <article
            className={index === 0 ? "project-card featured" : "project-card"}
            key={project.slug}
          >
            {project.cover && (
              <Link
                className="project-card-cover"
                href={`/projects/${project.slug}`}
                aria-label={`查看${project.title}项目详情`}
              >
                <img
                  src={asset(project.cover)}
                  alt={`${project.title}项目封面`}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            )}
            <p className="project-meta">
              {project.year} · {project.statusLabel} ·{" "}
              {projectCategoryLabels[project.category]}
            </p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href={`/projects/${project.slug}`}>阅读项目档案 →</Link>
          </article>
        ))}
      </div>
    </>
  );
}
