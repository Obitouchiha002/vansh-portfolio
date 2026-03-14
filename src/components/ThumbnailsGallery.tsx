import { motion, AnimatePresence } from 'motion/react';
import { X, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

// Aap yahan apne thumbnails aur videos add kar sakte hain
const thumbnailsData = [
  {
    id: 1,
    image: 'https://i.ytimg.com/vi/5b5W3Sq-OxY/maxresdefault.jpg',
    title: 'GTA V Low End PC Optimization',
    videoId: '5b5W3Sq-OxY' 
  },
  {
    id: 2,
    image: 'https://i.ytimg.com/vi/2PpQXjhnzYw/maxresdefault.jpg',
    title: 'Low End PC Pe Free Fire Smooth Nahi Chalta | Real Test No Fake Tricks',
    videoId: '2PpQXjhnzYw' 
  },
  {
    id: 3,
    image: 'https://i.ytimg.com/vi/MTEoqHIg6Wg/hqdefault.jpg',
    title: 'Test Minecraft in low end pc 🔥',
    videoId: 'MTEoqHIg6Wg' 
  },
  {
    id: 4,
    image: 'https://i.ytimg.com/vi/BBfJCcCs32w/hqdefault.jpg',
    title: 'Can You Run Far Cry 3 on a Low-End PC? ',
    videoId: 'BBfJCcCs32w' 
  },
  {
    id: 5,
    image: 'https://i.ytimg.com/vi/5dJqRWatnno/hqdefault.jpg',
    title: 'Stop Buy UC fake site ❌',
    videoId: '5dJqRWatnno' 
  },
  {
    id: 6,
    image: 'https://i.ytimg.com/vi/NkIHl1P7OFU/hqdefault.jpg',
    title: 'Test GENSHIN IMPACT in low end pc ',
    videoId: 'NkIHl1P7OFU' 
  }
];

export default function ThumbnailsGallery({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Prevent scrolling on body when gallery is open
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-50 bg-zinc-950 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-12 sticky top-0 bg-zinc-950/80 backdrop-blur-md py-4 z-10 border-b border-zinc-800">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                YouTube <span className="text-neon-green">Thumbnails</span>
              </h2>
              <button 
                onClick={onClose}
                className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-neon-green transition-colors border border-zinc-800"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {thumbnailsData.map((item) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: item.id * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer" 
                  onClick={() => setActiveVideo(item.videoId)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-transform">
                        <Play className="text-white ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-neon-green transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video Player Modal */}
          <AnimatePresence>
            {activeVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12"
                onClick={() => setActiveVideo(null)}
              >
                <div className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 shadow-2xl" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => setActiveVideo(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black rounded-full text-zinc-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
