import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Rocket, Cpu, Youtube, Video } from 'lucide-react';

/* Animated counter that re-runs when it enters view or its value updates. */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display = count >= 1000 ? (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : String(count);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  // Live YouTube numbers (fallback values used until the API responds / if it fails)
  const [live, setLive] = useState({ subscribers: 493, videos: 157 });

  useEffect(() => {
    fetch('/api/youtube-stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setLive({
            subscribers: parseInt(d.subscribers) || 493,
            videos: parseInt(d.videoCount) || 157,
          });
        }
      })
      .catch(() => {
        /* keep fallback */
      });
  }, []);

  const stats = [
    { value: 12, suffix: '+', label: 'Projects Built', icon: Rocket, accent: 'text-neon-green' },
    { value: 8, suffix: '+', label: 'AI Tools Mastered', icon: Cpu, accent: 'text-neon-blue' },
    { value: live.subscribers, suffix: '+', label: 'YouTube Subscribers', icon: Youtube, accent: 'text-red-400' },
    { value: live.videos, suffix: '+', label: 'Videos Created', icon: Video, accent: 'text-purple-400' },
  ];

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-2 py-3"
              >
                <Icon size={24} className={stat.accent} />
                <div className={`text-3xl md:text-4xl font-display font-bold ${stat.accent}`}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-zinc-400 text-sm font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
