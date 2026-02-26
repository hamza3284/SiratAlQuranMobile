import api from './api';

export const getThemes = () => api.get('/themes');
export const getThemeAyats = (slug) => api.get(`/themes/${slug}/ayats`);
