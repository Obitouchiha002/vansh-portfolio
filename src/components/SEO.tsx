import { motion } from 'motion/react';
import { ExternalLink, Search, FileCode2, Link2, Tags, Gauge, ScanSearch, BadgeCheck, TrendingUp } from 'lucide-react';

/* =========================================================================
   SEO WORK — real client websites I've optimized for Google search.
   To add a site: copy one block in `seoSites`, drop its screenshot in
   /public/seo-shots/<file>.png and list the SEO services performed.
   ========================================================================= */

/* Multicolor Google "G" — inline so it works offline, no external asset. */
const GoogleG = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

type ServiceKey = 'search-console' | 'sitemap' | 'onpage' | 'offpage' | 'meta' | 'keywords' | 'indexing' | 'speed';

const SERVICES: Record<ServiceKey, { label: string; icon: any; color: string; google?: boolean }> = {
  'search-console': { label: 'Google Search Console', icon: null, color: '66,133,244', google: true },
  sitemap: { label: 'Sitemap Submission', icon: null, color: '52,168,83', google: true },
  onpage: { label: 'On-Page SEO', icon: FileCode2, color: '52,211,153' },
  offpage: { label: 'Off-Page SEO', icon: Link2, color: '167,139,250' },
  meta: { label: 'Meta & Schema', icon: Tags, color: '56,189,248' },
  keywords: { label: 'Keyword Research', icon: Search, color: '251,146,60' },
  indexing: { label: 'Indexing & Crawl', icon: ScanSearch, color: '244,114,182' },
  speed: { label: 'Core Web Vitals', icon: Gauge, color: '250,204,21' },
};

type SeoSite = {
  name: string;
  domain: string;
  url: string;
  image: string;
  tagline: string;
  description: string;
  services: ServiceKey[];
  accent: string; // "r,g,b"
};

const seoSites: SeoSite[] = [
  {
    name: 'RealtyResolve',
    domain: 'realtyresolve.in',
    url: 'https://www.realtyresolve.in/',
    image: '/seo-shots/realtyresolve.png',
    tagline: 'RERA, Builder Disputes & Tax Notice Help',
    description:
      'A pan-India legal-services brand for RERA complaints, builder disputes and income-tax notices. I handled the complete SEO — technical setup, sitemap, Search Console and on/off-page work — to rank for high-intent legal queries.',
    services: ['search-console', 'sitemap', 'onpage', 'offpage', 'meta', 'keywords', 'indexing'],
    accent: '234,88,12',
  },
  {
    name: 'Grivaa Capital',
    domain: 'grivaacapital.com',
    url: 'https://grivaacapital.com/',
    image: '/seo-shots/grivaa.png',
    tagline: 'Investment Advisory & Equity Research',
    description:
      'A boutique investment-advisory firm. Delivered end-to-end SEO — sitemap submission, Search Console monitoring, structured on-page optimisation and off-page authority building for competitive finance keywords.',
    services: ['search-console', 'sitemap', 'onpage', 'offpage', 'speed', 'keywords'],
    accent: '220,38,38',
  },
  {
    name: 'Abhishek Aggarwal',
    domain: 'abhishekaggarwal.co',
    url: 'https://abhishekaggarwal.co/',
    image: '/seo-shots/abhishek.png',
    tagline: 'Grivaa Capital — Knowledge Partner',
    description:
      'A personal-authority site for a CFP and investment advisor. Optimised for name + niche searches with clean site structure, schema markup and a full Google Search Console + sitemap setup.',
    services: ['search-console', 'sitemap', 'onpage', 'meta', 'indexing'],
    accent: '37,99,235',
  },
];

/* One optimised screenshot inside a mac-style browser chrome. */
function BrowserPreview({ image, domain, accent }: { image: string; domain: string; accent: string }) {
  return (
    <div className="relative group/preview">
      <div className="absolute -inset-6 rounded-full blur-3xl -z-10 opacity-60" style={{ background: `rgba(${accent},0.18)` }} />
      <div className="rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        {/* chrome bar */}
        <div className="h-10 bg-zinc-800/90 flex items-center gap-2 px-4 border-b border-zinc-700/50">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <div className="ml-3 h-5 flex-1 max-w-[280px] rounded-full bg-zinc-900/80 border border-zinc-700/40 flex items-center gap-1.5 px-3">
            <BadgeCheck size={11} className="text-emerald-400 shrink-0" />
            <span className="text-[10px] text-zinc-400 font-mono truncate">{domain}</span>
          </div>
        </div>
        {/* screenshot — reveals more on hover */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          <img
            src={image}
            alt={domain}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[3000ms] ease-out group-hover/preview:object-bottom"
          />
        </div>
      </div>
    </div>
  );
}

export default function SEO() {
  return (
    <section id="seo" className="py-24 relative overflow-hidden">
      {/* ambient backdrop */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 text-emerald-400">
            <Search size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Search Engine Optimization</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            SEO That <span className="text-emerald-400">Ranks</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Real client websites I've optimized end-to-end — from Google Search Console and sitemaps to on-page and off-page SEO.
          </p>
        </motion.div>

        {/* Google tools strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-16 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Tools I use</span>
          {['Google Search Console', 'Google Sitemaps', 'PageSpeed Insights', 'Keyword Research'].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300">
              <GoogleG size={14} /> {t}
            </span>
          ))}
        </motion.div>

        {/* Site case-studies — alternating premium rows */}
        <div className="flex flex-col gap-24 md:gap-28">
          {seoSites.map((site, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={site.domain} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={reversed ? 'lg:order-2' : ''}
                >
                  <BrowserPreview image={site.image} domain={site.domain} accent={site.accent} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={reversed ? 'lg:order-1' : ''}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: `rgba(${site.accent},0.12)`, border: `1px solid rgba(${site.accent},0.35)`, color: `rgb(${site.accent})` }}>
                    <BadgeCheck size={13} /> Live · Indexed on Google
                  </div>

                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white">{site.name}</h3>
                  <p className="font-medium mt-1" style={{ color: `rgb(${site.accent})` }}>{site.tagline}</p>
                  <p className="text-zinc-400 leading-relaxed mt-4 text-lg">{site.description}</p>

                  {/* SEO delivered — chips with icons */}
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-7 mb-3">SEO delivered</p>
                  <div className="flex flex-wrap gap-2.5">
                    {site.services.map((key, k) => {
                      const s = SERVICES[key];
                      const Icon = s.icon;
                      return (
                        <motion.span
                          key={key}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: k * 0.05 }}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-600 transition-colors"
                        >
                          {s.google ? <GoogleG size={14} /> : <Icon size={14} style={{ color: `rgb(${s.color})` }} />}
                          {s.label}
                        </motion.span>
                      );
                    })}
                  </div>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-bold text-zinc-950 transition-transform hover:-translate-y-0.5"
                    style={{ background: `rgb(${site.accent})` }}
                  >
                    Visit Live Site <ExternalLink size={17} />
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="inline-flex items-center gap-2 text-zinc-400 font-medium">
            <TrendingUp size={16} className="text-emerald-400" />
            Want your site to rank on Google?{' '}
            <a href="#contact" className="text-emerald-400 hover:underline">Let's talk SEO</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
