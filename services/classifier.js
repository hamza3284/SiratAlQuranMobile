import api from './api';

export const classifySituation = async (text) => {
  const { data } = await api.post("/classify", { text });
  return data.themes;
};

export const getGuidance = async (text) => {
  const { data } = await api.post("/guidance", { text });
  return data;
};
