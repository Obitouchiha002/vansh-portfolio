import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Mail, Phone, Globe, MapPin, Youtube } from 'lucide-react';

export default function ResumeViewer() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    // Add print styles
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page { margin: 0; size: A4 portrait; }
        body { background: white !important; color: black !important; }
        .print-hidden { display: none !important; }
        .print-section { break-inside: avoid; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className={`min-h-screen font-sans ${isPrinting ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-300'} pt-24 pb-12 px-6 flex flex-col print:p-0 print:m-0`}>
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col print:max-w-none">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 print-hidden"
        >
          <div>
            <a 
              href="#/" 
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-neon-green transition-colors mb-4"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </a>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
              My <span className="text-neon-green">Resume</span>
            </h1>
          </div>
          
          <a 
            href="/Vansh_Kashyap_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-zinc-950 font-bold rounded-full hover:bg-neon-green/90 transition-colors"
          >
            <Download size={18} />
            Open PDF
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex-1 w-full ${isPrinting ? 'bg-white' : 'bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl'} flex flex-col p-8 md:p-12 print:p-8`}
        >
          {/* Header */}
          <div className={`border-b ${isPrinting ? 'border-gray-300' : 'border-zinc-800'} pb-6 mb-6 text-center print-section`}>
            <h1 className={`text-4xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4 ${isPrinting ? 'text-black' : 'text-white'}`}>
              Vansh Kashyap
            </h1>
            <h2 className={`text-xl font-medium mb-4 ${isPrinting ? 'text-gray-700' : 'text-neon-green'}`}>
              Web Developer & IT Support Specialist
            </h2>
            <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm ${isPrinting ? 'text-gray-600' : 'text-zinc-400'}`}>
              <div className="flex items-center gap-1"><MapPin size={14} /> Delhi, India</div>
              <div className="flex items-center gap-1"><Phone size={14} /> 8800628376</div>
              <div className="flex items-center gap-1"><Mail size={14} /> vk1234888i@gmail.com</div>
              <div className="flex items-center gap-1"><Globe size={14} /> techbyvansh.vercel.app</div>
              <div className="flex items-center gap-1"><Youtube size={14} /> @techbyvansh</div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 print-section">
            <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1 ${isPrinting ? 'text-black border-gray-300' : 'text-white border-zinc-800'}`}>Professional Summary</h3>
            <p className={`leading-relaxed text-sm ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>
              I’m a Web Developer and ITI CHNM certified professional who loves building websites that actually work for people. I've successfully launched over 5 live projects and have a deep interest in managing and optimizing digital platforms.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-6 print-section">
            <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1 ${isPrinting ? 'text-black border-gray-300' : 'text-white border-zinc-800'}`}>Technical Skills</h3>
            <ul className={`list-disc list-inside text-sm space-y-1 ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Web Dev:</strong> HTML5, CSS3, JavaScript, UI/UX</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Tools:</strong> Google AI Studio, Git/GitHub, Vercel, Arduino</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>IT Hardware:</strong> PC Assembly, Low-end PC Optimization, Networking (CHNM)</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Digital Media:</strong> Video Editing, SEO, YouTube Analytics, Thumbnail Design</li>
            </ul>
          </div>

          {/* Experience & Certifications */}
          <div className="mb-6 print-section">
            <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1 ${isPrinting ? 'text-black border-gray-300' : 'text-white border-zinc-800'}`}>Experience & Certifications</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-base font-bold ${isPrinting ? 'text-black' : 'text-zinc-100'}`}>Microsoft Skill Saksham</h4>
                  <span className={`text-sm ${isPrinting ? 'text-gray-600' : 'text-neon-green'}`}>April 2025 – May 2025</span>
                </div>
                <p className={`text-sm ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>Focused on AI, MS Office, and Professional Communication.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-base font-bold ${isPrinting ? 'text-black' : 'text-zinc-100'}`}>Allied Engineering Works Pvt Ltd (Intern)</h4>
                  <span className={`text-sm ${isPrinting ? 'text-gray-600' : 'text-neon-green'}`}>March 2025 – April 2025</span>
                </div>
                <p className={`text-sm ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>Gained hands-on experience in Hardware Assembly.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-base font-bold ${isPrinting ? 'text-black' : 'text-zinc-100'}`}>Elios Management Consulting (Intern)</h4>
                  <span className={`text-sm ${isPrinting ? 'text-gray-600' : 'text-neon-green'}`}>Dec 2024 – March 2025</span>
                </div>
                <p className={`text-sm ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>Worked on Electronic System Design.</p>
              </div>
            </div>
          </div>

          {/* Live Projects */}
          <div className="mb-6 print-section">
            <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1 ${isPrinting ? 'text-black border-gray-300' : 'text-white border-zinc-800'}`}>Live Projects</h3>
            <ul className={`list-disc list-inside text-sm space-y-1 ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Personal Portfolio:</strong> Central hub for projects and technical identity (techbyvansh.vercel.app).</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Aura Player:</strong> Web-based audio/video player with custom playback controls.</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>HabitBro:</strong> Productivity tool designed for daily goal tracking.</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Aura Shakti:</strong> Deployed a performance-optimized website with high engagement.</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Vansh link:</strong> Web based temp or personal chat app.</li>
            </ul>
          </div>

          {/* Education */}
          <div className="mb-6 print-section">
            <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1 ${isPrinting ? 'text-black border-gray-300' : 'text-white border-zinc-800'}`}>Education</h3>
            <ul className={`list-disc list-inside text-sm space-y-1 ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>B.Com (Honours):</strong> Delhi University (School of Open Learning) – 4th Semester (Current).</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>ITI CHNM:</strong> Mangolpuri ITI (NCVT) – 85% | 2025.</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Class 12th:</strong> Sarvodaya Bal Vidyalaya (CBSE) – 72.8% | 2024.</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Class 10th:</strong> Ch. Baldev Singh Model School (CBSE) – 73.8% | 2022.</li>
            </ul>
          </div>

          {/* Additional Information */}
          <div className="mb-6 print-section">
            <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1 ${isPrinting ? 'text-black border-gray-300' : 'text-white border-zinc-800'}`}>Additional Information</h3>
            <ul className={`list-disc list-inside text-sm space-y-1 ${isPrinting ? 'text-gray-800' : 'text-zinc-300'}`}>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Languages:</strong> Hindi, English.</li>
              <li><strong className={isPrinting ? 'text-black' : 'text-zinc-100'}>Interests:</strong> Technical Content Creation, PC Hardware Troubleshooting, AI Development.</li>
            </ul>
          </div>

          {/* Declaration */}
          <div className="mt-8 pt-4 print-section">
            <p className={`text-sm italic mb-8 ${isPrinting ? 'text-gray-600' : 'text-zinc-400'}`}>
              Declaration: I hereby declare that the above information is true to the best of my knowledge.
            </p>
            <div className={`font-bold ${isPrinting ? 'text-black' : 'text-white'}`}>
              (VANSH KASHYAP)
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
