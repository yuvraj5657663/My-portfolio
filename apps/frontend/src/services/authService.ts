import api from './api';

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    email: string;
    token: string;
  };
}

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<string> => {
    const res = await api.post<AuthResponse>('/auth/login', credentials);

    const token = res.token;

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
