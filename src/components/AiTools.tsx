import { motion } from 'motion/react';
import { useState } from 'react';
import { Workflow, Video, Zap, ArrowUpRight } from 'lucide-react';
import AiToolModal, { AiTool } from './AiToolModal';

/* =========================================================================
   AI TOOLS DATA — fully editable. Click a card => opens a detail dashboard.
   - logo:       path in /public/logos (omit to fall back to `icon`)
   - level:      shown as a badge ("Advanced", "Pro", ...)
   - about:      longer paragraph for the modal
   - highlights: "what I do with it" list
   - features:   grouped latest features (Projects, GPTs, Skills, etc.)
   ========================================================================= */
const aiTools: AiTool[] = [
  {
    name: 'ChatGPT',
    useCase: 'Ideation, content writing & coding help.',
    proficiency: 'Daily Driver',
    dailyDriver: true,
    logo: '/logos/chatgpt.svg',
    icon: Workflow,
    accent: 'text-emerald-400',
    ring: 'group-hover:border-emerald-400/50',
    glow: '16,185,129',
    url: 'https://chat.openai.com',
    level: 'Advanced',
    about:
      "My everyday assistant for ideation, writing and coding. I use it end-to-end — from brainstorming video ideas to debugging real app code — and I build custom workflows on top of it.",
    highlights: [
      'Write & refine YouTube scripts, titles and SEO descriptions',
      'Debug and write code across React, JS and more',
      'Brainstorm hooks, ideas and content angles fast',
      'Turn rough notes into clean, structured copy',
    ],
    features: [
      {
        label: 'Latest features I use',
        items: ['Projects', 'Custom GPTs', 'Canvas', 'Custom Instructions', 'Memory', 'Advanced Voice', 'Vision / Image input'],
      },
      { label: 'What I build with it', items: ['Content scripts', 'App logic & fixes', 'Automation prompts', 'SEO copy'] },
    ],
  },
  {
    name: 'Claude',
    useCase: 'Long-form writing, analysis & automation.',
    proficiency: 'Daily Driver',
    dailyDriver: true,
    logo: '/logos/claude.svg',
    icon: Workflow,
    accent: 'text-orange-400',
    ring: 'group-hover:border-orange-400/50',
    glow: '251,146,60',
    url: 'https://claude.ai',
    level: 'Advanced',
    about:
      'My go-to for long-form writing, deep analysis and building automations. I lean on its large context and Artifacts to design, draft and ship faster.',
    highlights: [
      'Write and edit long-form, structured content',
      'Analyse large files, docs and codebases',
      'Build and iterate on apps with live previews',
      'Plan and wire up automations',
    ],
    features: [
      {
        label: 'Latest features I use',
        items: ['Projects', 'Artifacts', 'Claude Skills', 'MCP integrations', 'Long-context analysis', 'Code execution'],
      },
      { label: 'What I build with it', items: ['Web apps', 'Long-form writing', 'Workflow automations', 'Research notes'] },
    ],
  },
  {
    name: 'n8n',
    useCase: 'Automation & workflow building.',
    proficiency: 'Daily Driver',
    dailyDriver: true,
    logo: '/logos/n8n.svg',
    icon: Workflow,
    accent: 'text-rose-400',
    ring: 'group-hover:border-rose-400/50',
    glow: '234,75,113',
    url: 'https://n8n.io',
    level: 'Advanced',
    about:
      'My main automation platform. I build multi-step workflows that connect apps, APIs and AI — content pipelines, auto-responders, scheduled jobs — that run on their own without manual work.',
    highlights: [
      'Build multi-step automation workflows',
      'Connect 400+ apps & APIs',
      'Trigger flows with webhooks & schedules',
      'Plug AI into automations end-to-end',
    ],
    features: [
      {
        label: 'How I use it',
        items: ['Workflow builder', 'Webhooks & triggers', 'Scheduled jobs', 'API integrations', 'AI agent nodes', 'Self-hosted'],
      },
      { label: 'What I automate', items: ['Content posting', 'Lead capture & replies', 'Data sync', 'Notifications'] },
    ],
  },
  {
    name: 'Flow',
    useCase: 'Workflow & AI flow building.',
    proficiency: 'Advanced',
    dailyDriver: false,
    icon: Workflow,
    accent: 'text-neon-cyan',
    ring: 'group-hover:border-neon-cyan/50',
    glow: '0,238,226',
    url: 'https://www.krea.ai/',
    level: 'Advanced',
    about:
      'I use Flow to design AI-driven workflows — chaining prompts, tools and steps into repeatable pipelines that do the heavy lifting automatically.',
    highlights: [
      'Build multi-step AI flows visually',
      'Connect tools and APIs into one pipeline',
      'Automate repetitive creative tasks',
    ],
    features: [
      { label: 'How I use it', items: ['Node-based flows', 'Prompt chaining', 'Tool integrations', 'Batch processing'] },
    ],
  },
  {
    name: 'Gemini',
    useCase: 'Research & multimodal exploration.',
    proficiency: 'Advanced',
    dailyDriver: false,
    logo: '/logos/gemini.svg',
    icon: Workflow,
    accent: 'text-blue-400',
    ring: 'group-hover:border-blue-400/50',
    glow: '96,165,250',
    url: 'https://gemini.google.com',
    level: 'Advanced',
    about:
      "Google's multimodal model I use for research, image understanding and quick reasoning across text, images and more — tightly tied into Google tools.",
    highlights: [
      'Run deep research across many sources',
      'Work with images, screenshots and documents',
      'Get fast answers tied into Google Workspace',
    ],
    features: [
      { label: 'Latest features I use', items: ['Deep Research', 'Gems', 'Canvas', 'Image generation', 'Multimodal input'] },
    ],
  },
  {
    name: 'DeepSeek',
    useCase: 'Coding & deep reasoning tasks.',
    proficiency: 'Advanced',
    dailyDriver: false,
    logo: '/logos/deepseek.svg',
    icon: Workflow,
    accent: 'text-indigo-400',
    ring: 'group-hover:border-indigo-400/50',
    glow: '129,140,248',
    url: 'https://chat.deepseek.com',
    level: 'Advanced',
    about:
      'A strong open reasoning model I use for tough coding and logic problems where step-by-step thinking matters.',
    highlights: ['Solve complex coding problems', 'Step-by-step reasoning on hard tasks', 'Free, capable alternative for heavy work'],
    features: [{ label: 'How I use it', items: ['DeepThink (R1) reasoning', 'Code generation', 'Debugging', 'Logic problems'] }],
  },
  {
    name: 'ElevenLabs',
    useCase: 'AI voiceovers for videos & reels.',
    proficiency: 'Creator Tool',
    dailyDriver: false,
    logo: '/logos/elevenlabs.svg',
    icon: Video,
    accent: 'text-violet-400',
    ring: 'group-hover:border-violet-400/50',
    glow: '167,139,250',
    url: 'https://elevenlabs.io',
    level: 'Advanced',
    about:
      'I generate natural AI voiceovers for my videos and reels — fast, high quality, and in multiple voices and languages.',
    highlights: ['Create realistic voiceovers from scripts', 'Multiple voices, tones and languages', 'Cut recording & re-take time massively'],
    features: [{ label: 'How I use it', items: ['Text-to-Speech', 'Voice library', 'Multilingual dubbing', 'Voice cloning'] }],
  },
  {
    name: 'HeyGen',
    useCase: 'AI avatar / talking-head videos.',
    proficiency: 'Creator Tool',
    dailyDriver: false,
    icon: Video,
    accent: 'text-pink-400',
    ring: 'group-hover:border-pink-400/50',
    glow: '244,114,182',
    url: 'https://www.heygen.com',
    level: 'Advanced',
    about:
      'I create AI avatar and talking-head videos with HeyGen — turning a script into a presenter-style video without filming.',
    highlights: ['Generate talking-head videos from text', 'AI avatars & presenters', 'Translate videos into other languages'],
    features: [{ label: 'How I use it', items: ['AI avatars', 'Script-to-video', 'Video translation', 'Faceless content'] }],
  },
];

export default function AiTools() {
  const [selected, setSelected] = useState<AiTool | null>(null);

  return (
    <section id="ai-tools" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            AI Tools I <span className="text-neon-green">Work With</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Tools I use daily to design, build and create faster.{' '}
            <span className="text-zinc-500">Tap any tool to see how I use it.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(tool)}
                style={{ ['--glow' as string]: tool.glow }}
                className={`group relative text-left bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${tool.ring} hover:shadow-[0_0_30px_rgba(var(--glow),0.18)]`}
              >
                {/* Daily Driver badge */}
                {tool.dailyDriver && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-[10px] font-bold uppercase tracking-wider">
                    <Zap size={11} />
                    Daily Driver
                  </div>
                )}

                {/* Logo / icon tile */}
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2.5 mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {tool.logo ? (
                    <img src={tool.logo} alt={`${tool.name} logo`} loading="lazy" className="w-full h-full object-contain" />
                  ) : (
                    <Icon size={26} className="text-zinc-900" />
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-zinc-100 mb-2 flex items-center gap-1.5">
                  {tool.name}
                  <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">{tool.useCase}</p>

                <span className={`inline-block text-xs font-mono px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 ${tool.accent}`}>
                  {tool.proficiency}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AiToolModal tool={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}
