import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ImageIcon, Play, PenTool, Sparkles, Images, Maximize2, X, LayoutGrid, Megaphone, BarChart3, Clapperboard, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ThumbnailsGallery from './ThumbnailsGallery';
import PosterGallery from './PosterGallery';
import GameTestingGallery from './GameTestingGallery';
import GamingSolutionsGallery from './GamingSolutionsGallery';
import MediaDashboard, { MediaItem, MediaCategory } from './MediaDashboard';
import DesignedCover, { CoverFrame } from './DesignedCover';

/* =========================================================================
   AUTO-LOADED MEDIA — you don't edit this file. Just drop files into:

     src/assets/ai-graphics/graphics/       -> "Graphics" type (AI Graphics dashboard)
     src/assets/ai-graphics/posters/        -> "Posters" type
     src/assets/ai-graphics/infographics/   -> "Infographics" type
     src/assets/ai-graphics/carousels/<name>/  -> one swipeable carousel
     src/assets/ai-videos/                  -> AI Video dashboard

   File / folder name becomes the title. See README.txt in each folder.
   ========================================================================= */
const graphicsGlob = import.meta.glob('../assets/ai-graphics/graphics/*.{png,jpg,jpeg,webp,gif,svg}', { eager: true, import: 'default' }) as Record<string, string>;
const postersGlob = import.meta.glob('../assets/ai-graphics/posters/*.{png,jpg,jpeg,webp,gif,svg}', { eager: true, import: 'default' }) as Record<string, string>;
const infographicsGlob = import.meta.glob('../assets/ai-graphics/infographics/*.{png,jpg,jpeg,webp,gif,svg}', { eager: true, import: 'default' }) as Record<string, string>;
const carouselGlob = import.meta.glob('../assets/ai-graphics/carousels/**/*.{png,jpg,jpeg,webp,gif,svg}', { eager: true, import: 'default' }) as Record<string, string>;
const videosGlob = import.meta.glob('../assets/ai-videos/*.{mp4,webm,mov}', { eager: true, import: 'default' }) as Record<string, string>;

function prettify(raw: string) {
  return raw.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());
}
const imgItems = (glob: Record<string, string>): MediaItem[] =>
  Object.entries(glob).map(([p, url]) => ({ title: prettify(p.split('/').pop() || ''), thumb: url, kind: 'image', src: url }));

/* first few items as film-strip frames for a designed cover */
const framesFromItems = (items: MediaItem[]): CoverFrame[] =>
  items.slice(0, 3).map((i) => ({ src: i.thumb, video: i.kind === 'video' }));

const aiGraphics = imgItems(graphicsGlob);
const aiPosters = imgItems(postersGlob);
const aiInfographics = imgItems(infographicsGlob);

/* Group carousel slides by their folder name (one folder = one carousel) */
const carouselMap: Record<string, { path: string; url: string }[]> = {};
for (const [path, url] of Object.entries(carouselGlob)) {
  const m = path.match(/\/carousels\/([^/]+)\//);
  if (!m) continue;
  (carouselMap[m[1]] ||= []).push({ path, url });
}
const aiCarousels: MediaItem[] = Object.entries(carouselMap).map(([name, slides]) => {
  const sorted = slides.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true })).map((s) => s.url);
  return { title: prettify(name), thumb: sorted[0], kind: 'carousel', images: sorted };
});

const aiVideoItems: MediaItem[] = Object.entries(videosGlob).map(([p, url]) => ({
  title: prettify(p.split('/').pop() || ''), thumb: url, kind: 'video', src: url,
}));

/* AI Graphics sub-category => up to 4 type dashboards (only non-empty ones) */
const aiGraphicsCategories: MediaCategory[] = [
  { key: 'graphics', title: 'AI Graphics', items: aiGraphics, icon: Sparkles, thumb: '', design: { from: '0,255,157', to: '192,132,252' }, frames: framesFromItems(aiGraphics) },
  { key: 'posters', title: 'Posters', items: aiPosters, icon: Megaphone, thumb: '', design: { from: '251,146,60', to: '248,113,113' }, frames: framesFromItems(aiPosters) },
  { key: 'infographics', title: 'Infographics', items: aiInfographics, icon: BarChart3, thumb: '', design: { from: '96,165,250', to: '0,238,226' }, frames: framesFromItems(aiInfographics) },
  { key: 'carousels', title: 'Carousels', items: aiCarousels, icon: Images, thumb: '', design: { from: '192,132,252', to: '0,229,255' }, frames: framesFromItems(aiCarousels) },
].filter((c) => c.items.length > 0);

