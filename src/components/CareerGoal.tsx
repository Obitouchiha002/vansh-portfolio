import { motion } from 'motion/react';
import { Target, Rocket, Briefcase } from 'lucide-react';

export default function CareerGoal() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-16 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-green/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,229,255,0.1)]">
                <Target size={80} className="text-neon-blue" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center border-4 border-zinc-950">
                  <Rocket size={24} className="text-neon-green" />
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Career <span className="text-neon-blue">Goal</span>
              </h2>
              <p className="text-xl text-zinc-300 leading-relaxed mb-8">
                I aim to build a robust career in technology, focusing on IT support, system administration, and digital creation. My goal is to continuously learn new tools, adapt to emerging technologies, and leverage my skills to solve real-world problems while growing my personal brand as a trusted tech creator.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-lg text-zinc-300">
                  <Briefcase size={18} className="text-neon-blue" />
                  <span>Seeking Opportunities</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-lg text-zinc-300">
                  <Rocket size={18} className="text-neon-green" />
                  <span>Ready to Learn & Grow</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
