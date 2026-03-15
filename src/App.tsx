import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import YouTube from './components/YouTube';
import CareerGoal from './components/CareerGoal';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeViewer from './components/ResumeViewer';
import Tools from './components/Tools';
import ToolRoute from './components/tools/ToolRoute';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
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

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('select-none');
    };
  }, []);

  if (currentPath === '/resume') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green print:bg-white print:text-black">
        <div className="print:hidden"><Navbar /></div>
        <ResumeViewer />
        <div className="print:hidden"><Footer /></div>
      </div>
    );
  }

  if (currentPath === '/tools') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green">
        <Navbar />
        <Tools />
        <Footer />
      </div>
    );
  }

  if (currentPath.startsWith('/tools/')) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green print:bg-white print:text-black">
        <div className="print:hidden"><Navbar /></div>
        <ToolRoute path={currentPath} />
        <div className="print:hidden"><Footer /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-neon-green/30 selection:text-neon-green">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <YouTube />
        <CareerGoal />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
