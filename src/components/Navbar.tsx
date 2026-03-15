import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MoreHorizontal, ChevronDown } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Tools', href: 'tools' },
  { name: 'Resume', href: 'resume' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'YouTube', href: '#youtube' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const isHomePage = window.location.pathname === '/';

  const visibleItems = navItems.slice(0, 4);
  const moreItems = navItems.slice(4);

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

  const getHref = (href: string) => {
    return isHomePage ? href : `/${href}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="text-xl font-display font-bold tracking-tighter flex items-center gap-2 shrink-0">
          <span className="text-neon-green">V</span>
          <span className="text-zinc-100">Kashyap</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {visibleItems.map((item) => (
            <a
              key={item.name}
              href={getHref(item.href)}
              className={
                item.name === 'Resume'
                  ? "text-sm font-bold text-zinc-950 bg-neon-green px-4 py-2 rounded-lg hover:bg-neon-green/90 active:bg-neon-green/80 transition-colors box-glow-hover"
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

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800/50 overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={getHref(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={
                    item.name === 'Resume'
                      ? "text-lg font-bold text-zinc-950 bg-neon-green px-4 py-3 rounded-lg text-center hover:bg-neon-green/90 active:bg-neon-green/80 transition-colors"
                      : "text-lg font-medium text-zinc-300 hover:text-neon-green active:text-neon-green/80 transition-colors"
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
