import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

// Aap yahan apne high-quality thumbnails add kar sakte hain
const thumbnailsData = [
  {
    id: 1,
    image: 'https://i.ytimg.com/vi/wFE2WScyzRk/maxresdefault.jpg',
    title: 'YouTube Thumbnail 1',
  },
  {
    id: 2,
    image: 'https://i.ytimg.com/vi/_OWL54c23tw/maxresdefault.jpg',
    title: 'YouTube Thumbnail 2',
  },
  {
    id: 3,
    image: 'https://i.ytimg.com/vi/fO0BAb6xRKI/maxresdefault.jpg',
    title: 'YouTube Thumbnail 3',
  },
  {
    id: 4,
    image: 'https://i.ytimg.com/vi/slCxSoSUVdg/maxresdefault.jpg',
    title: 'YouTube Thumbnail 4',
  },
  {
    id: 5,
    image: 'https://i.ytimg.com/vi/h7Ij3SFDM90/maxresdefault.jpg',
    title: 'YouTube Thumbnail 5',
  },
  {
    id: 6,
    image: 'https://i.ytimg.com/vi/GwPl2iA6r-o/maxresdefault.jpg',
    title: 'YouTube Thumbnail 6',
  },
  {
    id: 7,
    image: 'https://i.ytimg.com/vi/PBjm2LWQLxQ/maxresdefault.jpg',
    title: 'YouTube Thumbnail 7',
  },
  {
    id: 8,
    image: 'https://i.ytimg.com/vi/avhalpiTRZc/maxresdefault.jpg',
    title: 'YouTube Thumbnail 8',
  },
  {
    id: 9,
    image: 'https://i.ytimg.com/vi/YUhtWEDLYbQ/maxresdefault.jpg',
    title: 'YouTube Thumbnail 9',
  },
  {
    id: 10,
    image: 'https://i.ytimg.com/vi/cTVznqpk1i0/maxresdefault.jpg',
    title: 'YouTube Thumbnail 10',
  },
  {
    id: 11,
    image: 'https://i.ytimg.com/vi/BBfJCcCs32w/maxresdefault.jpg',
    title: 'YouTube Thumbnail 11',
  },
  {
    id: 12,
    image: 'https://i.ytimg.com/vi/_TTNTCj0-1g/maxresdefault.jpg',
    title: 'YouTube Thumbnail 12',
  },
  {
    id: 13,
    image: 'https://i.ytimg.com/vi/NkIHl1P7OFU/maxresdefault.jpg',
    title: 'YouTube Thumbnail 13',
  },
  {
    id: 14,
    image: 'https://i.ytimg.com/vi/5b5W3Sq-OxY/maxresdefault.jpg',
    title: 'YouTube Thumbnail 14',
  },
  {
    id: 15,
    image: 'https://i.ytimg.com/vi/MTEoqHIg6Wg/maxresdefault.jpg',
    title: 'YouTube Thumbnail 15',
  }
];

export default function ThumbnailsGallery({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

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
                  whileTap={{ scale: 0.95 }}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer active:border-neon-green/50 transition-colors" 
                  onClick={() => setActiveImage(item.image)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={item.image.replace('maxresdefault.jpg', 'hqdefault.jpg')} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-active:scale-110 transition-transform border border-zinc-700">
                        <Maximize2 className="text-neon-green" size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-neon-green group-active:text-neon-green transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Viewer Modal */}
          <AnimatePresence>
            {activeImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12"
                onClick={() => setActiveImage(null)}
              >
                <div className="relative w-full max-w-6xl flex items-center justify-center" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => setActiveImage(null)}
                    className="absolute -top-12 right-0 md:-right-12 z-10 p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <img 
                    src={activeImage} 
                    alt="High Quality Thumbnail" 
                    className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
