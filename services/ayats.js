import api from './api';

// Public endpoints
export const getAyat = (id) => api.get(`/ayats/${id}`);
