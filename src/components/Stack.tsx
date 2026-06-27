import { motion } from 'motion/react';
import MobileCollapse from './MobileCollapse';

/* =========================================================================
   TOOLS I KNOW — grouped by category. Add/remove tools freely.
   logo = path in /public/logos. (Adobe / MS Office / VS Code icons are custom
   app-icon SVGs since their official logos aren't freely licensable.)
   ========================================================================= */
type Tool = { name: string; logo: string };

const categories: { title: string; bar: string; tools: Tool[] }[] = [
  {
    title: 'AI & Automation',
    bar: 'bg-neon-green',
    tools: [
      { name: 'ChatGPT', logo: '/logos/chatgpt.svg' },
      { name: 'Claude', logo: '/logos/claude.svg' },
      { name: 'Gemini', logo: '/logos/gemini.svg' },
      { name: 'DeepSeek', logo: '/logos/deepseek.svg' },
      { name: 'ElevenLabs', logo: '/logos/elevenlabs.svg' },
      { name: 'n8n', logo: '/logos/n8n.svg' },
    ],
  },
  {
    title: 'Design & Video',
    bar: 'bg-purple-400',
    tools: [
      { name: 'Photoshop', logo: '/logos/photoshop.svg' },
      { name: 'After Effects', logo: '/logos/aftereffects.svg' },
      { name: 'Premiere Pro', logo: '/logos/premierepro.svg' },
      { name: 'DaVinci Resolve', logo: '/logos/davinciresolve.svg' },
      { name: 'Figma', logo: '/logos/figma.svg' },
    ],
  },
  {
    title: 'Content Creation',
    bar: 'bg-rose-400',
    tools: [
      { name: 'YouTube Studio', logo: '/logos/youtubestudio.svg' },
      { name: 'YT Create', logo: '/logos/ytcreate.svg' },
      { name: 'Edits', logo: '/logos/edits.svg' },
      { name: 'OBS', logo: '/logos/obsstudio.svg' },
    ],
  },
  {
    title: 'Development',
    bar: 'bg-neon-blue',
    tools: [
      { name: 'VS Code', logo: '/logos/vscode.svg' },
      { name: 'React', logo: '/logos/react.svg' },
      { name: 'JavaScript', logo: '/logos/javascript.svg' },
      { name: 'TypeScript', logo: '/logos/typescript.svg' },
      { name: 'HTML5', logo: '/logos/html5.svg' },
      { name: 'CSS', logo: '/logos/css.svg' },
      { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg' },
      { name: 'Node.js', logo: '/logos/nodedotjs.svg' },
      { name: 'Vite', logo: '/logos/vite.svg' },
      { name: 'Git', logo: '/logos/git.svg' },
      { name: 'GitHub', logo: '/logos/github.svg' },
      { name: 'Firebase', logo: '/logos/firebase.svg' },
      { name: 'Vercel', logo: '/logos/vercel.svg' },
    ],
  },
  {
    title: 'Office & Productivity',
    bar: 'bg-amber-400',
    tools: [
      { name: 'Excel', logo: '/logos/excel.svg' },
      { name: 'PowerPoint', logo: '/logos/powerpoint.svg' },
      { name: 'Word', logo: '/logos/word.svg' },
      { name: 'Google Sheets', logo: '/logos/googlesheets.svg' },
      { name: 'Notion', logo: '/logos/notion.svg' },
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-blue/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Tools I <span className="text-neon-blue">Know</span>
          </h2>
          <div className="w-20 h-1 bg-neon-blue rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Tools and tech I have hands-on knowledge of — grouped by what I use them for.
          </p>
        </motion.div>

        <MobileCollapse maxHeight={520}>
        <div className="flex flex-col gap-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.05 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-1.5 h-6 rounded-full ${cat.bar}`} />
                <h3 className="text-lg md:text-xl font-display font-bold text-zinc-100">{cat.title}</h3>
                <span className="text-xs font-mono text-zinc-600">{cat.tools.length}</span>
                <div className="flex-1 h-px bg-zinc-800/80" />
              </div>

              {/* Tools grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-3 gap-y-6">
                {cat.tools.map((tool, ti) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(ti, 10) * 0.03 }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col items-center gap-2.5"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-lg ring-1 ring-zinc-200/10 transition-transform duration-300 group-hover:scale-110">
                      <img src={tool.logo} alt={tool.name} loading="lazy" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-zinc-400 text-center leading-tight group-hover:text-zinc-200 transition-colors">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        </MobileCollapse>
      </div>
    </section>
  );
}
