import { motion } from 'motion/react';
import { PenTool, Video, Code, Workflow, Sparkles, Share2, ArrowRight, MessageCircle } from 'lucide-react';

/* =========================================================================
   SERVICES DATA — edit freely. These are the things you offer to clients.
   ========================================================================= */
const services = [
  {
    title: 'Graphic Design',
    description: 'Thumbnails, posters, logos and social media creatives that grab attention.',
    points: ['YouTube thumbnails', 'Posters & banners', 'Logo design'],
    icon: PenTool,
    accent: 'text-neon-green',
    glow: '0,255,157',
  },
  {
    title: 'Video Editing',
    description: 'Clean, high-energy edits for YouTube, Shorts and Reels — synced and graded.',
    points: ['Long-form & Shorts', 'Gaming montages', 'Cinematic edits'],
    icon: Video,
    accent: 'text-neon-blue',
    glow: '0,229,255',
  },
  {
    title: 'Web & App Development',
    description: 'Fast, responsive websites and apps built with React and modern tooling.',
    points: ['Portfolio & landing pages', 'Web apps', 'Responsive UI'],
    icon: Code,
    accent: 'text-purple-400',
    glow: '192,132,252',
  },
  {
    title: 'Automation Setup',
    description: 'Workflows that remove repetitive manual work and save you hours every week.',
    points: ['Content pipelines', 'Auto-responders', 'AI flows'],
    icon: Workflow,
    accent: 'text-neon-cyan',
    glow: '0,238,226',
  },
  {
    title: 'AI Content Creation',
    description: 'AI-generated graphics, voiceovers and videos produced fast, at scale.',
    points: ['AI images & art', 'AI voiceovers', 'AI avatar videos'],
    icon: Sparkles,
    accent: 'text-orange-400',
    glow: '251,146,60',
  },
  {
    title: 'Social Media Management',
    description: 'Plan, post and grow content across LinkedIn, X, YouTube and Instagram.',
    points: ['Content strategy & calendar', 'Posting across platforms', 'Growth & engagement'],
    icon: Share2,
    accent: 'text-sky-400',
    glow: '56,189,248',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            What I Can <span className="text-neon-green">Do For You</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Services I offer — from design and editing to building apps and automations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                style={{ ['--glow' as string]: service.glow }}
                className="group relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-[rgb(var(--glow))]/40 hover:shadow-[0_0_30px_rgba(var(--glow),0.15)]"
              >
                <div className={`w-14 h-14 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${service.accent}`}>
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-display font-bold text-zinc-100 mb-2">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{service.description}</p>

                <ul className="flex flex-col gap-2">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className={`w-1.5 h-1.5 rounded-full ${service.accent.replace('text-', 'bg-')}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}

          {/* Hire Me CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: services.length * 0.08 }}
            className="relative bg-gradient-to-br from-neon-green/10 to-purple-500/10 border border-neon-green/30 rounded-2xl p-6 flex flex-col justify-center items-start gap-4"
          >
            <h3 className="text-2xl font-display font-bold text-white">Have a project in mind?</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Let's build something together. Tell me what you need and I'll get back to you fast.
            </p>
            <div className="flex flex-wrap gap-3 mt-1">
              <a
                href="https://wa.me/918800628376"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neon-green text-zinc-950 font-bold text-sm hover:bg-neon-green/90 transition-colors box-glow-hover"
              >
                <MessageCircle size={16} /> Hire Me
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-zinc-100 font-semibold text-sm border border-zinc-700 hover:bg-zinc-800 transition-colors"
              >
                Contact <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
