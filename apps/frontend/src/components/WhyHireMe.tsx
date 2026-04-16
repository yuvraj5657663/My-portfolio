import { motion } from 'motion/react';
import { Zap, ShieldCheck, Layers, Sparkles, Quote } from 'lucide-react';

const reasons = [
  {
    icon: <Zap className="text-yellow-400" size={24} />,
    title: 'Performance Obsessed',
    description: 'I treat performance as a feature. From optimized database queries to efficient React rendering, I build fast.',
  },
  {
    icon: <ShieldCheck className="text-green-400" size={24} />,
    title: 'Clean Code Advocate',
    description: 'Writing code that is not just functional, but readable, maintainable, and well-documented for future teams.',
  },
  {
    icon: <Layers className="text-blue-400" size={24} />,
    title: 'Scalable Systems',
    description: 'Designing architectures that can grow from 100 to 100,000 users without breaking a sweat.',
  },
  {
    icon: <Sparkles className="text-purple-400" size={24} />,
    title: 'AI Ready',
    description: 'Experienced in integrating modern AI APIs and building intelligent features into traditional SaaS products.',
  },
];

const testimonials = [
  {
    quote: "Yuvraj's ability to optimize our React rendering pipeline saved us significant infrastructure costs. His code is a joy to read.",
    author: "Senior Engineering Manager",
    company: "Tech Startup"
  },
  {
    quote: "He doesn't just write code; he thinks about the product architecture holistically. A true full-stack talent.",
    author: "Lead Architect",
    company: "SaaS Company"
  }
];

export function WhyHireMe() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Reasons */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Why Hire Me?</h2>
              <p className="text-zinc-400">Beyond just writing code, I deliver engineering excellence.</p>
            </motion.div>

            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 w-10 h-10 rounded-xl glass-panel flex items-center justify-center shrink-0">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-white mb-1">{reason.title}</h3>
                    <p className="text-[13px] text-[#888] leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials (Dummy) */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-panel p-8 relative"
                >
                  <Quote className="absolute top-6 right-6 text-white/5" size={32} />
                  <p className="text-[14px] text-[#888] italic mb-6 relative z-10">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-white/10" />
                    <div>
                      <div className="text-[13px] text-white font-semibold">{testimonial.author}</div>
                      <div className="text-[11px] text-[#888]">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
