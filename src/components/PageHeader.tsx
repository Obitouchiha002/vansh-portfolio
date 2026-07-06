import { ArrowLeft, FileText } from 'lucide-react';

/* Lightweight header for the Hub and focused field pages
   (the full portfolio keeps the original Navbar). */
export default function PageHeader({ showBack = false }: { showBack?: boolean }) {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2 text-xl font-display font-bold tracking-tighter">
          {showBack && <ArrowLeft size={18} className="text-zinc-400" />}
          <span className="text-neon-green">V</span>
          <span className="text-zinc-100">Kashyap</span>
        </a>
        <nav className="flex items-center gap-3">
          <a href="#/all" className="hidden sm:inline text-sm font-medium text-zinc-400 hover:text-neon-green transition-colors">
            Full Portfolio
          </a>
          <a
            href="#/resume"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-950 bg-neon-green px-4 py-2 rounded-lg hover:bg-neon-green/90 transition-colors"
          >
            <FileText size={15} /> Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