const aiVideoCategories: MediaCategory[] = aiVideoItems.length
  ? [{ key: 'aivideos', title: 'AI Videos', items: aiVideoItems, icon: Clapperboard, thumb: '', design: { from: '0,229,255', to: '244,114,182' }, frames: framesFromItems(aiVideoItems) }]
  : [];

const aiGraphicsTotal = aiGraphicsCategories.reduce((n, c) => n + c.items.length, 0);

type GalleryKey = 'thumbnails' | 'posters' | 'gameTesting' | 'gamingSolutions';

type Cover = {
  title: string;
  subtitle?: string;
  tab: 'Graphics' | 'Video Edits' | 'Thumbnails' | 'Gaming';
  thumb: string;
  isVideoThumb?: boolean;
  icon: LucideIcon;
  badge?: string;
  design?: { from: string; to: string };
  frames?: CoverFrame[];
  comingSoon?: boolean;
  open:
    | { type: 'gallery'; key: GalleryKey }
    | { type: 'image'; src: string }
    | { type: 'dashboard'; title: string; categories: MediaCategory[] };
};

const covers: Cover[] = [
  // ----- Graphics -----
  { title: 'Posters (Design)', tab: 'Graphics', thumb: '/poster-design-thumbnail.png', icon: PenTool, open: { type: 'gallery', key: 'posters' } },
  { title: 'Logos', tab: 'Graphics', thumb: '/logo-design-thumbnail.png', icon: PenTool, open: { type: 'image', src: '/logo-design-thumbnail.png' } },
  ...(aiGraphicsCategories.length
    ? [{
        title: 'AI Graphics',
        subtitle: 'Graphics · Posters · Infographics · Carousels',
        tab: 'Graphics' as const,
        thumb: '/ai-graphics-cover.png',
        icon: Sparkles,
        badge: `${aiGraphicsTotal} items`,
        open: { type: 'dashboard' as const, title: 'AI Graphics', categories: aiGraphicsCategories },
      }]
    : []),

  // ----- Video Edits -----
  { title: 'Gaming Montage', tab: 'Video Edits', thumb: '/gaming-montage-editing-thumbnail.png', icon: Play, comingSoon: true, open: { type: 'image', src: '/gaming-montage-editing-thumbnail.png' } },
  { title: 'Shorts Editing', tab: 'Video Edits', thumb: '/shorts-video-editing-thumbnail.png', icon: Play, comingSoon: true, open: { type: 'image', src: '/shorts-video-editing-thumbnail.png' } },
  { title: 'Cinematic Edit', tab: 'Video Edits', thumb: '/cinematic-video-editing-thumbnail.png', icon: Play, comingSoon: true, open: { type: 'image', src: '/cinematic-video-editing-thumbnail.png' } },
  ...(aiVideoCategories.length
    ? [{
        title: 'AI Video',
        subtitle: 'AI-generated videos & reels',
        tab: 'Video Edits' as const,
        thumb: '/ai-video-cover.png',
        icon: Clapperboard,
        badge: `${aiVideoItems.length} videos`,
        open: { type: 'dashboard' as const, title: 'AI Video', categories: aiVideoCategories },
      }]
    : []),

  // ----- Thumbnails -----
  { title: 'YouTube Thumbnails', tab: 'Thumbnails', thumb: '/Youtube Thumanils.png', icon: ImageIcon, open: { type: 'gallery', key: 'thumbnails' } },

  // ----- Gaming -----
  { title: 'Game Testing Videos', tab: 'Gaming', thumb: '/Game Testing videos.png', icon: Play, open: { type: 'gallery', key: 'gameTesting' } },
  { title: 'Gaming Solutions Videos', tab: 'Gaming', thumb: '/gaming solution vidoes.png', icon: Play, open: { type: 'gallery', key: 'gamingSolutions' } },
];

const TAB_ORDER = ['All', 'Graphics', 'Video Edits', 'Thumbnails', 'Gaming'] as const;

