import { motion } from 'motion/react';
import { ExternalLink, Star } from 'lucide-react';
import { useState } from 'react';
import ProjectDetailModal, { ProjectDetails } from './ProjectDetailModal';

const OptimizedImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Clean local fallback (no external/random image) if the thumbnail fails to load
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
        <span className="text-zinc-500 text-sm font-display font-semibold px-4 text-center">{alt}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900/50">
      {!isLoaded && <div className="absolute inset-0 bg-zinc-800/80 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

/* =========================================================================
   APPS & WEBSITES DATA — fully editable.
   - tech:      string[] shown as tags on the card
   - link:      live URL (the "Live Demo" button). Leave '' if not live yet.
   - featured:  optional ribbon text, e.g. "Featured at Allied Engineering"
   - details:   (optional) opens the full case-study modal on "Details"
   ========================================================================= */
type AppProject = ProjectDetails & { tech: string[]; featured?: string };

const apps: AppProject[] = [
  {
    title: 'VanshLink',
    category: 'App',
    image: '/vanshlink-thumbnail.svg',
    description: 'Connect instantly, chat privately. Your conversations, your control.',
    link: 'https://vanshlink.vercel.app/',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/vanshlink-1.png',
        '/app-screenshots/vanshlink-2.png',
        '/app-screenshots/vanshlink-3.png',
        '/app-screenshots/vanshlink-4.png',
      ],
      tools: ['React', 'Firebase', 'Tailwind CSS'],
      problem: 'Need a secure and private chat application without unnecessary tracking.',
      solution: 'Built a responsive real-time chat application powered by Firebase Auth and Firestore with an emphasis on speed and privacy.',
      result: 'A fast, secure messaging platform that scales instantly.',
    },
  },
  {
    title: 'vthumb',
    category: 'App',
    image: '/vthumb-thumbnail.svg',
    description: 'YouTube thumbnail downloads instantly — paste a URL, grab Max-Res.',
    link: 'https://vthumb.vercel.app/',
    tech: ['React', 'YouTube API', 'Tailwind CSS'],
    details: {
      imageOrientation: 'landscape',
      images: ['/app-screenshots/vthumb-1.png', '/app-screenshots/vthumb-2.png', '/app-screenshots/vthumb-3.png'],
      tools: ['React', 'YouTube API', 'Tailwind CSS'],
      problem: 'Content creators find it difficult to analyze or download high-quality thumbnails of existing videos.',
      solution: 'Created a simple dashboard to instantly fetch and download Max-Res thumbnails just by pasting a YouTube URL.',
      result: 'Lightning fast tool saving significant time for creators and editors.',
    },
  },
  {
    title: 'Aura Shakti',
    category: 'App',
    image: '/aurashakti-thumbnail.svg',
    description: 'Find your true aura based on deep interactive quizzes.',
    link: 'https://aurashakti.vercel.app/',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/aurashakti-1.png',
        '/app-screenshots/aurashakti-2.png',
        '/app-screenshots/aurashakti-3.png',
        '/app-screenshots/aurashakti-4.png',
      ],
      tools: ['React', 'Tailwind CSS', 'Framer Motion'],
      problem: 'People want entertaining and visually beautiful ways to discover their aura or personality types.',
      solution: 'Developed a deeply interactive quiz experience with smooth animations, calculating personality metrics to generate abstract "Aura" visualizations.',
      result: 'An incredibly engaging user experience with high completion rates.',
    },
  },
  {
    title: 'Kairo',
    category: 'App',
    image: '/kairo-thumbnail.png',
    description: 'Level up every day by completing daily missions designed to improve your social life.',
    link: 'https://kairo-black.vercel.app/',
    tech: ['React', 'Tailwind CSS'],
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/kairo-1.png',
        '/app-screenshots/kairo-2.png',
        '/app-screenshots/kairo-3.png',
        '/app-screenshots/kairo-4.png',
      ],
      tools: ['React', 'Tailwind CSS'],
      problem: 'People struggle with social anxiety or lack motivation to engage in real-world social interactions.',
      solution: 'Developed a gamified application that assigns targeted daily missions to encourage social interaction and personal growth.',
      result: 'A fun and engaging way for users to step out of their comfort zones, build confidence, and level up every day.',
    },
  },
  {
    title: 'Aura Player',
    category: 'App',
    image: '/auraplayer-thumbnail.png',
    description: 'An offline MP3/MP4 player packed with an integrated online music feature.',
    link: 'https://aura-player-nine.vercel.app/',
    tech: ['React', 'Tailwind CSS', 'Web Audio API'],
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/auraplayer-1.png',
        '/app-screenshots/auraplayer-2.png',
        '/app-screenshots/auraplayer-3.png',
        '/app-screenshots/auraplayer-4.png',
      ],
      tools: ['React', 'Tailwind CSS', 'Web Audio API'],
      problem: 'Users often need multiple standalone apps—one for offline media playback and another for online streaming.',
      solution: 'Built a sleek, responsive media player combining both offline MP3/MP4 capabilities and robust online music streaming.',
      result: 'A unified hub delivering an uninterrupted and versatile audio-visual experience.',
    },
  },
];

export default function AppsWebsites() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  return (
    <section id="apps" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Apps & Websites I <span className="text-purple-400">Built</span>
          </h2>
          <div className="w-20 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">Live products I designed and built.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-800/80 to-zinc-950 border border-zinc-700/50 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(192,132,252,0.15)] hover:border-purple-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Optional "Featured" ribbon */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/90 text-white text-xs font-bold shadow-lg backdrop-blur-sm">
                  <Star size={12} />
                  {project.featured}
                </div>
              )}

              <div className="aspect-[4/3] overflow-hidden relative shrink-0 p-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-zinc-900/40 z-0" />
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-zinc-800/80 group-hover:border-zinc-700/80 transition-colors z-10">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                </div>
              </div>

              <div className="p-6 pt-2 flex flex-col flex-grow relative z-20">
                <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 group-hover:from-purple-300 group-hover:to-zinc-100 transition-all duration-300 mb-3">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>

                {/* Tech-stack tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
                  >
                    Details
                  </button>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-purple-400/10 text-purple-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-400 hover:text-zinc-950 transition-all border border-purple-400/20 hover:border-transparent shadow-[0_0_15px_rgba(192,132,252,0.1)] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]"
                    >
                      Live Demo <ExternalLink size={16} />
                    </a>
                  ) : (
                    <span className="px-4 py-2.5 rounded-xl bg-zinc-800/50 text-zinc-500 font-medium text-sm flex items-center justify-center gap-2 border border-zinc-800 cursor-not-allowed">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
