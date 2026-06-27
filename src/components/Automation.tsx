import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Workflow, Bot, Image as ImageIcon, Mail, Clock, ArrowUpRight, X, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* =========================================================================
   AUTOMATION DATA — PLACEHOLDER. Replace with your real workflows.
   Click a card => opens the flow detail. For each item:
   - does:   1 line on what it actually does
   - tools:  string[] of tools used (n8n, Zapier, Make, ChatGPT API, ...)
   - impact: the metric ("Saved ~5 hrs/week") — shown big in accent colour
   - steps:  the actual flow, step by step (shown inside the detail view)
   ========================================================================= */
type Automation = {
  name: string;
  does: string;
  tools: string[];
  impact: string;
  steps: string[];
  icon: LucideIcon;
};

const automations: Automation[] = [
  {
    name: 'AI Thumbnail Pipeline',
    does: 'Auto-generates and resizes thumbnail variants from a single source image.',
    tools: ['ChatGPT API', 'Photoshop Actions'],
    impact: 'Faster thumbnail output',
    steps: [
      'Drop a raw source image into a watched folder',
      'AI suggests title text & layout variations',
      'Batch-export resized thumbnails for every platform',
      'Files land in the right project folder automatically',
    ],
    icon: ImageIcon,
  },
  {
    name: 'Content Scheduler',
    does: 'Schedules and cross-posts videos/reels across platforms automatically.',
    tools: ['n8n', 'Google Sheets'],
    impact: 'Auto-posts across platforms',
    steps: [
      'Add a post + caption to a Google Sheet',
      'n8n picks up new rows on a schedule',
      'Content is posted to each connected platform',
      'Status is written back to the sheet',
    ],
    icon: Clock,
  },
  {
    name: 'AI Voiceover Workflow',
    does: 'Turns a script into a finished voiceover track ready for editing.',
    tools: ['ElevenLabs', 'Flow'],
    impact: 'Script → voiceover, instantly',
    steps: [
      'Paste the script into the flow',
      'ElevenLabs generates the voice in the chosen tone',
      'Audio is normalised and trimmed',
      'Final track is dropped into the editing project',
    ],
    icon: Bot,
  },
  {
    name: 'Inquiry Auto-Responder',
    does: 'Replies to contact-form leads instantly and logs them for follow-up.',
    tools: ['n8n', 'Gmail'],
    impact: 'Instant replies to leads',
    steps: [
      'Contact form submission triggers the flow',
      'A personalised reply is sent instantly',
      'Lead details are logged to a sheet/CRM',
      'I get a notification to follow up',
    ],
    icon: Mail,
  },
];

export default function Automation() {
  const [selected, setSelected] = useState<Automation | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

  return (
    <section id="automation" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold flex items-center gap-3">
            <Workflow className="text-neon-cyan" size={36} />
            Automation
          </h2>
          <div className="w-20 h-1 bg-neon-cyan rounded-full shadow-[0_0_10px_rgba(0,238,226,0.5)]" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Workflows I build with n8n to save time and remove manual work.{' '}
            <span className="text-zinc-500">Tap a card to see the flow.</span>
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 w-fit mt-1">
            <img src="/logos/n8n.svg" alt="n8n" className="w-4 h-4" />
            <span className="text-sm text-zinc-300 font-medium">
              Powered mainly by <span className="text-[#EA4B71] font-bold">n8n</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {automations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelected(item)}
                className="group relative text-left bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm hover:border-neon-cyan/40 hover:shadow-[0_0_30px_rgba(0,238,226,0.12)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-zinc-100 mb-2 flex items-center gap-1.5">
                      {item.name}
                      <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-neon-cyan transition-colors" />
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.does}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tools.map((t) => (
                        <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                      <span className="text-neon-cyan font-bold text-sm">{item.impact}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Flow detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] bg-zinc-950/90 backdrop-blur-sm overflow-y-auto"
          >
            <div className="min-h-screen px-4 py-12 md:py-20 flex items-start md:items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ type: 'spring', duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full blur-[80px] opacity-30 bg-neon-cyan pointer-events-none" />

                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-zinc-950/60 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-700/50"
                >
                  <X size={20} />
                </button>

                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-neon-cyan">
                      <selected.icon size={26} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{selected.name}</h2>
                  </div>

                  <p className="text-zinc-300 leading-relaxed mb-6">{selected.does}</p>

                  {/* Flow steps */}
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">The flow</h3>
                  <div className="space-y-3 mb-7">
                    {selected.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        className="flex items-center gap-3"
                      >
                        <span className="w-7 h-7 shrink-0 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-sm text-zinc-300 flex-1">{step}</span>
                        {i < selected.steps.length - 1 && <ArrowRight size={14} className="text-zinc-700 shrink-0" />}
                      </motion.div>
                    ))}
                  </div>

                  {/* Tools + impact */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {selected.tools.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800/70 border border-zinc-700/60 text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="text-neon-cyan font-bold">{selected.impact}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
