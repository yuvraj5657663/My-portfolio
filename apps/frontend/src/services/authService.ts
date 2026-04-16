import api from './api';

export const authService = {
  login: async (credentials: { email: string; password: any }): Promise<string> => {
    const res: any = await api.post('/auth/login', credentials);
    const token = res.data.token;
    localStorage.setItem('adminToken', token);
    return token;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('adminToken');
  },
};
