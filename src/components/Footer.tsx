import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#" className="text-xl font-display font-bold tracking-tighter flex items-center gap-2">
            <span className="text-neon-green">V</span>
            <span className="text-zinc-100">Kashyap</span>
          </a>
          <p className="text-zinc-500 text-sm text-center md:text-left">
            Building my future with technology
          </p>
        </div>
        
        <p className="text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} Vansh Kashyap. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-neon-green hover:border-neon-green/50 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
