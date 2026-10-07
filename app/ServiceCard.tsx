import type { Service } from "./content";
import { asset } from "./asset";

type ServiceCardProps = {
  service: Service;
  priority?: boolean;
};

export function ServiceCard({ service, priority = false }: ServiceCardProps) {
  return (
    <article className="service-card">
      <a
        className="service-card-link"
        href={service.href}
        target="_blank"
        rel="noopener noreferrer"
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
      </a>
    </article>
  );
}
