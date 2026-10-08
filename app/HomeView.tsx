"use client";

import Link from "next/link";
import { ContactPanel } from "./ContactPanel";
import { ServiceCard } from "./ServiceCard";
import { PhotoSlot } from "./PhotoSlot";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle, useLang, useT } from "./LangToggle";
import { ProjectGallery } from "./ProjectGallery";
import { asset } from "./asset";
import { profileSrc } from "./profile-inline";
import {
  experiences,
  interests,
  milestones,
  profile,
  projects,
  services,
  topics,
} from "./content";

function SectionHeading({
  number,
  title,
  id,
}: {
  number: string;
  title: string;
  id?: string;
}) {
  return (
    <header className="section-heading" id={id}>
      <span className="section-number" aria-hidden="true">
        {number}
      </span>
      <h2>{title}</h2>
      <span className="section-rule" aria-hidden="true" />
    </header>
  );
}

export function HomeView() {
  const lang = useLang();
  const t = useT();
  const publishedProjects = projects.filter(
    (project) => project.status === "published",
  );
  const interestGroups = [
    {
      title: t("interestGroupLife"),
      items: interests.filter((interest) => interest.category === "生活类"),
    },
    {
      title: t("interestGroupSport"),
      items: interests.filter((interest) => interest.category === "运动类"),
    },
  ];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>

      <header className="site-header">
        <Link className="wordmark" href="/" aria-label={t("homeAria")}>
          后翻学长<span className="wordmark-stamp">记</span>
        </Link>
        <div className="header-right">
          <nav aria-label={t("homeAria")}>
            <a href="#about">{t("navAbout")}</a>
            <a href="#projects">{t("navProjects")}</a>
            <a href="#services">{t("navServices")}</a>
            <a href="#interests">{t("navInterests")}</a>
            <a href="#topics">{t("navTopics")}</a>
            <a href="#contact">{t("navContact")}</a>
          </nav>
          <LangToggle />
          <ThemeToggle />
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 id="hero-title">{profile.nickname}</h1>
            <div className="tag-row" aria-label={t("homeAria")}>
              {profile.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <blockquote>“{profile.motto}”</blockquote>
            <p className="hero-intro">{t("heroIntro")}</p>
          </div>

          <div className="portrait-frame">
            <div className="portrait-ring">
              <PhotoSlot
                className="portrait-placeholder"
                src={profileSrc}
                alt={t("portraitAlt")}
                priority
              >
                <span>PORTRAIT</span>
                <strong>{t("portraitLabel")}</strong>
                <small>{t("portraitHint")}</small>
              </PhotoSlot>
            </div>
            <p>{t("portraitCaption")}</p>
          </div>
        </section>

        <section className="current-focus reveal" aria-labelledby="focus-title">
          <div>
            <p className="kicker">{t("kickerNow")}</p>
            <h2 id="focus-title">{t("focusTitle")}</h2>
          </div>
          <p>{t("focusValue")}</p>
          <span>{t("focusNote")}</span>
        </section>

        <section className="experience-section reveal" aria-labelledby="experience-title">
          <SectionHeading number="01" title={t("sectionExperience")} id="experience-title" />
          <ol className="timeline">
            {experiences.map((experience) => (
              <li key={experience.period}>
                <time>{experience.period}</time>
                <div>
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="projects-section reveal" aria-labelledby="projects-title">
          <SectionHeading number="02" title={t("sectionProjects")} id="projects" />
          {publishedProjects.length > 0 ? (
            <ProjectGallery projects={publishedProjects} />
          ) : (
            <div className="project-empty">
              <div className="project-empty-copy">
                <p className="kicker">{t("kickerNow")}</p>
                <h3>项目档案，正在形成。</h3>
                <p>Tak is cheap. Show me the product.</p>
              </div>
              <div className="project-slots" aria-label={t("sectionProjects")}>
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <span>0{item}</span>
                    <strong>即将发布</strong>
                    <small>项目档案</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="services-section reveal" aria-labelledby="services-title">
          <SectionHeading number="03" title={t("sectionServices")} id="services" />
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={service.href}
                service={service}
                priority={index === 0}
              />
            ))}
          </div>
        </section>

        <section className="interests-section reveal" aria-labelledby="interests-title">
          <SectionHeading number="04" title={t("sectionInterests")} id="interests" />
          <p className="section-lead">{t("interestLead")}</p>
          <div className="interest-groups">
            {interestGroups.map((group) => (
              <div className="interest-group" key={group.title}>
                <header>
                  <h3>{group.title}</h3>
                  <span>
                    {lang === "en"
                      ? `${group.items.length} interests`
                      : `${group.items.length} 项兴趣`}
                  </span>
                </header>
                <div
                  className="interest-row"
                  style={{ "--interest-count": group.items.length } as React.CSSProperties}
                >
                  {group.items.map((interest) => (
                    <article className="interest-card" key={interest.name}>
                      <PhotoSlot
                        className="interest-photo"
                        src={asset(interest.photo)}
                        alt={
                          lang === "en"
                            ? `${interest.name} — life photo`
                            : `后翻学长的${interest.name}生活照片`
                        }
                      >
                        <span>{interest.mark}</span>
                        <small>{t("photoPending")}</small>
                      </PhotoSlot>
                      <h4>{interest.name}</h4>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="milestones-section reveal" aria-labelledby="milestones-title">
          <SectionHeading number="05" title={t("sectionMilestones")} id="milestones-title" />
          <ul className="milestone-list">
            {milestones.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="topics-section reveal" aria-labelledby="topics-title">
          <SectionHeading number="06" title={t("sectionTopics")} id="topics" />
          <div className="topic-grid">
            {topics.map((topic, index) => (
              <article key={topic.title}>
                <span>0{index + 1}</span>
                <h3>{topic.title}</h3>
                <div aria-hidden="true" className="topic-mark" />
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section reveal" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro">
            <p className="kicker">{t("contactKicker")}</p>
            <h2 id="contact-title">
              {t("contactTitleA")}
              <br />
              {t("contactTitleB")}
            </h2>
            <p>{t("contactLead")}</p>
          </div>
          <ContactPanel />
        </section>
      </main>

      <footer>
        <Link href="/" className="footer-name">后翻学长</Link>
        <p>{t("footerMotto")}</p>
        <span>© 2026</span>
      </footer>
    </>
  );
}
