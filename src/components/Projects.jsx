import { ExternalLink, Star, GitFork, BookMarked, Github } from 'lucide-react'

const projects = [
  {
    name: 'Student Mark Book',
    description: 'Full-stack classroom management platform with role-based access control, AI-powered chatbot using the Anthropic Claude API, and a relational PostgreSQL database with 10+ entities. Actively used to manage 4 classes and 20+ students.',
    tech: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Material-UI', 'Claude API'],
    languages: [
      { name: 'Java', color: '#ED8B00' },
      { name: 'TypeScript', color: '#3178C6' },
    ],
    stars: null,
    forks: null,
    github: 'https://github.com/MarkQuach12/student-mark-book',
    demo: 'https://student-mark-book.vercel.app/',
  },
  {
    name: 'HSC Predict',
    description: 'Full-stack HSC planning platform enabling NSW students to predict scaled marks and analyse Band 6 performance across 10,000+ historical entries with 95% prediction accuracy.',
    tech: ['React', 'TypeScript', 'Flask', 'Supabase', 'ShadCN', 'Tailwind CSS'],
    languages: [
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Python', color: '#3776AB' },
    ],
    stars: null,
    forks: null,
    github: 'https://github.com/MarkQuach12/HSCRandomTools',
    demo: 'https://hsc-random-tools.vercel.app/',
  },
  {
    name: 'Solar Quality Central',
    description: 'Informative website for Solar Quality Central featuring a headless CMS, AI chatbot, and admin content management system. Currently a work in progress.',
    tech: ['Next.js', 'ShadCN', 'Express', 'Node.js', 'Docker', 'Tailwind CSS'],
    languages: [
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'JavaScript', color: '#F7DF1E' },
    ],
    stars: null,
    forks: null,
    github: null,
    demo: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-terminal-blue text-sm mb-2 tracking-wider">
            <span className="text-text-muted">~/</span>projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Featured Repositories
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-bg-card border border-border-dim rounded-xl p-6 flex flex-col hover:border-terminal-blue/30 transition-all group"
            >
              {/* Header: repo icon + name + badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookMarked size={16} className="text-text-muted" />
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-blue font-semibold hover:underline"
                    >
                      {project.name.toLowerCase().replace(/\s+/g, '-')}
                    </a>
                  ) : (
                    <span className="text-terminal-blue font-semibold">
                      {project.name.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  )}
                </div>
                <span className="text-text-muted text-xs border border-border-dim rounded-full px-3 py-0.5">
                  Public
                </span>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full border border-terminal-blue/25 text-terminal-blue hover:bg-terminal-blue/10 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer: language, stars, forks, demo */}
              <div className="flex items-center justify-between pt-4 border-t border-border-dim">
                <div className="flex items-center gap-4 text-text-muted text-xs">
                  {project.languages.map((lang) => (
                    <span key={lang.name} className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                    </span>
                  ))}
                  {project.stars != null && (
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {project.stars}
                    </span>
                  )}
                  {project.forks != null && (
                    <span className="flex items-center gap-1">
                      <GitFork size={14} />
                      {project.forks}
                    </span>
                  )}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-muted text-xs hover:text-terminal-blue transition-colors"
                  >
                    GitHub <Github size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
