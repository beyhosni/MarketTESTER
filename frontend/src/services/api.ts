import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Create axios instance
const api = axios.create({
    baseURL: '/api', // Relies on Vite proxy in dev, or same-origin in prod
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Add token to headers
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Handle 401/403 (optional: auto-logout)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Logic to redirect to login or clear token could go here
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default api;
