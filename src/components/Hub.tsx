import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Check, Instagram, Linkedin, Youtube, MessageCircle, GraduationCap, Award } from 'lucide-react';
import { FIELDS } from '../fields';
import type { Field } from '../fields';
import PageHeader from './PageHeader';
import Stats from './Stats';
import Footer from './Footer';
import Chatbot from './Chatbot';

const SOCIALS = [
  { label: 'YouTube', href: 'https://youtube.com/@techbyvansh', icon: Youtube, hover: 'hover:text-red-400 hover:border-red-400/50' },
  { label: 'Instagram', href: 'https://instagram.com/vanshkashyap70', icon: Instagram, hover: 'hover:text-pink-400 hover:border-pink-400/50' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vansh-kashyap-32a46a2a6', icon: Linkedin, hover: 'hover:text-sky-400 hover:border-sky-400/50' },
  { label: 'WhatsApp', href: 'https://wa.me/918800628376', icon: MessageCircle, hover: 'hover:text-neon-green hover:border-neon-green/50' },
];

/* roles that rotate under the name */
const ROLES = ['AI-Powered Creator', 'Automation Builder', 'Full-Stack Developer', 'Social Media Manager'];

/* tech logos for the animated strip */
const STACK = [
  'react', 'typescript', 'nodedotjs', 'tailwindcss', 'vite', 'n8n', 'figma',
  'photoshop', 'premierepro', 'aftereffects', 'chatgpt', 'claude', 'gemini',
  'firebase', 'vercel', 'git', 'notion', 'zapier', 'make', 'davinciresolve',
];

/* ---------- animated background ---------- */
function Ambience() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* moving dot-grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
      {/* aurora blobs */}
      <div className="animate-aurora absolute -top-32 left-1/4 w-[42rem] h-[42rem] rounded-full bg-neon-green/10 blur-[140px]" />
      <div className="animate-aurora-slow absolute top-20 right-1/4 w-[38rem] h-[38rem] rounded-full bg-neon-blue/10 blur-[140px]" />
      <div className="animate-aurora absolute top-[36rem] left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-purple-500/[0.07] blur-[150px]" />
    </div>
  );
}

