import { useState, useEffect } from 'react';

/* Desktop-only vertical dots on the right edge. Highlights the current
   section and lets you jump anywhere without scrolling. Hidden on mobile. */
const items = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Tools' },
  { id: 'ai-tools', label: 'AI Tools' },
  { id: 'services', label: 'Services' },
  { id: 'apps', label: 'Apps' },
  { id: 'graphics', label: 'Graphics' },
  { id: 'automation', label: 'Automation' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionDots() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = items.map((i) => i.id).filter((id) => id !== 'home');
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hidden lg:flex flex-col gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-40">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => go(it.id)}
          aria-label={it.label}
          className="group relative flex items-center justify-end h-4"
        >
          <span className="absolute right-6 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none shadow-lg">
            {it.label}
          </span>
          <span
            className={`rounded-full transition-all duration-300 ${
              active === it.id ? 'w-3 h-3 bg-neon-green shadow-[0_0_8px_rgba(0,255,157,0.6)]' : 'w-2 h-2 bg-zinc-600 group-hover:bg-zinc-400'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
