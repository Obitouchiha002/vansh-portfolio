import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Sparkles, Bot, Zap, Table2, Phone, ArrowRight, Workflow } from 'lucide-react';
import type { Field } from '../fields';

/* =========================================================================
   AI HERO — a premium, living opening for the AI & Automation page.
   Left: rotating headline + capability pills. Right: an animated automation
   canvas (nodes wired together with flowing "data" connectors).
   ========================================================================= */

/* ---- animated automation canvas ---- */
const VB = { w: 380, h: 300 };
const N: Record<string, { x: number; y: number }> = {
  agent: { x: 190, y: 150 },
  trigger: { x: 60, y: 60 },
  n8n: { x: 60, y: 240 },
  email: { x: 320, y: 66 },
  sheet: { x: 330, y: 150 },
  call: { x: 320, y: 234 },
};
const LINKS: [string, string][] = [
  ['trigger', 'agent'], ['n8n', 'agent'], ['agent', 'email'], ['agent', 'sheet'], ['agent', 'call'],
];
const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
};

function FlowNode({ id, children, accent, big }: { id: string; children: any; accent: string; big?: boolean }) {
  const n = N[id];
  const size = big ? 'w-16 h-16' : 'w-11 h-11';
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: `${(n.x / VB.w) * 100}%`, top: `${(n.y / VB.h) * 100}%` }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.2 + Math.random() * 0.3 }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3 + Math.random() * 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`${size} rounded-2xl flex items-center justify-center backdrop-blur-md border shadow-lg`}
        style={{ background: `rgba(${accent},0.12)`, borderColor: `rgba(${accent},0.4)`, color: `rgb(${accent})`, boxShadow: `0 0 24px -8px rgba(${accent},0.7)` }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function AutomationCanvas() {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
      {/* subtle grid */}
      <div className="absolute inset-0 rounded-3xl opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(0,255,157,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,157,1) 1px,transparent 1px)', backgroundSize: '26px 26px' }} />
      {/* connectors */}
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="flowg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00ff9d" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
        {LINKS.map(([a, b], i) => (
          <g key={i}>
            <path d={curve(N[a], N[b])} stroke="rgba(255,255,255,0.06)" strokeWidth={2.5} />
            <path d={curve(N[a], N[b])} stroke="url(#flowg)" strokeWidth={2} className="animate-dashflow" style={{ animationDelay: `${i * 0.15}s` }} />
          </g>
        ))}
      </svg>
      {/* nodes */}
      <FlowNode id="trigger" accent="0,238,226"><Zap size={18} /></FlowNode>
      <FlowNode id="n8n" accent="234,75,113"><img src="/logos/n8n.svg" alt="n8n" className="w-6 h-6" /></FlowNode>
      <FlowNode id="agent" accent="0,255,157" big>
        <div className="relative">
          <Bot size={30} />
          <motion.span className="absolute -inset-3 rounded-full border border-neon-green/40" animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2.4, repeat: Infinity }} />
        </div>
      </FlowNode>
      <FlowNode id="email" accent="248,113,113"><Mail size={18} /></FlowNode>
      <FlowNode id="sheet" accent="52,211,153"><Table2 size={18} /></FlowNode>
      <FlowNode id="call" accent="251,191,36"><Phone size={18} /></FlowNode>

      {/* central label */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: '70%' }}>
        <span className="text-[10px] font-mono uppercase tracking-wider text-neon-green/90 whitespace-nowrap">AI Agent</span>
      </div>
    </div>
  );
}

/* ---- rotating headline word ---- */
function Rotating({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '0.6em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.6em', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-cyan [grid-area:1/1]"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const pills = ['AI Agents', 'Calling Agents', 'n8n Workflows', 'Web Scraping', 'Auto-posting', 'Lead Automation'];

export default function AiHero({ field }: { field: Field }) {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pb-24">
      {/* ambient orbs */}
      <motion.div className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full blur-[130px] -z-10 pointer-events-none" style={{ background: 'rgba(0,255,157,0.10)' }} animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-10 right-0 w-[480px] h-[480px] rounded-full blur-[130px] -z-10 pointer-events-none" style={{ background: 'rgba(0,229,255,0.08)' }} animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="max-w-7xl mx-auto px-6">
        <a href="#/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8">
          <ArrowLeft size={16} /> All areas
        </a>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* left: content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em]">AI &amp; Automation</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-[1.05] tracking-tight">
              I build systems that{' '}
              <Rotating words={['think for you', 'make the calls', 'reply to leads', 'run 24/7', 'never sleep']} />
            </h1>

            <p className="text-zinc-400 max-w-xl mt-6 text-lg leading-relaxed">
              AI agents, voice &amp; calling bots, and multi-step <span className="text-[#EA4B71] font-semibold">n8n</span> automations that connect your apps, APIs and AI — and run on their own, without manual work.
            </p>

            {/* capability pills */}
            <div className="flex flex-wrap gap-2.5 mt-7">
              {pills.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-800 text-sm font-medium text-zinc-200"
                >
                  <Sparkles size={13} className="text-neon-green" /> {p}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-9">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-neon-green to-neon-cyan transition-transform hover:-translate-y-0.5">
                <Workflow size={18} /> Let's automate it
              </a>
              <a href="#automation" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-zinc-100 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
                See my automations <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* right: animated automation canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-mono text-zinc-500 inline-flex items-center gap-1.5"><Workflow size={12} className="text-neon-green" /> live-automation.flow</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neon-green">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> running
              </span>
            </div>
            <AutomationCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
