import { motion } from 'motion/react';
import { Palette } from 'lucide-react';

/* =========================================================================
   CREATIVE TOOLKIT — the software I design, edit and create content with.
   Logos live in /public/logos.
   ========================================================================= */
type Tool = { name: string; role: string; logo: string; cat: 'Design' | 'Video' | 'Content' };

const tools: Tool[] = [
  { name: 'Photoshop', role: 'Graphics & thumbnails', logo: '/logos/photoshop.svg', cat: 'Design' },
  { name: 'Figma', role: 'Layouts & UI design', logo: '/logos/figma.svg', cat: 'Design' },
  { name: 'Premiere Pro', role: 'Video editing', logo: '/logos/premierepro.svg', cat: 'Video' },
  { name: 'After Effects', role: 'Motion graphics', logo: '/logos/aftereffects.svg', cat: 'Video' },
  { name: 'DaVinci Resolve', role: 'Color & editing', logo: '/logos/davinciresolve.svg', cat: 'Video' },
  { name: 'OBS Studio', role: 'Screen recording', logo: '/logos/obsstudio.svg', cat: 'Content' },
  { name: 'YouTube Studio', role: 'Channel management', logo: '/logos/youtubestudio.svg', cat: 'Content' },
  { name: 'Edits', role: 'Mobile reels editing', logo: '/logos/edits.svg', cat: 'Content' },
];

const catColor: Record<Tool['cat'], string> = {
  Design: 'text-neon-cyan',
  Video: 'text-purple-400',
  Content: 'text-red-400',
};

export default function CreativeToolkit() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 text-neon-cyan">
            <Palette size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Creative Toolkit</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            The Software I <span className="text-neon-cyan">Create With</span>
          </h2>
          <div className="w-20 h-1 bg-neon-cyan rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            My day-to-day design, video and content tools — from thumbnails to finished reels.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="group relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center p-2 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <img src={t.logo} alt={`${t.name} logo`} loading="lazy" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-zinc-100 truncate">{t.name}</h3>
                  <p className="text-xs text-zinc-500 truncate">{t.role}</p>
                </div>
              </div>
              <span className={`inline-block mt-4 text-[10px] font-mono uppercase tracking-wider ${catColor[t.cat]}`}>{t.cat}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
