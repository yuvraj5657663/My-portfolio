import { useState, useEffect, useRef, FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldAlert, LayoutDashboard, MessageSquare, FolderGit2, BarChart3, LogOut, Plus, Trash2, Edit2, Users, Eye, Loader2, X, CheckCircle2, Bot, Send as SendIcon, MailOpen } from 'lucide-react';

import { authService } from '../services/authService';
import { projectService, Project } from '../services/projectService';
import { portfolioService, Contact } from '../services/portfolioService';
import { aiService, ChatMessage } from '../services/aiService';

export function AdminPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');

  // Check if already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login({ email, password });
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-[#00D1FF]/30">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-black/20 flex flex-col shrink-0">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D1FF]/10 flex items-center justify-center border border-[#00D1FF]/20">
                <LayoutDashboard size={16} className="text-[#00D1FF]" />
              </div>
              <span className="font-bold tracking-tight">Admin OS</span>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <NavItem icon={<BarChart3 size={18} />} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <NavItem icon={<MessageSquare size={18} />} label="Messages" isActive={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
            <NavItem icon={<FolderGit2 size={18} />} label="Projects" isActive={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          </nav>

          <div className="p-4 border-t border-white/5">
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-[#888] hover:text-white hover:bg-white/5 rounded-xl transition-colors text-sm font-medium">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D1FF]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            {activeTab === 'analytics' && <AnalyticsManager />}
            {activeTab === 'messages' && <MessagesManager />}
            {activeTab === 'projects' && <ProjectsManager />}
          </div>
        </main>
        <AdminChatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D1FF]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Lock className="text-[#00D1FF]" size={28} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Admin Access</h2>
          <p className="text-[#888] text-[13px]">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
          >
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full group flex items-center justify-center gap-2 py-3.5 bg-[#00D1FF] text-black rounded-xl font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70 disabled:hover:scale-100 mt-4"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-[#888] hover:text-white text-[13px] transition-colors font-medium">
            &larr; Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-sm font-medium ${
        isActive 
          ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20' 
          : 'text-[#888] hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function AnalyticsManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioService.getAnalytics()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#00D1FF]" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Visits', value: data?.count || 0, icon: <Eye size={20} className="text-[#00D1FF]" /> },
          { label: 'Unique Devices', value: new Set(data?.recentVisits?.map((v: any) => v.ip)).size || 0, icon: <Users size={20} className="text-[#00D1FF]" /> },
          { label: 'Recent Activity', value: data?.recentVisits?.length || 0, icon: <BarChart3 size={20} className="text-[#00D1FF]" /> },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#888] text-sm font-medium">{stat.label}</span>
              <div className="w-10 h-10 rounded-full bg-[#00D1FF]/10 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden mt-8">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-semibold">Recent Visitors</h3>
        </div>
        <div className="divide-y divide-white/5 max-h-96 overflow-y-auto">
          {data?.recentVisits?.length === 0 ? (
            <div className="p-6 text-center text-[#888]">No visits recorded yet.</div>
          ) : (
            data?.recentVisits?.map((visit: any, i: number) => (
              <div key={i} className="p-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-[#888] w-32 truncate">{visit.ip}</span>
                  <span className="text-white/80">{visit.device}</span>
                </div>
                <span className="text-[#888]">{new Date(visit.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MessagesManager() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = () => {
    setLoading(true);
    portfolioService.getContacts()
      .then(res => setMessages(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadMessages(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await portfolioService.deleteContact(id);
      loadMessages();
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      await portfolioService.updateContactStatus(id, !currentStatus);
      loadMessages();
    } catch (err) {
      alert('Failed to update message');
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#00D1FF]" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Recent Messages</h2>
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-medium text-[#888]">Showing all inquiries ({messages.length})</span>
        </div>
        <div className="divide-y divide-white/5">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-[#888]">No messages found.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className={`p-6 hover:bg-white/[0.02] transition-colors flex items-start justify-between group ${!msg.isRead ? 'bg-white/[0.02]' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold">{msg.name}</span>
                    <span className="text-xs text-[#888]">{msg.email}</span>
                    <span className="text-xs text-[#888] ml-2">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    {!msg.isRead && <span className="text-[10px] uppercase tracking-wider font-semibold text-[#00D1FF] bg-[#00D1FF]/10 px-2 py-0.5 rounded-full">New</span>}
                  </div>
                  <h4 className={`text-sm mb-2 ${!msg.isRead ? 'font-bold text-white' : 'font-medium text-white/80'}`}>{msg.subject || 'No Subject'}</h4>
                  <p className={`text-sm max-w-3xl whitespace-pre-wrap ${!msg.isRead ? 'text-white/90' : 'text-[#888]'}`}>
                    {msg.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => handleToggleRead(msg._id, msg.isRead)}
                    className="p-2 text-[#888] hover:text-[#00D1FF] hover:bg-[#00D1FF]/10 rounded-lg transition-all"
                    title={msg.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {msg.isRead ? <Mail size={16} /> : <MailOpen size={16} />}
                  </button>
                  <button 
                    onClick={() => handleDelete(msg._id)}
                    className="p-2 text-[#888] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', liveLink: '', githubLink: '', featured: false
  });

  const loadProjects = () => {
    setLoading(true);
    projectService.getAllProjects()
      .then(res => setProjects(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProjects(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.deleteProject(id);
      loadProjects();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const openModal = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack.join(', '),
        liveLink: project.liveLink || '',
        githubLink: project.githubLink || '',
        featured: project.featured || false
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', description: '', techStack: '', liveLink: '', githubLink: '', featured: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await projectService.updateProject(editingProject._id, payload);
      } else {
        await projectService.addProject(payload);
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (err: any) {
      alert(err.message || 'Error saving project');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#00D1FF]" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Manage Projects</h2>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#00D1FF] text-black rounded-xl font-semibold text-sm hover:scale-105 transition-transform"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-[#888] glass-panel rounded-2xl border border-white/5">
            No projects found. Add your first project!
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="glass-panel p-6 rounded-2xl border border-white/5 group relative">
              {project.featured && (
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
                  Featured
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center">
                  <FolderGit2 size={24} className="text-[#888]" />
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openModal(project)} className="p-2 text-[#888] hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="p-2 text-[#888] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 pr-16">{project.title}</h3>
              <p className="text-sm text-[#888] mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                {project.techStack.slice(0, 3).map((tech: string, i: number) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-semibold text-[#00D1FF] bg-[#00D1FF]/10 px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] font-semibold text-[#888]">+{project.techStack.length - 3}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10">
              <h3 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#888] hover:text-white rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Project Title *</label>
                <input 
                  type="text" required
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Description *</label>
                <textarea 
                  required rows={4}
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">Live URL</label>
                  <input 
                    type="url" 
                    value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">GitHub URL</label>
                  <input 
                    type="url" 
                    value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})}
                    placeholder="https://github.com/..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, featured: !formData.featured})}
                  className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${formData.featured ? 'bg-[#00D1FF] border-[#00D1FF] text-black' : 'border-white/20 text-transparent'}`}
                >
                  <CheckCircle2 size={16} />
                </button>
                <label className="text-sm font-medium text-white cursor-pointer" onClick={() => setFormData({...formData, featured: !formData.featured})}>
                  Mark as Featured Project
                </label>
              </div>

              <div className="pt-6 flex items-center justify-end gap-4 border-t border-white/5">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-sm font-semibold text-[#888] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={isSaving}
                  className="px-6 py-3 bg-[#00D1FF] text-black rounded-xl font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
                >
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function AdminChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'Hi Yuvraj! I am your AI assistant. How can I help you manage your portfolio today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const reply = await aiService.chat(userMsg, messages.slice(1));
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error: ' + err.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-[#00D1FF] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:scale-110 transition-all z-40 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <Bot size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 w-[350px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-black/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00D1FF]/10 flex items-center justify-center border border-[#00D1FF]/20">
                  <Bot size={16} className="text-[#00D1FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-[10px] text-[#00D1FF]">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-[#888] hover:text-white rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#00D1FF] text-black rounded-tr-sm' 
                      : 'bg-white/5 text-white border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                    <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-black/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white text-sm focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#00D1FF] hover:bg-[#00D1FF]/10 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <SendIcon size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
