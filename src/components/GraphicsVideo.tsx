import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ImageIcon, Play, PenTool, Sparkles, Images, Maximize2, X, LayoutGrid, Megaphone, BarChart3, Clapperboard, Clock, Monitor, Smartphone, Gamepad2 } from 'lucide-react';
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
  device?: 'browser' | 'phone';
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
  { title: 'Shorts Editing', tab: 'Video Edits', thumb: '/shorts-video-editing-thumbnail.png', icon: Play, comingSoon: true, device: 'phone', open: { type: 'image', src: '/shorts-video-editing-thumbnail.png' } },
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

const CATEGORIES: { tab: Cover['tab']; label: string; icon: LucideIcon; accent: string }[] = [
  { tab: 'Graphics', label: 'Design & Graphics', icon: PenTool, accent: '0,229,255' },
  { tab: 'Video Edits', label: 'Video Editing', icon: Clapperboard, accent: '244,114,182' },
  { tab: 'Thumbnails', label: 'Thumbnails', icon: ImageIcon, accent: '251,146,60' },
  { tab: 'Gaming', label: 'Gaming', icon: Gamepad2, accent: '0,255,157' },
];

/* Mac-style browser mockup wrapping a 16:9 preview. */
function BrowserFrame({ title, children }: { title: string; children: any }) {
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-900 shadow-lg">
      <div className="h-8 bg-zinc-800/90 flex items-center gap-1.5 px-3 border-b border-zinc-700/50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-2 h-4 flex-1 max-w-[180px] rounded-full bg-zinc-900/80 border border-zinc-700/40 flex items-center px-2">
          <span className="text-[9px] text-zinc-500 font-mono truncate">{title}</span>
        </div>
      </div>
      <div className="relative aspect-video bg-zinc-950 overflow-hidden">{children}</div>
    </div>
  );
}

/* Phone mockup on a gradient stage — for vertical / mobile content. */
function PhoneStage({ src, accent }: { src: string; accent: string }) {
  return (
    <div
      className="relative aspect-video overflow-hidden rounded-xl border border-zinc-700/50 flex items-center justify-center"
      style={{ background: `radial-gradient(120% 100% at 50% 0%, rgba(${accent},0.20), #0a0a0b 72%)` }}
    >
      <div className="h-[86%] aspect-[9/19] rounded-[1.1rem] border-[4px] border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
        <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
      </div>
    </div>
  );
}

/* A single preview card — device-framed, with hover + badges. */
function PreviewCard({ cover, accent, onClick }: { key?: string; cover: Cover; accent: string; onClick: () => void }) {
  const Icon = cover.icon;
  const isDashboard = cover.open.type === 'dashboard';
  const isPhone = cover.device === 'phone';
  const slug = cover.title.toLowerCase().replace(/[^a-z0-9]+/g, '') + '.vansh';

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -5 }}
      style={{ ['--a' as string]: accent }}
      className={`group relative text-left rounded-2xl p-3 bg-zinc-900/50 border transition-all duration-300 ${
        isDashboard
          ? 'lg:col-span-2 border-[rgb(var(--a))]/30 hover:border-[rgb(var(--a))]/60 hover:shadow-[0_0_40px_-12px_rgb(var(--a))]'
          : 'border-zinc-800 hover:border-zinc-600'
      }`}
    >
      <div className="relative">
        {isPhone ? (
          <PhoneStage src={cover.thumb} accent={accent} />
        ) : (
          <BrowserFrame title={slug}>
            {cover.design ? (
              <DesignedCover title={cover.title} subtitle={cover.subtitle} Icon={Icon} from={cover.design.from} to={cover.design.to} frames={cover.frames} />
            ) : cover.isVideoThumb ? (
              <video src={cover.thumb} muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <img src={cover.thumb} alt={cover.title} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            )}
          </BrowserFrame>
        )}

        {/* device chip */}
        <div className="absolute top-2 left-2 inline-flex items-center gap-1 bg-zinc-950/80 backdrop-blur px-2 py-1 rounded-full border border-zinc-700/50 text-[10px] text-zinc-300 font-medium">
          {isPhone ? <><Smartphone size={10} /> Mobile</> : <><Monitor size={10} /> Desktop</>}
        </div>

        {/* badge / coming-soon */}
        {cover.comingSoon ? (
          <div className="absolute top-2 right-2 inline-flex items-center gap-1 bg-amber-400/90 text-zinc-950 px-2.5 py-1 rounded-full text-[10px] font-bold">
            <Clock size={10} /> Coming Soon
          </div>
        ) : cover.badge ? (
          <div className="absolute top-2 right-2 inline-flex items-center gap-1 text-zinc-950 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `rgb(${accent})` }}>
            {cover.badge}
          </div>
        ) : null}

        {/* hover action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${cover.comingSoon ? 'bg-amber-400 text-zinc-950' : 'bg-white text-zinc-950'}`}>
            {cover.comingSoon ? <><Clock size={15} /> Coming Soon</> : isDashboard ? <><LayoutGrid size={15} /> Open</> : <><Maximize2 size={15} /> View</>}
          </span>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center gap-2.5 px-1 pt-3">
        <Icon size={16} style={{ color: `rgb(${accent})` }} className="shrink-0" />
        <div className="min-w-0">
          <h4 className="text-sm font-display font-bold text-zinc-100 truncate">{cover.title}</h4>
          {cover.subtitle && <p className="text-[11px] text-zinc-500 truncate">{cover.subtitle}</p>}
        </div>
      </div>
    </motion.button>
  );
}

export default function GraphicsVideo() {
  const [openGallery, setOpenGallery] = useState<GalleryKey | null>(null);
  const [dashboard, setDashboard] = useState<{ title: string; categories: MediaCategory[] } | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);

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

        {/* Category-grouped device previews */}
        <div className="flex flex-col gap-16">
          {CATEGORIES.map((cat) => {
            const items = covers.filter((c) => c.tab === cat.tab);
            if (!items.length) return null;
            const CatIcon = cat.icon;
            return (
              <div key={cat.tab}>
                {/* category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `rgba(${cat.accent},0.12)`, border: `1px solid rgba(${cat.accent},0.3)`, color: `rgb(${cat.accent})` }}
                  >
                    <CatIcon size={18} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-zinc-100">{cat.label}</h3>
                  <span className="text-xs font-mono text-zinc-600">{items.length}</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
                </div>
                {/* bento grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((cover) => (
                    <PreviewCard key={cover.title} cover={cover} accent={cat.accent} onClick={() => handleClick(cover)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
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
