import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Bookings API
export const bookingsAPI = {
    create: (data) => api.post('/bookings', data),
    getAll: () => api.get('/bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
    delete: (id) => api.delete(`/bookings/${id}`),
};

// Messages API
export const messagesAPI = {
    create: (data) => api.post('/messages', data),
    getAll: () => api.get('/messages'),
    markAsRead: (id) => api.patch(`/messages/${id}/read`),
    delete: (id) => api.delete(`/messages/${id}`),
};

// Gallery API
export const galleryAPI = {
    getAll: (category) => api.get('/gallery', { params: { category } }),
    upload: (formData) => {
        return api.post('/gallery', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    delete: (id) => api.delete(`/gallery/${id}`),
};

// Auth API
export const authAPI = {
    login: (credentials) => axios.post(`${API_BASE_URL.replace('/api', '')}/api/auth/login`, credentials),
    verify: () => axios.get(`${API_BASE_URL.replace('/api', '')}/api/auth/verify`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
    }),
};

export default api;