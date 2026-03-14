import { motion } from 'motion/react';
import { Youtube, PlayCircle, TrendingUp, Users, Play } from 'lucide-react';

export default function YouTube() {
  return (
    <section id="youtube" className="py-24 bg-zinc-900/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-8">
              <Youtube size={20} />
              <span className="font-semibold tracking-wide">CONTENT CREATOR</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Tech Solutions & <br /> Gaming Performance
            </h2>
            
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              I run a tech YouTube channel dedicated to helping users get the most out of their hardware. From optimizing low-end PCs for better gaming performance to troubleshooting common Windows issues, my goal is to make tech accessible and understandable for everyone.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <PlayCircle className="text-red-500 mb-2" size={24} />
                <h4 className="font-bold text-zinc-200 mb-1">Tech Tutorials</h4>
                <p className="text-sm text-zinc-500">Step-by-step guides</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <TrendingUp className="text-red-500 mb-2" size={24} />
                <h4 className="font-bold text-zinc-200 mb-1">PC Optimization</h4>
                <p className="text-sm text-zinc-500">Boost FPS & speed</p>
              </div>
            </div>
            
            <a 
              href="https://youtube.com/@techbyvansh?si=z_dNM2ooAKwoNI2M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] w-fit"
            >
              <Youtube size={20} />
              Subscribe to Channel
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl relative group cursor-pointer">
              <img 
                src="https://picsum.photos/seed/youtube/800/450" 
                alt="YouTube Channel" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <a 
                href="https://youtube.com/@techbyvansh?si=z_dNM2ooAKwoNI2M"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors flex items-center justify-center"
              >
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-transform">
                  <Play className="text-white ml-2" size={32} fill="currentColor" />
                </div>
              </a>
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Growing Community</p>
                <p className="font-bold text-zinc-100">Join the journey</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
