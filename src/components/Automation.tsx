import { motion } from 'motion/react';
import { Workflow, Bot, Image as ImageIcon, Mail, Clock, Zap, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* =========================================================================
   AUTOMATION — real workflows I build, shown as visual node-flows (n8n style).
   For each item:
   - does:   1 line on what it actually does
   - tools:  string[] of tools used (n8n, ChatGPT API, ...)
   - impact: the outcome, shown in accent colour
   - steps:  the actual flow, step by step (rendered as a node chain)
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

/* Vertical node-chain that visualises a workflow like an n8n canvas. */
function FlowChain({ steps }: { steps: string[] }) {
  return (
    <div className="mt-5">
      {steps.map((step, i) => {
        const isTrigger = i === 0;
        const isOutput = i === steps.length - 1;
        const tag = isTrigger ? 'Trigger' : isOutput ? 'Output' : `Step ${i}`;
        return (
          <div key={i} className="relative flex gap-3.5 pb-4 last:pb-0">
            {/* connecting line */}
            {!isOutput && (
              <span className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan/50 to-zinc-700/60" />
            )}
            {/* node */}
            <span
              className={`relative z-10 w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border ${
                isTrigger
                  ? 'bg-neon-cyan/15 border-neon-cyan/50 text-neon-cyan'
                  : isOutput
                  ? 'bg-neon-green/15 border-neon-green/50 text-neon-green'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300'
              }`}
            >
              {isTrigger ? <Zap size={14} /> : isOutput ? <CheckCircle2 size={15} /> : <span className="text-xs font-bold">{i}</span>}
            </span>
            <div className="flex-1 pt-0.5">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${
                  isTrigger ? 'text-neon-cyan' : isOutput ? 'text-neon-green' : 'text-zinc-500'
                }`}
              >
                {tag}
              </span>
              <p className="text-sm text-zinc-300 leading-snug">{step}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Automation() {
  return (
    <section id="automation" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 text-neon-cyan">
            <Workflow size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Workflow Automation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Automations That <span className="text-neon-cyan">Run Themselves</span>
          </h2>
          <div className="w-20 h-1 bg-neon-cyan rounded-full shadow-[0_0_10px_rgba(0,238,226,0.5)]" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Multi-step workflows I build to remove manual work — connecting apps, APIs and AI so they run on their own.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 w-fit mt-1">
            <img src="/logos/n8n.svg" alt="n8n" className="w-4 h-4" />
            <span className="text-sm text-zinc-300 font-medium">
              Powered mainly by <span className="text-[#EA4B71] font-bold">n8n</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-7">
          {automations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-gradient-to-b from-zinc-900/70 to-zinc-950 border border-zinc-800 p-6 md:p-7 backdrop-blur-sm hover:border-neon-cyan/40 hover:shadow-[0_0_40px_-10px_rgba(0,238,226,0.25)] transition-all duration-300"
              >
                {/* header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-display font-bold text-zinc-100">{item.name}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mt-1">{item.does}</p>
                  </div>
                </div>

                {/* impact pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mt-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="text-neon-cyan font-bold text-sm">{item.impact}</span>
                </div>

                {/* the flow */}
                <FlowChain steps={item.steps} />

                {/* tools */}
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-zinc-800/70">
                  {item.tools.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
