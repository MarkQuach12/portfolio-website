import { User, MapPin, Wifi } from 'lucide-react'

export default function About() {
  return (
    <section id="home" className="pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Name + section header */}
        <div className="mb-12">
          <p className="text-terminal-green text-sm mb-2 tracking-wider">
            <span className="text-text-muted">~/</span>about.system
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            Mark <span className="text-terminal-green" style={{ textShadow: '0 0 20px rgba(255,140,0,0.3)' }}>Quach</span>
          </h1>
          <p className="text-text-secondary mt-1">Computer Science & Commerce Student</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Terminal card - System info */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
              <span className="w-3 h-3 rounded-full bg-terminal-red" />
              <span className="w-3 h-3 rounded-full bg-terminal-amber" />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <span className="ml-2 text-text-muted text-xs">system_info.sh</span>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <User size={16} className="text-terminal-green" />
                <span className="text-text-muted">Role:</span>
                <span className="text-text-primary">Computer Science & Commerce Student</span>
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
            </div>
          </div>

          {/* Terminal card - Mission */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
              <span className="w-3 h-3 rounded-full bg-terminal-red" />
              <span className="w-3 h-3 rounded-full bg-terminal-amber" />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <span className="ml-2 text-text-muted text-xs">mission.log</span>
            </div>
            <div className="p-6 text-sm leading-relaxed">
              <p className="text-text-secondary mb-4">
                Computer Science & Commerce student at UNSW.
                Experienced in building production systems across enterprise and
                non-profit environments, from data pipelines to full-stack web apps.
              </p>
              <p className="text-text-muted mb-4">
                <span className="text-terminal-green">$</span> Currently focused on{' '}
                <span className="text-terminal-amber">Full Stack Development</span>,{' '}
                <span className="text-terminal-blue">Cloud Platforms</span>, and{' '}
                <span className="text-terminal-purple">AI Integration</span>.
              </p>
              <p className="text-text-muted">
                <span className="text-terminal-green">$</span> Outside of code:{' '}
                <span className="text-terminal-cyan">Photography</span> and{' '}
                <span className="text-terminal-amber">Travelling</span>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
