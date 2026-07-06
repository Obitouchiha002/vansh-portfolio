import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Loader2, MapPin, Phone, Mail, Linkedin, Youtube, Instagram, Globe } from 'lucide-react';
import { jsPDF } from 'jspdf';

/* =========================================================================
   IN-SITE RESUME — single A4 page, dense but clean, always in sync with the
   site. "Download PDF" rebuilds the exact sheet as vector text (jsPDF) so it
   stays selectable and prints on one page. Edit the data blocks below.
   ========================================================================= */
const profile =
  'Self-taught AI-powered creator and builder from Delhi, working where AI, automation and design meet. I ship live web & app products, design n8n automations, and create content under my brand Tech By Vansh — backed by ITI training in computer hardware & networking.';

const highlights = [
  { v: '7+', k: 'Live Products' },
  { v: '3', k: 'Automations' },
  { v: '493+', k: 'Subscribers' },
  { v: '300K+', k: 'Views' },
];

const skillGroups = [
  { title: 'AI & Automation', items: ['AI Tools & Prompting', 'n8n Workflow Automation', 'AI Content Creation'] },
  { title: 'Development', items: ['React', 'Tailwind CSS', 'Firebase', 'REST APIs'] },
  { title: 'Design & Video', items: ['Photoshop', 'Premiere Pro', 'After Effects', 'Figma'] },
  { title: 'IT & Hardware', items: ['PC Assembly & Repair', 'Networking', 'Troubleshooting'] },
];

const tools = ['ChatGPT', 'Claude', 'Gemini', 'n8n', 'Make', 'Zapier', 'Photoshop', 'Premiere Pro', 'DaVinci Resolve', 'Figma', 'React', 'Tailwind', 'Firebase', 'Vercel', 'Git'];

const experience = [
  {
    role: 'Creator & Automation Builder',
    org: 'Tech By Vansh (Self-employed)',
    period: 'Present',
    point: 'Ship web/app products, design n8n automations, and grow content to 493+ subscribers & 300K+ views.',
  },
  {
    role: 'Skill Saksham Program',
    org: 'Microsoft · Edunet Foundation',
    period: 'Apr – May 2025',
    point: 'Training in AI, MS Office and professional communication.',
  },
  {
    role: 'Hardware Assembly Intern',
    org: 'Allied Engineering Works Pvt Ltd',
    period: 'Mar – Apr 2025',
    point: 'Hands-on computer hardware assembly & testing on the workshop floor.',
  },
  {
    role: 'Electronic System Design Intern',
    org: 'Elios Management Consulting',
    period: 'Dec 2024 – Mar 2025',
    point: 'Worked on electronic system design fundamentals in an industry setting.',
  },
];

const projects = [
  { name: 'Creator Tracker', desc: 'AI tool that scans YouTube creators and surfaces viral ideas & keywords.', tech: 'React · YouTube API · AI' },
  { name: 'Vedic Astra', desc: 'AI-powered Vedic astrology — birth charts, dashas & AI readings.', tech: 'React · AI', link: 'vedicastra.vercel.app' },
  { name: 'VanshLink', desc: 'Private, real-time chat app with full user control.', tech: 'React · Firebase', link: 'vanshlink.vercel.app' },
  { name: 'Aura Player', desc: 'Offline MP3/MP4 player with integrated online music.', tech: 'React · Web Audio API' },
  { name: 'Kairo', desc: 'Daily-mission app to level up real-life social habits.', tech: 'React · Tailwind' },
  { name: 'vthumb', desc: 'Instant Max-Res YouTube thumbnail downloader.', tech: 'React · YouTube API', link: 'vthumb.vercel.app' },
];

const clientSites = 'Grivaa Capital · Grivaa Tracker · Realty Resolve · Abhishek Aggarwal — websites built & SEO';

const automations = [
  { name: 'LinkedIn Leads Enrichment', desc: 'Scrapes Apollo leads and enriches each with a verified email, profile & post summaries via AI.' },
  { name: 'Facebook Comments Pipeline', desc: 'Pulls page posts, fetches every comment, then merges & structures them into a clean dataset.' },
  { name: 'YouTube → SEO Blog', desc: 'Turns any YouTube link into a full SEO blog + cover image with GPT-4o, emailed automatically.' },
];

