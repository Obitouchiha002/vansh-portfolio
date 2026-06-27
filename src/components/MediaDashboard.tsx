import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, ArrowLeft, Maximize2, Play, Images, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import DesignedCover, { CoverFrame } from './DesignedCover';

export interface MediaItem {
  title: string;
  thumb: string;
  kind: 'image' | 'video' | 'carousel';
  src?: string;
  images?: string[];
}

export interface MediaCategory {
  key: string;
  title: string;
  thumb: string;
  icon?: LucideIcon;
  items: MediaItem[];
  design?: { from: string; to: string }; // designed banner instead of a photo cover
  frames?: CoverFrame[]; // sample frames shown in the designed banner's film strip
}

/* A reusable "dashboard" modal:
   - Multiple categories  => shows category covers, then drills into a grid (with a Back button).
   - Single category       => opens straight into its grid.
   - Clicking an item opens a lightbox (image / video / swipe-able carousel).  */
/* A thumbnail that renders the media in its NATIVE aspect ratio (no crop).
   Portrait (9:16) shows tall, landscape (16:9) shows wide. */
function MediaThumb({ item, index, onClick }: { item: MediaItem; index: number; onClick: () => void; key?: string }) {
  const [ratio, setRatio] = useState<number | null>(null);
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
      onClick={onClick}
      className="group relative mb-6 block w-full break-inside-avoid rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 text-left hover:border-neon-blue/40 transition-colors"
    >
      <div className="relative overflow-hidden bg-zinc-950" style={{ aspectRatio: ratio ? String(ratio) : '16 / 9' }}>
        {item.kind === 'video' ? (
          <video
            src={item.src}
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={item.thumb}
            alt={item.title}
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              const im = e.currentTarget;
              if (im.naturalWidth && im.naturalHeight) setRatio(im.naturalWidth / im.naturalHeight);
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
        {item.kind === 'carousel' && item.images && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-neon-blue/90 text-zinc-950 px-2.5 py-1 rounded-full text-[11px] font-bold">
            <Images size={12} /> {item.images.length}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue text-zinc-950 text-sm font-bold">
            {item.kind === 'video' ? <Play size={15} /> : item.kind === 'carousel' ? <Images size={15} /> : <Maximize2 size={15} />}
            {item.kind === 'video' ? 'Play' : item.kind === 'carousel' ? 'Slides' : 'View'}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-base font-display font-bold text-white truncate">{item.title}</h3>
        </div>
      </div>
    </motion.button>
  );
}

export default function MediaDashboard({
  isOpen,
  onClose,
  title,
  categories,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  categories: MediaCategory[];
}) {
  const single = categories.length === 1;
  const [activeKey, setActiveKey] = useState<string | null>(single ? categories[0]?.key : null);
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    if (isOpen) {
      setActiveKey(single ? categories[0]?.key ?? null : null);
      setLightbox(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const activeCat = categories.find((c) => c.key === activeKey) || null;
  const slides = lightbox?.images || [];
  const goNext = () => setSlide((s) => (s + 1) % slides.length);
  const goPrev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);

  const openItem = (item: MediaItem) => {
    setSlide(0);
    setLightbox(item);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[65] bg-zinc-950/95 backdrop-blur-sm overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-10 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                {!single && activeCat && (
                  <button
                    onClick={() => setActiveKey(null)}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-white border border-zinc-700/50 transition-colors"
                    aria-label="Back"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white">
                  {title}
                  {activeCat && !single && <span className="text-neon-blue"> / {activeCat.title}</span>}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-white border border-zinc-700/50 transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* CATEGORY COVERS (home view) */}
            {!activeCat && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, index) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      onClick={() => setActiveKey(cat.key)}
                      className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 text-left hover:border-neon-blue/40 transition-colors"
                    >
                      <div className="aspect-video overflow-hidden relative bg-zinc-950">
                        {cat.design && Icon ? (
                          <DesignedCover title={cat.title} Icon={Icon} from={cat.design.from} to={cat.design.to} frames={cat.frames} />
                        ) : (
                          <>
                            <img src={cat.thumb} alt={cat.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                            {Icon && (
                              <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md p-2 rounded-full border border-zinc-800">
                                <Icon size={15} className="text-neon-blue" />
                              </div>
                            )}
                            <div className="absolute bottom-3 left-4 right-4">
                              <h3 className="text-lg font-display font-bold text-white">{cat.title}</h3>
                            </div>
                          </>
                        )}
                        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-neon-blue/90 text-zinc-950 px-2.5 py-1 rounded-full text-[11px] font-bold">
                          {cat.items.length} items
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* MEDIA GRID (inside a category) */}
            {activeCat && (
              activeCat.items.length === 0 ? (
                <div className="text-center py-24 text-zinc-500">
                  Coming soon — new work dropping here shortly.
                </div>
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                  {activeCat.items.map((item, index) => (
                    <MediaThumb key={`${item.title}-${index}`} item={item} index={index} onClick={() => openItem(item)} />
                  ))}
                </div>
              )
            )}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightbox(null)}
                className="fixed inset-0 z-[80] bg-zinc-950/95 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-5 right-5 z-20 p-2 bg-zinc-900/80 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-white border border-zinc-700/50 transition-colors"
                >
                  <X size={22} />
                </button>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.4 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-4xl w-full"
                >
                  {lightbox.kind === 'video' ? (
                    <video src={lightbox.src} controls autoPlay playsInline className="w-full h-auto max-h-[80vh] rounded-2xl border border-zinc-800 shadow-2xl bg-black" />
                  ) : lightbox.kind === 'carousel' && slides.length ? (
                    <div className="relative">
                      <img src={slides[slide]} alt={`${lightbox.title} slide ${slide + 1}`} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl" />
                      {slides.length > 1 && (
                        <>
                          <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-zinc-950/70 hover:bg-neon-blue hover:text-zinc-950 rounded-full text-white border border-zinc-700/50 transition-colors">
                            <ChevronLeft size={22} />
                          </button>
                          <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-zinc-950/70 hover:bg-neon-blue hover:text-zinc-950 rounded-full text-white border border-zinc-700/50 transition-colors">
                            <ChevronRight size={22} />
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {slides.map((_, i) => (
                              <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-neon-blue' : 'w-2 bg-zinc-500 hover:bg-zinc-300'}`} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <img src={lightbox.src || lightbox.thumb} alt={lightbox.title} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl" />
                  )}
                  <p className="text-center text-zinc-300 mt-4 font-display font-semibold">
                    {lightbox.title}
                    {lightbox.kind === 'carousel' && slides.length > 1 && (
                      <span className="text-zinc-500 font-normal"> — {slide + 1} / {slides.length}</span>
                    )}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
