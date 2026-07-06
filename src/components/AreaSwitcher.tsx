import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { FIELDS } from '../fields';

/* Shown near the top of the full portfolio (#/all) so visitors can jump
   straight into a focused field page instead of only via the homepage. */
export default function AreaSwitcher() {
  return (
    <section className="py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 md:p-7"
        >
          <div className="flex items-center justify-center gap-2 mb-5 text-zinc-400">
            <Compass size={16} className="text-neon-green" />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Or jump straight to an area</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center -mx-6 px-6 md:mx-0 md:px-0">
            {FIELDS.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.a
                  key={f.key}
                  href={f.path}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  style={{ ['--r' as string]: f.rgb }}
                  className="group shrink-0 inline-flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-2xl bg-zinc-950/60 border border-zinc-800 transition-all hover:border-[rgb(var(--r))]/50 hover:shadow-[0_0_24px_-8px_rgb(var(--r))]"
                >
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: `rgba(${f.rgb},0.12)`, border: `1px solid rgba(${f.rgb},0.35)`, color: `rgb(${f.rgb})` }}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-semibold text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
                    {f.title}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