const education = [
  { degree: 'B.Com (Honours)', school: 'Delhi University (SOL)', meta: 'Present' },
  { degree: 'ITI – Computer Hardware & Networking', school: 'NCVT, Mangolpuri', meta: '2025 · 85%' },
  { degree: '12th (CBSE)', school: 'CBSE Board', meta: '2024 · 72.8%' },
  { degree: '10th (CBSE)', school: 'CBSE Board', meta: '2022 · 73.8%' },
];

const certifications = [
  'Microsoft Skill Saksham',
  'ITI – Hardware & Networking (85%)',
  'Tally with GST — STP',
  'Basic Computer Course — STP',
  'Industrial Training — Allied Eng.',
  'Electronic System Design — Elios',
  'Pariksha Pe Charcha 2024',
];

function SidebarHeading({ children }: { children: any }) {
  return <h3 className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-emerald-700 mb-2">{children}</h3>;
}
function MainHeading({ children }: { children: any }) {
  return <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-zinc-800 border-b-2 border-emerald-600 pb-1 mb-2.5">{children}</h3>;
}

export default function ResumeViewer() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const W = pdf.internal.pageSize.getWidth();
      const M = 12;
      const EM: [number, number, number] = [5, 150, 105];
      const DARK: [number, number, number] = [24, 24, 27];
      const TXT: [number, number, number] = [39, 39, 42];
      const GRAY: [number, number, number] = [90, 90, 99];

      const dot = (x: number, y: number, c: [number, number, number], r = 0.6) => {
        pdf.setFillColor(c[0], c[1], c[2]);
        pdf.circle(x + 0.6, y - 1.1, r, 'F');
      };

      // ---- Header band ----
      pdf.setFillColor(DARK[0], DARK[1], DARK[2]);
      pdf.rect(0, 0, W, 42, 'F');
      pdf.setFillColor(EM[0], EM[1], EM[2]);
      pdf.rect(0, 42, W, 1.2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(25);
      pdf.text('Vansh Kashyap', M, 18);
      pdf.setFontSize(10.5);
      pdf.setTextColor(52, 211, 153);
      pdf.text('AI-Powered Creator  ·  Automation Builder  ·  Developer', M, 25);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(212, 212, 216);
      pdf.text('New Delhi, India      +91 8800628376      vk1234888i@gmail.com      techbyvansh.vercel.app', M, 32);
      pdf.text('LinkedIn: Vansh Kashyap        YouTube: Tech By Vansh        Instagram: @vanshkashyap70', M, 37.5);

      // ---- Columns ----
      const xL = M, wL = 52;
      const xM = 72, wM = W - M - 72;
      let yL = 52, yM = 52;

      const sideHead = (t: string) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(EM[0], EM[1], EM[2]);
        pdf.text(t.toUpperCase(), xL, yL); yL += 5;
      };
      const mainHead = (t: string) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(11); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
        pdf.text(t.toUpperCase(), xM, yM);
        pdf.setDrawColor(EM[0], EM[1], EM[2]); pdf.setLineWidth(0.5); pdf.line(xM, yM + 1.5, xM + wM, yM + 1.5);
        yM += 6.5;
      };

      /* ---------------- SIDEBAR ---------------- */
      // Skills (grouped)
      sideHead('Skills');
      skillGroups.forEach((g) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.3); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
        pdf.text(g.title, xL, yL); yL += 3.9;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        const lines = pdf.splitTextToSize(g.items.join(' · '), wL);
        pdf.text(lines, xL, yL); yL += lines.length * 3.6 + 2.4;
      });
      yL += 1.5;

      // Tools
      sideHead('Tools');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
      const toolLines = pdf.splitTextToSize(tools.join('  ·  '), wL);
      pdf.text(toolLines, xL, yL); yL += toolLines.length * 3.7 + 3;

      // Education
      sideHead('Education');
      education.forEach((e) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.4); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
        const dl = pdf.splitTextToSize(e.degree, wL); pdf.text(dl, xL, yL); yL += dl.length * 3.7;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.6); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        pdf.text(e.school, xL, yL); yL += 3.3;
        pdf.setTextColor(EM[0], EM[1], EM[2]); pdf.text(e.meta, xL, yL); yL += 4.8;
      });
      yL += 1;

      // Certifications
      sideHead('Certifications');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.8); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
      certifications.forEach((c) => {
        const cl = pdf.splitTextToSize(c, wL - 3);
        dot(xL, yL, EM, 0.5); pdf.text(cl, xL + 2.6, yL); yL += cl.length * 3.5 + 1.2;
      });
      yL += 1.5;

      // Languages
      sideHead('Languages');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
      pdf.text('Hindi (Native) · English (Professional)', xL, yL);

      /* ---------------- MAIN ---------------- */
      // Profile
      mainHead('Profile');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
      const pl = pdf.splitTextToSize(profile, wM); pdf.text(pl, xM, yM); yM += pl.length * 4.2 + 2.5;
      // highlight chips
      const chipW = wM / 4;
      highlights.forEach((h, i) => {
        const cx = xM + i * chipW;
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(11); pdf.setTextColor(EM[0], EM[1], EM[2]);
        pdf.text(h.v, cx, yM);
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        pdf.text(h.k, cx, yM + 3.6);
      });
      yM += 9;

      // Experience
      mainHead('Experience');
      experience.forEach((x) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9.4); pdf.setTextColor(DARK[0], DARK[1], DARK[2]);
        pdf.text(x.role, xM, yM);
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.6); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        pdf.text(x.period, xM + wM, yM, { align: 'right' });
        yM += 3.9;
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(EM[0], EM[1], EM[2]);
        pdf.text(x.org, xM, yM); yM += 3.9;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8.2); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        const ptl = pdf.splitTextToSize(x.point, wM - 3);
        dot(xM, yM, GRAY, 0.5); pdf.text(ptl, xM + 2.6, yM); yM += ptl.length * 3.6 + 2.6;
      });

      // Projects
      mainHead('Selected Projects');
      projects.forEach((p) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.8); pdf.setTextColor(DARK[0], DARK[1], DARK[2]);
        pdf.text(p.name, xM, yM);
        if (p.link) {
          pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.4); pdf.setTextColor(EM[0], EM[1], EM[2]);
          pdf.text(p.link, xM + wM, yM, { align: 'right' });
        }
        yM += 3.7;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        const dl = pdf.splitTextToSize(p.desc + '   (' + p.tech + ')', wM);
        pdf.text(dl, xM, yM); yM += dl.length * 3.5 + 2.2;
      });
      pdf.setFont('helvetica', 'italic'); pdf.setFontSize(7.6); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
      pdf.text(pdf.splitTextToSize(clientSites, wM), xM, yM); yM += 5.5;

      // Automation
      mainHead('Automation Workflows (n8n)');
      automations.forEach((a) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.6); pdf.setTextColor(DARK[0], DARK[1], DARK[2]);
        pdf.text(a.name, xM, yM); yM += 3.6;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        const dl = pdf.splitTextToSize(a.desc, wM);
        pdf.text(dl, xM, yM); yM += dl.length * 3.5 + 2.2;
      });

      pdf.save('Vansh_Kashyap_Resume.pdf');
    } catch (error) {
      console.error('Failed to generate resume PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 flex flex-col items-center print:bg-white print:p-0 print:pt-0">
      <div className="max-w-[880px] mx-auto w-full">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 print:hidden"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto self-start sm:self-auto">
            <a href="#/" className="inline-flex items-center justify-center p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-neon-green hover:border-neon-green/50 transition-colors">
              <ArrowLeft size={20} />
            </a>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              My <span className="text-neon-green">Resume</span>
            </h1>
          </div>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-zinc-950 font-bold rounded-full hover:bg-neon-green/90 transition-colors shadow-[0_0_15px_rgba(57,255,20,0.3)] w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isGenerating ? 'Generating…' : 'Download PDF'}
          </button>
        </motion.div>

        {/* A4 sheet */}
        <div className="w-full overflow-x-auto pb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-zinc-800 rounded-2xl shadow-2xl overflow-hidden w-[794px] mx-auto print:rounded-none print:shadow-none"
          >
            {/* Header */}
            <div className="relative bg-zinc-900 text-white px-8 py-6 border-b-4 border-emerald-500 print:bg-zinc-900">
              <h2 className="text-3xl font-display font-extrabold tracking-tight">Vansh Kashyap</h2>
              <p className="text-emerald-400 font-semibold mt-1 text-sm">AI-Powered Creator · Automation Builder · Developer</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3.5 text-[11.5px] text-zinc-300">
                <span className="inline-flex items-center gap-1.5"><MapPin size={12} className="text-emerald-400" /> New Delhi, India</span>
                <span className="inline-flex items-center gap-1.5"><Phone size={12} className="text-emerald-400" /> +91 8800628376</span>
                <span className="inline-flex items-center gap-1.5"><Mail size={12} className="text-emerald-400" /> vk1234888i@gmail.com</span>
                <span className="inline-flex items-center gap-1.5"><Globe size={12} className="text-emerald-400" /> techbyvansh.vercel.app</span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-1.5 text-[11.5px] text-zinc-300">
                <span className="inline-flex items-center gap-1.5"><Linkedin size={12} className="text-emerald-400" /> Vansh Kashyap</span>
                <span className="inline-flex items-center gap-1.5"><Youtube size={12} className="text-emerald-400" /> Tech By Vansh</span>
                <span className="inline-flex items-center gap-1.5"><Instagram size={12} className="text-emerald-400" /> @vanshkashyap70</span>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-3 gap-0">
              {/* Sidebar */}
              <div className="col-span-1 bg-zinc-50 px-5 py-5 border-r border-zinc-200">
                <div className="mb-5">
                  <SidebarHeading>Skills</SidebarHeading>
                  <div className="space-y-2.5">
                    {skillGroups.map((g) => (
                      <div key={g.title}>
                        <p className="text-[11px] font-bold text-zinc-800">{g.title}</p>
                        <p className="text-[10.5px] text-zinc-600 leading-snug">{g.items.join(' · ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <SidebarHeading>Tools</SidebarHeading>
                  <div className="flex flex-wrap gap-1">
                    {tools.map((t) => (
                      <span key={t} className="text-[9.5px] px-1.5 py-0.5 rounded bg-white border border-zinc-200 text-zinc-600">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <SidebarHeading>Education</SidebarHeading>
                  <ul className="space-y-2">
                    {education.map((e) => (
                      <li key={e.degree}>
                        <p className="text-[11.5px] font-semibold text-zinc-800 leading-tight">{e.degree}</p>
                        <p className="text-[10px] text-zinc-500">{e.school}</p>
                        <p className="text-[10px] text-emerald-700 font-medium">{e.meta}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5">
                  <SidebarHeading>Certifications</SidebarHeading>
                  <ul className="space-y-1">
                    {certifications.map((c) => (
                      <li key={c} className="text-[10.5px] text-zinc-700 flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <SidebarHeading>Languages</SidebarHeading>
                  <p className="text-[11px] text-zinc-700">Hindi (Native) · English (Professional)</p>
                </div>
              </div>

              {/* Main */}
              <div className="col-span-2 px-6 py-5">
                <div className="mb-4">
                  <MainHeading>Profile</MainHeading>
                  <p className="text-[11.5px] leading-relaxed text-zinc-700">{profile}</p>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {highlights.map((h) => (
                      <div key={h.k} className="text-center rounded-lg bg-emerald-50 border border-emerald-100 py-1.5">
                        <p className="text-[15px] font-extrabold text-emerald-700 leading-none">{h.v}</p>
                        <p className="text-[8.5px] text-zinc-500 mt-1 uppercase tracking-wide">{h.k}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <MainHeading>Experience</MainHeading>
                  <div className="space-y-2.5">
                    {experience.map((x) => (
                      <div key={x.role}>
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-[12px] font-bold text-zinc-900 leading-tight">{x.role}</p>
                          <p className="text-[10px] text-zinc-500 whitespace-nowrap">{x.period}</p>
                        </div>
                        <p className="text-[11px] text-emerald-700 font-medium">{x.org}</p>
                        <p className="text-[10.5px] text-zinc-600 leading-snug mt-0.5">{x.point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <MainHeading>Selected Projects</MainHeading>
                  <div className="space-y-2">
                    {projects.map((p) => (
                      <div key={p.name}>
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-[11.5px] font-bold text-zinc-900">{p.name}</p>
                          {p.link && <p className="text-[9.5px] text-emerald-700 whitespace-nowrap">{p.link}</p>}
                        </div>
                        <p className="text-[10.5px] text-zinc-600 leading-snug">
                          {p.desc} <span className="text-zinc-400">· {p.tech}</span>
                        </p>
                      </div>
                    ))}
                    <p className="text-[10px] italic text-zinc-500 pt-0.5">{clientSites}</p>
                  </div>
                </div>

                <div>
                  <MainHeading>Automation Workflows (n8n)</MainHeading>
                  <div className="space-y-1.5">
                    {automations.map((a) => (
                      <div key={a.name}>
                        <p className="text-[11px] font-bold text-zinc-900">{a.name}</p>
                        <p className="text-[10.5px] text-zinc-600 leading-snug">{a.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
