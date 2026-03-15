import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, ExternalLink, X, FileText } from 'lucide-react';

const certifications = [
  {
    title: 'Microsoft Skill Saksham Program',
    skills: ['AI Basics', 'Communication Skills', 'MS Office'],
    color: 'from-blue-500/20 to-neon-blue/20',
    borderColor: 'border-neon-blue/30',
    iconColor: 'text-neon-blue',
    glowColor: 'shadow-neon-blue/20',
    imageUrl: '/skill saksham certificate.jpg',
  },
  {
    title: 'Allied Engineering Works Pvt Ltd',
    skills: ['Assembly', 'Technical Exposure'],
    color: 'from-emerald-500/20 to-neon-green/20',
    borderColor: 'border-neon-green/30',
    iconColor: 'text-neon-green',
    glowColor: 'shadow-neon-green/20',
    imageUrl: '/Allied Engineering .jpeg',
  },
  {
    title: 'Elios Management Consulting',
    skills: ['Electronic System Design'],
    color: 'from-purple-500/20 to-fuchsia-500/20',
    borderColor: 'border-fuchsia-500/30',
    iconColor: 'text-fuchsia-400',
    glowColor: 'shadow-fuchsia-500/20',
    imageUrl: '/Elios Management Consulting.jpeg',
  },
  {
    title: 'ITI – Computer Hardware & Networking',
    skills: ['Computer Hardware Basics', 'Networking Fundamentals', 'PC Assembly & Troubleshooting', 'Operating System Installation', 'Basic System Maintenance'],
    color: 'from-orange-500/20 to-yellow-500/20',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    glowColor: 'shadow-orange-500/20',
    imageUrl: '/ITI .jpeg',
  },
  {
    title: 'Tally with GST – STP Computer Education',
    skills: ['Tally ERP / Tally Prime Basics', 'GST Billing & Invoicing', 'Accounting Fundamentals', 'Ledger & Voucher Entry', 'Financial Report Generation'],
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    glowColor: 'shadow-cyan-500/20',
    imageUrl: '/tally prime certificate.jpg',
  },
  {
    title: 'Basic Computer Course – STP Computer Education',
    skills: ['Computer Fundamentals', 'Microsoft Word, Excel & PowerPoint', 'Internet & Email Usage', 'File Management', 'Basic Typing Skills'],
    color: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    glowColor: 'shadow-rose-500/20',
    imageUrl: '/basic computer certificate (1).jpg',
  },
  {
    title: 'Pariksha Pe Charcha 2024 – Participation Certificate',
    skills: ['Academic Awareness', 'Student Engagement', 'Learning Motivation', 'Education & Career Guidance', 'Exam Preparation Insights'],
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
    glowColor: 'shadow-indigo-500/20',
    imageUrl: '/Pariksha Pe Charcha 2024.png',
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${cert.color} border ${cert.borderColor} p-8 rounded-2xl relative overflow-hidden group flex flex-col h-full`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award size={100} className={cert.iconColor} />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-12 h-12 rounded-xl bg-zinc-950/50 flex items-center justify-center mb-6 border ${cert.borderColor}`}>
                  <Award className={cert.iconColor} size={24} />
                </div>
                
                <h3 className="text-xl font-display font-bold text-zinc-100 mb-6 min-h-[3.5rem]">
                  {cert.title}
                </h3>
                
                <div className="space-y-3 flex-grow">
                  <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider mb-2">Skills Learned</p>
                  {cert.skills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${cert.iconColor}`} />
                      <span className="text-zinc-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setSelectedCert(cert);
                    setIsImageLoading(true);
                  }}
                  className={`mt-8 w-full py-3 rounded-xl bg-zinc-950/50 border ${cert.borderColor} text-sm font-bold ${cert.iconColor} flex items-center justify-center gap-2 group/btn hover:bg-zinc-950 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] ${cert.glowColor} relative overflow-hidden active:scale-95`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Certificate <ExternalLink size={16} />
                  </span>
                  <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300`} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Viewer Modal Placeholder */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center border ${selectedCert.borderColor}`}>
                    <Award className={selectedCert.iconColor} size={20} />
                  </div>
                  <h3 className="font-display font-bold text-zinc-100">{selectedCert.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="bg-zinc-950 overflow-y-auto max-h-[70vh]">
                {selectedCert.imageUrl ? (
                  <div className="p-4 md:p-8 flex items-center justify-center relative min-h-[300px]">
                    {isImageLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10">
                        <div className={`w-12 h-12 border-4 border-t-transparent ${selectedCert.borderColor.replace('border-', 'border-t-')} rounded-full animate-spin mb-4`} />
                        <p className="text-zinc-500 text-sm animate-pulse">Loading Certificate...</p>
                      </div>
                    )}
                    <img 
                      src={selectedCert.imageUrl} 
                      alt={selectedCert.title}
                      onLoad={() => setIsImageLoading(false)}
                      className={`max-w-full h-auto rounded-lg shadow-2xl border border-zinc-800 transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] md:aspect-video flex flex-col items-center justify-center p-12 text-center">
                    <div className={`w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center mb-6 border-2 border-dashed ${selectedCert.borderColor} animate-pulse`}>
                      <FileText className={selectedCert.iconColor} size={40} />
                    </div>
                    <h4 className="text-2xl font-display font-bold text-zinc-100 mb-2">Certificate Preview</h4>
                    <p className="text-zinc-400 max-w-md">
                      The digital certificate for <span className={selectedCert.iconColor}>{selectedCert.title}</span> will be uploaded here soon.
                    </p>
                  </div>
                )}
                
                <div className="p-8 bg-zinc-900/50 border-t border-zinc-800">
                  <h5 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">Skills & Competencies</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedCert.skills.map((skill, i) => (
                      <div key={i} className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl text-sm text-zinc-300 flex items-center gap-3">
                        <CheckCircle2 size={18} className={selectedCert.iconColor} />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
