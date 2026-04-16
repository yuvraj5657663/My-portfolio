import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, ArrowUpRight, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await portfolioService.submitContact(formData);
      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#00D1FF]/5 to-transparent pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Left Column: Info */}
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                Let's Build Something <span className="text-gradient">Extraordinary.</span>
              </h2>
              <p className="text-[15px] text-[#888] mb-12 leading-relaxed max-w-md">
                Currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex flex-col gap-4 mb-12">
                <a
                  href="mailto:yuvrajkumar4588@gmail.com"
                  className="group flex items-center gap-4 text-[#888] hover:text-white transition-colors w-fit"
                >
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Mail size={16} className="text-[#00D1FF]" />
                  </div>
                  <span className="font-medium text-sm">yuvrajkumar4588@gmail.com</span>
                </a>
                <a
                  href="tel:+918434245164"
                  className="group flex items-center gap-4 text-[#888] hover:text-white transition-colors w-fit"
                >
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone size={16} className="text-[#00D1FF]" />
                  </div>
                  <span className="font-medium text-sm">+91-8434245164</span>
                </a>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="https://linkedin.com/in/yuvraj-kumar564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[#888] hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                  <span className="font-medium text-sm">LinkedIn</span>
                  <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
                <a
                  href="https://github.com/yuvraj5657663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[#888] hover:text-white transition-colors"
                >
                  <Github size={18} />
                  <span className="font-medium text-sm">GitHub</span>
                  <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-black/20 border border-white/5 rounded-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-start gap-3 text-sm ${submitStatus === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                      }`}
                  >
                    {submitStatus === 'success' ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                    <span>{submitMessage}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors`}
                      placeholder="full-name"
                    />
                    {errors.name && <span className="text-red-400 text-xs mt-1.5 block">{errors.name}</span>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-1.5 block">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-black/50 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <span className="text-red-400 text-xs mt-1.5 block">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center gap-2 py-3.5 bg-[#00D1FF] text-black rounded-xl font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
