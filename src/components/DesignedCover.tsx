import type { LucideIcon } from 'lucide-react';
import { Moon, Sparkle } from 'lucide-react';

export type CoverFrame = { src: string; video?: boolean };

/* A generated, on-brand cover banner that mirrors the look of the designed
   banners (Poster Designs, Gaming Montage, etc.): glossy two-line title up top,
   a caps subtitle, and a film-strip of real sample frames, over a dark glow. */
export default function DesignedCover({
  title,
  subtitle,
  Icon,
  from,
  to,
  frames = [],
}: {
  title: string;
  subtitle?: string;
  Icon: LucideIcon;
  from: string; // "r,g,b"
  to: string; // "r,g,b"
  frames?: CoverFrame[];
}) {
  const words = title.split(' ');
  const line1 = words.length >= 2 ? words[0] : title;
  const line2 = words.length >= 2 ? words.slice(1).join(' ') : '';

  const strip = frames.slice(0, 3);
  while (strip.length < 3) strip.push({ src: '' }); // pad with gradient placeholders

  // a few decorative stars (fixed positions so it doesn't need randomness)
  const stars = [
    { top: '12%', left: '20%', s: 10, o: 0.7 },
    { top: '22%', left: '72%', s: 7, o: 0.5 },
    { top: '34%', left: '12%', s: 6, o: 0.4 },
    { top: '14%', left: '54%', s: 8, o: 0.6 },
    { top: '40%', left: '84%', s: 7, o: 0.45 },
  ];

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at 50% 120%, rgba(${from},0.35), transparent 60%), radial-gradient(circle at 15% 10%, rgba(${to},0.18), transparent 55%), linear-gradient(180deg,#0c0c10,#070709)`,
      }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* moon + stars */}
      <Moon className="absolute top-3 right-4 text-zinc-300/40" size={18} />
      {stars.map((st, i) => (
        <Sparkle key={i} className="absolute text-white" style={{ top: st.top, left: st.left, width: st.s, height: st.s, opacity: st.o }} />
      ))}

      {/* Title block */}
      <div className="absolute top-[14%] left-0 right-0 px-6 text-center">
        <h3 className="font-display font-extrabold uppercase leading-[0.95] tracking-tight">
          <span
            className="block text-2xl md:text-[2rem] text-transparent bg-clip-text"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${from}), #ffffff, rgb(${to}))` }}
          >
            {line1}
          </span>
          {line2 && (
            <span className="block text-lg md:text-2xl text-white/90 tracking-[0.12em]">{line2}</span>
          )}
        </h3>
        {subtitle && (
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-2">{subtitle}</p>
        )}
      </div>

      {/* Film strip with sample frames */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[88%]" style={{ transform: 'translateX(-50%) rotate(-1.5deg)' }}>
        <div className="relative rounded-md bg-zinc-950/85 border border-white/10 px-1.5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {/* sprocket holes */}
          <div className="absolute left-2 right-2 top-[3px] h-[5px] rounded-sm" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.45) 0 4px, transparent 4px 9px)' }} />
          <div className="absolute left-2 right-2 bottom-[3px] h-[5px] rounded-sm" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.45) 0 4px, transparent 4px 9px)' }} />
          <div className="flex gap-1.5 py-1.5">
            {strip.map((f, i) => (
              <div key={i} className="flex-1 aspect-video rounded-sm overflow-hidden border border-white/10 bg-zinc-900">
                {f.src ? (
                  f.video ? (
                    <video src={f.src} muted playsInline preload="metadata" className="w-full h-full object-cover" />
                  ) : (
                    <img src={f.src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="w-full h-full" style={{ background: `linear-gradient(135deg, rgba(${from},0.5), rgba(${to},0.4))` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* faint corner watermark icon */}
      <Icon className="absolute -left-4 top-1/2 -translate-y-1/2" style={{ width: 90, height: 90, color: `rgb(${from})`, opacity: 0.1 }} />
    </div>
  );
}
