import { GitCommit } from 'lucide-react'
import experiences from '../data/experience.json'
import leadership from '../data/leadership.json'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-terminal-green text-sm mb-2 tracking-wider">
            <span className="text-text-muted">$</span> git log --oneline
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Work Experience
          </h2>
        </div>

        {/* Work experience timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border-dim md:left-8" />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.hash} className="relative pl-16 md:pl-20">
                <div className="absolute left-[18px] md:left-[26px] top-6 w-4 h-4 rounded-full bg-terminal-green border-4 border-bg-primary z-10" />

                <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden hover:border-terminal-green/20 transition-colors">
                  <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
                    <GitCommit size={14} className="text-terminal-amber" />
                    <span className="text-terminal-amber text-xs font-mono">{exp.hash}</span>
                    <span className="text-text-muted text-xs ml-auto">{exp.period}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-text-primary font-semibold">{exp.company}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-terminal-green/40 text-terminal-green">
                        Work
                      </span>
                    </div>
                    <p className="text-terminal-green text-sm">{exp.role}</p>
                    <p className="text-text-muted text-xs mb-3 mt-1">{exp.location}</p>
                    <ul className="text-text-secondary text-sm mb-4 space-y-1.5">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-terminal-green mt-1 shrink-0">&#8250;</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 text-xs rounded border border-terminal-green/25 text-terminal-green"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export function Extracurricular() {
  return (
    <section id="extracurricular" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-terminal-purple text-sm mb-2 tracking-wider">
            <span className="text-text-muted">~/</span>extracurricular
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Leadership & Community
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {leadership.map((exp) => (
            <div key={exp.hash} className="bg-bg-card border border-border-dim rounded-lg overflow-hidden hover:border-terminal-purple/30 transition-colors">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-secondary border-b border-border-dim">
                <GitCommit size={12} className="text-terminal-purple" />
                <span className="text-terminal-purple text-xs font-mono">{exp.hash}</span>
                <span className="text-text-muted text-xs ml-auto">{exp.period}</span>
              </div>
              <div className="p-4">
                <h3 className="text-text-primary font-semibold text-sm mb-1">{exp.company}</h3>
                <p className="text-terminal-purple text-xs mb-2">{exp.role}</p>
                <ul className="text-text-secondary text-xs mb-3 space-y-1">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-terminal-purple mt-0.5 shrink-0">&#8250;</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded border border-terminal-purple/25 text-terminal-purple"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
