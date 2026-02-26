import api from './api';

export const saveJournalEntry = async (ayatId, reflection) => {
  const { data } = await api.post("/journal", {
    ayat_id: ayatId,
    reflection_text: reflection,
  });
  return data;
};

export const getJournalEntries = async () => {
  const { data } = await api.get("/journals");
  return data;
};
