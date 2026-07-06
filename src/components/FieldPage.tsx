import { useEffect } from 'react';
import type { Field, FieldKey } from '../fields';
import PageHeader from './PageHeader';
import FieldHero from './FieldHero';
import AiHero from './AiHero';
import ExploreOther from './ExploreOther';
import Footer from './Footer';
import Chatbot from './Chatbot';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';
import Contact from './Contact';
// Section components reused per field
import AiTools from './AiTools';
import Automation from './Automation';
import Stack from './Stack';
import GraphicsVideo from './GraphicsVideo';
import YouTube from './YouTube';
import ContentPlatforms from './ContentPlatforms';
import SEO from './SEO';
import Experience from './Experience';
import Services from './Services';
import DevShowcase from './DevShowcase';
import AiProjects from './AiProjects';
import CreatorDashboard from './CreatorDashboard';
import CreativeToolkit from './CreativeToolkit';
import HardwareLab from './HardwareLab';
import N8nWorkflows from './N8nWorkflows';
import JourneyRoadmap from './JourneyRoadmap';
import CertWindows from './CertWindows';
import StoryAbout from './StoryAbout';

/* Which sections each focused page shows (all reused, no duplication). */
const SECTIONS: Record<FieldKey, () => any> = {
  ai: () => (
    <>
      <N8nWorkflows />
      <AiProjects />
      <Automation />
      <AiTools />
      <Services only={['Automation Setup', 'AI Content Creation']} />
    </>
  ),
  dev: () => (
    <>
      <DevShowcase />
      <SEO />
      <Stack only={['Development']} />
      <Services only={['Web & App Development', 'SEO', 'Automation Setup']} />
    </>
  ),
  creative: () => (
    <>
      <CreatorDashboard />
      <GraphicsVideo />
      <CreativeToolkit />
      <YouTube />
      <ContentPlatforms />
      <Services only={['Graphic Design', 'Video Editing', 'AI Content Creation', 'Social Media Management']} />
    </>
  ),
  it: () => (
    <>
      <HardwareLab />
      <Experience />
    </>
  ),
  edu: () => (
    <>
      <StoryAbout />
      <JourneyRoadmap />
      <CertWindows />
    </>
  ),
};

export default function FieldPage({ field }: { field: Field }) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${field.title} — Vansh Kashyap`;
    window.scrollTo({ top: 0 });
    return () => {
      document.title = prev;
    };
  }, [field]);

  const Sections = SECTIONS[field.key];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green">
      <ScrollProgress />
      <PageHeader showBack />
      {field.key === 'ai' ? <AiHero field={field} /> : <FieldHero field={field} />}
      <main>
        <Sections />
        <Contact />
      </main>
      <ExploreOther current={field.key} />
      <Footer />
      <Chatbot />
      <BackToTop />
    </div>
  );
}
