import { motion } from 'motion/react';
import { Monitor, Network, Code, PenTool, Video, Cpu, Lightbulb, RefreshCw, Palette, Zap } from 'lucide-react';

const technicalSkills = [
  { name: 'Computer Hardware & Troubleshooting', icon: Monitor, level: 90 },
  { name: 'Basic Networking', icon: Network, level: 75 },
  { name: 'Web Development (HTML, CSS)', icon: Code, level: 80 },
  { name: 'Graphic Design', icon: PenTool, level: 85 },
  { name: 'Video Editing', icon: Video, level: 85 },
  { name: 'AI Tools Usage', icon: Cpu, level: 95 },
];

const softSkills = [
  { name: 'Problem Solving', icon: Lightbulb },
  { name: 'Continuous Learning', icon: RefreshCw },
  { name: 'Creativity', icon: Palette },
  { name: 'Adaptability', icon: Zap },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            My <span className="text-neon-blue">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-neon-blue rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
              <Monitor className="text-neon-blue" />
              Technical Skills
            </h3>
            <div className="flex flex-col gap-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <skill.icon size={18} className="text-zinc-400" />
                      <span className="font-medium text-zinc-200">{skill.name}</span>
                    </div>
                    <span className="text-sm text-zinc-500 font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-neon-blue to-neon-green rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
              <Lightbulb className="text-neon-green" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col items-center justify-center text-center gap-4 hover:border-neon-green/50 active:border-neon-green/50 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-neon-green/10 group-active:bg-neon-green/10 transition-colors">
                    <skill.icon size={24} className="text-zinc-400 group-hover:text-neon-green group-active:text-neon-green transition-colors" />
                  </div>
                  <span className="font-medium text-zinc-200">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
