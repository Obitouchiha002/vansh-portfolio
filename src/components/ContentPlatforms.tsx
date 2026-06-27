import { motion } from 'motion/react';
import { Linkedin, Youtube, Instagram, ArrowUpRight } from 'lucide-react';

/* =========================================================================
   CONTENT PLATFORMS — where Vansh creates & manages content.
   NOTE: update the X (Twitter) handle/url below with your real handle.
   ========================================================================= */
const platforms = [
  {
    name: 'LinkedIn',
    handle: 'Vansh Kashyap',
    desc: 'Professional posts & personal brand',
    url: 'https://www.linkedin.com/in/vansh-kashyap-32a46a2a6',
    icon: Linkedin,
    color: '#0A66C2',
  },
  {
    name: 'YouTube',
    handle: 'Tech By Vansh',
    desc: 'Tech videos, tutorials & shorts',
    url: 'https://youtube.com/@techbyvansh',
    icon: Youtube,
    color: '#FF0000',
  },
  {
    name: 'Instagram',
    handle: '@vanshkashyap70',
    desc: 'Reels, posters & carousels',
    url: 'https://instagram.com/vanshkashyap70',
    icon: Instagram,
    color: '#E1306C',
  },
];

export default function ContentPlatforms() {
  return (
    <section id="platforms" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Where I <span className="text-neon-green">Create</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            As a social media creator, I plan and post content across these platforms — building audiences and brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                style={{ ['--brand' as string]: p.color }}
                className="group relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--brand)] hover:shadow-[0_0_30px_-8px_var(--brand)]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ color: p.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-zinc-200 transition-colors" />
                </div>
                <h3 className="text-lg font-display font-bold text-zinc-100">{p.name}</h3>
                <p className="text-sm font-medium mt-0.5" style={{ color: p.color }}>{p.handle}</p>
                <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{p.desc}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
