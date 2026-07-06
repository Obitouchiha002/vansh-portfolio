import { motion } from 'motion/react';
import { ArrowLeft, Mail, Check } from 'lucide-react';
import type { Field } from '../fields';

/* Hero band shown at the top of each focused field page. */
export default function FieldHero({ field }: { field: Field }) {
  const Icon = field.icon;
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full blur-[130px] -z-10 pointer-events-none"
        style={{ background: `rgba(${field.rgb},0.14)` }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <a href="#/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8">
          <ArrowLeft size={16} /> All areas
        </a>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ background: `rgba(${field.rgb},0.12)`, border: `1px solid rgba(${field.rgb},0.4)`, color: `rgb(${field.rgb})` }}
          >
            <Icon size={32} />
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-[1.05] tracking-tight max-w-3xl">
            {field.title}
          </h1>
          <p className={`text-xl md:text-2xl font-medium mt-3 ${field.accent}`}>{field.tagline}</p>
          <p className="text-zinc-400 max-w-2xl mt-5 text-lg leading-relaxed">{field.blurb}</p>

          {/* Highlight chips */}
          <div className="flex flex-wrap gap-3 mt-7">
            {field.bullets.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/70 border border-zinc-800 text-sm font-medium text-zinc-200"
              >
                <Check size={15} className={field.accent} /> {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-zinc-950 transition-transform hover:-translate-y-0.5"
              style={{ background: `rgb(${field.rgb})` }}
            >
              <Mail size={18} /> Let's work together
            </a>
            <a
              href="#/all"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-zinc-100 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
            >
              See full portfolio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
