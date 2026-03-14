import { motion } from 'motion/react';
import { Award, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    title: 'Microsoft Skill Saksham Program',
    skills: ['AI Basics', 'Communication Skills', 'MS Office'],
    color: 'from-blue-500/20 to-neon-blue/20',
    borderColor: 'border-neon-blue/30',
    iconColor: 'text-neon-blue',
  },
  {
    title: 'Allied Engineering Works Pvt Ltd',
    skills: ['Assembly', 'Technical Exposure'],
    color: 'from-emerald-500/20 to-neon-green/20',
    borderColor: 'border-neon-green/30',
    iconColor: 'text-neon-green',
  },
  {
    title: 'Elios Management Consulting',
    skills: ['Electronic System Design'],
    color: 'from-purple-500/20 to-fuchsia-500/20',
    borderColor: 'border-fuchsia-500/30',
    iconColor: 'text-fuchsia-400',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="text-neon-blue">Certifications</span> & Training
          </h2>
          <div className="w-20 h-1 bg-neon-blue rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${cert.color} border ${cert.borderColor} p-8 rounded-2xl relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award size={100} className={cert.iconColor} />
              </div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-zinc-950/50 flex items-center justify-center mb-6 border ${cert.borderColor}`}>
                  <Award className={cert.iconColor} size={24} />
                </div>
                
                <h3 className="text-xl font-display font-bold text-zinc-100 mb-6 h-14">
                  {cert.title}
                </h3>
                
                <div className="space-y-3">
                  <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider mb-2">Skills Learned</p>
                  {cert.skills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className={`mt-0.5 ${cert.iconColor}`} />
                      <span className="text-zinc-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
