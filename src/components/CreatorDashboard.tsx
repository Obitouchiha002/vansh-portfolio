import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Youtube, Video, Image as ImageIcon, Film, Linkedin, Instagram, BarChart3, LayoutDashboard } from 'lucide-react';

/* =========================================================================
   CREATOR DASHBOARD — a "by the numbers" snapshot of my content work.
   All values are editable below.
   ========================================================================= */
const stats = [
  { label: 'YouTube Subscribers', value: 493, suffix: '+', icon: Youtube, color: '248,113,113' },
  { label: 'Videos Published', value: 157, suffix: '+', icon: Video, color: '192,132,252' },
  { label: 'Thumbnails & Posters', value: 150, suffix: '+', icon: ImageIcon, color: '0,238,226' },
  { label: 'Reels & Shorts', value: 90, suffix: '+', icon: Film, color: '244,114,182' },
];

// relative output by content type (bar %)
const output = [
  { label: 'Thumbnails', pct: 92, color: '0,238,226' },
  { label: 'Reels & Shorts', pct: 78, color: '244,114,182' },
  { label: 'Long-form videos', pct: 64, color: '192,132,252' },
  { label: 'Carousels', pct: 55, color: '96,165,250' },
  { label: 'Posters', pct: 48, color: '251,146,60' },
];

const platforms = [
  { name: 'YouTube', handle: 'Tech By Vansh', icon: Youtube, color: '#FF0000', url: 'https://youtube.com/@techbyvansh' },
  { name: 'Instagram', handle: '@vanshkashyap70', icon: Instagram, color: '#E1306C', url: 'https://instagram.com/vanshkashyap70' },
  { name: 'LinkedIn', handle: 'Vansh Kashyap', icon: Linkedin, color: '#0A66C2', url: 'https://www.linkedin.com/in/vansh-kashyap-32a46a2a6' },
];

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver((e) => e[0].isIntersecting && setSeen(true), { threshold: 0.3 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return { ref, seen };
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function CreatorDashboard() {
  const bars = useInView<HTMLDivElement>();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 text-neon-green">
            <LayoutDashboard size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Creator Dashboard</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            My Content, <span className="text-neon-green">By the Numbers</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            A snapshot of what I create and manage as a content creator and social media manager.
          </p>
        </motion.div>

        {/* stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl" style={{ background: `rgba(${s.color},0.12)` }} />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `rgba(${s.color},0.12)`, border: `1px solid rgba(${s.color},0.3)`, color: `rgb(${s.color})` }}>
                    <Icon size={20} />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold" style={{ color: `rgb(${s.color})` }}>
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-zinc-400 text-sm font-medium mt-1">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* bento: output chart + platforms */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* content output bar chart */}
          <div ref={bars.ref} className="lg:col-span-2 rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 size={18} className="text-neon-green" />
              <h3 className="font-display font-bold text-zinc-100">Content I create</h3>
            </div>
            <div className="flex flex-col gap-4">
              {output.map((o, i) => (
                <div key={o.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300 font-medium">{o.label}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={bars.seen ? { width: `${o.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, rgba(${o.color},0.6), rgb(${o.color}))` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* platforms */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <h3 className="font-display font-bold text-zinc-100">Active on</h3>
            </div>
            <div className="flex flex-col gap-3">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-zinc-600 transition-colors"
                    style={{ ['--b' as string]: p.color }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: `${p.color}1a`, color: p.color }}>
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-zinc-100 text-sm">{p.name}</p>
                      <p className="text-xs truncate" style={{ color: p.color }}>{p.handle}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
