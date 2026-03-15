import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  description: string;
  steps: string[];
  children: React.ReactNode;
}

export default function ToolLayout({ title, description, steps, children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 flex flex-col relative overflow-hidden print:pt-0 print:pb-0 print:px-0">
      {/* Background glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] -z-10 print:hidden" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] -z-10 print:hidden" />

      <div className="max-w-6xl mx-auto w-full flex-1 print:max-w-none print:w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 print:hidden"
        >
          <a 
            href="#/tools" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-neon-green transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to Tools
          </a>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl">
            {description}
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 print:block print:gap-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-6 md:p-8 print:border-none print:bg-transparent print:p-0"
          >
            {children}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-6 md:p-8 print:hidden"
          >
            <h3 className="text-xl font-bold text-zinc-100 mb-6">How to use</h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-400">
                  <CheckCircle size={20} className="text-neon-green shrink-0 mt-0.5" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <h4 className="text-sm font-bold text-zinc-300 mb-2">100% Privacy Guaranteed</h4>
              <p className="text-xs text-zinc-500">
                All files are processed locally in your browser. We never upload, store, or save your files on any server.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
