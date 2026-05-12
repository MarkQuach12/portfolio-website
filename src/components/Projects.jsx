import { Star, GitFork, BookMarked, Github } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import projects from '../data/projects.json'
import languageColors from '../data/language-colors.json'

const FALLBACK_LANGUAGE_COLOR = '#888888'
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

const tagContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
}

const tagVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
}

function ProjectCard({ project, index }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="bg-bg-card border border-border-dim rounded-xl p-6 flex flex-col hover:border-terminal-blue/30 transition-all"
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.82, ease: EASE_OUT_EXPO, delay: reduced ? 0 : (index % 2) * 0.08 }}
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

      {/* Tech tags — staggered entrance */}
      <motion.div
        className="flex flex-wrap gap-2 mb-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={reduced ? {} : tagContainerVariants}
      >
        {project.tech.map((t) => (
          <motion.span
            key={t}
            variants={reduced ? {} : tagVariants}
            className="px-3 py-1 text-xs rounded-full border border-terminal-blue/25 text-terminal-blue hover:bg-terminal-blue/10 transition-colors"
          >
            {t}
          </motion.span>
        ))}
      </motion.div>

      {/* Footer: language, stars, forks, demo */}
      <div className="flex items-center justify-between pt-4 border-t border-border-dim">
        <div className="flex items-center gap-4 text-text-muted text-xs">
          {project.languages.map((lang) => (
            <span key={lang} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: languageColors[lang] ?? FALLBACK_LANGUAGE_COLOR }}
              />
              {lang}
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
    </motion.div>
  )
}

export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <p className="text-terminal-blue text-sm mb-2 tracking-wider">
            <span className="text-text-muted">~/</span>projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Featured Repositories
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
