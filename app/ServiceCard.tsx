"use client";

import type { Service } from "./content";
import { asset } from "./asset";

type ServiceCardProps = {
  service: Service;
  priority?: boolean;
};

export function ServiceCard({ service, priority = false }: ServiceCardProps) {
  const openService = () => {
    window.open(service.href, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="service-card">
      <button
        type="button"
        className="service-card-link"
        onClick={openService}
        aria-label={`在新窗口查看服务：${service.title}`}
      >
        <img
          src={`${asset(service.cover)}?v=${service.coverVersion}`}
          alt={`${service.title}服务封面`}
          width={service.coverWidth}
          height={service.coverHeight}
          loading="eager"
          fetchPriority={priority ? "high" : "auto"}
          decoding="sync"
        />
        <div className="service-card-footer">
          <h3>{service.title}</h3>
          <span aria-hidden="true">查看服务 →</span>
        </div>
      </button>
    </article>
  );
}
