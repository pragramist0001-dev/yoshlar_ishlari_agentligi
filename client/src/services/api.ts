import axios from 'axios';
import type { AxiosAdapter } from 'axios';
import { mockNews, mockProjects, mockDocuments, mockSettings, mockStats } from './mockData';

// Force mock mode for frontend-only demonstration
const USE_MOCK = false;

const defaultAdapter = axios.defaults.adapter as AxiosAdapter;

const mockAdapter: AxiosAdapter = async (config) => {
    if (USE_MOCK) {
        console.log(`[MOCK API] ${config.method?.toUpperCase()} ${config.url}`);
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay

        // Helper to return success response
        const success = (data: any) => ({
            data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
            request: {}
        });

        const url = config.url || '';

        // Auth
        if (url.includes('/auth/login') && config.method === 'post') {
            return success({
                token: 'mock-token-12345',
                user: {
                    _id: 'admin-1',
                    name: 'Super Admin',
                    email: 'admin@yoshlar.uz',
                    role: 'superadmin'
                }
            });
        }

        if (config.method === 'get') {
            if (url.endsWith('/news')) return success({ news: mockNews });
            if (url.includes('/news/')) {
                const slug = url.split('/').pop();
                const item = mockNews.find(n => n.title.toLowerCase().includes(slug?.toLowerCase() || '') || n._id === slug) || mockNews[0];
                return success(item);
            }
            if (url.endsWith('/projects')) return success(mockProjects);
            if (url.includes('/projects/')) {
                const id = url.split('/').pop();
                const item = mockProjects.find(p => p._id === id) || mockProjects[0];
                return success(item);
            }
            if (url.endsWith('/documents')) return success(mockDocuments);
            if (url.endsWith('/settings')) return success(mockSettings);
            if (url.endsWith('/dashboard/stats')) return success(mockStats);

            // Default generic GET
            return success({ message: 'Mock Data', results: [] });
        }

        // Mutations (POST, PUT, DELETE)
        if (['post', 'put', 'delete', 'patch'].includes(config.method || '')) {
            return success({ message: 'Success (Mock)', id: 'mock-id' });
        }
    }

    // Fallback?
    if (defaultAdapter) return defaultAdapter(config);
    throw new Error('Adapter not found');
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    adapter: USE_MOCK ? mockAdapter : defaultAdapter,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            if (!USE_MOCK && !window.location.pathname.includes('/admin/login')) {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
