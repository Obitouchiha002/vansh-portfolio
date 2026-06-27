import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Loader2, MapPin, Phone, Mail, Linkedin, Youtube, Instagram, Globe } from 'lucide-react';
import { jsPDF } from 'jspdf';

/* =========================================================================
   IN-SITE RESUME — single page, professional, always in sync with the site.
   "Download PDF" captures the exact sheet (dom-to-image) and saves it as a
   single-page A4 PDF (jsPDF) — same design as shown. Edit the data below.
   ========================================================================= */
const profile =
  'AI-powered creator and builder from Delhi working where AI, automation and design meet. I build apps, automate repetitive workflows with n8n, and create & manage content across LinkedIn, YouTube and Instagram under my brand, Tech By Vansh.';

const coreSkills = [
  'AI Tools & Prompting',
  'Automation (n8n)',
  'Social Media Management',
  'Graphic Design',
  'Video Editing',
  'Web & App Development',
];

const tools = ['ChatGPT', 'Claude', 'Gemini', 'n8n', 'Photoshop', 'Premiere Pro', 'DaVinci Resolve', 'Figma', 'React', 'Tailwind CSS', 'Firebase'];

const experience = [
  {
    role: 'Content Creator & Automation Builder',
    org: 'Tech By Vansh (Self-employed)',
    period: 'Present',
    points: [
      'Build web apps and AI tools (VanshLink, vthumb, Aura Shakti, Kairo, Aura Player).',
      'Design n8n automations for content posting, lead replies and scheduling.',
      'Create and manage content across LinkedIn, YouTube and Instagram.',
    ],
  },
  {
    role: 'Skill Saksham Program',
    org: 'Microsoft',
    period: 'Apr 2025 – May 2025',
    points: ['Training in AI, MS Office and professional communication.'],
  },
  {
    role: 'Hardware Assembly Intern',
    org: 'Allied Engineering Works Pvt Ltd',
    period: 'Mar 2025 – Apr 2025',
    points: ['Hands-on experience in computer hardware assembly.'],
  },
  {
    role: 'Electronic System Design Intern',
    org: 'Elios Management Consulting',
    period: 'Dec 2024 – Mar 2025',
    points: ['Worked on electronic system design fundamentals.'],
  },
];

const education = [
  { degree: 'B.Com (Honours)', school: 'Delhi University (SOL)', meta: 'Present' },
  { degree: 'ITI – Computer Hardware & Networking', school: 'NCVT, Mangolpuri', meta: '2025 · 85%' },
  { degree: '12th (CBSE)', school: 'CBSE Board', meta: '2024 · 72.8%' },
  { degree: '10th (CBSE)', school: 'CBSE Board', meta: '2022 · 73.8%' },
];

const certifications = [
  'Microsoft Skill Saksham Program',
  'Tally with GST – STP Computer Education',
  'Basic Computer Course – STP Computer Education',
  'Pariksha Pe Charcha 2024 – Participation',
];

function SidebarHeading({ children }: { children: any }) {
  return <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700 mb-2">{children}</h3>;
}
function MainHeading({ children }: { children: any }) {
  return (
    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-zinc-800 border-b-2 border-emerald-600 pb-1 mb-3">{children}</h3>
  );
}

