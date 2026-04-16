import api from './api';

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
  createdAt: string;
}

export const projectService = {
  // Public
  getProjects: async (): Promise<Project[]> => {
    const res: any = await api.get('/projects');
    return res.data;
  },

  // Admin
  getAllProjects: async (): Promise<Project[]> => {
    const res: any = await api.get('/admin/projects');
    return res.data;
  },

  addProject: async (project: Omit<Project, '_id' | 'createdAt'>): Promise<Project> => {
    const res: any = await api.post('/admin/projects', project);
    return res.data;
  },

  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const res: any = await api.put(`/admin/projects/${id}`, project);
    return res.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/admin/projects/${id}`);
  },
};
