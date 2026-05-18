import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Play, Image as ImageIcon, Code, PenTool, Layout, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThumbnailsGallery from './ThumbnailsGallery';
import GameTestingGallery from './GameTestingGallery';
import GamingSolutionsGallery from './GamingSolutionsGallery';
import PosterGallery from './PosterGallery';
import ResumeModal from './ResumeModal';
import IframeModal from './IframeModal';
import ProjectDetailModal, { ProjectDetails } from './ProjectDetailModal';

const OptimizedImage = ({ src, alt, className, priority = false }: { src: string, alt: string, className: string, priority?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900/50">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-zinc-800/80 animate-pulse" />
      )}
      <img 
        src={imgSrc} 
        alt={alt} 
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setImgSrc(`https://picsum.photos/seed/${alt.replace(/\s+/g, '')}/800/600`);
        }}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const projects: (ProjectDetails & { icon: any, link?: string, iframeUrl?: string, isGallery?: boolean, isGameGallery?: boolean, isGamingSolutionsGallery?: boolean, isResumeGallery?: boolean, isPosterGallery?: boolean })[] = [
  // YouTube
  {
    title: 'YouTube Thumbnails',
    category: 'YouTube',
    icon: ImageIcon,
    image: '/Youtube Thumanils.png',
    description: 'Eye-catching and high-CTR thumbnails designed for tech and gaming videos.',
    isGallery: true,
  },
  {
    title: 'Posters',
    category: 'Graphic Design',
    icon: PenTool,
    image: '/poster-design-thumbnail.png',
    description: 'Creative and engaging poster designs for events, marketing, and branding.',
    isPosterGallery: true,
  },
  {
    title: 'Logos',
    category: 'Graphic Design',
    icon: PenTool,
    image: '/logo-design-thumbnail.png',
    description: 'Professional and memorable logo designs for various brands and channels.',
  },
  
  /*
  // Web Development
  {
    title: 'Portfolio Website',
    category: 'Web Development',
    icon: Layout,
    image: 'https://picsum.photos/seed/portfolio/800/600',
    description: 'Modern, responsive, and interactive personal portfolio websites.',
    details: {
      images: ['https://picsum.photos/seed/port1/1280/720', 'https://picsum.photos/seed/port2/1280/720'],
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      problem: 'Needed a fast, visually appealing way to showcase projects and skills without relying on generic templates.',
      solution: 'Built a custom single-page application with smooth scroll animations, dark mode, and a highly responsive grid layout.',
      result: 'Achieved a 99/100 Lighthouse performance score and significantly improved professional online presence.'
    }
  },
  {
    title: 'Landing Page',
    category: 'Web Development',
    icon: Layout,
    image: 'https://picsum.photos/seed/landing/800/600',
    description: 'High-converting landing pages optimized for performance and user experience.',
    details: {
      images: ['https://picsum.photos/seed/land1/1280/720', 'https://picsum.photos/seed/land2/1280/720'],
      tools: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
      problem: 'A product launch required a fast-loading page that could convert visitors into subscribers efficiently.',
      solution: 'Designed a mobile-first landing page with clear call-to-actions, optimized images, and minimal external dependencies.',
      result: 'Increased conversion rate by 22% compared to the previous generic template.'
    }
  },
  {
    title: 'Blog Website',
    category: 'Web Development',
    icon: Code,
    image: 'https://picsum.photos/seed/blog/800/600',
    description: 'Content-rich blog platforms with CMS integration and SEO optimization.',
    details: {
      images: ['https://picsum.photos/seed/blog1/1280/720', 'https://picsum.photos/seed/blog2/1280/720'],
      tools: ['Next.js', 'Tailwind CSS', 'Markdown'],
      problem: 'Needed a platform to share tech articles that was easy to update and ranked well on search engines.',
      solution: 'Developed a statically generated blog using Next.js, allowing content to be written in Markdown for quick publishing.',
      result: 'Improved organic search traffic and provided a seamless reading experience across all devices.'
    }
  },
  */

  // Video Editing
  {
    title: 'Gaming Montage',
    category: 'Video Editing',
    icon: Play,
    image: '/gaming-montage-editing-thumbnail.png',
    description: 'High-energy gaming montages with beat-syncing and visual effects.',
  },
  {
    title: 'Shorts Editing',
    category: 'Video Editing',
    icon: Play,
    image: '/shorts-video-editing-thumbnail.png',
    description: 'Engaging short-form content optimized for YouTube Shorts and Reels.',
  },
  {
    title: 'Cinematic Edit',
    category: 'Video Editing',
    icon: Play,
    image: '/cinematic-video-editing-thumbnail.png',
    description: 'Visually stunning cinematic edits with color grading and smooth transitions.',
  },
  {
    title: 'Game Testing Videos',
    category: 'YouTube',
    icon: Play,
    image: '/Game Testing videos.png',
    description: 'Engaging, well-paced game testing videos with clear performance analysis and visual aids.',
    isGameGallery: true,
  },
  {
    title: 'Gaming Solutions Videos',
    category: 'YouTube',
    icon: Play,
    image: '/gaming solution vidoes.png',
    description: 'Comprehensive videos providing gaming solutions, bug fixes, and performance optimization.',
    isGamingSolutionsGallery: true,
  },

  // App
  {
    title: 'VanshLink',
    category: 'App',
    icon: Smartphone,
    image: '/vanshlink-thumbnail.svg',
    description: 'Connect instantly, chat privately. Your conversations, your control.',
    link: 'https://vanshlink.vercel.app/',
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/vanshlink-1.png', 
        '/app-screenshots/vanshlink-2.png', 
        '/app-screenshots/vanshlink-3.png',
        '/app-screenshots/vanshlink-4.png'
      ],
      tools: ['React', 'Firebase', 'Tailwind CSS'],
      problem: 'Need a secure and private chat application without unnecessary tracking.',
      solution: 'Built a responsive real-time chat application powered by Firebase Auth and Firestore with an emphasis on speed and privacy.',
      result: 'A fast, secure messaging platform that scales instantly.'
    }
  },
  {
    title: 'vthumb',
    category: 'App',
    icon: ImageIcon,
    image: '/vthumb-thumbnail.svg',
    description: 'Youtube thumbnail Downloads instantly.',
    link: 'https://vthumb.vercel.app/',
    details: {
      imageOrientation: 'landscape',
      images: [
        '/app-screenshots/vthumb-1.png', 
        '/app-screenshots/vthumb-2.png', 
        '/app-screenshots/vthumb-3.png'
      ],
      tools: ['React', 'YouTube API', 'Tailwind CSS'],
      problem: 'Content creators find it difficult to analyze or download high-quality thumbnails of existing videos.',
      solution: 'Created a simple dashboard to instantly fetch and download Max-Res thumbnails just by pasting a YouTube URL.',
      result: 'Lightning fast tool saving significant time for creators and editors.'
    }
  },
  {
    title: 'Aura Shakti',
    category: 'App',
    icon: Smartphone,
    image: '/aurashakti-thumbnail.svg',
    description: 'Find your true aura based on deep interactive quizzes.',
    link: 'https://aurashakti.vercel.app/',
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/aurashakti-1.png', 
        '/app-screenshots/aurashakti-2.png', 
        '/app-screenshots/aurashakti-3.png',
        '/app-screenshots/aurashakti-4.png'
      ],
      tools: ['React', 'Tailwind CSS', 'Framer Motion'],
      problem: 'People want entertaining and visually beautiful ways to discover their aura or personality types.',
      solution: 'Developed a deeply interactive quiz experience with smooth animations, calculating personality metrics to generate abstract "Aura" visualizations.',
      result: 'An incredibly engaging user experience with high completion rates.'
    }
  },
  {
    title: 'Kairo',
    category: 'App',
    icon: Smartphone,
    image: '/kairo-thumbnail.png',
    description: 'Level up every day by completing daily missions designed to improve your social life.',
    link: 'http://kairo-black.vercel.app/',
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/kairo-1.png', 
        '/app-screenshots/kairo-2.png', 
        '/app-screenshots/kairo-3.png',
        '/app-screenshots/kairo-4.png'
      ],
      tools: ['React', 'Tailwind CSS'],
      problem: 'People struggle with social anxiety or lack motivation to engage in real-world social interactions.',
      solution: 'Developed a gamified application that assigns targeted daily missions to encourage social interaction and personal growth.',
      result: 'A fun and engaging way for users to step out of their comfort zones, build confidence, and level up every day.'
    }
  },
  {
    title: 'Aura Player',
    category: 'App',
    icon: Play,
    image: '/auraplayer-thumbnail.png',
    description: 'An offline MP3/MP4 player packed with an integrated online music feature.',
    link: 'https://aura-player-nine.vercel.app/',
    details: {
      imageOrientation: 'portrait',
      images: [
        '/app-screenshots/auraplayer-1.png', 
        '/app-screenshots/auraplayer-2.png', 
        '/app-screenshots/auraplayer-3.png',
        '/app-screenshots/auraplayer-4.png'
      ],
      tools: ['React', 'Tailwind CSS', 'Web Audio API'],
      problem: 'Users often need multiple standalone apps—one for offline media playback and another for online streaming.',
      solution: 'Built a sleek, responsive media player combining both offline MP3/MP4 capabilities and robust online music streaming.',
      result: 'A unified hub delivering an uninterrupted and versatile audio-visual experience.'
    }
  },
  // Other
  {
    title: 'My Resume',
    category: 'Other',
    icon: Code,
    image: '/My Resume.png',
    description: 'A comprehensive overview of my skills, education, and certifications in IT Support and Tech.',
    isResumeGallery: true,
  },
];

