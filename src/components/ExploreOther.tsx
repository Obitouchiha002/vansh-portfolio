import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { FIELDS, FieldKey } from '../fields';

/* Bottom strip on each field page linking to the other areas. */
export default function ExploreOther({ current }: { current: FieldKey }) {
  const others = FIELDS.filter((f) => f.key !== current);
  return (
    <section className="py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-display font-bold text-zinc-200 mb-6">Explore other areas</h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.a
                key={f.key}
                href={f.path}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                style={{ ['--r' as string]: f.rgb }}
                className="group flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 transition-colors hover:border-[rgb(var(--r))]/50"
              >
                <div
                  className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${f.rgb},0.12)`, color: `rgb(${f.rgb})` }}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-100 truncate">{f.title}</p>
                  <p className="text-xs text-zinc-500 truncate">{f.tagline}</p>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-zinc-600 group-hover:text-zinc-200 transition-colors" />
              </motion.a>
            );
          })}
        </div>

        <a href="#/all" className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-zinc-400 hover:text-neon-green transition-colors">
          Or see the full portfolio <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
