import Link from "next/link";
import { PhotoSlot } from "./PhotoSlot";
import {
  experiences,
  interests,
  milestones,
  profile,
  projects,
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

export default function Home() {
  const publishedProjects = projects.filter(
    (project) => project.status === "published",
  );
  const interestGroups = [
    {
      title: "生活类",
      label: "LIFESTYLE",
      items: interests.filter((interest) => interest.category === "生活类"),
    },
    {
      title: "运动类",
      label: "SPORTS",
      items: interests.filter((interest) => interest.category === "运动类"),
    },
  ];

  return (
    <>
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>

      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="后翻学长首页">
          后翻学长<span className="wordmark-stamp">记</span>
        </Link>
        <nav aria-label="主要导航">
          <a href="#about">关于我</a>
          <a href="#projects">项目</a>
          <a href="#interests">兴趣</a>
          <a href="#topics">专题</a>
          <a href="#contact">联系</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <div className="hero-issue" aria-hidden="true">
            <span>PERSONAL</span>
            <strong>01</strong>
            <span>2026 · HAIKOU</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">终身学习者 · 读书爱好者 · 自由探索者</p>
            <h1 id="hero-title">{profile.nickname}</h1>
            <p className="location">海南 · 海口</p>
            <div className="tag-row" aria-label="个人标签">
              {profile.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <blockquote>“{profile.motto}”</blockquote>
            <p className="hero-intro">
              从长期学习到自由探索，我正在把阅读、生活经验与 AI
              编程连接起来，在一次次真实实践中拓展自己的边界。
            </p>
          </div>

          <div className="portrait-frame">
            <PhotoSlot
              className="portrait-placeholder"
              src="/photos/profile.jpg"
              alt="后翻学长个人照片"
            >
              <span>PORTRAIT</span>
              <strong>个人照片</strong>
              <small>待更新 · 建议竖版 4:5</small>
            </PhotoSlot>
            <p>海南海口，持续学习与创造。</p>
          </div>

          <aside className="hero-note">
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <p>世界很大，保持好奇；把学到的东西，变成可以被看见的实践。</p>
          </aside>
        </section>

        <section className="current-focus reveal" aria-labelledby="focus-title">
          <div>
            <p className="kicker">NOW EXPLORING</p>
            <h2 id="focus-title">目前探索方向</h2>
          </div>
          <p>AI 应用与编程</p>
          <span>从使用工具，到亲手构建产品。</span>
        </section>

        <section className="experience-section reveal" aria-labelledby="experience-title">
          <SectionHeading number="01" title="我的经历" id="experience-title" />
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
          <SectionHeading number="02" title="AI 项目作品" id="projects" />
          {publishedProjects.length > 0 ? (
            <div className="project-grid">
              {publishedProjects.map((project, index) => (
                <article className={index === 0 ? "project-card featured" : "project-card"} key={project.slug}>
                  <p className="project-meta">
                    {project.year} · {project.statusLabel}
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
          ) : (
            <div className="project-empty">
              <div className="project-empty-copy">
                <p className="kicker">WORK IN PROGRESS</p>
                <h3>项目档案，正在形成。</h3>
                <p>
                  Tak is cheap. Show me the product.
                </p>
              </div>
              <div className="project-slots" aria-label="三个待发布的项目位置">
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <span>0{item}</span>
                    <strong>即将发布</strong>
                    <small>PROJECT ARCHIVE</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="interests-section reveal" aria-labelledby="interests-title">
          <SectionHeading number="03" title="兴趣切片" id="interests" />
          <p className="section-lead">
            工作之外，也在生活与运动中认识世界。
          </p>
          <div className="interest-groups">
            {interestGroups.map((group) => (
              <div className="interest-group" key={group.title}>
                <header>
                  <h3>{group.title}</h3>
                  <span>{group.label}</span>
                </header>
                <div
                  className="interest-row"
                  style={{ "--interest-count": group.items.length } as React.CSSProperties}
                >
                  {group.items.map((interest) => (
                    <article className="interest-card" key={interest.name}>
                      <PhotoSlot
                        className="interest-photo"
                        src={interest.photo}
                        alt={`后翻学长的${interest.name}生活照片`}
                      >
                        <span>{interest.mark}</span>
                        <small>照片待更新</small>
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
          <SectionHeading number="04" title="经历与认证" id="milestones-title" />
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
          <SectionHeading number="05" title="曾研究的专题" id="topics" />
          <div className="topic-grid">
            {topics.map((topic, index) => (
              <article key={topic.title}>
                <span>0{index + 1}</span>
                <p>{topic.category}</p>
                <h3>{topic.title}</h3>
                <div aria-hidden="true" className="topic-mark" />
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section reveal" id="contact" aria-labelledby="contact-title">
          <p className="kicker">KEEP IN TOUCH</p>
          <h2 id="contact-title">因为好奇而相遇，<br />因为实践而同行。</h2>
          <p>
            如果你也在探索 AI、学习方法、健康生活或任何有趣的问题，欢迎以后来这里看看新的项目与记录。
          </p>
          <span className="contact-status">联系方式将在确认后开放</span>
        </section>
      </main>

      <footer>
        <Link href="/" className="footer-name">后翻学长</Link>
        <p>保持好奇，持续实践，把兴趣活成作品。</p>
        <span>© 2026</span>
      </footer>
    </>
  );
}
