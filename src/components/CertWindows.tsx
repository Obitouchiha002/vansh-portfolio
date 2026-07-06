import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, ShieldCheck, ArrowUpRight, Check } from 'lucide-react';

/* ============================================================
   CERTIFICATE WINDOWS — the real certificate scans, framed like
   glass windows in a zig-zag wall, each with a "what I learned"
   panel in the gap beside it. Click a window to focus in full-size.
   ============================================================ */

type Cert = { title: string; issuer: string; img: string; rgb: string; learned: string; skills: string[] };

const CERTS: Cert[] = [
  {
    title: 'Computer Hardware & Networking',
    issuer: 'ITI Mangolpuri · NCVT',
    img: '/ITI .jpeg',
    rgb: '251,146,60',
    learned: 'My core technical training — where I learned to build and fix computers from the ground up.',
    skills: ['PC Assembly & Repair', 'Networking Fundamentals', 'OS Installation', 'Troubleshooting', 'System Maintenance'],
  },
  {
    title: 'Skill Saksham Program',
    issuer: 'Microsoft · Edunet Foundation',
    img: '/skill saksham certificate.jpg',
    rgb: '0,229,255',
    learned: 'A Microsoft program that sharpened my AI basics, office tools and professional communication.',
    skills: ['AI Basics', 'MS Office', 'Communication Skills'],
  },
  {
    title: 'Tally with GST',
    issuer: 'STP Computer Education',
    img: '/tally prime certificate.jpg',
    rgb: '34,211,238',
    learned: 'The finance side — real accounting and GST billing that pairs well with my B.Com.',
    skills: ['Tally Prime', 'GST Billing & Invoicing', 'Accounting', 'Ledger Entry', 'Financial Reports'],
  },
  {
    title: 'Basic Computer Course',
    issuer: 'STP Computer Education',
    img: '/basic computer certificate (1).jpg',
    rgb: '244,114,182',
    learned: 'Where the fundamentals were locked in — the everyday computer skills everything else builds on.',
    skills: ['Computer Fundamentals', 'Word · Excel · PowerPoint', 'Internet & Email', 'File Management', 'Typing'],
  },
  {
    title: 'Hardware Assembly',
    issuer: 'Allied Engineering Works Pvt Ltd',
    img: '/Allied Engineering .jpeg',
    rgb: '0,255,157',
    learned: 'An internship on the workshop floor — putting my ITI training to work on real machines.',
    skills: ['Hardware Assembly', 'Component Testing', 'Technical Exposure'],
  },
  {
    title: 'Electronic System Design',
    issuer: 'Elios Management Consulting',
    img: '/Elios Management Consulting.jpeg',
    rgb: '192,132,252',
    learned: 'My first internship — real industry exposure to how electronic systems are designed and built.',
    skills: ['Electronic System Design', 'Circuit Basics', 'Industry Workflow'],
  },
  {
    title: 'Pariksha Pe Charcha 2024',
    issuer: 'Participation Certificate',
    img: '/Pariksha Pe Charcha 2024.png',
    rgb: '129,140,248',
    learned: 'A national student initiative — a reminder to keep learning with the right mindset.',
    skills: ['Academic Awareness', 'Motivation', 'Exam Strategy'],
  },
];

