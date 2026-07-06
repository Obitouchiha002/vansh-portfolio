import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  Cpu, CircuitBoard, Wrench, Router, Gauge, HardDrive, Zap, Thermometer,
  Cable, MemoryStick, Microscope, PlugZap, Terminal, CheckCircle2, Camera,
  GraduationCap, Plus, Minus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* =========================================================================
   HARDWARE LAB — hands-on IT & hardware, shown as an expandable skill tree.
   Rooted at the ITI (CHNM) trade. Each node opens to reveal advanced knowledge.
   Drop real photos in src/assets/hardware/ (assembly / motherboard / soldering /
   diagnostics / networking / optimization) to replace the illustrations.
   ========================================================================= */
const hwGlob = import.meta.glob('../assets/hardware/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const nameOf = (p: string) => (p.split('/').pop() || '').replace(/\.[^.]+$/, '').toLowerCase();
const CAP_KEYS = ['assembly', 'motherboard', 'soldering', 'diagnostics', 'networking', 'optimization'];
const hwByName: Record<string, string> = {};
const galleryExtras: string[] = [];
for (const [path, url] of Object.entries(hwGlob)) {
  const n = nameOf(path);
  if (CAP_KEYS.includes(n)) hwByName[n] = url;
  else galleryExtras.push(url);
}
const galleryImages = galleryExtras; // "On the bench" shows only your own dropped photos

const AMBER = '251,191,36';

/* ---- Hand-drawn line-art illustration per capability (amber on dark) ---- */
function HwArt({ k }: { k: string }) {
  const s = { fill: 'none', stroke: `rgb(${AMBER})`, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const dim = { ...s, stroke: `rgba(${AMBER},0.45)` };
  const art: Record<string, any> = {
    assembly: (
      <>
        <rect x="66" y="18" width="68" height="94" rx="7" {...s} />
        <circle cx="92" cy="42" r="13" {...s} /><circle cx="92" cy="42" r="3" {...dim} />
        <rect x="78" y="66" width="46" height="7" rx="2" {...s} />
        <rect x="78" y="80" width="46" height="5" rx="2" {...dim} />
        <rect x="78" y="90" width="30" height="5" rx="2" {...dim} />
        <circle cx="118" cy="30" r="2.4" {...s} /><circle cx="118" cy="38" r="2.4" {...dim} />
      </>
    ),
    motherboard: (
      <>
        <rect x="28" y="20" width="144" height="90" rx="7" {...s} />
        <rect x="46" y="36" width="34" height="34" rx="3" {...s} />
        <path d="M52 42h22M52 50h22M52 58h22" {...dim} />
        <rect x="98" y="40" width="20" height="20" rx="2" {...s} />
        <rect x="130" y="42" width="14" height="14" rx="2" {...dim} />
        <rect x="46" y="84" width="98" height="9" rx="2" {...s} />
        <path d="M118 66h34M118 74h26" {...dim} />
      </>
    ),
    soldering: (
      <>
        <path d="M150 26 L104 66" {...s} strokeWidth={7} />
        <path d="M104 66 L92 78" {...s} />
        <circle cx="90" cy="82" r="6" {...s} />
        <rect x="52" y="90" width="70" height="8" rx="2" {...dim} />
        <path d="M84 60c4 4 4 8 0 12M96 56c5 5 5 11 0 16" {...dim} strokeWidth={2.4} />
      </>
    ),
    diagnostics: (
      <>
        <rect x="58" y="24" width="70" height="86" rx="9" {...s} />
        <rect x="68" y="34" width="50" height="22" rx="3" {...s} />
        <path d="M76 45h10M92 41v8" {...dim} strokeWidth={2.4} />
        <circle cx="93" cy="82" r="15" {...s} /><path d="M93 82 L104 74" {...s} strokeWidth={2.4} />
        <path d="M74 110 L64 124M112 110 L122 124" {...dim} />
        <circle cx="64" cy="126" r="3" {...s} /><circle cx="122" cy="126" r="3" {...s} />
      </>
    ),
    networking: (
      <>
        <rect x="55" y="72" width="90" height="34" rx="6" {...s} />
        <path d="M74 44 L74 72M126 44 L126 72" {...s} />
        <circle cx="74" cy="42" r="3" {...s} /><circle cx="126" cy="42" r="3" {...s} />
        <path d="M78 40a26 26 0 0 1 44 0" {...dim} strokeWidth={2.4} />
        <path d="M86 48a15 15 0 0 1 28 0" {...dim} strokeWidth={2.4} />
        <circle cx="68" cy="89" r="2.6" {...s} /><circle cx="80" cy="89" r="2.6" {...dim} /><circle cx="92" cy="89" r="2.6" {...dim} />
      </>
    ),
    optimization: (
      <>
        <rect x="44" y="24" width="112" height="66" rx="6" {...s} />
        <path d="M58 74a34 34 0 0 1 68 0" {...s} />
        <path d="M92 74 L114 50" {...s} strokeWidth={2.4} /><circle cx="92" cy="74" r="4" {...s} />
        <path d="M86 104h28M100 90v14" {...dim} />
        <path d="M138 44 L146 36 L154 44M146 36v22" {...dim} strokeWidth={2.4} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
      {art[k]}
    </svg>
  );
}

type Cap = { key: string; title: string; desc: string; icon: LucideIcon; rgb: string; details: string[] };
const capabilities: Cap[] = [
  {
    key: 'assembly', title: 'PC Assembly & Building', icon: Cpu, rgb: '251,191,36',
    desc: 'Building custom PCs from bare components to a booting system.',
    details: [
      'Seat CPUs on LGA / AM4 / AM5 sockets and apply thermal paste correctly',
      'Mount air & AIO liquid coolers, manage fan curves',
      'Install RAM in dual-channel, enable XMP/EXPO profiles',
      'Fit GPU, M.2 NVMe & SATA drives, size the PSU and route cables cleanly',
      'Wire front-panel headers and do first BIOS boot & config',
    ],
  },
  {
    key: 'motherboard', title: 'Motherboard & Board Repair', icon: CircuitBoard, rgb: '245,158,11',
    desc: 'Component-level fault finding on dead or unstable boards.',
    details: [
      'Trace power rails and hunt shorts with thermal / freeze spray',
      'Replace MOSFETs, capacitors and small ICs',
      'Diagnose no-power / no-POST / no-display faults',
      'Reprogram / reflash BIOS chips with a CH341A programmer',
      'Read boardview & schematics to isolate the failing stage',
    ],
  },
  {
    key: 'soldering', title: 'Soldering & Rework', icon: Zap, rgb: '251,146,60',
    desc: 'Precision soldering, desoldering and connector repair.',
    details: [
      'Through-hole and SMD soldering with proper flux & tip control',
      'Hot-air rework for surface-mount components',
      'Desolder with wick & pump, clean pads and reflow joints',
      'Replace USB ports, DC jacks and broken connectors',
      'Repair lifted traces and broken wiring',
    ],
  },
  {
    key: 'diagnostics', title: 'Diagnostics & Testing', icon: Gauge, rgb: '234,179,8',
    desc: 'Measuring, testing and pinpointing the actual faulty part.',
    details: [
      'Use a multimeter for continuity, voltage and resistance checks',
      'Test PSU rails (3.3V / 5V / 12V) and read POST / beep codes',
      'Run MemTest for RAM and check drive health via SMART',
      'Monitor temps & throttling to catch cooling faults',
      'Swap-test to isolate a bad component fast',
    ],
  },
  {
    key: 'networking', title: 'Networking & Wi-Fi', icon: Router, rgb: '250,204,21',
    desc: 'Router setup, Wi-Fi tuning and LAN cabling.',
    details: [
      'Configure routers, firmware, SSIDs and WPA2 security',
      'Tune 2.4 / 5 GHz bands & channels to kill dead zones',
      'Crimp RJ45 cables to the T568B standard, test with a cable tester',
      'Set up IP / DHCP / DNS and port forwarding',
      'Troubleshoot connectivity and range issues',
    ],
  },
  {
    key: 'optimization', title: 'OS & Optimization', icon: HardDrive, rgb: '253,186,116',
    desc: 'Clean installs and squeezing speed out of low-end PCs.',
    details: [
      'Fresh Windows install via USB (Rufus), drivers & updates',
      'Debloat, trim startup apps and services',
      'Clone / migrate to SSD, tune RAM & virtual memory',
      'Low-end gaming & FPS optimization',
      'Malware cleanup and reliable backups',
    ],
  },
];

const tools = [
  { name: 'Multimeter', role: 'Voltage & continuity', photo: '/hardware-media/tool-multimeter.jpg' },
  { name: 'Soldering Iron', role: 'Solder & rework', photo: '/hardware-media/tool-soldering.jpg' },
  { name: 'Thermal Paste', role: 'CPU cooling', photo: '/hardware-media/tool-thermal.jpg' },
  { name: 'Precision Screwdrivers', role: 'Open & disassemble', photo: '/hardware-media/tool-screwdriver.jpg' },
  { name: 'Power Supply', role: 'PSU & power rails', photo: '/hardware-media/tool-psu.jpg' },
  { name: 'RJ45 Cable Tools', role: 'Crimp & network', photo: '/hardware-media/tool-cable.jpg' },
  { name: 'RAM & Storage', role: 'Memory modules', photo: '/hardware-media/tool-ram.jpg' },
  { name: 'Magnifier', role: 'Close inspection', photo: '/hardware-media/tool-magnifier.jpg' },
];

const diagnostics = [
  { label: 'Hardware repair & assembly', pct: 92 },
  { label: 'Diagnostics (multimeter)', pct: 88 },
  { label: 'Soldering & rework', pct: 85 },
  { label: 'OS install & optimization', pct: 90 },
  { label: 'Networking & Wi-Fi', pct: 78 },
];

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver((e) => e[0].isIntersecting && setSeen(true), { threshold: 0.25 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return { ref, seen };
}

function CapNode({ cap, open, onToggle }: { key?: string; cap: Cap; open: boolean; onToggle: () => void }) {
  const Icon = cap.icon;
  const [failed, setFailed] = useState(false);
  const img = hwByName[cap.key] || `/hardware-media/cap-${cap.key}.jpg`;
  const showImg = !!img && !failed;
  return (
    <div
      className="rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900/80 to-zinc-950 border transition-all duration-300"
      style={{ borderColor: open ? `rgba(${cap.rgb},0.5)` : 'rgb(39,39,42)', boxShadow: open ? `0 0 40px -14px rgba(${cap.rgb},0.6)` : 'none' }}
    >
      <button onClick={onToggle} className="w-full text-left group">
        {/* illustration / photo */}
        <div className="relative aspect-[16/9] overflow-hidden border-b border-zinc-800" style={{ background: `radial-gradient(120% 90% at 50% 0%, rgba(${cap.rgb},0.10), #09090b 72%)` }}>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(${cap.rgb},1) 1px,transparent 1px),linear-gradient(90deg,rgba(${cap.rgb},1) 1px,transparent 1px)`, backgroundSize: '22px 22px' }} />
          {showImg ? (
            <img src={img} alt={cap.title} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 p-4 flex items-center justify-center">
              <div className="w-2/3 h-full transition-transform duration-500 group-hover:scale-105"><HwArt k={cap.key} /></div>
            </div>
          )}
          <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-zinc-950/80 backdrop-blur border flex items-center justify-center" style={{ borderColor: `rgba(${cap.rgb},0.35)`, color: `rgb(${cap.rgb})` }}>
            <Icon size={18} />
          </div>
        </div>
        {/* title row */}
        <div className="p-5 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-zinc-100">{cap.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mt-1">{cap.desc}</p>
          </div>
          <span
            className="mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors"
            style={{ background: `rgba(${cap.rgb},0.12)`, border: `1px solid rgba(${cap.rgb},0.35)`, color: `rgb(${cap.rgb})` }}
          >
            {open ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </div>
      </button>

      {/* expandable advanced knowledge */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: `rgb(${cap.rgb})` }}>What I can do</p>
              <ul className="flex flex-col gap-2.5">
                {cap.details.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: `rgb(${cap.rgb})` }} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HardwareLab() {
  const bars = useInView<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>('assembly');

  return (
    <section id="hardware" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12 text-center items-center"
        >
          <div className="inline-flex items-center gap-2 text-amber-400">
            <CircuitBoard size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Hardware Lab</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Hands-On <span className="text-amber-400">Hardware Technician</span>
          </h2>
          <div className="w-20 h-1 bg-amber-400 rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-2 text-lg">
            Trained in a government ITI hardware trade — I build, repair and network computers by hand. Tap any skill to expand it.
          </p>
        </motion.div>

        {/* skill tree */}
        <div className="relative">
          {/* trunk */}
          <div className="absolute top-0 bottom-0 left-[22px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-amber-400 via-amber-500/60 to-transparent" />

          {/* ITI root credential */}
          <div className="relative flex justify-start md:justify-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10 ml-9 md:ml-0 max-w-md rounded-2xl bg-zinc-900 border border-amber-400/40 shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)] p-5 flex items-center gap-4"
            >
              <div className="w-14 h-14 shrink-0 rounded-xl bg-amber-400/12 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <GraduationCap size={28} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                  <CheckCircle2 size={11} /> ITI Certified
                </div>
                <h3 className="font-display font-bold text-zinc-100 leading-tight">CHNM — Computer Hardware & Network Maintenance</h3>
                <p className="text-zinc-500 text-xs mt-1">Government ITI trade · hands-on hardware, repair & networking foundation</p>
              </div>
            </motion.div>
          </div>

          {/* capability nodes */}
          <div className="flex flex-col gap-10 md:gap-12">
            {capabilities.map((cap, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={cap.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* node dot */}
                  <span
                    className="absolute left-[22px] md:left-1/2 -translate-x-1/2 top-7 z-10 w-4 h-4 rounded-full border-2 bg-zinc-950"
                    style={{ borderColor: `rgb(${cap.rgb})`, boxShadow: `0 0 14px rgba(${cap.rgb},0.7)` }}
                  />
                  {/* connectors both sides */}
                  <span className={`hidden md:block absolute top-[34px] h-[2px] w-12 ${left ? 'right-1/2 mr-2' : 'left-1/2 ml-2'}`} style={{ background: `linear-gradient(${left ? 'to left' : 'to right'}, rgba(${cap.rgb},0.7), transparent)` }} />
                  <span className={`hidden md:block absolute top-[34px] h-[2px] w-10 ${left ? 'left-1/2 ml-2' : 'right-1/2 mr-2'}`} style={{ background: `linear-gradient(${left ? 'to right' : 'to left'}, rgba(${cap.rgb},0.4), transparent)` }} />

                  <div className={`pl-14 md:pl-0 md:w-[calc(50%-3.5rem)] ${left ? '' : 'md:ml-auto'}`}>
                    <CapNode cap={cap} open={open === cap.key} onToggle={() => setOpen(open === cap.key ? null : cap.key)} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* technical diagnostic panel */}
        <div ref={bars.ref} className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl mt-20">
          <div className="h-9 bg-zinc-900 flex items-center gap-2 px-4 border-b border-zinc-800">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-amber-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
            <span className="ml-2 text-[11px] font-mono text-zinc-500 inline-flex items-center gap-1.5"><Terminal size={12} /> hardware-diagnostics.sh</span>
          </div>
          <div className="p-6 font-mono">
            <p className="text-xs text-zinc-500 mb-1">$ run diagnostics --tech "Vansh Kashyap"</p>
            <p className="text-xs text-green-400 mb-5">✓ system check complete — skill levels:</p>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {diagnostics.map((d, i) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-zinc-300">{d.label}</span>
                    <span className="text-amber-400 font-bold">{d.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={bars.seen ? { width: `${d.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500/70 to-amber-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* tools of the trade — real photos */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-amber-400/12 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Wrench size={18} />
            </div>
            <h3 className="font-display font-bold text-lg text-zinc-100">My hardware toolkit</h3>
            <span className="text-xs font-mono text-zinc-600">{tools.length}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {tools.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-amber-400/40 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-zinc-800 relative">
                  <img src={t.photo} alt={t.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                </div>
                <div className="p-3.5">
                  <h4 className="font-display font-bold text-zinc-100 text-sm leading-tight">{t.name}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* on the bench gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-amber-400/12 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Camera size={18} />
              </div>
              <h3 className="font-display font-bold text-lg text-zinc-100">On the bench</h3>
              <span className="text-xs font-mono text-zinc-600">{galleryImages.length}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-zinc-800"
                >
                  <img src={src} alt="Hardware work" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
