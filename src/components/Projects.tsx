import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Play, Image as ImageIcon, Code, PenTool, Layout, Smartphone } from 'lucide-react';
import { useState } from 'react';
import ThumbnailsGallery from './ThumbnailsGallery';
import GameTestingGallery from './GameTestingGallery';
import GamingSolutionsGallery from './GamingSolutionsGallery';
import ResumeModal from './ResumeModal';
import ProjectDetailModal, { ProjectDetails } from './ProjectDetailModal';

const projects: (ProjectDetails & { icon: any, link?: string, isGallery?: boolean, isGameGallery?: boolean, isGamingSolutionsGallery?: boolean, isResumeGallery?: boolean })[] = [
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

const categories = ['YouTube', 'Graphic Design', 'Video Editing', 'App', 'Other'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('YouTube');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isGameGalleryOpen, setIsGameGalleryOpen] = useState(false);
  const [isGamingSolutionsGalleryOpen, setIsGamingSolutionsGalleryOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

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
            {filteredProjects.map((project, index) => (
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
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${project.title.replace(/\s+/g, '')}/800/600`;
                    }}
                    className="w-full h-full object-cover transform group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
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
                    {project.link ? (
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
            ))}
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
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
