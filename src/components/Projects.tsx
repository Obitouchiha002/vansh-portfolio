import { motion } from 'motion/react';
import { ExternalLink, Play, Image as ImageIcon, Code, PenTool } from 'lucide-react';
import { useState } from 'react';
import ThumbnailsGallery from './ThumbnailsGallery';
import GameTestingGallery from './GameTestingGallery';
import GamingSolutionsGallery from './GamingSolutionsGallery';
import ResumeModal from './ResumeModal';

const projects = [
  {
    title: 'YouTube Thumbnails',
    category: 'Graphic Design',
    icon: ImageIcon,
    image: '/Youtube Thumanils.png',
    description: 'Eye-catching and high-CTR thumbnails designed for tech and gaming videos.',
    isGallery: true,
  },
  {
    title: 'Game Testing Videos',
    category: 'Video Editing',
    icon: Play,
    image: '/Game Testing videos.png',
    description: 'Engaging, well-paced game testing videos with clear performance analysis and visual aids.',
    isGameGallery: true,
  },
  {
    title: 'Gaming Solutions Videos',
    category: 'Content Creation',
    icon: PenTool,
    image: '/gaming solution vidoes.png',
    description: 'Comprehensive videos providing gaming solutions, bug fixes, and performance optimization.',
    isGamingSolutionsGallery: true,
  },
  {
    title: 'My Resume',
    category: 'Resume',
    icon: Code,
    image: '/My Resume.png',
    description: 'A comprehensive overview of my skills, education, and certifications in IT Support and Tech.',
    isResumeGallery: true,
  },
];

export default function Projects() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isGameGalleryOpen, setIsGameGalleryOpen] = useState(false);
  const [isGamingSolutionsGalleryOpen, setIsGamingSolutionsGalleryOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Featured <span className="text-neon-green">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
            >
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-20 bg-zinc-950/80 backdrop-blur-md p-2 rounded-full border border-zinc-800 flex items-center justify-center">
                  <project.icon size={16} className="text-neon-green" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-zinc-100 mb-3 group-hover:text-neon-green transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  {project.description}
                </p>
                {project.link ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors"
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
                  <button className="text-sm font-medium text-zinc-300 hover:text-neon-green flex items-center gap-2 transition-colors">
                    View Project <ExternalLink size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
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
    </section>
  );
}
