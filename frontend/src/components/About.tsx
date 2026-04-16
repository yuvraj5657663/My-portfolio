import { motion } from 'motion/react';
import { Code2, Cpu, Database, Globe } from 'lucide-react';

const highlights = [
  {
    icon: <Code2 className="text-blue-400" size={24} />,
    title: 'Clean Architecture',
    description: 'Writing maintainable, scalable, and self-documenting code.',
  },
  {
    icon: <Cpu className="text-purple-400" size={24} />,
    title: 'AI Integration',
    description: 'Embedding intelligent features into modern web products.',
  },
  {
    icon: <Database className="text-emerald-400" size={24} />,
    title: 'Data Systems',
    description: 'Designing efficient database schemas and fast queries.',
  },
  {
    icon: <Globe className="text-orange-400" size={24} />,
    title: 'Web Performance',
    description: 'Optimizing load times and rendering for seamless UX.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              Engineering the <br />
              <span className="text-gradient">Future of Web.</span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
              <p>
                I am Yuvraj Kumar, a highly motivated Full Stack Engineer based in Ahmedabad, India. 
                My expertise lies in the MERN stack—React.js, Node.js, MongoDB, and Express—where I build 
                scalable web applications and robust REST APIs.
              </p>
              <p>
                I am deeply passionate about performance optimization, database architecture, and 
                integrating AI-powered systems into modern products. Whether it's reducing page load times 
                or designing complex multi-role SaaS architectures, I focus on delivering exceptional digital experiences.
              </p>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[13px] text-[#888] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
