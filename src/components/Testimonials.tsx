import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Client Name",
    role: "CEO, Tech Startup",
    content: "Vansh is an incredibly talented developer and designer. He delivered the project on time and exceeded our expectations. Highly recommended for any tech or design needs!",
    image: "https://picsum.photos/seed/client1/100/100"
  },
  {
    id: 2,
    name: "Client Name",
    role: "Content Creator",
    content: "Working with Vansh was a breeze. His understanding of video editing and YouTube algorithms helped my channel grow significantly. Great communication and skills.",
    image: "https://picsum.photos/seed/client2/100/100"
  },
  {
    id: 3,
    name: "Client Name",
    role: "Small Business Owner",
    content: "Provided excellent IT support when our systems went down. Fast, reliable, and very professional. Will definitely hire again for future technical issues.",
    image: "https://picsum.photos/seed/client3/100/100"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16 text-center items-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Client <span className="text-neon-green">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-neon-green rounded-full" />
          <p className="text-zinc-400 max-w-2xl mt-4 text-lg">
            Here's what people have to say about my work and services. (Placeholder for future clients)
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl relative group hover:border-neon-green/30 transition-colors flex flex-col"
            >
              <Quote className="absolute top-6 right-6 text-zinc-800 w-12 h-12 group-hover:text-neon-green/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-neon-green text-neon-green" />
                ))}
              </div>
              
              <p className="text-zinc-300 mb-8 relative z-10 leading-relaxed flex-grow">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border border-zinc-800"
                />
                <div>
                  <h4 className="text-zinc-100 font-bold font-display">{testimonial.name}</h4>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
