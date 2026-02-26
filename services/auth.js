import api from './api';

export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
export const logoutUser = () => api.post('/logout');
export const getCurrentUser = () => api.get('/user');
