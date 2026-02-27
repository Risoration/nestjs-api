'use client';

import { useEffect, useState } from 'react';
import PodcastCard from './components/PodcastCard';
import AddPodcastButton from './components/AddPodcastButton';
import { apiClient } from '../lib/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Episode } from '@/app/api/types';

export type Podcast = {
  id: string;
  title: string;
  description: string;
  rssUrl: string;
  imageUrl: string;
  thumbnail: string;
  createdAt: string;
  episodes: Episode[];
};

async function fetchPodcasts() {
  const response = await apiClient.get(`/podcasts`);
  return response.data;
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const router = useRouter();
  const { user, loading } = useAuth() ?? {};

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

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
      <div className='flex flex-row justify-between w-full items-center mb-8'>
        <h1 className='flex justify-center text-zinc-100 text-2xl'>
          Your Podcasts
        </h1>
        <AddPodcastButton />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 align-middle'>
        {podcasts.length > 0 ? (
          <div className='space-y-4'>
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
          <div className='text-zinc-400 text-lg'>
            No podcasts found. Add your first podcast to get started.
          </div>
        )}
      </div>
    </main>
  );
}
