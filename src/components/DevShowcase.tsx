import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Monitor, Tablet, Smartphone, ArrowUpRight, ChevronLeft, ChevronRight, Hand } from 'lucide-react';

/* =========================================================================
   FEATURED PROJECTS — Web & App Development page.
   The preview adapts to the VIEWER's device:
     • PC / laptop  -> browser (desktop) mockup + desktop screenshots
     • tablet       -> tablet mockup + desktop screenshots
     • phone        -> phone mockup + mobile screenshots
   Screenshots: /public/app-shots/<slug>-d1..dN.png (desktop) and -m1..mN.png (mobile).
   ========================================================================= */
const projects = [
  {
    name: 'VanshLink',
    tagline: 'Real-time private chat app',
    description:
      'A fast, private real-time chat app. Firebase-powered auth and messaging with a clean, responsive UI — your conversations, your control.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    link: 'https://vanshlink.vercel.app/',
    desktop: 2,
    mobile: 5,
    rgb: '0,229,255',
  },
  {
    name: 'vthumb',
    tagline: 'YouTube thumbnail downloader',
    description:
      'Paste any YouTube URL and instantly grab its max-resolution thumbnail. A handy tool built for creators and editors.',
    tech: ['React', 'YouTube API', 'Tailwind CSS'],
    link: 'https://vthumb.vercel.app/',
    desktop: 4,
    mobile: 3,
    rgb: '255,60,60',
  },
  {
    name: 'Aura Player',
    tagline: 'Offline + online media player',
    description:
      'A sleek media player combining offline MP3/MP4 playback with online streaming in one unified, responsive hub.',
    tech: ['React', 'Tailwind CSS', 'Web Audio API'],
    link: 'https://aura-player-nine.vercel.app/',
    desktop: 4,
    mobile: 4,
    rgb: '251,146,60',
  },
  {
    name: 'Aura Shakti',
    tagline: 'Interactive aura quiz',
    description:
      'A deeply interactive quiz that calculates your "aura" with smooth animations and beautiful, shareable results.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://aurashakti.vercel.app/',
    desktop: 4,
    mobile: 4,
    rgb: '192,132,252',
  },
  {
    name: 'Creator Tracker',
    tagline: 'AI YouTube creator tracker & idea engine',
    description:
      'Track any set of YouTube creators, auto-scan their latest videos and let AI compare viral vs flop, surface winning keywords and generate fresh video ideas per niche — with scheduled auto-runs, email reports and Google Sheet export.',
    tech: ['React', 'YouTube API', 'AI', 'Tailwind CSS'],
    link: 'https://tracker.grivaacapital.com/',
    desktop: 5,
    mobile: 5,
    rgb: '239,68,68',
  },
  {
    name: 'Vedic Astra',
    tagline: 'AI-powered Vedic astrology charts',
    description:
      'Generate precise birth charts using Swiss Ephemeris calculations — Lagna, Dashas, divisional charts and AI-driven interpretations for career, wealth and relationships, all in a clean dashboard.',
    tech: ['React', 'Tailwind CSS', 'Astro Engine', 'AI'],
    link: 'https://vedicastra.vercel.app/',
    desktop: 4,
    mobile: 5,
    rgb: '234,140,42',
  },
  {
    name: 'Kairo',
    tagline: 'Daily social-growth missions',
    description:
      'A gamified app that assigns daily missions to build confidence and improve your social life — level up every day.',
    tech: ['React', 'Tailwind CSS'],
    link: 'https://kairo-black.vercel.app/',
    desktop: 1,
    mobile: 1,
    rgb: '0,255,157',
  },
];

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '');

type Device = 'mobile' | 'tablet' | 'desktop';
function useDevice(): Device {
  const read = (): Device => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  };
  const [d, setD] = useState<Device>(read);
  useEffect(() => {
    const on = () => setD(read());
    window.addEventListener('resize', on, { passive: true });
    return () => window.removeEventListener('resize', on);
  }, []);
  return d;
}

const deviceMeta: Record<Device, { label: string; icon: any }> = {
  desktop: { label: 'Desktop preview', icon: Monitor },
  tablet: { label: 'Tablet preview', icon: Tablet },
  mobile: { label: 'Mobile preview', icon: Smartphone },
};

