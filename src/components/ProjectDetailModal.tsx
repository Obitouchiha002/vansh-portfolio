import { motion, AnimatePresence } from 'motion/react';
import { X, Wrench, AlertCircle, CheckCircle, Trophy } from 'lucide-react';
import { useEffect } from 'react';

export interface ProjectDetails {
  title: string;
  category: string;
  image: string;
  description: string;
  details?: {
    images: string[];
    tools: string[];
    problem: string;
    solution: string;
    result: string;
  };
}

interface ProjectDetailModalProps {
  project: ProjectDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-screen px-4 py-12 md:py-24 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-zinc-950/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-700/50 backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Header Image */}
              <div className="w-full h-64 md:h-80 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${project.title.replace(/\s+/g, '')}/800/600`;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full text-xs font-medium mb-3 inline-block">
                    {project.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-10">
                {/* Description */}
                <div>
                  <p className="text-zinc-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.details ? (
                  <>
                    {/* Tools Used */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Wrench className="text-neon-green" size={20} />
                        Tools Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.details.tools.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Problem, Solution, Result Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <AlertCircle className="text-red-400" size={18} />
                          Problem
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {project.details.problem}
                        </p>
                      </div>
                      
                      <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="text-blue-400" size={18} />
                          Solution
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {project.details.solution}
                        </p>
                      </div>

                      <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800/50">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <Trophy className="text-yellow-400" size={18} />
                          Result
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {project.details.result}
                        </p>
                      </div>
                    </div>

                    {/* Project Images */}
                    {project.details.images && project.details.images.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Project Gallery</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {project.details.images.map((img, idx) => (
                            <div key={idx} className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                              <img src={img} alt={`${project.title} screenshot ${idx + 1}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700/50">
                      <AlertCircle className="text-neon-green" size={32} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">Projects Coming Soon</h3>
                    <p className="text-zinc-500">Detailed case studies for this project are currently being prepared.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
