import Cover from "../components/Cover";
import ProjectArt from "../components/ProjectArt";
import { BulletList, Callout, RecordTable, SectionHeading, Tag, Tags, Toggle, ViewBar } from "../components/Blocks";
import { about, profile, sections } from "../data/profile";
import experience from "../data/experience.json";
import leadership from "../data/leadership.json";
import projects from "../data/projects.json";
import techStack from "../data/tech-stack.json";
import { toTags } from "../data/tagColor";
import writing from "../content/writing.json";
import { formatDate } from "../content/formatDate";

const section = Object.fromEntries(sections.map((s) => [s.id, s]));

const toRecord = (e) => ({
  role: e.role,
  org: e.company,
  years: e.period.replace(/\s*-\s*/, " – "),
  tags: toTags(e.tech),
  highlights: e.achievements,
});

function Heading({ id }) {
  return (
    <SectionHeading id={id} emoji={section[id].emoji}>
      {section[id].label}
    </SectionHeading>
  );
}

function projectLinks(p) {
  const links = [];
  if (p.demo && p.demo !== p.github) links.push({ label: "Live demo", url: p.demo });
  if (p.github) links.push({ label: "GitHub", url: p.github });
  return links;
}

export default function HomePage() {
  return (
    <>
      <Cover />
      <div className="column">
        <div className="page-icon" role="img" aria-label="Wave">{profile.icon}</div>
        <h1 className="page-title">{profile.name}</h1>
        <p className="page-subtitle">{profile.subtitle}</p>

        <dl className="props">
          <dt><span className="glyph">◎</span>Location</dt>
          <dd>{profile.location}</dd>
          <dt><span className="glyph">◉</span>Status</dt>
          <dd><Tag label="● Available" color="blue" /></dd>
          <dt><span className="glyph">◇</span>Education</dt>
          <dd>{profile.education}</dd>
          <dt><span className="glyph">≡</span>Focus</dt>
          <dd><Tags tags={profile.focus} /></dd>
        </dl>

        <hr className="divider" />

        <Heading id="about" />
        <Callout icon="💡">{about.callout}</Callout>
        {about.paragraphs.map((p) => (
          <p className="p" key={p}>{p}</p>
        ))}
        <Toggle summary="Outside of code">
          <p className="p">{about.outside}</p>
        </Toggle>

        <Heading id="experience" />
        <RecordTable records={experience.map(toRecord)} />

        <Heading id="projects" />
        <ViewBar views={["▦ Gallery"]} count={`${projects.length} projects`} />
        <div className="gallery">
          {projects.map((p) => {
            const links = projectLinks(p);
            return (
              <article className="card" key={p.name}>
                <ProjectArt kind={p.art} />
                <div className="card-body">
                  <div className="card-title">{p.emoji} {p.name}</div>
                  <div className="card-desc">{p.description}</div>
                  <Tags tags={toTags(p.tech, 4)} />
                  <div className="card-links">
                    {links.length > 0 ? (
                      links.map((l) => (
                        <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
                      ))
                    ) : (
                      <span className="muted">Work in progress</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <Heading id="leadership" />
        <RecordTable records={leadership.map(toRecord)} secondColumn="Organisation" />

        <Heading id="skills" />
        <dl className="props" style={{ marginTop: 0 }}>
          {techStack.map((s) => (
            <div key={s.group} style={{ display: "contents" }}>
              <dt><span className="glyph">≡</span>{s.group}</dt>
              <dd><Tags tags={s.items.map((label) => ({ label, color: s.color }))} /></dd>
            </div>
          ))}
        </dl>

        <Heading id="writing" />
        {writing.posts.length === 0 ? (
          <Callout icon="✍️">
            Notes on software engineering, tutoring and building side projects are on the way.
          </Callout>
        ) : (
          <ul className="writing">
            {writing.posts.map((post) => (
              <li key={post.slug}>
                <span aria-hidden="true">{post.icon ?? "📄"}</span>
                <span>
                  <a href={`#/writing/${post.slug}`}>{post.title}</a>
                  {post.summary && <span className="caption summary">{post.summary}</span>}
                </span>
                <span className="caption date">{formatDate(post.date)}</span>
              </li>
            ))}
          </ul>
        )}

        <Heading id="contact" />
        <Callout icon="☕" color="blue">
          I’m always happy to chat about software engineering, internships or student societies. Email is the fastest way to reach me.
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github.url} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin.url} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </Callout>

        <div className="foot caption">© {new Date().getFullYear()} {profile.name}. All rights reserved.</div>
      </div>
    </>
  );
}
