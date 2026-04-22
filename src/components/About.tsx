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
                I'm a young <span className="text-white font-semibold inline-flex items-center bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700 shadow-sm mx-1">tech enthusiast</span> from Delhi with a strong passion for computers, technology, and digital creation. What started as simple curiosity about how things work has grown into a deep interest in learning and building in the tech space.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-zinc-400 leading-relaxed mb-6"
              >
                I'm especially interested in computer hardware, networking, and troubleshooting. I enjoy diagnosing issues, improving system performance, and helping people get the best out of their machines—especially when working with <span className="text-neon-green/90 font-medium">low-end setups</span>.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-lg text-zinc-400 leading-relaxed"
              >
                Beyond the technical side, I'm also creatively driven. I love <span className="text-white font-medium">graphic design</span>, <span className="text-white font-medium">video editing</span>, and content creation. By combining my technical knowledge with creativity, I aim to create engaging tech content and tutorials that make complex ideas simple and useful for everyday users.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
