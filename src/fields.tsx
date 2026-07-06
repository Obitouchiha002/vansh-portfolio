import { Sparkles, Code2, Palette, Cpu, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type FieldKey = 'ai' | 'dev' | 'creative' | 'it' | 'edu';

export interface Field {
  key: FieldKey;
  path: string;
  title: string;
  tagline: string;
  blurb: string;
  bullets: string[];
  icon: LucideIcon;
  accent: string; // tailwind text colour class
  rgb: string; // "r,g,b" for glows/gradients
}

/* The four focused landing pages the hub offers. */
export const FIELDS: Field[] = [
  {
    key: 'ai',
    path: '#/ai',
    title: 'AI & Automation',
    tagline: 'AI-powered building & workflows',
    blurb: 'The AI tools I use daily and the automations I build with n8n to remove manual work.',
    bullets: ['AI Tools I master', 'Automation workflows'],
    icon: Sparkles,
    accent: 'text-neon-green',
    rgb: '0,255,157',
  },
  {
    key: 'dev',
    path: '#/dev',
    title: 'Web & App Development',
    tagline: 'Apps & websites I build',
    blurb: 'Live apps and websites I have designed and built, plus the tech stack I develop with.',
    bullets: ['Apps & Websites', 'Development stack'],
    icon: Code2,
    accent: 'text-purple-400',
    rgb: '192,132,252',
  },
  {
    key: 'creative',
    path: '#/creative',
    title: 'Design & Content',
    tagline: 'Graphics, video & content',
    blurb: 'My graphic design, AI video work, and the content I create across YouTube and social platforms.',
    bullets: ['Graphics & AI Video', 'YouTube & Social'],
    icon: Palette,
    accent: 'text-neon-blue',
    rgb: '0,229,255',
  },
  {
    key: 'it',
    path: '#/it',
    title: 'IT & Hardware',
    tagline: 'Support, hardware & networking',
    blurb: 'My hands-on IT experience — hardware, networking and troubleshooting.',
    bullets: ['Experience', 'Hardware lab'],
    icon: Cpu,
    accent: 'text-amber-400',
    rgb: '251,191,36',
  },
  {
    key: 'edu',
    path: '#/education',
    title: 'Education & Certifications',
    tagline: 'Degrees, diplomas & certificates',
    blurb: 'My full academic journey plus every certification and training I have earned — collected in one place.',
    bullets: ['Education timeline', '7 Certificates'],
    icon: GraduationCap,
    accent: 'text-indigo-400',
    rgb: '129,140,248',
  },
];
