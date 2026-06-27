import { motion } from 'motion/react';
import { Briefcase, Award, Zap, Rocket } from 'lucide-react';

const experienceData = [
  {
    role: 'Content Creator & Automation Builder',
    company: 'Tech By Vansh (Self-employed)',
    period: 'Present',
    description: 'Building apps and AI automations, and creating & managing content across LinkedIn, YouTube and Instagram.',
    icon: Rocket,
    color: 'text-neon-green',
    borderColor: 'border-neon-green',
    bgColor: 'bg-neon-green/10'
  },
  {
    role: 'Skill Saksham Program',
    company: 'Microsoft',
    period: 'April 2025 – May 2025',
    description: 'Focused on AI, MS Office, and Professional Communication.',
    icon: Zap,
    color: 'text-blue-400',
    borderColor: 'border-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    role: 'Hardware Assembly Intern',
    company: 'Allied Engineering Works Pvt Ltd',
    period: 'March 2025 – April 2025',
    description: 'Gained hands-on experience in Hardware Assembly.',
    icon: Briefcase,
    color: 'text-neon-green',
    borderColor: 'border-neon-green',
    bgColor: 'bg-neon-green/10'
  },
  {
    role: 'Electronic System Design Intern',
    company: 'Elios Management Consulting',
    period: 'Dec 2024 – March 2025',
    description: 'Worked on Electronic System Design.',
    icon: Award,
    color: 'text-purple-400',
    borderColor: 'border-purple-400',
    bgColor: 'bg-purple-400/10'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            My <span className="text-neon-green">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experienceData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                {/* Glow effect positioned behind card */}
                <div className={`absolute -inset-0.5 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500 ${item.bgColor.replace('/10', '')}`} />
                
                <div className="relative h-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-transparent transition-all z-10 flex flex-col items-start">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg ${item.bgColor} border border-zinc-800 group-hover:${item.borderColor} transition-colors`}
                  >
                    <Icon className={item.color} size={28} />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                    className="text-xl font-bold text-white mb-2"
                  >
                    {item.role}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="text-lg font-semibold text-zinc-300 mb-6"
                  >
                    {item.company}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-mono mb-6 w-fit border shadow-lg ${item.bgColor} ${item.borderColor} ${item.color} shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-colors`}
                  >
                    <span className="relative flex h-2 w-2 mr-3">
                       <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${item.bgColor.replace('/10', '')}`}></span>
                       <span className={`relative inline-flex rounded-full h-2 w-2 ${item.bgColor.replace('/10', '')}`}></span>
                    </span>
                    {item.period}
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                    className="text-zinc-400 leading-relaxed mt-auto w-full"
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
