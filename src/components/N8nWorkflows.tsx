import { motion, AnimatePresence, useScroll } from 'motion/react';
import { useState, useRef } from 'react';
import { Workflow, Globe, GitBranch, Code2, Clock, Split, PenLine, GitMerge, ClipboardList, Boxes, Zap, Power, Facebook, Mail, FileText, MousePointer2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* =========================================================================
   n8n WORKFLOWS — each workflow renders inside a "monitor" you can power on.
   On power-on the whole automation system boots + builds itself in fast,
   then shows the flow as a vertical branch-tree.
   Drop .json files into src/assets/n8n-workflows/ (see README there).
   ========================================================================= */
const wfGlob = import.meta.glob('../assets/n8n-workflows/*.json', { eager: true }) as Record<string, any>;

type NodeMeta = { label: string; logo?: string; Icon?: LucideIcon; rgb: string; trigger?: boolean };

function metaFor(type: string, name: string): NodeMeta {
  const t = (type || '').split('.').pop() || '';
  const lower = (name + ' ' + t).toLowerCase();
  if (/googlesheets/i.test(t)) return { label: 'Google Sheets', logo: '/logos/googlesheets.svg', rgb: '16,185,129', trigger: /trigger/i.test(t) };
  if (/openai|langchain|agent/i.test(t) || /openai|gpt|summari|\bai\b/i.test(lower)) return { label: 'OpenAI', logo: '/logos/chatgpt.svg', rgb: '16,163,127' };
  if (/facebook/i.test(t)) return { label: 'Facebook', Icon: Facebook, rgb: '59,89,152' };
  if (/gmail|emailsend|sendemail/i.test(t)) return { label: 'Gmail', Icon: Mail, rgb: '234,67,53' };
  if (/markdown|html/i.test(t)) return { label: 'Markdown', Icon: FileText, rgb: '100,116,139' };
  if (/httprequest/i.test(t)) return { label: 'HTTP Request', Icon: Globe, rgb: '124,58,237' };
  if (/manualtrigger/i.test(t)) return { label: 'Manual Trigger', Icon: MousePointer2, rgb: '0,238,226', trigger: true };
  if (/formtrigger/i.test(t)) return { label: 'Form Trigger', Icon: ClipboardList, rgb: '234,88,12', trigger: true };
  if (/scheduletrigger/i.test(t)) return { label: 'Schedule', Icon: Clock, rgb: '250,204,21', trigger: true };
  if (/^if$|filter|switch/i.test(t)) return { label: 'Filter / IF', Icon: GitBranch, rgb: '34,197,94' };
  if (/code|function/i.test(t)) return { label: 'Code', Icon: Code2, rgb: '236,72,153' };
  if (/splitout|split/i.test(t)) return { label: 'Split Out', Icon: Split, rgb: '99,102,241' };
  if (/^set$|edit/i.test(t)) return { label: 'Set / Edit', Icon: PenLine, rgb: '59,130,246' };
  if (/merge/i.test(t)) return { label: 'Merge', Icon: GitMerge, rgb: '6,182,212' };
  if (/trigger|webhook/i.test(t)) return { label: 'Trigger', Icon: Zap, rgb: '0,238,226', trigger: true };
  return { label: t || 'Node', Icon: Boxes, rgb: '148,163,184' };
}

const STICKY_RGB = ['113,113,122', '234,179,8', '16,185,129', '96,165,250', '167,139,250', '244,114,182', '0,238,226', '251,146,60'];
const cleanTitle = (c: string) => String(c || '').replace(/^#+\s*/, '').split('\n')[0].trim();

function parse(raw: any) {
  const all = Array.isArray(raw?.nodes) ? raw.nodes : [];
  const stickies = all.filter((n: any) => /stickynote/i.test(n.type || ''));
  const nodes = all.filter((n: any) => !/stickynote/i.test(n.type || ''));

  const bands: { y: number; label: string; rgb: string; nodes: any[] }[] = [];
  let cur: any = null;
  for (const n of [...nodes].sort((a, b) => a.position[1] - b.position[1])) {
    if (!cur || n.position[1] - cur.y > 110) { cur = { y: n.position[1], nodes: [] }; bands.push(cur); }
    cur.nodes.push(n);
  }
  bands.forEach((b, i) => {
    b.nodes.sort((a, z) => a.position[0] - z.position[0]);
    const midY = b.y + 28;
    const st = stickies.find((s: any) => midY >= s.position[1] && midY <= s.position[1] + (s.parameters?.height || 140));
    if (st) { b.label = cleanTitle(st.parameters?.content) || `Step ${i + 1}`; b.rgb = STICKY_RGB[(st.parameters?.color ?? 1) % STICKY_RGB.length]; }
    else { b.label = `Step ${i + 1}`; b.rgb = STICKY_RGB[(i % 6) + 1]; }
  });

  const seen = new Set<string>();
  const integrations: { key: string; label: string; meta: NodeMeta }[] = [];
  for (const n of nodes) {
    const m = metaFor(n.type, n.name);
    const key = m.label;
    if (!seen.has(key)) { seen.add(key); integrations.push({ key, label: m.label, meta: m }); }
  }
  return { name: raw?.name || 'Workflow', desc: raw?.desc || raw?.description || '', tags: Array.isArray(raw?.tags) ? raw.tags : [], nodeCount: nodes.length, bands, integrations };
}

const workflows = Object.values(wfGlob).map((mod: any) => parse(mod?.default ?? mod)).filter((w) => w.nodeCount > 0);

function NodeChip({ node }: { node: any }) {
  const m = metaFor(node.type, node.name);
  return (
    <div className="relative shrink-0 flex items-center gap-2 rounded-xl bg-zinc-900 border px-2.5 py-2 hover:scale-[1.04] transition-transform" style={{ borderColor: `rgba(${m.rgb},0.5)` }}>
      {m.trigger && <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 h-6 w-1.5 rounded-full" style={{ background: `rgb(${m.rgb})` }} />}
      <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center" style={{ background: m.logo ? '#fff' : `rgba(${m.rgb},0.14)`, border: m.logo ? 'none' : `1px solid rgba(${m.rgb},0.4)`, color: `rgb(${m.rgb})` }}>
        {m.logo ? <img src={m.logo} alt="" className="w-5 h-5 object-contain" /> : m.Icon ? <m.Icon size={16} /> : null}
      </div>
      <span className="text-[11px] leading-tight text-zinc-200 font-medium max-w-[116px] line-clamp-2">{node.name}</span>
    </div>
  );
}

function Connector({ rgb }: { rgb: string }) {
  return (
    <div className="shrink-0 mx-0.5" aria-hidden>
      <svg width="30" height="10" viewBox="0 0 30 10">
        <line x1="0" y1="5" x2="26" y2="5" stroke={`rgb(${rgb})`} strokeWidth="2" className="animate-dashflow" />
        <path d="M24 2 L29 5 L24 8" fill="none" stroke={`rgb(${rgb})`} strokeWidth="2" />
      </svg>
    </div>
  );
}

/* the flow-tree that "builds in" when the screen powers on */
function FlowTree({ wf }: { wf: ReturnType<typeof parse> }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
      className="relative px-5 py-6"
    >
      <div className="absolute top-6 bottom-6 left-[26px] w-[2px] bg-gradient-to-b from-[#EA4B71] via-neon-cyan/50 to-transparent" />
      <div className="flex flex-col gap-8">
        {wf.bands.map((band, bi) => (
          <motion.div key={bi} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } } }} className="relative pl-10">
            <span className="absolute left-[19px] top-1.5 w-4 h-4 rounded-full border-2 bg-zinc-950 z-10" style={{ borderColor: `rgb(${band.rgb})`, boxShadow: `0 0 12px rgba(${band.rgb},0.7)` }} />
            <p className="text-sm font-display font-semibold mb-3" style={{ color: `rgb(${band.rgb})` }}>{band.label}</p>
            <div className="flex items-center overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
              {band.nodes.map((n: any, ni: number) => (
                <div key={n.name + ni} className="flex items-center">
                  <NodeChip node={n} />
                  {ni < band.nodes.length - 1 && <Connector rgb={band.rgb} />}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const BOOT_LINES = ['> initialize ai-automation.core', '> mounting nodes …', '> wiring integrations …', '> starting agents …', '✓ system online'];

function Monitor({ wf }: { key?: string; wf: ReturnType<typeof parse> }) {
  const [phase, setPhase] = useState<'off' | 'booting' | 'on'>('off');
  const [cycle, setCycle] = useState(0);
  const [autobooted, setAutobooted] = useState(false);

  const powerOn = () => {
    if (phase === 'booting') return;
    setPhase('booting');
    setCycle((c) => c + 1);
    setTimeout(() => setPhase('on'), 1350);
  };
  const toggle = () => (phase === 'off' ? powerOn() : setPhase('off'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      onViewportEnter={() => { if (!autobooted) { setAutobooted(true); powerOn(); } }}
    >
      {/* monitor bezel */}
      <div className="relative rounded-[1.6rem] bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/60 p-2.5 sm:p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        {/* screen */}
        <div className="relative rounded-2xl bg-zinc-950 overflow-hidden border border-black/60">
          {/* screen glow when on */}
          <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500" style={{ opacity: phase === 'on' ? 1 : 0, background: 'radial-gradient(120% 80% at 50% -10%, rgba(234,75,113,0.10), transparent 60%)' }} />

          {/* window title bar */}
          <div className="relative z-10 h-11 px-4 flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/70 backdrop-blur">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-amber-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
            <img src="/logos/n8n.svg" alt="n8n" className="w-4 h-4 ml-1" />
            <span className="text-xs font-mono text-zinc-400 truncate">{wf.name}</span>
            <span className="ml-auto hidden sm:inline text-[10px] font-mono text-zinc-600">{wf.nodeCount} nodes</span>
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${phase === 'on' ? 'text-neon-green' : 'text-zinc-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${phase === 'on' ? 'bg-neon-green animate-pulse' : 'bg-zinc-700'}`} /> {phase === 'on' ? 'live' : 'off'}
            </span>
          </div>

          {/* screen viewport */}
          <div className="relative z-10 overflow-auto no-scrollbar" style={{ height: 440 }}>
            <AnimatePresence mode="wait">
              {phase === 'off' && (
                <motion.div key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="text-zinc-700 font-mono text-xs tracking-[0.3em]">STANDBY</div>
                  <button onClick={powerOn} className="group relative w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-neon-green hover:border-neon-green/50 transition-colors">
                    <span className="absolute inset-0 rounded-full bg-neon-green/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Power size={26} />
                  </button>
                  <p className="text-zinc-600 text-xs">Press power to boot the automation</p>
                </motion.div>
              )}
              {phase === 'booting' && (
                <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 font-mono text-sm">
                  <motion.div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-neon-green/10 to-transparent" animate={{ top: ['0%', '100%'] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
                  {BOOT_LINES.map((l, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.22 }} className={i === BOOT_LINES.length - 1 ? 'text-neon-green mt-1' : 'text-zinc-400'}>
                      {l}
                    </motion.p>
                  ))}
                </motion.div>
              )}
              {phase === 'on' && (
                <motion.div key={'on-' + cycle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <FlowTree wf={wf} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* scanline sheen */}
          <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)' }} />
        </div>

        {/* bezel bottom: brand + power button */}
        <div className="flex items-center justify-between px-3 pt-2">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
            <Workflow size={12} className="text-[#EA4B71]" /> n8n · automation
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {wf.integrations.slice(0, 6).map(({ key, meta }) => (
              <div key={key} className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: meta.logo ? '#fff' : `rgba(${meta.rgb},0.14)`, border: meta.logo ? 'none' : `1px solid rgba(${meta.rgb},0.35)`, color: `rgb(${meta.rgb})` }} title={key}>
                {meta.logo ? <img src={meta.logo} alt="" className="w-3.5 h-3.5 object-contain" /> : meta.Icon ? <meta.Icon size={12} /> : null}
              </div>
            ))}
            {/* power toggle */}
            <button onClick={toggle} aria-label="Power" className={`ml-1 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${phase === 'off' ? 'border-zinc-700 text-zinc-500 hover:text-zinc-300' : 'border-neon-green/50 text-neon-green shadow-[0_0_14px_-2px_rgba(0,255,157,0.7)]'}`}>
              <Power size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* the detail panel shown in the blank space beside each monitor */
function Detail({ wf, align }: { wf: ReturnType<typeof parse>; align: 'left' | 'right' }) {
  const right = align === 'right';
  return (
    <div className={`flex flex-col ${right ? 'md:items-end md:text-right' : ''}`}>
      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#EA4B71] mb-2" style={{ textShadow: '0 0 14px rgba(234,75,113,0.6)' }}>What it automates</span>
      <h4 className="text-2xl font-display font-bold text-white leading-tight mb-3" style={{ textShadow: '0 0 22px rgba(234,75,113,0.45)' }}>{wf.name}</h4>
      <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-5">{wf.desc}</p>

      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Built with</span>
      <div className={`flex flex-wrap gap-2 ${right ? 'md:justify-end' : ''}`}>
        {wf.integrations.map(({ key, label, meta }) => (
          <div key={key} className="inline-flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: meta.logo ? '#fff' : `rgba(${meta.rgb},0.15)`, color: `rgb(${meta.rgb})` }}>
              {meta.logo ? <img src={meta.logo} alt="" className="w-3.5 h-3.5 object-contain" /> : meta.Icon ? <meta.Icon size={12} /> : null}
            </span>
            <span className="text-[11px] text-zinc-300 capitalize">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {wf.tags.slice(0, 4).map((t: string) => (
          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-zinc-500">{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function N8nWorkflows() {
  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: spineRef, offset: ['start 0.85', 'end 0.55'] });
  if (!workflows.length) return null;
  return (
    <section id="n8n" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#EA4B71]/5 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#EA4B71]">
            <Workflow size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">n8n Workflows</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            My Real <span className="text-[#EA4B71]">n8n</span> Builds
          </h2>
          <div className="w-20 h-1 bg-[#EA4B71] rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Each automation runs on its own screen — hit the <Power size={15} className="inline -mt-1 text-neon-green" /> power button to boot it. Scroll to follow the chain.
          </p>
        </motion.div>

        {/* zig-zag layout connected by a line that draws in on scroll */}
        <div ref={spineRef} className="relative">
          {/* base spine */}
          <div className="absolute top-6 bottom-6 left-[26px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-zinc-800" />
          {/* progress spine — draws as you scroll */}
          <motion.div
            className="absolute top-6 left-[26px] md:left-1/2 md:-translate-x-1/2 w-[2px] origin-top bg-gradient-to-b from-[#EA4B71] via-neon-cyan to-purple-400"
            style={{ height: 'calc(100% - 3rem)', scaleY: scrollYProgress }}
          />

          <div className="relative flex flex-col gap-16">
            {workflows.map((wf, i) => {
              const left = i % 2 === 0;
              return (
                <div key={wf.name + i} className="relative">
                  {/* node dot on the spine */}
                  <span className="absolute left-[26px] md:left-1/2 -translate-x-1/2 top-6 z-10 w-4 h-4 rounded-full border-2 border-[#EA4B71] bg-zinc-950" style={{ boxShadow: '0 0 14px rgba(234,75,113,0.7)' }} />
                  {/* connector from spine to the screen (desktop) */}
                  <span
                    className={`hidden md:block absolute top-8 h-[2px] w-7 ${left ? 'right-1/2 mr-2' : 'left-1/2 ml-2'}`}
                    style={{ background: `linear-gradient(${left ? 'to left' : 'to right'}, rgba(234,75,113,0.7), transparent)` }}
                  />
                  {/* detail panel in the opposite blank space (desktop) */}
                  <div className={`hidden md:flex md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[calc(50%-3rem)] ${left ? 'md:right-0 md:pl-2' : 'md:left-0 md:pr-2'}`}>
                    <Detail wf={wf} align={left ? 'left' : 'right'} />
                  </div>
                  {/* the monitor, alternating side */}
                  <div className={`pl-12 md:pl-0 md:w-[calc(50%-1.75rem)] ${left ? '' : 'md:ml-auto'}`}>
                    <Monitor wf={wf} />
                    {/* detail below the monitor on mobile */}
                    <div className="md:hidden mt-5">
                      <Detail wf={wf} align="left" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
