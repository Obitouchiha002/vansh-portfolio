import { motion } from 'motion/react';
import { GraduationCap, Calendar } from 'lucide-react';

const educationData = [
  {
    institution: 'Industrial Training Institute (ITI) – Mangolpuri',
    degree: 'NCVT',
    year: '2025',
    percentage: '85%',
  },
  {
    institution: 'CBSE Board',
    degree: '12th Standard',
    year: '2024',
    percentage: '72.8%',
  },
  {
    institution: 'CBSE Board',
    degree: '10th Standard',
    year: '2022',
    percentage: '73.8%',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            My <span className="text-neon-green">Education</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
        </motion.div>

        <div className="relative border-l-2 border-zinc-800 ml-6 md:ml-12 pl-8 md:pl-12 py-4 space-y-12">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-6 h-6 rounded-full bg-zinc-900 border-2 border-neon-green flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-neon-green/30 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-display font-semibold text-zinc-100 flex items-center gap-2">
                    <GraduationCap className="text-neon-green" size={20} />
                    {item.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono bg-zinc-800/50 px-3 py-1 rounded-full w-fit">
                    <Calendar size={14} />
                    {item.year}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-zinc-400 text-lg">{item.institution}</p>
                  <div className="bg-neon-green/10 text-neon-green px-3 py-1 rounded-lg font-bold border border-neon-green/20">
                    {item.percentage}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
