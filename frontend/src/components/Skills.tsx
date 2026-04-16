import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { portfolioService, SkillCategory } from '../services/portfolioService';

export function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioService.getSkills()
      .then(data => setSkillCategories(data))
      .catch(err => console.error('Failed to fetch skills', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Technical Arsenal</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and high-performance web applications.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-[#00D1FF] w-8 h-8" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="glass-panel p-6"
              >
                <h3 className="text-[14px] font-semibold text-[#888] tracking-[1px] uppercase mb-5">
                  {category.category}
                </h3>
                <div className="flex flex-col gap-3">
                  {category.items.map((skill: string, skillIndex: number) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="flex justify-between items-center pb-2 border-b border-white/5"
                    >
                      <span className="text-[14px] text-white">{skill}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] shadow-[0_0_10px_#00D1FF]" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
