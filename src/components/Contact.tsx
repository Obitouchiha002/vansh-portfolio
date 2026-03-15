import { motion } from 'motion/react';
import { Mail, Linkedin, Send, MessageCircle, Instagram, Youtube } from 'lucide-react';

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
            className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
          >
            {/* WhatsApp */}
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/918800628376" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-5 hover:border-[#25D366]/50 active:border-[#25D366]/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/10 group-active:bg-[#25D366]/10 transition-colors">
                <MessageCircle size={24} className="text-zinc-400 group-hover:text-[#25D366] group-active:text-[#25D366] transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-100 mb-1">WhatsApp</h3>
                <p className="text-zinc-400 text-sm group-hover:text-[#25D366] group-active:text-[#25D366] transition-colors">+91 8800628376</p>
              </div>
            </motion.a>

            {/* Instagram */}
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href="https://instagram.com/vanshkashyap70" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-5 hover:border-[#E1306C]/50 active:border-[#E1306C]/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#E1306C]/10 group-active:bg-[#E1306C]/10 transition-colors">
                <Instagram size={24} className="text-zinc-400 group-hover:text-[#E1306C] group-active:text-[#E1306C] transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-100 mb-1">Instagram</h3>
                <p className="text-zinc-400 text-sm group-hover:text-[#E1306C] group-active:text-[#E1306C] transition-colors">@vanshkashyap70</p>
              </div>
            </motion.a>

            {/* YouTube */}
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href="https://youtube.com/@techbyvansh?si=z_dNM2ooAKwoNI2M" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-5 hover:border-[#FF0000]/50 active:border-[#FF0000]/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#FF0000]/10 group-active:bg-[#FF0000]/10 transition-colors">
                <Youtube size={24} className="text-zinc-400 group-hover:text-[#FF0000] group-active:text-[#FF0000] transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-100 mb-1">YouTube</h3>
                <p className="text-zinc-400 text-sm group-hover:text-[#FF0000] group-active:text-[#FF0000] transition-colors">Tech By Vansh</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href="mailto:vk1234888i@gmail.com"
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-5 hover:border-neon-green/30 active:border-neon-green/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-neon-green/10 group-active:bg-neon-green/10 transition-colors">
                <Mail size={24} className="text-zinc-400 group-hover:text-neon-green group-active:text-neon-green transition-colors" />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-lg font-display font-bold text-zinc-100 mb-1">Email</h3>
                <p className="text-zinc-400 text-sm group-hover:text-neon-green group-active:text-neon-green transition-colors truncate">vk1234888i@gmail.com</p>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/vansh-kashyap-32a46a2a6"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-5 hover:border-[#0077b5]/50 active:border-[#0077b5]/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#0077b5]/10 group-active:bg-[#0077b5]/10 transition-colors">
                <Linkedin size={24} className="text-zinc-400 group-hover:text-[#0077b5] group-active:text-[#0077b5] transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-zinc-100 mb-1">LinkedIn</h3>
                <p className="text-zinc-400 text-sm group-hover:text-[#0077b5] group-active:text-[#0077b5] transition-colors">Vansh Kashyap</p>
              </div>
            </motion.a>
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
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col gap-6 h-full"
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
              <div className="flex flex-col gap-2 flex-grow">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  placeholder="Hello Vansh, I would like to discuss..."
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all resize-none h-full min-h-[150px]"
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
