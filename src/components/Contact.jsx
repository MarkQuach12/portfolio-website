import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert('Message sent! (Replace with actual form handler)')
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-terminal-amber text-sm mb-2 tracking-wider">
            <span className="text-text-muted">$</span> ./contact.exe
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Get In Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info terminal */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
              <span className="w-3 h-3 rounded-full bg-terminal-red" />
              <span className="w-3 h-3 rounded-full bg-terminal-amber" />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <span className="ml-2 text-text-muted text-xs">contact.json</span>
            </div>
            <div className="p-6">
              <pre className="text-sm leading-loose">
                <span className="text-text-muted">{'{'}</span>{'\n'}
                <span className="text-terminal-blue">  "status"</span>
                <span className="text-text-muted">: </span>
                <span className="text-terminal-green">"Available"</span>
                <span className="text-text-muted">,</span>{'\n'}
                <span className="text-terminal-blue">  "email"</span>
                <span className="text-text-muted">: </span>
                <span className="text-terminal-amber">"mark.quach1234@gmail.com"</span>
                <span className="text-text-muted">,</span>{'\n'}
                <span className="text-terminal-blue">  "github"</span>
                <span className="text-text-muted">: </span>
                <span className="text-terminal-amber">"@MarkQuach12"</span>
                <span className="text-text-muted">,</span>{'\n'}
                <span className="text-terminal-blue">  "linkedin"</span>
                <span className="text-text-muted">: </span>
                <span className="text-terminal-amber">"in/markquach1234"</span>
                <span className="text-text-muted">,</span>{'\n'}
                <span className="text-terminal-blue">  "location"</span>
                <span className="text-text-muted">: </span>
                <span className="text-terminal-amber">"Sydney, NSW"</span>{'\n'}
                <span className="text-text-muted">{'}'}</span>
              </pre>

              <div className="mt-6 flex gap-4">
                <a href="mailto:mark.quach1234@gmail.com" className="p-3 bg-bg-secondary border border-border-dim rounded-lg text-text-secondary hover:text-terminal-amber hover:border-terminal-amber/30 transition-all" aria-label="Email">
                  <Mail size={20} />
                </a>
                <a href="https://github.com/MarkQuach12" target="_blank" rel="noopener noreferrer" className="p-3 bg-bg-secondary border border-border-dim rounded-lg text-text-secondary hover:text-terminal-amber hover:border-terminal-amber/30 transition-all" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/markquach1234" target="_blank" rel="noopener noreferrer" className="p-3 bg-bg-secondary border border-border-dim rounded-lg text-text-secondary hover:text-terminal-amber hover:border-terminal-amber/30 transition-all" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form terminal */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border-dim">
              <span className="w-3 h-3 rounded-full bg-terminal-red" />
              <span className="w-3 h-3 rounded-full bg-terminal-amber" />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <span className="ml-2 text-text-muted text-xs">send_message.sh</span>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-terminal-amber text-xs mb-1 block">
                  <span className="text-text-muted">$</span> name:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-bg-primary border border-border-dim rounded px-4 py-2 text-sm text-text-primary focus:border-terminal-amber focus:outline-none transition-colors"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="text-terminal-amber text-xs mb-1 block">
                  <span className="text-text-muted">$</span> email:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-bg-primary border border-border-dim rounded px-4 py-2 text-sm text-text-primary focus:border-terminal-amber focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-terminal-amber text-xs mb-1 block">
                  <span className="text-text-muted">$</span> message:
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-bg-primary border border-border-dim rounded px-4 py-2 text-sm text-text-primary focus:border-terminal-amber focus:outline-none transition-colors resize-none"
                  placeholder="Type your message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-terminal-amber text-bg-primary font-semibold rounded hover:opacity-90 transition-all hover:shadow-[0_0_20px_rgba(255,193,7,0.3)]"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