const categories = ['App', 'YouTube', 'Graphic Design', 'Video Editing', 'Other'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('App');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isGameGalleryOpen, setIsGameGalleryOpen] = useState(false);
  const [isGamingSolutionsGalleryOpen, setIsGamingSolutionsGalleryOpen] = useState(false);
  const [isPosterGalleryOpen, setIsPosterGalleryOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [selectedIframeProject, setSelectedIframeProject] = useState<{title: string, url: string} | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#apps') {
        setActiveCategory('App');
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    // Check on mount
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Featured <span className="text-neon-green">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-neon-green text-zinc-950 shadow-[0_0_15px_rgba(0,255,0,0.3)]'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-100 hover:border-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              if (project.category === 'App') {
                return (
                  <motion.div
                    layout
                    key={project.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-800/80 to-zinc-950 border border-zinc-700/50 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(57,255,20,0.15)] hover:border-neon-green/40 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating App Icon Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-zinc-900/90 backdrop-blur-xl p-3 rounded-2xl border border-zinc-700/50 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <project.icon size={24} className="text-neon-green/90 group-hover:text-neon-green transition-colors" />
                    </div>

                    <div className="aspect-[4/3] overflow-hidden relative shrink-0 p-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-zinc-900/40 z-0" />
                      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-zinc-800/80 group-hover:border-zinc-700/80 transition-colors z-10">
                        <OptimizedImage 
                          src={project.image} 
                          alt={project.title} 
                          priority={true}
                          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6 pt-2 flex flex-col flex-grow relative z-20">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 group-hover:from-neon-green group-hover:to-zinc-100 transition-all duration-300">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                        {project.description}
                      </p>
                      
                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
                        >
                          Details
                        </button>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-neon-green/10 text-neon-green font-bold text-sm flex items-center justify-center gap-2 hover:bg-neon-green hover:text-zinc-950 transition-all border border-neon-green/20 hover:border-transparent shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                        >
                          Launch <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex flex-col active:border-neon-green/50 transition-colors"
                >
                  <div className="aspect-video overflow-hidden relative shrink-0">
                    <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent group-active:bg-transparent transition-colors z-10" />
                    <OptimizedImage 
                      src={project.image} 
                      alt={project.title} 
                      priority={true}
                      className="w-full h-full object-cover transform group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-zinc-950/80 backdrop-blur-md p-2 rounded-full border border-zinc-800 flex items-center justify-center">
                      <project.icon size={16} className="text-neon-green" />
                    </div>
                    <div className="absolute top-4 right-4 z-20 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800">
                      <span className="text-xs font-medium text-zinc-300">{project.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-display font-bold text-zinc-100 mb-3 group-hover:text-neon-green group-active:text-neon-green transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>
                    <div className="mt-auto">
                      {project.details ? (
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
                        >
                          View Details <ExternalLink size={16} />
                        </button>
                      ) : project.link ? (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors w-fit"
                        >
                          View Project <ExternalLink size={16} />
                        </a>
                      ) : project.isGallery ? (
                        <button 
                          onClick={() => setIsGalleryOpen(true)}
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
                        >
                          View Gallery <ExternalLink size={16} />
                        </button>
                      ) : project.isGameGallery ? (
                        <button 
                          onClick={() => setIsGameGalleryOpen(true)}
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
                        >
                          View Gallery <ExternalLink size={16} />
                        </button>
                      ) : project.isGamingSolutionsGallery ? (
                        <button 
                          onClick={() => setIsGamingSolutionsGalleryOpen(true)}
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
                        >
                          View Gallery <ExternalLink size={16} />
                        </button>
                      ) : project.isPosterGallery ? (
                        <button 
                          onClick={() => setIsPosterGalleryOpen(true)}
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
                        >
                          View Gallery <ExternalLink size={16} />
                        </button>
                      ) : project.isResumeGallery ? (
                        <button 
                          onClick={() => setIsResumeModalOpen(true)}
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
                        >
                          View Resume <ExternalLink size={16} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
                        >
                          View Details <ExternalLink size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <ThumbnailsGallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
      />
      <GameTestingGallery 
        isOpen={isGameGalleryOpen} 
        onClose={() => setIsGameGalleryOpen(false)} 
      />
      <GamingSolutionsGallery 
        isOpen={isGamingSolutionsGalleryOpen} 
        onClose={() => setIsGamingSolutionsGalleryOpen(false)} 
      />
      <PosterGallery 
        isOpen={isPosterGalleryOpen} 
        onClose={() => setIsPosterGalleryOpen(false)} 
      />
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      <IframeModal
        isOpen={!!selectedIframeProject}
        onClose={() => setSelectedIframeProject(null)}
        url={selectedIframeProject?.url || ''}
        title={selectedIframeProject?.title || ''}
      />
    </section>
  );
}
