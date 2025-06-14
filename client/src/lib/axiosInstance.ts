import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
