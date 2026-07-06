import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { School, BookOpen, Cpu, Wrench, Briefcase, BadgeCheck, Youtube, GraduationCap, Rocket, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import GuideBot from './GuideBot';

/* ============================================================
   MY JOURNEY — a story-driven roadmap from where it started to
   now. The road "paves" as you scroll and Vanshbot rides down it,
   stop by stop: school → ITI → internships → self-teaching → now.
   ============================================================ */

type Brand = { src?: string; label: string };
type Stop = {
  year: string;
  title: string;
  place: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  rgb: string;
  brands?: Brand[];
};

const STOPS: Stop[] = [
  {
    year: '2022',
    title: 'Where it started',
    place: 'Class 10th · CBSE — 73.8%',
    desc: 'A curious kid with a slow computer and no idea how any of it worked. No mentor, no plan — just a lot of "how is this made?" questions.',
    tags: ['Foundations', 'First spark'],
    icon: School,
    rgb: '56,189,248',
  },
  {
    year: '2024',
    title: 'Chose the harder path',
    place: 'Class 12th · CBSE — 72.8%',
    desc: 'Finished school, but books alone were never going to be enough. So I enrolled in ITI to learn a real, hands-on trade instead of waiting around.',
    tags: ['Decision made', 'ITI enrolled'],
    icon: BookOpen,
    rgb: '96,165,250',
  },
  {
    year: 'Dec 2024 – Mar 2025',
    title: 'First internship',
    place: 'Elios Management Consulting · Electronic System Design Intern',
    desc: 'My first real taste of industry — working on electronic system design and seeing how professionals actually build and ship things.',
    tags: ['Electronics', 'Industry exposure'],
    icon: Cpu,
    rgb: '192,132,252',
    brands: [{ label: 'Elios' }],
  },
  {
    year: '2024–25',
    title: 'Hands on the hardware',
    place: 'ITI Mangolpuri · Computer Hardware & Networking — NCVT 85%',
    desc: 'The core of my training. Learned to assemble, repair and network computers for real — motherboards, PC assembly, OS installs, troubleshooting and networking basics.',
    tags: ['PC Assembly', 'Networking', 'Repair', 'Windows'],
    icon: Wrench,
    rgb: '251,146,60',
    brands: [{ src: '/logos/iti.png', label: 'ITI' }],
  },
  {
    year: 'Mar – Apr 2025',
    title: 'Second internship',
    place: 'Allied Engineering Works Pvt Ltd · Hardware Assembly Intern',
    desc: 'Back to the workshop — real hands-on hardware assembly on the floor, putting the ITI training to work on actual machines.',
    tags: ['Hardware', 'Assembly', 'Testing'],
    icon: Briefcase,
    rgb: '0,255,157',
    brands: [{ label: 'AEW' }],
  },
  {
    year: 'Apr – May 2025',
    title: 'Skilling up',
    place: 'Microsoft · Skill Saksham Program',
    desc: 'Rounded out the practical side — AI basics, Microsoft Office, and professional communication through the Microsoft Skill Saksham program.',
    tags: ['AI Basics', 'MS Office', 'Communication'],
    icon: BadgeCheck,
    rgb: '34,211,238',
    brands: [{ src: '/logos/word.svg', label: 'W' }, { src: '/logos/excel.svg', label: 'X' }, { src: '/logos/powerpoint.svg', label: 'P' }],
  },
  {
    year: '2023 → now',
    title: 'YouTube University',
    place: 'Self-taught · on a low-end PC',
    desc: 'The turning point. With zero budget and a low-end setup, I taught myself everything I actually build with today — AI tools, n8n automation, website design and troubleshooting — entirely from free YouTube tutorials, one broken build and one fix at a time.',
    tags: ['Self-taught', 'AI', 'Automation', 'Web Design'],
    icon: Youtube,
    rgb: '239,68,68',
    brands: [
      { src: '/logos/youtubestudio.svg', label: 'YT' },
      { src: '/logos/chatgpt.svg', label: 'AI' },
      { src: '/logos/n8n.svg', label: 'n8n' },
      { src: '/logos/react.svg', label: 'R' },
      { src: '/logos/figma.svg', label: 'F' },
    ],
  },
  {
    year: 'Now',
    title: 'Business foundation',
    place: 'Delhi University (SOL) · B.Com (Honours)',
    desc: 'Currently pursuing B.Com (Hons) — balancing college, and running my work as a creator and builder at the same time.',
    tags: ['Pursuing', 'Commerce', 'Balance'],
    icon: GraduationCap,
    rgb: '129,140,248',
  },
  {
    year: 'Today',
    title: 'What I do now',
    place: 'Tech By Vansh · Creator & Builder',
    desc: 'I build n8n automations, ship web & app projects, design, and create content across YouTube and social — 493 subscribers and 300K+ views, and just getting started.',
    tags: ['AI & Automation', 'Web & App Dev', 'Content'],
    icon: Rocket,
    rgb: '0,255,157',
    brands: [
      { src: '/logos/n8n.svg', label: 'n8n' },
      { src: '/logos/react.svg', label: 'R' },
      { src: '/logos/chatgpt.svg', label: 'AI' },
      { src: '/logos/youtubestudio.svg', label: 'YT' },
    ],
  },
];

function BrandBadge({ b, rgb }: { key?: string; b: Brand; rgb: string }) {
  const [ok, setOk] = useState(true);
  return (
    <span
      className="w-7 h-7 rounded-lg flex items-center justify-center border shrink-0"
      style={{ background: b.src && ok ? '#fff' : `rgba(${rgb},0.12)`, borderColor: `rgba(${rgb},0.35)` }}
      title={b.label}
    >
      {b.src && ok ? (
        <img src={b.src} alt={b.label} className="w-4 h-4 object-contain" onError={() => setOk(false)} />
      ) : (
        <span className="text-[9px] font-bold" style={{ color: `rgb(${rgb})` }}>{b.label}</span>
      )}
    </span>
  );
}

function Stop({ s, i }: { key?: string; s: Stop; i: number }) {
  const left = i % 2 === 0;
  return (
    <div className="relative">
      {/* map pin on the road */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute left-[22px] md:left-1/2 -translate-x-1/2 top-2 z-20 w-11 h-11 rounded-full flex items-center justify-center border-2 bg-zinc-950"
        style={{ borderColor: `rgb(${s.rgb})`, boxShadow: `0 0 20px rgba(${s.rgb},0.6)` }}
      >
        <s.icon size={18} style={{ color: `rgb(${s.rgb})` }} />
      </motion.span>

      {/* connector to the card (desktop) */}
      <span
        className={`hidden md:block absolute top-7 h-[2px] w-10 ${left ? 'right-1/2 mr-5' : 'left-1/2 ml-5'}`}
        style={{ background: `linear-gradient(${left ? 'to left' : 'to right'}, rgb(${s.rgb}), transparent)` }}
      />

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`relative pl-16 md:pl-0 md:w-[calc(50%-3rem)] ${left ? '' : 'md:ml-auto'}`}
      >
        <div className="group rounded-2xl bg-zinc-900/70 border border-zinc-800 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1" style={{ ['--r' as string]: s.rgb }}>
          <div className={`flex items-center gap-3 mb-3 ${left ? 'md:flex-row-reverse md:text-right' : ''}`}>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ color: `rgb(${s.rgb})`, background: `rgba(${s.rgb},0.12)`, border: `1px solid rgba(${s.rgb},0.35)` }}>
              {s.year}
            </span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <h3 className={`text-xl font-display font-bold text-white ${left ? 'md:text-right' : ''}`}>{s.title}</h3>
          <p className={`text-sm font-medium mt-1 ${left ? 'md:text-right' : ''}`} style={{ color: `rgb(${s.rgb})` }}>{s.place}</p>
          <p className={`text-zinc-400 text-sm leading-relaxed mt-3 ${left ? 'md:text-right' : ''}`}>{s.desc}</p>

          {s.brands && (
            <div className={`flex flex-wrap gap-1.5 mt-4 ${left ? 'md:justify-end' : ''}`}>
              {s.brands.map((b, bi) => <BrandBadge key={b.label + bi} b={b} rgb={s.rgb} />)}
            </div>
          )}

          <div className={`flex flex-wrap gap-1.5 mt-4 ${left ? 'md:justify-end' : ''}`}>
            {s.tags.map((t) => (
              <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-800/70 border border-zinc-700/50 text-zinc-300">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function JourneyRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const fillH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const markerY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-14 md:items-center md:text-center"
        >
          <div className="inline-flex items-center gap-2 text-indigo-400 md:justify-center">
            <MapPin size={18} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">The road so far</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            My <span className="text-indigo-400" style={{ textShadow: '0 0 22px rgba(129,140,248,0.5)' }}>Journey</span>
          </h2>
          <div className="w-20 h-1 bg-indigo-400 rounded-full md:mx-auto" />
          <p className="text-zinc-400 max-w-2xl text-lg">
            From a curious kid on a slow PC to everything I build today — school, ITI, internships and a whole lot of self-teaching.
          </p>
          {/* bot intro */}
          <div className="inline-flex items-center gap-2.5 mt-1 px-3.5 py-2 rounded-full bg-zinc-900/70 border border-zinc-800 md:mx-auto">
            <GuideBot size={26} />
            <span className="text-sm text-zinc-300">Scroll — Vanshbot will walk you through every stop.</span>
          </div>
        </motion.div>

        {/* the road */}
        <div ref={ref} className="relative">
          {/* asphalt */}
          <div className="absolute top-0 bottom-0 left-[22px] md:left-1/2 -translate-x-1/2 w-[10px] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/40" />
          {/* dashed center stripe */}
          <div className="absolute top-2 bottom-2 left-[22px] md:left-1/2 -translate-x-1/2 w-[2px]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, rgba(250,204,21,0.5) 0 10px, transparent 10px 24px)' }} />
          {/* neon progress that paves as you scroll */}
          <motion.div className="absolute top-0 left-[22px] md:left-1/2 -translate-x-1/2 w-[10px] rounded-full origin-top bg-gradient-to-b from-neon-green via-indigo-400 to-neon-green" style={{ height: fillH, opacity: 0.5 }} />
          {/* Vanshbot rides the road */}
          <motion.div className="absolute left-[22px] md:left-1/2 -translate-x-1/2 z-30 -mt-5" style={{ top: markerY }}>
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-neon-green/30 blur-md" />
              <GuideBot size={40} className="relative drop-shadow-[0_0_10px_rgba(0,255,157,0.6)]" />
            </div>
          </motion.div>

          <div className="relative flex flex-col gap-14 md:gap-16 py-2">
            {STOPS.map((s, i) => (
              <Stop key={s.year + i} s={s} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
