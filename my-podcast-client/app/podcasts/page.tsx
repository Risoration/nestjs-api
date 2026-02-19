'use client';
import { useEffect, useState } from 'react';
import PodcastCard from './components/PodcastCard';
import AddPodcastButton from './components/AddPodcastButton';
import { apiClient } from '../lib/axios';
import { useRouter } from 'next/navigation';
import { getCookie } from '../lib/cookie';

export type Podcast = {
  id: string;
  title: string;
  description: string;
  rssUrl: string;
  imageUrl: string;
  createdAt: string;
};

async function fetchPodcasts() {
  const response = await apiClient.get(`/podcasts`);

  return response.data;
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('accessToken');

    if (!token) {
      router.replace('/login');
    }
  }, []);

  async function loadPodcasts() {
    try {
      const data = await fetchPodcasts();
      setPodcasts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPodcasts();
  }, []);

  return (
    <main className='w-full'>
      <div className='flex flex-row justify-between w-full items-center'>
        <h1 className='flex justify-center'>Your Podcasts</h1>
        <AddPodcastButton />
      </div>
      <div className='flex flex-row w-fit align-middle'>
        {podcasts.length > 0 ? (
          <div>
            {podcasts.map((podcast) => (
              <div key={podcast.id}>
                <PodcastCard
                  podcast={podcast}
                  onSuccess={loadPodcasts}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>No podcasts found</div>
        )}
      </div>
    </main>
  );
}
