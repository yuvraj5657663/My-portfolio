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
  login: async (credentials: { email: string; password: any }): Promise<string> => {
    const res = await api.post<AuthResponse>('/auth/login', credentials);
    
    // In our api.ts interceptor, we return response.data
    // So 'res' is the AuthResponse object
    const token = res.data.token;
    
    if (!token) {
      throw new Error('Authentication failed: No token received');
    }

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
