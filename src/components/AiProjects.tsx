import { motion } from 'motion/react';
import { Sparkles, ExternalLink, AppWindow, Wrench } from 'lucide-react';

/* =========================================================================
   BUILT WITH AI — a branching "tree" of the apps I've shipped using AI.
   Each row: a project card on one side of the trunk, and a "how I built it"
   detail (approach + tools) on the other side.
   ========================================================================= */
type Node = {
  name: string;
  kind: 'App' | 'Tool';
  tagline: string;
  image: string;
  pos: 'top' | 'center';
  url: string;
  rgb: string;
  build: string;
  highlight: string[];
  tools: string[];
};

/* Renders the build note, emphasising the key phrases with a bold accent glow. */
function renderBuild(text: string, phrases: string[], rgb: string) {
  if (!phrases.length) return text;
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(re).map((part, i) =>
    phrases.some((p) => p.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="font-bold text-zinc-100" style={{ textShadow: `0 0 12px rgba(${rgb},0.7)` }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

const nodes: Node[] = [
  {
    name: 'Vedic Astra',
    kind: 'App',
    tagline: 'AI-powered Vedic astrology charts & interpretations.',
    image: '/vedicastra-thumbnail.svg',
    pos: 'center',
    url: 'https://vedicastra.vercel.app/',
    rgb: '234,140,42',
    build: 'Built end-to-end with AI pair-programming — chart UI, Swiss-Ephemeris calculations and AI-written interpretations for career, wealth and relationships.',
    highlight: ['AI pair-programming', 'Swiss-Ephemeris', 'AI-written interpretations'],
    tools: ['React', 'Tailwind CSS', 'Astro Engine', 'Claude', 'ChatGPT'],
  },
  {
    name: 'Creator Tracker',
    kind: 'App',
    tagline: 'AI YouTube tracker that finds viral ideas & keywords.',
    image: '/creatortracker-thumbnail.svg',
    pos: 'center',
    url: 'https://tracker.grivaacapital.com/',
    rgb: '239,68,68',
    build: 'Designed and coded with AI assistance — YouTube API scanning plus AI prompts that compare viral vs flop and generate fresh video ideas.',
    highlight: ['AI assistance', 'YouTube API', 'AI prompts', 'fresh video ideas'],
    tools: ['React', 'YouTube API', 'ChatGPT API', 'Tailwind CSS'],
  },
  {
    name: 'VanshLink',
    kind: 'App',
    tagline: 'Real-time private chat app.',
    image: '/vanshlink-thumbnail.svg',
    pos: 'center',
    url: 'https://vanshlink.vercel.app/',
    rgb: '0,229,255',
    build: 'Real-time chat wired with Firebase Auth + Firestore; the responsive UI was shaped fast with AI help.',
    highlight: ['Real-time chat', 'Firebase Auth', 'AI help'],
    tools: ['React', 'Firebase', 'Tailwind CSS', 'ChatGPT'],
  },
  {
    name: 'Aura Player',
    kind: 'App',
    tagline: 'Offline + online media player in one hub.',
    image: '/auraplayer-thumbnail.png',
    pos: 'center',
    url: 'https://aura-player-nine.vercel.app/',
    rgb: '251,146,60',
    build: 'A unified offline + online media player built with AI-assisted React and the Web Audio API.',
    highlight: ['offline + online', 'AI-assisted React', 'Web Audio API'],
    tools: ['React', 'Web Audio API', 'Tailwind CSS', 'ChatGPT'],
  },
  {
    name: 'vthumb',
    kind: 'Tool',
    tagline: 'Instant YouTube thumbnail downloader.',
    image: '/vthumb-thumbnail.svg',
    pos: 'center',
    url: 'https://vthumb.vercel.app/',
    rgb: '255,60,60',
    build: 'A quick, single-purpose thumbnail grabber — scoped, built and shipped in a few hours with AI.',
    highlight: ['single-purpose', 'a few hours', 'AI'],
    tools: ['React', 'YouTube API', 'Tailwind CSS'],
  },
  {
    name: 'Aura Shakti',
    kind: 'App',
    tagline: 'Interactive aura quiz with shareable results.',
    image: '/aurashakti-thumbnail.svg',
    pos: 'center',
    url: 'https://aurashakti.vercel.app/',
    rgb: '192,132,252',
    build: 'A deeply interactive aura quiz with smooth animations, built with AI and Framer Motion.',
    highlight: ['interactive aura quiz', 'AI', 'Framer Motion'],
    tools: ['React', 'Framer Motion', 'Tailwind CSS', 'ChatGPT'],
  },
];

function ProjectNode({ node }: { node: Node }) {
  const KindIcon = node.kind === 'App' ? AppWindow : Wrench;
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800 transition-all duration-300 hover:-translate-y-1"
      style={{ ['--r' as string]: node.rgb }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: `0 0 40px -8px rgba(${node.rgb},0.5)` }} />
      {/* preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <img
          src={node.image}
          alt={node.name}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover ${node.pos === 'top' ? 'object-top' : 'object-center'} transition-transform duration-700 group-hover:scale-105`}
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md" style={{ background: `rgba(${node.rgb},0.18)`, border: `1px solid rgba(${node.rgb},0.4)`, color: `rgb(${node.rgb})` }}>
          <KindIcon size={12} /> {node.kind}
        </span>
      </div>
      {/* body */}
      <div className="p-5">
        <h3 className="text-lg font-display font-bold text-zinc-100">{node.name}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mt-1.5 mb-4">{node.tagline}</p>
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: `rgb(${node.rgb})` }}
        >
          Visit <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

function Detail({ node, alignRight }: { node: Node; alignRight: boolean }) {
  return (
    <div className={alignRight ? 'md:text-right' : ''}>
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">How I built it</p>
      <p className={`text-zinc-400 text-sm leading-relaxed ${alignRight ? 'md:ml-auto' : ''} max-w-sm`}>{renderBuild(node.build, node.highlight, node.rgb)}</p>
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mt-5 mb-2">Tools used</p>
      <div className={`flex flex-wrap gap-2 ${alignRight ? 'md:justify-end' : ''}`}>
        {node.tools.map((t) => (
          <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AiProjects() {
  return (
    <section id="ai-projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-neon-green/[0.04] rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-4 text-center items-center"
        >
          <div className="inline-flex items-center gap-2 text-neon-green">
            <Sparkles size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Built with AI</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Projects I've Shipped <span className="text-neon-green">with AI</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Real apps I designed and built using AI tools — each one from idea to live product.
          </p>
        </motion.div>

        {/* tree */}
        <div className="relative mt-20">
          {/* trunk */}
          <div className="absolute top-0 bottom-0 left-[22px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-neon-green via-neon-cyan to-purple-500/30" />

          {/* root */}
          <div className="relative flex justify-start md:justify-center mb-16">
            <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 ml-[-6px] md:ml-0 rounded-full bg-zinc-900 border border-neon-green/40 text-neon-green shadow-[0_0_30px_-6px_rgba(0,255,157,0.6)]">
              <Sparkles size={16} />
              <span className="font-display font-bold text-sm">AI</span>
            </div>
          </div>

          <div className="flex flex-col gap-14 md:gap-12">
            {nodes.map((node, i) => {
              const left = i % 2 === 0; // card on left of trunk
              return (
                <motion.div
                  key={node.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* node dot on the trunk */}
                  <span
                    className="absolute left-[22px] md:left-1/2 -translate-x-1/2 top-7 z-10 w-4 h-4 rounded-full border-2 bg-zinc-950"
                    style={{ borderColor: `rgb(${node.rgb})`, boxShadow: `0 0 14px rgba(${node.rgb},0.7)` }}
                  />
                  {/* horizontal connector to the card side (desktop) */}
                  <span
                    className={`hidden md:block absolute top-[34px] h-[2px] w-12 ${left ? 'right-1/2 mr-2' : 'left-1/2 ml-2'}`}
                    style={{ background: `linear-gradient(${left ? 'to left' : 'to right'}, rgba(${node.rgb},0.7), transparent)` }}
                  />
                  {/* mirrored connector to the detail side (desktop) */}
                  <span
                    className={`hidden md:block absolute top-[34px] h-[2px] w-10 ${left ? 'left-1/2 ml-2' : 'right-1/2 mr-2'}`}
                    style={{ background: `linear-gradient(${left ? 'to right' : 'to left'}, rgba(${node.rgb},0.45), transparent)` }}
                  />

                  <div className="md:grid md:grid-cols-2 md:gap-x-16 md:items-center pl-14 md:pl-0">
                    {/* card cell (DOM first → shows first on mobile) */}
                    <div className={left ? '' : 'md:order-2'}>
                      <ProjectNode node={node} />
                    </div>
                    {/* detail cell */}
                    <div className={`mt-6 md:mt-0 ${left ? '' : 'md:order-1'}`}>
                      <Detail node={node} alignRight={!left} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
