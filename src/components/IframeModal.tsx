import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface IframeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function IframeModal({ isOpen, onClose, url, title }: IframeModalProps) {
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-7xl h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/50">
              <h3 className="text-xl font-display font-bold text-white">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-700/50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-grow w-full h-full bg-zinc-950 relative">
              {/* Loading State Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                <div className="animate-pulse flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
                  <p>Loading App...</p>
                </div>
              </div>
              
              <iframe 
                src={url} 
                width="100%" 
                height="100%" 
                style={{ border: 'none', position: 'relative', zIndex: 10 }}
                title={title}
                allow="camera; microphone; geolocation"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
