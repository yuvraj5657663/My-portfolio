import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, Loader2 } from 'lucide-react';

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch('/api/experience');
        const data = await res.json();
        if (data.success) {
          setExperiences(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch experience', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Experience</h2>
          <p className="text-zinc-400">My professional journey in building software.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-[#00D1FF] w-8 h-8" />
          </div>
        ) : (
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline Line (Mobile) */}
                <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-white/10" />
                <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-blue-500" />

                <div className="glass-panel p-8 md:p-10 relative overflow-hidden group">
                  {/* Subtle gradient hover effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,209,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-[14px] text-[#888] font-medium">
                        <Briefcase size={16} className="text-[#00D1FF]" />
                        <span className="text-white">{exp.company}</span>
                        <span className="text-zinc-600">•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full border border-[#00D1FF]/20 whitespace-nowrap font-semibold">
                      <Calendar size={14} />
                      <span>{exp.date}</span>
                    </div>
                  </div>

                  <ul className="relative z-10 space-y-3">
                    {exp.achievements.map((item: string, i: number) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-3 text-[13px] text-[#888]"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00D1FF] shrink-0 shadow-[0_0_8px_#00D1FF]" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
