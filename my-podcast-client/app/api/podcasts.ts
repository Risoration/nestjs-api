import { apiClient } from '../lib/axios';
import { SearchResult } from './types';

export const searchPodcasts = async (
  query: string,
): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  const response = await apiClient.get('/podcasts/search', {
    params: { q: query },
  });
  return response.data ?? [];
};

export const addPodcast = async (listenNotesId: string) => {
  const response = await apiClient.post('/podcasts', { listenNotesId });
  return response.data;
};

export const getPodcastDetail = async (id: string) => {
  const response = await apiClient.get(`/podcasts/${id}`);
  return response.data;
};
