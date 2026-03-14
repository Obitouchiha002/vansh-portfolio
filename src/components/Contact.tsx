import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-zinc-900/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16 text-center items-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Get In <span className="text-neon-green">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-4 text-lg">
            Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 flex flex-col gap-8"
          >
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex items-start gap-6 hover:border-neon-green/30 transition-colors group">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-neon-green/10 transition-colors">
                <Mail size={28} className="text-zinc-400 group-hover:text-neon-green transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-zinc-100 mb-2">Email Me</h3>
                <a href="mailto:vk1234888i@gmail.com" className="text-zinc-400 hover:text-neon-green transition-colors text-lg break-all">
                  vk1234888i@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex items-start gap-6 hover:border-neon-blue/30 transition-colors group">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-neon-blue/10 transition-colors">
                <Linkedin size={28} className="text-zinc-400 group-hover:text-neon-blue transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-zinc-100 mb-2">LinkedIn</h3>
                <a href="#" className="text-zinc-400 hover:text-neon-blue transition-colors text-lg">
                  Vansh Kashyap
                </a>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex items-start gap-6 hover:border-zinc-600 transition-colors group">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-zinc-700 transition-colors">
                <MapPin size={28} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-zinc-100 mb-2">Location</h3>
                <p className="text-zinc-400 text-lg">
                  New Delhi, India
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7"
          >
            <form 
              action="https://formsubmit.co/vk1234888i@gmail.com" 
              method="POST"
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col gap-6"
            >
              {/* Disable Captcha for smoother UX (optional) */}
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-400">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-400">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-zinc-400">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="_subject"
                  required
                  placeholder="Project Inquiry"
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows={5}
                  placeholder="Hello Vansh, I would like to discuss..."
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-neon-green text-zinc-950 font-bold hover:bg-neon-green/90 transition-colors mt-2 box-glow-hover"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
