import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Stack from './components/Stack';
import AiTools from './components/AiTools';
import AppsWebsites from './components/AppsWebsites';
import GraphicsVideo from './components/GraphicsVideo';
import Automation from './components/Automation';
import Services from './components/Services';
import Stats from './components/Stats';
import ContentPlatforms from './components/ContentPlatforms';
import YouTube from './components/YouTube';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Tools from './components/Tools';
import Chatbot from './components/Chatbot';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import SectionDots from './components/SectionDots';

// Lazy-loaded: heavy PDF/canvas libraries only load on these routes,
// keeping the main bundle small and the home page fast.
const ResumeViewer = lazy(() => import('./components/ResumeViewer'));
const ToolRoute = lazy(() => import('./components/tools/ToolRoute'));

function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-zinc-700 border-t-neon-green animate-spin" />
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };

    // Site-wide security
    const preventDefault = (e: Event) => e.preventDefault();

    // Disable right-click
    document.addEventListener('contextmenu', preventDefault);

    // Disable keyboard shortcuts for inspect element
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Disable text selection/copying (via CSS class on body)
    document.body.classList.add('select-none');

    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('select-none');
    };
  }, []);

  useEffect(() => {
    if (currentPath.startsWith('#') && !currentPath.startsWith('#/')) {
      const id = currentPath.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [currentPath]);

  if (currentPath === '#/resume') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green print:bg-white print:text-black">
        <div className="print:hidden"><Navbar /></div>
        <Suspense fallback={<RouteLoader />}>
          <ResumeViewer />
        </Suspense>
        <div className="print:hidden"><Footer /></div>
        <div className="print:hidden"><Chatbot /></div>
      </div>
    );
  }

  if (currentPath.startsWith('#/tools/')) {
    // Convert hash path to the format expected by ToolRoute (e.g., /tools/png-to-jpg)
    const routePath = currentPath.replace('#', '');
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green print:bg-white print:text-black">
        <div className="print:hidden"><Navbar /></div>
        <Suspense fallback={<RouteLoader />}>
          <ToolRoute path={routePath} />
        </Suspense>
        <div className="print:hidden"><Footer /></div>
        <div className="print:hidden"><Chatbot /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green">
      <ScrollProgress />
      <SectionDots />
      <Navbar />
      <main>
        {/* ---- High priority: who I am + what I do ---- */}
        <Hero />
        <Stats />
        <About />
        <Stack />
        <AiTools />
        <Services />
        <AppsWebsites />
        <GraphicsVideo />
        <Automation />
        <ContentPlatforms />
        <YouTube />
        {/* ---- Lower priority: background / supporting ---- */}
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Tools isOpen={currentPath === '#/tools'} onClose={() => { window.location.hash = '#/'; }} />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
    </div>
  );
}
