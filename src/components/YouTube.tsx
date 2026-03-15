import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Youtube, PlayCircle, TrendingUp, Users, Play, Eye } from 'lucide-react';

export default function YouTube() {
  const [stats, setStats] = useState<{ subscribers: string; views: string } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/youtube-stats');
        if (response.ok) {
          const data = await response.json();
          setStats({
            subscribers: formatNumber(data.subscribers),
            views: formatNumber(data.views)
          });
        }
      } catch (error) {
        console.error('Failed to fetch YouTube stats:', error);
      }
    };

    fetchStats();
    // Refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (isNaN(n)) return '...';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  return (
    <section id="youtube" className="py-24 bg-zinc-900/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-8">
              <Youtube size={20} />
              <span className="font-semibold tracking-wide uppercase text-xs">Content Creator</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Tech Solutions & <br /> Gaming Performance – <span className="text-red-500">Tech by Vansh</span>
            </h2>
            
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              Through my YouTube channel <span className="text-red-500 font-semibold">Tech by Vansh</span>, I share practical tech solutions, game testing videos, and optimization tips for low-end PCs. I focus on helping gamers fix common problems and achieve better performance in their favorite games.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] w-full sm:w-fit"
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
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="aspect-video rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl relative group cursor-pointer"
            >
              <img 
                src="https://i.ytimg.com/vi/5b5W3Sq-OxY/maxresdefault.jpg" 
                alt="GTA V Low End PC Optimization" 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <a 
                href="https://youtu.be/5b5W3Sq-OxY"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 group-active:bg-zinc-950/20 transition-colors flex items-center justify-center"
              >
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] group-hover:scale-110 group-active:scale-110 transition-transform">
                  <Play className="text-white ml-2" size={32} fill="currentColor" />
                </div>
              </a>
            </motion.div>
            
            {/* Stats card moved below video */}
            <div className="mt-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col xl:flex-row items-center justify-between gap-6 overflow-hidden relative">
              {/* Background Graph Decoration */}
              <div className="absolute bottom-0 right-0 left-0 h-16 opacity-10 pointer-events-none">
                <svg viewBox="0 0 400 100" className="w-full h-full text-red-500" preserveAspectRatio="none">
                  <path d="M0 100 L0 80 Q 50 80, 100 60 T 200 40 T 300 20 T 400 10 L 400 100 Z" fill="currentColor" />
                </svg>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full xl:w-auto">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)] shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Subscribers</p>
                    <p className="text-xl sm:text-2xl font-black text-zinc-100">{stats ? stats.subscribers : '...'}</p>
                  </div>
                </div>
                
                <div className="w-full h-px sm:w-px sm:h-10 bg-zinc-800" />

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] shrink-0">
                    <Eye size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Total Views</p>
                    <p className="text-xl sm:text-2xl font-black text-zinc-100">{stats ? stats.views : '...'}</p>
                  </div>
                </div>
              </div>

              {/* Red Growth Graph */}
              <div className="flex flex-col items-center sm:items-end gap-1 w-full xl:w-auto">
                <div className="flex items-center gap-2 text-red-500">
                  <TrendingUp size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Channel Growth</span>
                </div>
                <svg viewBox="0 0 100 40" className="w-32 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M0 35 Q 20 35, 40 25 T 80 10 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <motion.circle
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    cx="100" cy="5" r="3" fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
