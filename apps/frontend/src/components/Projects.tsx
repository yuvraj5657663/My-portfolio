import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { projectService, Project } from '../services/projectService';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to fetch projects', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Featured Projects</h2>
          <p className="text-zinc-400 max-w-2xl">
            A selection of my most impactful work, demonstrating scalable architecture and premium user experiences.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin text-[#00D1FF] w-8 h-8" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-[#888] py-12 glass-panel rounded-2xl border border-white/5">
            No projects found. Check back later!
          </div>
        ) : (
          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Project Card */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center glass-panel p-8 md:p-12 bg-[radial-gradient(circle_at_top_right,rgba(0,209,255,0.1),transparent)]">
                  
                  {/* Content Side */}
                  <div className={`lg:col-span-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="mb-4">
                      {project.featured && (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold text-[#00D1FF] bg-[#00D1FF]/10 border border-[#00D1FF]/20 rounded-full mb-4">
                          Featured Project
                        </span>
                      )}
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">{project.title}</h3>
                    </div>
                    
                    <p className="text-[#888] text-[13px] leading-relaxed mb-6 whitespace-pre-wrap">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack?.map((tech: string) => (
                        <span key={tech} className="px-2.5 py-1 text-[10px] font-medium text-white bg-white/5 border border-white/10 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-sm font-semibold hover:bg-zinc-200 transition-colors">
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 glass-panel rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors">
                          <Github size={16} />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual Side (Mockup/Abstract) */}
                  <div className={`lg:col-span-6 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10 group-hover:border-white/20 transition-colors duration-500">
                      {/* Abstract Visual Representation */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-500/20 to-cyan-500/20' : 'from-purple-500/20 to-pink-500/20'} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                      <div className="absolute inset-0 backdrop-blur-3xl" />
                      
                      {/* Decorative UI Elements */}
                      <div className="absolute inset-8 border border-white/5 rounded-2xl overflow-hidden bg-black/40 shadow-2xl flex flex-col">
                        {/* Fake Browser Header */}
                        <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        {/* Fake Content Area */}
                        <div className="flex-1 p-6 flex flex-col gap-4 relative overflow-hidden">
                           <div className="w-1/3 h-6 bg-white/10 rounded-md animate-pulse" />
                           <div className="w-full h-32 bg-white/5 rounded-xl border border-white/5" />
                           <div className="grid grid-cols-3 gap-4">
                             <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                             <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                             <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
