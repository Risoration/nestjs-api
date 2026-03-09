import { apiClient } from '../lib/axios';
import { FavouriteCategory, SearchResult } from './types';

export const getFavouriteCategories = async (): Promise<
  FavouriteCategory[]
> => {
  const response = await apiClient.get('/podcasts/favourites');
  return response.data ?? [];
};

export const getRecommendedPodcasts = async (): Promise<SearchResult[]> => {
  const response = await apiClient.get('/podcasts/recommendations');
  return response.data ?? [];
};

export const searchPodcasts = async (
  query: string,
): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  const response = await apiClient.get('/podcasts/search', {
    params: { q: query },
  });
  return response.data ?? [];
};

function getAddPodcastErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const ax = err as { response?: { status?: number; data?: { message?: string | string[] } } };
    const status = ax.response?.status;
    const message = ax.response?.data?.message;
    const msg = Array.isArray(message) ? message[0] : message;
    if (status === 401) return 'Please log in again.';
    if (status === 404) return 'Podcast not found.';
    if (status === 409) return 'This podcast is already in your library.';
    if (status && status >= 500) return msg ?? 'Server error. Please try again later.';
    if (msg && typeof msg === 'string') return msg;
  }
  if (err instanceof Error) return err.message;
  return 'Failed to add podcast to library.';
}

export const addPodcast = async (listenNotesId: string) => {
  const id = listenNotesId?.trim();
  if (!id) {
    throw new Error('Podcast ID is required.');
  }
  try {
    const response = await apiClient.post('/podcasts', { listenNotesId: id });
    return response.data;
  } catch (err) {
    throw new Error(getAddPodcastErrorMessage(err));
  }
};

export const getPodcastDetail = async (id: string) => {
  const response = await apiClient.get(`/podcasts/${id}`);
  return response.data;
};
