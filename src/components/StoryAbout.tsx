import { motion } from 'motion/react';
import { MapPin, Cake, Sparkles, ArrowDown } from 'lucide-react';
import GuideBot from './GuideBot';

/* Opening of the story — who I am, in my own words, with my real photo.
   Sets up the journey timeline that follows. */
export default function StoryAbout() {
  return (
    <section id="about" className="pt-10 pb-8 md:pt-16 md:pb-12 relative overflow-hidden">
      <div className="absolute -top-10 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 items-center">
          {/* photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto md:mx-0 w-full max-w-xs"
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-[2rem] blur-2xl" />
            <div className="relative rounded-[1.6rem] overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-2xl">
              <img
                src="/Picsart_25-08-12_18-04-46-235-1.png"
                alt="Vansh Kashyap"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
              {/* floating name plate */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl bg-zinc-950/70 border border-zinc-700/50 backdrop-blur px-3 py-2">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-sm font-semibold text-white">Vansh Kashyap</span>
                <span className="ml-auto text-[11px] font-mono text-zinc-400">Delhi, IN</span>
              </div>
            </div>
            {/* peeking bot */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -top-5 -right-4 hidden sm:block"
            >
              <div className="animate-float"><GuideBot size={54} /></div>
            </motion.div>
          </motion.div>

          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 text-neon-green mb-4">
              <Sparkles size={16} />
              <span className="text-xs font-mono uppercase tracking-[0.2em]">My story</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              About <span className="text-neon-green" style={{ textShadow: '0 0 22px rgba(0,255,157,0.4)' }}>Me</span>
            </h2>

            {/* quick facts */}
            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"><MapPin size={13} className="text-neon-green" /> New Delhi, India</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"><Cake size={13} className="text-neon-green" /> 16 Jan 2005</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"><Sparkles size={13} className="text-neon-green" /> Tech By Vansh</span>
            </div>

            <p className="text-zinc-300 text-lg leading-relaxed mt-6">
              I'm a <span className="text-white font-semibold">creator and builder</span> from Delhi working where AI, automation and design meet — but none of this came from a fancy college or a course I bought.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              My real school was <span className="text-neon-green/90 font-medium">YouTube</span> and a <span className="text-white font-medium">low-end PC</span>. I did my ITI in Computer Hardware &amp; Networking, took every internship I could, and taught myself AI, automation, web development and troubleshooting — one video, one broken build, one fix at a time.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 text-sm font-mono text-zinc-500">
              <ArrowDown size={15} className="text-neon-green animate-bounce" />
              Follow the road below — here's exactly how I got here.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