/* ---------- rotating role text ---------- */
function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] items-center justify-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue font-semibold whitespace-nowrap"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---------- interactive chooser card (spotlight + tilt) ---------- */
function ChooserCard({ f, i }: { key?: string; f: Field; i: number }) {
  const Icon = f.icon;
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: any) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.a
      ref={ref}
      href={f.path}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ ['--r' as string]: f.rgb, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative rounded-3xl p-[1px] transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgb(var(--r))] will-change-transform"
    >
      {/* animated gradient border on hover */}
      <span
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(140deg, rgb(var(--r)), transparent 55%)` }}
      />
      <div className="relative h-full rounded-3xl bg-zinc-900/70 border border-zinc-800 backdrop-blur-sm p-7 overflow-hidden">
        {/* cursor spotlight */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(var(--r),0.16), transparent 60%)' }}
        />
        {/* index watermark */}
        <span className="pointer-events-none absolute -bottom-6 right-3 text-[7rem] leading-none font-display font-bold text-white/[0.025] select-none">0{i + 1}</span>

        <div className="relative flex items-start justify-between mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            style={{ background: `rgba(${f.rgb},0.12)`, border: `1px solid rgba(${f.rgb},0.4)`, color: `rgb(${f.rgb})`, boxShadow: `0 0 24px -8px rgb(${f.rgb})` }}
          >
            <Icon size={28} />
          </div>
          <span className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:text-zinc-100 group-hover:border-zinc-500 group-hover:bg-white/5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <h2 className="relative text-2xl font-display font-bold text-zinc-100">{f.title}</h2>
        <p className="relative text-zinc-400 mt-2 leading-relaxed">{f.blurb}</p>

        <div className="relative flex flex-wrap gap-2 mt-5">
          {f.bullets.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800/70 border border-zinc-700/60 text-zinc-300"
            >
              <Check size={12} className={f.accent} /> {b}
            </span>
          ))}
        </div>

        {/* hover reveal CTA */}
        <div className="relative mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: `rgb(${f.rgb})` }}>
          <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Explore</span>
          <ArrowRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.a>
  );
}

/* ---------- infinite tech marquee ---------- */
function TechStrip() {
  const row = [...STACK, ...STACK];
  return (
    <div className="relative overflow-hidden py-4"
      style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
    >
      <div className="flex w-max animate-marquee gap-4">
        {row.map((name, idx) => (
          <div
            key={name + idx}
            className="shrink-0 w-14 h-14 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-center hover:border-neon-green/40 hover:-translate-y-1 transition-all duration-300"
            title={name}
          >
            <img src={`/logos/${name}.svg`} alt={name} className="w-7 h-7 object-contain" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* real certificate scans for the fanned preview */
const CERT_THUMBS = ['/ITI .jpeg', '/skill saksham certificate.jpg', '/tally prime certificate.jpg'];
const EDU_STATS = [
  { k: 'B.Com (Hons)', v: 'Pursuing' },
  { k: 'ITI · NCVT', v: '85%' },
  { k: 'Certificates', v: '7' },
];

/* ---------- premium wide Education & Certifications banner ---------- */
function EduBanner({ f }: { f: Field }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: any) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <motion.a
      ref={ref}
      href={f.path}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ ['--r' as string]: f.rgb }}
      className="group relative block rounded-3xl p-[1px] mt-6 transition-shadow duration-300 hover:shadow-[0_24px_70px_-24px_rgb(var(--r))]"
    >
      <span
        className="absolute inset-0 rounded-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(120deg, rgb(var(--r)), transparent 60%)' }}
      />
      <div className="relative rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm overflow-hidden grid md:grid-cols-[1.15fr_1fr] gap-6 p-7 md:p-9">
        {/* spotlight */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(var(--r),0.14), transparent 55%)' }}
        />
        {/* left: text + stats */}
        <div className="relative flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border" style={{ color: `rgb(${f.rgb})`, borderColor: `rgba(${f.rgb},0.35)`, background: `rgba(${f.rgb},0.08)` }}>
              <GraduationCap size={13} /> Academics
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
            Education & <span style={{ color: `rgb(${f.rgb})`, textShadow: `0 0 22px rgba(${f.rgb},0.5)` }}>Certifications</span>
          </h2>
          <p className="text-zinc-400 mt-3 leading-relaxed max-w-md">{f.blurb}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            {EDU_STATS.map((s) => (
              <div key={s.k} className="rounded-2xl bg-zinc-950/60 border border-zinc-800 px-4 py-2.5">
                <p className="text-lg font-display font-bold" style={{ color: `rgb(${f.rgb})` }}>{s.v}</p>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider">{s.k}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white w-fit rounded-xl px-4 py-2.5 border transition-colors group-hover:bg-white/5" style={{ borderColor: `rgba(${f.rgb},0.4)` }}>
            View all certificates
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" style={{ color: `rgb(${f.rgb})` }} />
          </div>
        </div>

        {/* right: fanned certificate scans */}
        <div className="relative min-h-[190px] md:min-h-0 flex items-center justify-center">
          <div className="relative w-full max-w-xs aspect-[4/3]">
            {CERT_THUMBS.map((src, idx) => {
              const rot = [-12, 0, 12][idx];
              const tx = [-42, 0, 42][idx];
              const ty = [10, -6, 10][idx];
              return (
                <motion.div
                  key={src}
                  className="absolute inset-0 rounded-xl overflow-hidden border-2 border-zinc-700 bg-zinc-800 shadow-2xl"
                  style={{ rotate: rot, x: tx, y: ty, zIndex: idx === 1 ? 3 : 1 }}
                  whileHover={{ y: ty - 10 }}
                >
                  <img src={encodeURI(src)} alt="certificate" className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
              );
            })}
            {/* floating award badge */}
            <div className="absolute -bottom-3 -right-2 z-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: `rgb(${f.rgb})` }}>
              <Award size={22} className="text-zinc-950" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* The homepage: a clean "chooser" that routes visitors to the area
   they actually came for, instead of one long mixed page. */
export default function Hub() {
  const primary = FIELDS.filter((f) => f.key !== 'edu');
  const edu = FIELDS.find((f) => f.key === 'edu');
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green">
      <PageHeader />

      <main className="relative">
        {/* Mini hero */}
        <section className="relative pt-14 sm:pt-20 pb-10 overflow-hidden">
          <Ambience />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-4 sm:gap-5"
          >
            {/* Brand logo mark — crisp SVG with pulsing aura */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* pulse rings */}
              <span className="absolute inset-0 rounded-3xl border border-neon-green/30 animate-ring" />
              <span className="absolute inset-0 rounded-3xl border border-neon-green/20 animate-ring" style={{ animationDelay: '1.6s' }} />
              <div className="animate-float relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center bg-gradient-to-br from-zinc-800/90 to-zinc-950 border border-neon-green/30 shadow-2xl ring-2 ring-neon-green/10 overflow-hidden">
                <div className="absolute inset-0 bg-neon-green/[0.06]" />
                <div className="absolute -inset-6 bg-neon-green/10 blur-2xl" />
                <svg
                  viewBox="0 0 100 100"
                  className="relative w-14 h-14 sm:w-16 sm:h-16"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,157,0.55))' }}
                  aria-label="V Kashyap logo"
                >
                  <defs>
                    <linearGradient id="vlogo" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00ff9d" />
                      <stop offset="100%" stopColor="#00e5ff" />
                    </linearGradient>
                  </defs>
                  <polygon points="20,24 37,24 50,54 63,24 80,24 50,80" fill="url(#vlogo)" />
                </svg>
              </div>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Available for work</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tighter">
              Hi, I'm{' '}
              <span className="animate-text-sheen text-transparent bg-clip-text bg-[linear-gradient(110deg,#00ff9d,45%,#e6fffa,55%,#00e5ff)]">
                Vansh Kashyap
              </span>
            </h1>

            {/* rotating role */}
            <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-400 flex items-center gap-2">
              <RotatingRole />
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                    whileHover={{ y: -3, scale: 1.08 }}
                    className={`w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-colors ${s.hover}`}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>

            <p className="text-zinc-400 max-w-xl text-sm sm:text-base leading-relaxed">
              Creator & builder from Delhi working where AI, automation and design meet — shipping apps, workflows and content under my brand, <span className="text-zinc-200 font-medium">Tech By Vansh</span>.
            </p>
            <p className="text-zinc-500 max-w-xl text-sm">
              Pick what you're here for — I'll show you just that, no scrolling through everything.
            </p>

            {/* scroll cue */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-2 flex flex-col items-center gap-1 text-zinc-600"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.25em]">Choose a path</span>
              <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1">
                <span className="w-1 h-1.5 rounded-full bg-neon-green" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Chooser cards */}
        <section className="pb-10 relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-sm font-bold uppercase tracking-[0.2em] text-neon-green text-glow mb-8"
            >
              What are you looking for?
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6">
              {primary.map((f, i) => (
                <ChooserCard key={f.key} f={f} i={i} />
              ))}
            </div>

            {/* dedicated premium Education & Certifications banner */}
            {edu && <EduBanner f={edu} />}

            <div className="text-center mt-10">
              <motion.a
                href="#/all"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold hover:border-neon-green/40 hover:text-neon-green transition-colors"
              >
                See the full portfolio <ArrowRight size={16} />
              </motion.a>
            </div>
          </div>
        </section>

        {/* Tech strip */}
        <section className="pb-14">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-600 mb-4">Tools & tech I build with</p>
            <TechStrip />
          </div>
        </section>

        {/* Quick credibility */}
        <Stats />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