function ResponsiveMockup({ app, rgb, desktop, mobile }: { app: string; rgb: string; desktop: number; mobile: number }) {
  const device = useDevice();
  const isPhone = device === 'mobile';
  const kind = isPhone ? 'm' : 'd';
  const count = isPhone ? mobile : desktop;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => { setI(0); }, [device]);

  const shots = Array.from({ length: count }, (_, k) => `/app-shots/${app}-${kind}${k + 1}.png`);
  const go = (d: number) => { setDir(d); setI((p) => (p + d + count) % count); };

  // One constant device frame; only the screen inside changes on swipe.
  // No notch overlay — some screenshots already include their own notch/frame.
  const aspect = isPhone ? 'aspect-[9/19]' : 'aspect-[16/10]';
  const media = (
    <div className={`relative ${aspect} overflow-hidden bg-zinc-900 ${isPhone ? 'rounded-[1.8rem]' : device === 'tablet' ? 'rounded-lg' : ''}`}>
      <motion.img
        key={i}
        src={shots[i]}
        alt=""
        draggable={false}
        initial={{ opacity: 0, x: dir >= 0 ? 45 : -45 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        drag={count > 1 ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        dragSnapToOrigin
        onDragEnd={(_, info) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1); }}
        className="absolute inset-0 w-full h-full object-cover object-top cursor-grab active:cursor-grabbing"
      />
    </div>
  );

  let frame;
  if (device === 'desktop') {
    frame = (
      <div className="rounded-xl overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-[0_25px_70px_-25px_rgba(0,0,0,0.8)]">
        <div className="h-9 bg-zinc-800/90 flex items-center gap-1.5 px-4 border-b border-zinc-700/50">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <div className="ml-3 h-4 flex-1 max-w-[240px] rounded-full bg-zinc-900/80 border border-zinc-700/40" />
        </div>
        {media}
      </div>
    );
  } else if (device === 'tablet') {
    frame = <div className="rounded-[1.6rem] border-[10px] border-zinc-800 bg-zinc-950 p-1 shadow-2xl">{media}</div>;
  } else {
    frame = <div className="rounded-[2.4rem] border-[8px] border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl">{media}</div>;
  }

  const Meta = deviceMeta[device];
  const width = isPhone ? 'w-[250px] sm:w-[280px]' : device === 'tablet' ? 'w-full max-w-[520px]' : 'w-full max-w-[600px]';

  return (
    <div className={`relative mx-auto ${width}`}>
      <div className="absolute -inset-8 rounded-full blur-3xl -z-10" style={{ background: `rgba(${rgb},0.14)` }} />

      <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
        <Meta.icon size={14} /> {Meta.label}
      </div>

      <div className="relative">
        {frame}
        {count > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous" className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-200 flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-lg">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => go(1)} aria-label="Next" className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-200 flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-lg">
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-1.5 mt-5">
          {shots.map((_, k) => (
            <button
              key={k}
              onClick={() => { setDir(k > i ? 1 : -1); setI(k); }}
              aria-label={`Slide ${k + 1}`}
              className="h-2 rounded-full transition-all"
              style={{ width: k === i ? 22 : 8, background: k === i ? `rgb(${rgb})` : '#3f3f46' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DevShowcase() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-purple-400 rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg inline-flex items-center gap-2 flex-wrap">
            Live apps I've built — the preview matches your device.
            <span className="inline-flex items-center gap-1.5 text-zinc-500 text-base">
              <Hand size={16} /> Swipe to see more screens.
            </span>
          </p>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-28">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={p.name} className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={reversed ? 'lg:order-2' : ''}
                >
                  <ResponsiveMockup app={slug(p.name)} rgb={p.rgb} desktop={p.desktop} mobile={p.mobile} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={reversed ? 'lg:order-1' : ''}
                >
                  <span className="text-6xl font-display font-bold text-zinc-800/80">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">{p.name}</h3>
                  <p className="font-medium mt-1" style={{ color: `rgb(${p.rgb})` }}>{p.tagline}</p>
                  <p className="text-zinc-400 leading-relaxed mt-4 text-lg">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-5 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-1.5"><Monitor size={15} /> Desktop</span>
                    <span className="inline-flex items-center gap-1.5"><Smartphone size={15} /> Mobile</span>
                    <span className="text-zinc-700">·</span>
                    <span>Fully responsive</span>
                  </div>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-xl font-bold text-zinc-950 transition-transform hover:-translate-y-0.5"
                    style={{ background: `rgb(${p.rgb})` }}
                  >
                    Live Demo <ExternalLink size={17} />
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 text-center">
          <a href="#contact" className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors font-medium">
            Want something like this built? Let's talk <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
