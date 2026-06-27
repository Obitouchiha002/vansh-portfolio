import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Check, Sparkles, Zap } from 'lucide-react';
import { useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';

/* Shared AI tool type — data lives in AiTools.tsx */
export interface AiTool {
  name: string;
  useCase: string;
  proficiency: string;
  dailyDriver: boolean;
  logo?: string;
  icon: LucideIcon;
  accent: string;       // text colour class, e.g. "text-emerald-400"
  ring: string;         // hover border class
  glow: string;         // "r,g,b" for glow shadow
  url: string;          // official site
  level: string;        // e.g. "Advanced"
  about: string;        // longer description
  highlights: string[]; // "what I do with it"
  features: { label: string; items: string[] }[]; // grouped latest features
}

export default function AiToolModal({
  tool,
  isOpen,
  onClose,
}: {
  tool: AiTool | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && tool && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] bg-zinc-950/90 backdrop-blur-sm overflow-y-auto"
        >
          <div className="min-h-screen px-4 py-10 md:py-20 flex items-start md:items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{ ['--glow' as string]: tool.glow }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Accent glow header */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full blur-[80px] opacity-40 bg-[rgb(var(--glow))] pointer-events-none" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-zinc-950/60 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-700/50"
              >
                <X size={20} />
              </button>

              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white flex items-center justify-center p-3 shadow-lg">
                    {tool.logo ? (
                      <img src={tool.logo} alt={`${tool.name} logo`} className="w-full h-full object-contain" />
                    ) : (
                      <tool.icon size={30} className="text-zinc-900" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{tool.name}</h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 ${tool.accent}`}>
                        <Sparkles size={11} /> {tool.level}
                      </span>
                      {tool.dailyDriver && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green">
                          <Zap size={11} /> Daily Driver
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* About */}
                <p className="text-zinc-300 leading-relaxed mb-7">{tool.about}</p>

                {/* Highlights */}
                <div className="mb-7">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3">What I do with it</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {tool.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="flex items-start gap-2.5 bg-zinc-950/50 border border-zinc-800/60 rounded-xl px-3.5 py-2.5"
                      >
                        <Check size={16} className={`${tool.accent} shrink-0 mt-0.5`} />
                        <span className="text-sm text-zinc-300">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Feature groups */}
                <div className="space-y-5 mb-8">
                  {tool.features.map((group, gi) => (
                    <div key={gi}>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3">{group.label}</h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item, ii) => (
                          <motion.span
                            key={ii}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + ii * 0.03 }}
                            className="text-xs md:text-sm px-3 py-1.5 rounded-lg bg-zinc-800/70 border border-zinc-700/60 text-zinc-300 hover:border-[rgb(var(--glow))]/50 transition-colors"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors"
                >
                  Open {tool.name} <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
