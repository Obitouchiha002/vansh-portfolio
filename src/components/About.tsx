import { motion } from 'motion/react';
import { MapPin, Calendar, User } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            About <span className="text-neon-green">Me</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-neon-green">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Name</p>
                    <p className="font-medium text-zinc-200">Vansh Kashyap</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-neon-green">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Location</p>
                    <p className="font-medium text-zinc-200">New Delhi, India</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-neon-green">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Date of Birth</p>
                    <p className="font-medium text-zinc-200">16 January 2005</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7"
          >
            <div className="prose prose-invert prose-zinc max-w-none">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-zinc-300 leading-relaxed mb-6"
              >
                I'm a <span className="text-white font-semibold inline-flex items-center bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700 shadow-sm mx-1">creator and builder</span> from Delhi who works where AI, automation, and design meet. I build apps, automate the repetitive parts of a workflow, and create and manage content across LinkedIn, X, YouTube and Instagram — under my brand, Tech By Vansh.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-zinc-400 leading-relaxed mb-6"
              >
                My foundation is hands-on — computer hardware, networking, and troubleshooting. That background helps me take an idea all the way to a working product, and I genuinely enjoy squeezing real performance out of <span className="text-neon-green/90 font-medium">low-end setups</span>, where smart optimization actually makes a difference.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-lg text-zinc-400 leading-relaxed"
              >
                On the creative side, I design <span className="text-white font-medium">graphics</span>, edit <span className="text-white font-medium">videos</span>, and use modern <span className="text-white font-medium">AI tools</span> daily to ship faster without cutting corners. The goal stays simple: build useful things and make tech easier to understand for everyone.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
