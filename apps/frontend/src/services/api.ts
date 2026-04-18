import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  console.log('Attaching token to request:', token); // Debug log
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response.data.data || response.data,
  (error) => {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem('adminToken');
    // }

    return Promise.reject(
      new Error(error.response?.data?.message || 'Something went wrong')
    );
  }
);

export default api;
