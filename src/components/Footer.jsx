import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border-dim bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Mark Quach. All rights reserved.
          </p>
      
        </div>
      </div>
    </footer>
  )
}
