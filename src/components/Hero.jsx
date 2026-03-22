import { Github, ArrowRight, User, MapPin, Wifi, Briefcase, FolderGit2, Coffee, GraduationCap } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Name + tagline row */}
        <div className="mb-10">
          <p className="text-terminal-green text-sm mb-3 tracking-wider">
            <span className="text-text-muted">$</span> whoami
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="text-text-primary">Mark </span>
            <span className="text-terminal-green" style={{ textShadow: '0 0 20px rgba(255,140,0,0.3)' }}>
              Quach
            </span>
          </h1>
          <p className="text-text-secondary text-lg">
            Full Stack Software Engineer
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* System info card */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
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
          </div>

          {/* Mission card */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
              <span className="w-3 h-3 rounded-full bg-terminal-red" />
              <span className="w-3 h-3 rounded-full bg-terminal-amber" />
              <span className="w-3 h-3 rounded-full bg-terminal-green" />
              <span className="ml-2 text-text-muted text-xs">mission.log</span>
            </div>
            <div className="p-6 text-sm leading-relaxed">
              <p className="text-text-secondary mb-4">
                Computer Science & Commerce student at UNSW (Distinction WAM).
                Experienced in building production systems across enterprise and
                startup environments, from data pipelines to full-stack web apps.
              </p>
              <p className="text-text-muted">
                <span className="text-terminal-green">$</span> Currently focused on{' '}
                <span className="text-terminal-amber">Full Stack Development</span>,{' '}
                <span className="text-terminal-blue">Cloud Platforms</span>, and{' '}
                <span className="text-terminal-purple">AI Integration</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Briefcase, value: '2', label: 'Internships' },
            { icon: FolderGit2, value: '5+', label: 'Projects' },
            { icon: Coffee, value: '∞', label: 'Caffeine' },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-bg-card border border-border-dim rounded-lg p-5 text-center hover:border-terminal-green/30 transition-colors"
            >
              <Icon size={18} className="text-terminal-green mx-auto mb-2" />
              <p className="text-xl font-bold text-text-primary mb-0.5">{value}</p>
              <p className="text-text-muted text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3 bg-terminal-green text-bg-primary font-semibold rounded-lg hover:bg-terminal-green-dim transition-all hover:shadow-[0_0_20px_rgba(255,140,0,0.3)]"
          >
            View Projects <ArrowRight size={18} />
          </a>
          <a
            href="https://github.com/MarkQuach12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border-dim text-text-primary rounded-lg hover:border-terminal-green hover:text-terminal-green transition-all"
          >
            <Github size={18} /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