function Detail({ c, align }: { c: Cert; align: 'left' | 'right' }) {
  const right = align === 'right';
  return (
    <div className={`flex flex-col ${right ? 'md:items-end md:text-right' : ''}`}>
      <span className="text-[11px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: `rgb(${c.rgb})`, textShadow: `0 0 14px rgba(${c.rgb},0.5)` }}>What I learned</span>
      <p className="text-zinc-300 text-sm leading-relaxed max-w-sm mb-4">{c.learned}</p>
      <div className={`flex flex-wrap gap-1.5 ${right ? 'md:justify-end' : ''}`}>
        {c.skills.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Check size={11} style={{ color: `rgb(${c.rgb})` }} /> {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Window({ c, i, onOpen }: { key?: string; c: Cert; i: number; onOpen: () => void }) {
  const left = i % 2 === 0;
  return (
    <div className="relative">
      {/* node on the spine */}
      <span className="absolute left-[18px] md:left-1/2 -translate-x-1/2 top-6 z-20 w-3.5 h-3.5 rounded-full border-2 bg-zinc-950" style={{ borderColor: `rgb(${c.rgb})`, boxShadow: `0 0 12px rgba(${c.rgb},0.7)` }} />
      {/* connector (desktop) */}
      <span className={`hidden md:block absolute top-[30px] h-[2px] w-8 ${left ? 'right-1/2 mr-2' : 'left-1/2 ml-2'}`} style={{ background: `linear-gradient(${left ? 'to left' : 'to right'}, rgb(${c.rgb}), transparent)` }} />

      {/* detail panel in the opposite gap (desktop) */}
      <div className={`hidden md:flex md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[calc(50%-3rem)] ${left ? 'md:right-0 md:pl-2' : 'md:left-0 md:pr-2'}`}>
        <Detail c={c} align={left ? 'left' : 'right'} />
      </div>

      <div className={`pl-12 md:pl-0 md:w-[calc(50%-2.25rem)] ${left ? '' : 'md:ml-auto'}`}>
        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="group block text-left w-full"
          style={{ ['--r' as string]: c.rgb }}
        >
          {/* window frame (aluminium) */}
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-zinc-600/40 to-zinc-800/60 border border-zinc-600/40 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-25px_rgb(var(--r))]">
            {/* top rail */}
            <div className="flex items-center gap-2 px-2 pb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: `rgb(${c.rgb})`, boxShadow: `0 0 8px rgb(${c.rgb})` }} />
              <span className="text-[11px] font-mono text-zinc-400 truncate">{c.issuer}</span>
              <Maximize2 size={13} className="ml-auto text-zinc-500 group-hover:text-zinc-200 transition-colors" />
            </div>
            {/* glass pane */}
            <div className="relative rounded-xl overflow-hidden border border-black/50 bg-zinc-950">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={encodeURI(c.img)} alt={c.title} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <span className="pointer-events-none absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity duration-500" style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.14) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.06) 100%)' }} />
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 0 60px -12px rgba(${c.rgb},0.5)` }} />
              <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-semibold text-white">Click to focus</span>
                <ArrowUpRight size={15} style={{ color: `rgb(${c.rgb})` }} />
              </div>
            </div>
            {/* plaque */}
            <div className="flex items-center gap-2 px-2 pt-2">
              <ShieldCheck size={14} style={{ color: `rgb(${c.rgb})` }} />
              <span className="text-sm font-display font-semibold text-zinc-100 truncate">{c.title}</span>
            </div>
          </div>
        </motion.button>

        {/* detail below the window on mobile */}
        <div className="md:hidden mt-5">
          <Detail c={c} align="left" />
        </div>
      </div>
    </div>
  );
}

export default function CertWindows() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const cert = active !== null ? CERTS[active] : null;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-zinc-900/20">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16 md:items-center md:text-center"
        >
          <div className="inline-flex items-center gap-2 text-neon-cyan md:justify-center">
            <ShieldCheck size={18} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Proof of work</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            The <span className="text-neon-cyan" style={{ textShadow: '0 0 22px rgba(0,238,226,0.5)' }}>Certificates</span>
          </h2>
          <div className="w-20 h-1 bg-neon-cyan rounded-full md:mx-auto" />
          <p className="text-zinc-400 max-w-2xl text-lg">
            Every real certificate, framed in its own window — with what I actually took away from each. Tap any one to focus in and read it full-size.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-6 bottom-6 left-[18px] md:left-1/2 -translate-x-1/2 w-[2px] bg-zinc-800" />
          <div className="relative flex flex-col gap-16 md:gap-20">
            {CERTS.map((c, i) => (
              <Window key={c.title + i} c={c} i={i} onOpen={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* focus lightbox */}
      <AnimatePresence>
        {cert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="absolute inset-0 bg-zinc-950/92 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden border shadow-2xl bg-zinc-900"
              style={{ borderColor: `rgba(${cert.rgb},0.4)` }}
            >
              <div className="flex items-center gap-3 p-5 border-b border-zinc-800 bg-zinc-900/70 backdrop-blur">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `rgba(${cert.rgb},0.15)`, color: `rgb(${cert.rgb})` }}>
                  <ShieldCheck size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-zinc-100 truncate">{cert.title}</h3>
                  <p className="text-xs text-zinc-500 truncate">{cert.issuer}</p>
                </div>
                <button onClick={() => setActive(null)} className="ml-auto p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                  <X size={22} />
                </button>
              </div>
              <div className="bg-zinc-950 p-4 md:p-8 flex items-center justify-center max-h-[74vh] overflow-auto">
                <img src={encodeURI(cert.img)} alt={cert.title} className="max-w-full h-auto rounded-lg border border-zinc-800 shadow-2xl" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
