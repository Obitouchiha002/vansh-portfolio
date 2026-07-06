import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MoreHorizontal, ChevronDown, LayoutGrid } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'AI Tools', href: '#ai-tools' },
  { name: 'Apps', href: '#apps' },
  { name: 'Tools', href: '#/tools' },
  { name: 'Resume', href: '#/resume' },
  { name: 'Services', href: '#services' },
  { name: 'Stack', href: '#stack' },
  { name: 'Graphics', href: '#graphics' },
  { name: 'Automation', href: '#automation' },
  { name: 'Platforms', href: '#platforms' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'YouTube', href: '#youtube' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  
  // Determine if we are on the home page (not a specific tool route or resume page)
  const isHomePage = !window.location.hash.startsWith('#/tools/') && window.location.hash !== '#/resume';

          const visibleItems = navItems.slice(0, 5);
  const moreItems = navItems.slice(5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const getHref = (href: string) => {
    return href;
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#/" className="text-xl font-display font-bold tracking-tighter flex items-center gap-2 shrink-0">
          <span className="text-neon-green">V</span>
          <span className="text-zinc-100">Kashyap</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="#/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 hover:text-neon-green transition-colors whitespace-nowrap"
          >
            <LayoutGrid size={15} /> Browse by area
          </a>
          {visibleItems.map((item) => (
            <a
              key={item.name}
              href={getHref(item.href)}
              className={
                item.name === 'Resume'
                  ? "text-sm font-bold text-zinc-950 bg-neon-green px-4 py-2 rounded-lg hover:bg-neon-green/90 active:bg-neon-green/80 transition-colors box-glow-hover"
                  : item.name === 'Tools'
                  ? "text-sm font-bold text-zinc-950 bg-neon-cyan px-4 py-2 rounded-lg hover:bg-neon-cyan/90 active:bg-neon-cyan/80 transition-all box-glow-cyan box-glow-cyan-hover"
                  : item.name === 'Apps'
                  ? "text-sm font-bold text-zinc-950 bg-purple-400 px-4 py-2 rounded-lg hover:bg-purple-400/90 active:bg-purple-400/80 transition-all shadow-[0_0_15px_rgba(192,132,252,0.3)] hover:shadow-[0_0_25px_rgba(192,132,252,0.6)]"
                  : "text-sm font-medium text-zinc-400 hover:text-neon-green active:text-neon-green/80 transition-colors whitespace-nowrap"
              }
            >
              {item.name}
            </a>
          ))}
          
          {/* More Dropdown */}
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isMoreOpen ? 'text-neon-green' : 'text-zinc-400 hover:text-neon-green'
              }`}
            >
              More <ChevronDown size={14} className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-2 overflow-hidden"
                >
                  {moreItems.map((item) => (
                    <a
                      key={item.name}
                      href={getHref(item.href)}
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-neon-green hover:bg-zinc-800 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-neon-green active:text-neon-green/80 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>

      {/* Mobile Nav — full-screen scrollable panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[65] bg-zinc-950 md:hidden flex flex-col"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-zinc-800/60 shrink-0">
              <a
                href="#/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-display font-bold tracking-tighter flex items-center gap-2"
              >
                <span className="text-neon-green">V</span>
                <span className="text-zinc-100">Kashyap</span>
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-neon-green transition-colors"
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Scrollable links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-2.5">
              <a
                href="#/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 text-lg font-bold text-zinc-100 bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-xl hover:border-neon-green/50 hover:text-neon-green transition-colors mb-1"
              >
                <LayoutGrid size={18} /> Browse by area
              </a>
              {[
                ...navItems.filter(item => !['Tools', 'Resume', 'Apps'].includes(item.name)),
                ...navItems.filter(item => ['Apps', 'Tools', 'Resume'].includes(item.name)),
              ].map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={getHref(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.025 }}
                  className={
                    item.name === 'Resume'
                      ? "text-lg font-bold text-zinc-950 bg-neon-green px-4 py-3 rounded-xl text-center hover:bg-neon-green/90 active:bg-neon-green/80 transition-colors shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                      : item.name === 'Tools'
                      ? "text-lg font-bold text-zinc-950 bg-neon-cyan px-4 py-3 rounded-xl text-center hover:bg-neon-cyan/90 active:bg-neon-cyan/80 transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                      : item.name === 'Apps'
                      ? "text-lg font-bold text-zinc-950 bg-purple-400 px-4 py-3 rounded-xl text-center hover:bg-purple-400/90 active:bg-purple-400/80 transition-all shadow-[0_0_15px_rgba(192,132,252,0.3)]"
                      : "text-lg font-medium text-zinc-200 hover:text-neon-green active:text-neon-green/80 transition-colors py-2.5 border-b border-zinc-800/50"
                  }
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
