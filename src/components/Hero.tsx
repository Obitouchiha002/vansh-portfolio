import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-fit">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Available for work</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tighter">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
              Vansh Kashyap
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-zinc-400">
            Tech Enthusiast | IT Support Learner | Graphic Designer | Content Creator
          </h2>
          
          <p className="text-zinc-500 max-w-lg text-lg leading-relaxed">
            I am passionate about exploring technology, solving computer problems, and creating digital content that helps people.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-green text-zinc-950 font-semibold hover:bg-neon-green/90 transition-colors box-glow-hover"
            >
              View My Work
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 text-zinc-100 font-semibold border border-zinc-800 hover:bg-zinc-800 transition-colors"
            >
              <Mail size={18} />
              Contact Me
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative hidden md:block"
        >
          <div className="aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src="/Picsart_25-08-12_18-04-46-235.png" 
              alt="Vansh Kashyap" 
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/techcreator/800/800";
              }}
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
            />
            
            {/* Floating tech badges */}
            <div className="absolute top-8 -left-8 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg shadow-xl backdrop-blur-sm">
              <span className="text-neon-blue font-mono text-sm">{'<IT Support />'}</span>
            </div>
            <div className="absolute bottom-12 -right-8 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg shadow-xl backdrop-blur-sm">
              <span className="text-neon-green font-mono text-sm">{'<Creator />'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