export default function GraphicsVideo() {
  const tabs = TAB_ORDER.filter((t) => t === 'All' || covers.some((c) => c.tab === t));

  const [activeTab, setActiveTab] = useState<string>('All');
  const [openGallery, setOpenGallery] = useState<GalleryKey | null>(null);
  const [dashboard, setDashboard] = useState<{ title: string; categories: MediaCategory[] } | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  const filtered = activeTab === 'All' ? covers : covers.filter((c) => c.tab === activeTab);

  const handleClick = (cover: Cover) => {
    if (cover.comingSoon) setComingSoon(cover.title);
    else if (cover.open.type === 'gallery') setOpenGallery(cover.open.key);
    else if (cover.open.type === 'image') setLightbox({ src: cover.open.src, title: cover.title });
    else setDashboard({ title: cover.open.title, categories: cover.open.categories });
  };

  return (
    <section id="graphics" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-neon-blue/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Graphics & <span className="text-neon-blue">AI Video</span>
          </h2>
          <div className="w-20 h-1 bg-neon-blue rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            A visual portfolio of my design, posters, infographics, carousels and AI-generated work.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-neon-blue text-zinc-950 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-100 hover:border-zinc-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((cover, index) => {
              const Icon = cover.icon;
              const isDashboard = cover.open.type === 'dashboard';
              return (
                <motion.button
                  layout
                  key={`${cover.tab}-${cover.title}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  onClick={() => handleClick(cover)}
                  className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border text-left transition-colors ${
                    isDashboard ? 'border-neon-blue/30 hover:border-neon-blue/60' : 'border-zinc-800 hover:border-neon-blue/40'
                  }`}
                >
                  <div className="aspect-video overflow-hidden relative bg-zinc-950">
                    {cover.design ? (
                      <DesignedCover title={cover.title} subtitle={cover.subtitle} Icon={Icon} from={cover.design.from} to={cover.design.to} frames={cover.frames} />
                    ) : (
                      <>
                        {cover.isVideoThumb ? (
                          <video src={cover.thumb} muted playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <img src={cover.thumb} alt={cover.title} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md p-2 rounded-full border border-zinc-800">
                          <Icon size={15} className="text-neon-blue" />
                        </div>
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="text-base font-display font-bold text-white truncate">{cover.title}</h3>
                          {cover.subtitle && <p className="text-[11px] text-zinc-400 truncate mt-0.5">{cover.subtitle}</p>}
                        </div>
                      </>
                    )}

                    {cover.comingSoon ? (
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-amber-400/90 text-zinc-950 px-2.5 py-1 rounded-full text-[11px] font-bold">
                        <Clock size={11} /> Coming Soon
                      </div>
                    ) : cover.badge ? (
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-neon-blue/90 text-zinc-950 px-2.5 py-1 rounded-full text-[11px] font-bold">
                        {cover.badge}
                      </div>
                    ) : null}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${cover.comingSoon ? 'bg-amber-400 text-zinc-950' : 'bg-neon-blue text-zinc-950'}`}>
                        {cover.comingSoon ? <Clock size={15} /> : isDashboard ? <LayoutGrid size={15} /> : <Maximize2 size={15} />}
                        {cover.comingSoon ? 'Coming Soon' : isDashboard ? 'Open' : 'View'}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Existing dedicated galleries */}
      <ThumbnailsGallery isOpen={openGallery === 'thumbnails'} onClose={() => setOpenGallery(null)} />
      <PosterGallery isOpen={openGallery === 'posters'} onClose={() => setOpenGallery(null)} />
      <GameTestingGallery isOpen={openGallery === 'gameTesting'} onClose={() => setOpenGallery(null)} />
      <GamingSolutionsGallery isOpen={openGallery === 'gamingSolutions'} onClose={() => setOpenGallery(null)} />

      {/* AI dashboards (drill-in + lightbox) */}
      <MediaDashboard
        isOpen={!!dashboard}
        onClose={() => setDashboard(null)}
        title={dashboard?.title || ''}
        categories={dashboard?.categories || []}
      />

      {/* Simple lightbox for static single images (logos, edits) */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 p-2 bg-zinc-900/80 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-white border border-zinc-700/50 transition-colors"
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
              <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl" />
              <p className="text-center text-zinc-300 mt-4 font-display font-semibold">{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon modal */}
      <AnimatePresence>
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setComingSoon(null)}
            className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setComingSoon(null)}
                className="absolute top-4 right-4 p-2 bg-zinc-950/60 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-700/50"
              >
                <X size={18} />
              </button>
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-zinc-400 leading-relaxed">
                <span className="text-amber-400 font-semibold">{comingSoon}</span> content is on the way. Check back shortly!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
