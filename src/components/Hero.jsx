import { Github, ArrowRight, User, MapPin, Wifi, GraduationCap } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
const EASE_MICRO = [0.4, 0, 0.2, 1]

export default function Hero() {
  const reduced = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: reduced ? 0.15 : 0.6, ease: EASE_OUT_EXPO, delay: reduced ? 0 : delay },
  })

  const clipReveal = (delay = 0) => ({
    initial: { clipPath: reduced ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)', opacity: reduced ? 1 : 0 },
    whileInView: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
    viewport: { once: false },
    transition: { duration: reduced ? 0.15 : 0.5, ease: EASE_OUT_EXPO, delay: reduced ? 0 : delay },
  })

  const hoverScale = (scale = 1.02) =>
    reduced ? {} : { scale, transition: { duration: 0.15, ease: EASE_MICRO } }

  return (
    <section id="home" className="pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Name + tagline row */}
        <div className="mb-10">
          <motion.p
            className="text-terminal-green text-sm mb-3 tracking-wider"
            {...clipReveal(0)}
          >
            <span className="text-text-muted">$</span> whoami
          </motion.p>
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-2"
            {...fadeUp(0.1)}
          >
            <span className="text-text-primary">Mark </span>
            <span className="text-terminal-green" style={{ textShadow: '0 0 20px rgba(255,140,0,0.3)' }}>
              Quach
            </span>
          </motion.h1>
          <motion.p
            className="text-text-secondary text-lg"
            {...fadeUp(0.2)}
          >
            Full Stack Software Engineer
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* System info card */}
          <motion.div
            className="bg-bg-card border border-border-dim rounded-lg overflow-hidden"
            style={{ transformPerspective: 800 }}
            initial={{ opacity: 0, x: reduced ? 0 : -60, rotateY: reduced ? 0 : 4 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: false }}
            transition={{ duration: reduced ? 0.15 : 0.65, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.28 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
              <span className="w-3 h-3 rounded-full bg-terminal-red" />
              <span className="w-3 h-3 rounded-full bg-terminal-amber" />
              <span className="w-3 h-3 rounded-full bg-terminal-green" />
              <span className="ml-2 text-text-muted text-xs">system_info.sh</span>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <User size={16} className="text-terminal-green" />
                <span className="text-text-muted">Role:</span>
                <span className="text-text-primary">Full Stack Software Engineer</span>
              </div>
              <div className="flex items-center gap-3">
                <Wifi size={16} className="text-terminal-green" />
                <span className="text-text-muted">Status:</span>
                <span className="text-terminal-green">Online</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-terminal-green" />
                <span className="text-text-muted">Location:</span>
                <span className="text-text-primary">Sydney, NSW</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap size={16} className="text-terminal-green" />
                <span className="text-text-muted">Education:</span>
                <span className="text-text-primary">B. CompSci / B. Commerce @ UNSW</span>
              </div>
            </div>
          </motion.div>

          {/* Mission card */}
          <motion.div
            className="bg-bg-card border border-border-dim rounded-lg overflow-hidden"
            style={{ transformPerspective: 800 }}
            initial={{ opacity: 0, x: reduced ? 0 : 60, rotateY: reduced ? 0 : -4 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: false }}
            transition={{ duration: reduced ? 0.15 : 0.65, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.28 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
              <span className="w-3 h-3 rounded-full bg-terminal-red" />
              <span className="w-3 h-3 rounded-full bg-terminal-amber" />
              <span className="w-3 h-3 rounded-full bg-terminal-green" />
              <span className="ml-2 text-text-muted text-xs">mission.log</span>
            </div>
            <div className="p-6 text-sm leading-relaxed">
              <p className="text-text-secondary mb-4">
                Computer Science & Commerce student at UNSW.
                Experienced in building production systems across enterprise and
                non-profit environments, from data pipelines to full-stack web apps. Also currently tutoring UNSW COMP3900 Computer Science Projects.
              </p>
              <p className="text-text-muted">
                <span className="text-terminal-green">$</span> Currently focused on{' '}
                <span className="text-terminal-amber">Full Stack Development</span>,{' '}
                <span className="text-terminal-blue">Cloud Platforms</span>, and{' '}
                <span className="text-terminal-purple">AI Integration</span>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href="#projects"
            {...fadeUp(0.44)}
            whileHover={hoverScale(1.02)}
            whileTap={reduced ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-terminal-green text-bg-primary font-semibold rounded-lg hover:bg-terminal-green-dim transition-all hover:shadow-[0_0_20px_rgba(255,140,0,0.3)]"
          >
            View Projects <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="https://github.com/MarkQuach12"
            target="_blank"
            rel="noopener noreferrer"
            {...fadeUp(0.52)}
            whileHover={hoverScale(1.01)}
            whileTap={reduced ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3 border border-border-dim text-text-primary rounded-lg hover:border-terminal-green hover:text-terminal-green transition-all"
          >
            <Github size={18} /> GitHub
          </motion.a>
        </div>
      </div>
    </section>
  )
}