export default function ResumeViewer() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Build the PDF directly with jsPDF (vector text) — reliable, selectable, single A4 page.
  const handleDownload = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const W = pdf.internal.pageSize.getWidth();
      const M = 14;
      const EM: [number, number, number] = [5, 150, 105];
      const DARK: [number, number, number] = [24, 24, 27];
      const TXT: [number, number, number] = [39, 39, 42];
      const GRAY: [number, number, number] = [90, 90, 99];

      const bullet = (x: number, y: number, color: [number, number, number]) => {
        pdf.setFillColor(color[0], color[1], color[2]);
        pdf.circle(x + 0.7, y - 1.1, 0.6, 'F');
      };

      // ---- Header band ----
      pdf.setFillColor(DARK[0], DARK[1], DARK[2]);
      pdf.rect(0, 0, W, 40, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.text('Vansh Kashyap', M, 19);
      pdf.setFontSize(10.5);
      pdf.setTextColor(52, 211, 153);
      pdf.text('AI-Powered Creator  ·  Automation Builder  ·  Social Media Manager', M, 26);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(212, 212, 216);
      pdf.text('New Delhi, India     +91 8800628376     vk1234888i@gmail.com     techbyvansh.vercel.app', M, 32);
      pdf.text('LinkedIn: Vansh Kashyap       YouTube: Tech By Vansh       Instagram: @vanshkashyap70', M, 36.5);

      // ---- Columns ----
      const xL = M, wL = 56;
      const xM = 78, wM = W - M - 78;
      let yL = 50, yM = 50;

      const sideHead = (t: string) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(EM[0], EM[1], EM[2]);
        pdf.text(t.toUpperCase(), xL, yL); yL += 5.5;
      };
      const mainHead = (t: string) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(11); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
        pdf.text(t.toUpperCase(), xM, yM);
        pdf.setDrawColor(EM[0], EM[1], EM[2]); pdf.setLineWidth(0.5); pdf.line(xM, yM + 1.6, xM + wM, yM + 1.6);
        yM += 7;
      };

      // SIDEBAR — Core Skills
      sideHead('Core Skills');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
      coreSkills.forEach((s) => { bullet(xL, yL, EM); pdf.text(s, xL + 3, yL); yL += 5; });
      yL += 2;

      // SIDEBAR — Tools
      sideHead('Tools');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8.5); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
      const toolLines = pdf.splitTextToSize(tools.join('  ·  '), wL);
      pdf.text(toolLines, xL, yL); yL += toolLines.length * 4 + 4;

      // SIDEBAR — Education
      sideHead('Education');
      education.forEach((e) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
        const dl = pdf.splitTextToSize(e.degree, wL); pdf.text(dl, xL, yL); yL += dl.length * 4;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        pdf.text(e.school, xL, yL); yL += 3.6;
        pdf.setTextColor(EM[0], EM[1], EM[2]); pdf.text(e.meta, xL, yL); yL += 5.5;
      });
      yL += 1;

      // SIDEBAR — Languages
      sideHead('Languages');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
      pdf.text(pdf.splitTextToSize('Hindi (Native) · English (Professional)', wL), xL, yL);

      // MAIN — Profile
      mainHead('Profile');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9.5); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
      const pl = pdf.splitTextToSize(profile, wM); pdf.text(pl, xM, yM); yM += pl.length * 4.6 + 4;

      // MAIN — Experience
      mainHead('Experience');
      experience.forEach((x) => {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(10); pdf.setTextColor(DARK[0], DARK[1], DARK[2]);
        const roleLines = pdf.splitTextToSize(x.role, wM - 28); pdf.text(roleLines, xM, yM);
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        pdf.text(x.period, xM + wM, yM, { align: 'right' });
        yM += roleLines.length * 4.6;
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.5); pdf.setTextColor(EM[0], EM[1], EM[2]);
        pdf.text(x.org, xM, yM); yM += 4.6;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8.5); pdf.setTextColor(GRAY[0], GRAY[1], GRAY[2]);
        x.points.forEach((p) => {
          const ptl = pdf.splitTextToSize(p, wM - 4);
          bullet(xM, yM, GRAY); pdf.text(ptl, xM + 3, yM); yM += ptl.length * 4;
        });
        yM += 3;
      });

      // MAIN — Certifications
      mainHead('Certifications');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor(TXT[0], TXT[1], TXT[2]);
      certifications.forEach((c) => {
        const cl = pdf.splitTextToSize(c, wM - 4);
        bullet(xM, yM, EM); pdf.text(cl, xM + 3, yM); yM += cl.length * 4 + 1.5;
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
      <div className="max-w-[860px] mx-auto w-full">
        {/* Controls (hidden when printing) */}
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

        {/* A4 resume sheet (fixed 794px = A4 width @96dpi; scrolls on small screens) */}
        <div className="w-full overflow-x-auto pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white text-zinc-800 rounded-2xl shadow-2xl overflow-hidden w-[794px] mx-auto print:rounded-none print:shadow-none"
        >
          {/* Header */}
          <div className="bg-zinc-900 text-white px-8 py-7 print:bg-zinc-900">
            <h2 className="text-3xl font-display font-extrabold tracking-tight">Vansh Kashyap</h2>
            <p className="text-emerald-400 font-semibold mt-1 text-sm">
              AI-Powered Creator · Automation Builder · Social Media Manager
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[12px] text-zinc-300">
              <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-emerald-400" /> New Delhi, India</span>
              <span className="inline-flex items-center gap-1.5"><Phone size={13} className="text-emerald-400" /> +91 8800628376</span>
              <span className="inline-flex items-center gap-1.5"><Mail size={13} className="text-emerald-400" /> vk1234888i@gmail.com</span>
              <span className="inline-flex items-center gap-1.5"><Globe size={13} className="text-emerald-400" /> techbyvansh.vercel.app</span>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-1.5 text-[12px] text-zinc-300">
              <span className="inline-flex items-center gap-1.5"><Linkedin size={13} className="text-emerald-400" /> Vansh Kashyap</span>
              <span className="inline-flex items-center gap-1.5"><Youtube size={13} className="text-emerald-400" /> Tech By Vansh</span>
              <span className="inline-flex items-center gap-1.5"><Instagram size={13} className="text-emerald-400" /> @vanshkashyap70</span>
            </div>
          </div>

          {/* Body: sidebar + main */}
          <div className="grid grid-cols-3 gap-0">
            {/* Sidebar */}
            <div className="col-span-1 bg-zinc-50 px-6 py-6 border-r border-zinc-200">
              <div className="mb-6">
                <SidebarHeading>Core Skills</SidebarHeading>
                <ul className="space-y-1.5">
                  {coreSkills.map((s) => (
                    <li key={s} className="text-[12.5px] text-zinc-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <SidebarHeading>Tools</SidebarHeading>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((t) => (
                    <span key={t} className="text-[10.5px] px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-600">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <SidebarHeading>Education</SidebarHeading>
                <ul className="space-y-2.5">
                  {education.map((e) => (
                    <li key={e.degree}>
                      <p className="text-[12.5px] font-semibold text-zinc-800 leading-tight">{e.degree}</p>
                      <p className="text-[11px] text-zinc-500">{e.school}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">{e.meta}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SidebarHeading>Languages</SidebarHeading>
                <p className="text-[12.5px] text-zinc-700">Hindi (Native) · English (Professional)</p>
              </div>
            </div>

            {/* Main */}
            <div className="col-span-2 px-7 py-6">
              <div className="mb-5">
                <MainHeading>Profile</MainHeading>
                <p className="text-[12.5px] leading-relaxed text-zinc-700">{profile}</p>
              </div>

              <div className="mb-5">
                <MainHeading>Experience</MainHeading>
                <div className="space-y-3.5">
                  {experience.map((x) => (
                    <div key={x.role}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[13px] font-bold text-zinc-900 leading-tight">{x.role}</p>
                        <p className="text-[11px] text-zinc-500 whitespace-nowrap">{x.period}</p>
                      </div>
                      <p className="text-[12px] text-emerald-700 font-medium mb-1">{x.org}</p>
                      <ul className="space-y-0.5">
                        {x.points.map((p, i) => (
                          <li key={i} className="text-[12px] text-zinc-600 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <MainHeading>Certifications</MainHeading>
                <ul className="grid grid-cols-1 gap-1">
                  {certifications.map((c) => (
                    <li key={c} className="text-[12px] text-zinc-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
