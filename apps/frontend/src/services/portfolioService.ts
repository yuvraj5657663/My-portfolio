import api from './api';

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const portfolioService = {
  // Public
  getSkills: async (): Promise<SkillCategory[]> => {
    const res: any = await api.get('/skills');
    return res.data;
  },

  getExperience: async (): Promise<Experience[]> => {
    const res: any = await api.get('/experience');
    return res.data;
  },

  submitContact: async (contact: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<void> => {
    await api.post('/contact', contact);
  },

  trackVisit: async (): Promise<void> => {
    if (!sessionStorage.getItem('hasVisited')) {
      await api.post('/visit');
      sessionStorage.setItem('hasVisited', 'true');
    }
  },

  // Admin
  getContacts: async (): Promise<Contact[]> => {
    const res: any = await api.get('/admin/contacts');
    return res.data;
  },

  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/admin/contacts/${id}`);
  },

  updateContactStatus: async (
    id: string,
    isRead: boolean
  ): Promise<Contact> => {
    const res: any = await api.patch(`/admin/contacts/${id}`, { isRead });
    return res.data;
  },

  getAnalytics: async (): Promise<any> => {
    const res: any = await api.get('/admin/visits');
    return res.data;
  },
};
