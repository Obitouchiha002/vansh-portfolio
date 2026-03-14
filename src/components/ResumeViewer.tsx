import { motion } from 'motion/react';
import { Download, ArrowLeft } from 'lucide-react';

export default function ResumeViewer() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-neon-green transition-colors mb-4"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </a>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              My <span className="text-neon-green">Resume</span>
            </h1>
          </div>
          
          <a 
            href="/Vansh_Kashyap_Resume.pdf" 
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-zinc-950 font-bold rounded-full hover:bg-neon-green/90 transition-colors"
          >
            <Download size={18} />
            Download PDF
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
          style={{ minHeight: '75vh' }}
        >
          <object 
            data="/Vansh_Kashyap_Resume.pdf" 
            type="application/pdf" 
            className="w-full h-full min-h-[75vh]"
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="text-zinc-400 mb-4">Your browser doesn't support PDF viewing.</p>
              <a 
                href="/Vansh_Kashyap_Resume.pdf" 
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-zinc-100 font-bold rounded-full hover:bg-zinc-700 transition-colors"
              >
                <Download size={18} />
                Download Resume Instead
              </a>
            </div>
          </object>
        </motion.div>
      </div>
    </div>
  );
}
