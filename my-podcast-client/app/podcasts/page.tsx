'use client';
import { useEffect, useState } from 'react';
import PodcastCard from './PodcastCard';
import axios from 'axios';
import AddPodcastButton from './AddPodcastButton';

export type Podcast = {
  id: string;
  title: string;
  description: string;
  rssUrl: string;
  imageUrl: string;
  createdAt: string;
};

async function fetchPodcasts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const response = await axios.get(`${apiUrl}/podcasts`);

  return response.data;
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

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
    <main>
      <AddPodcastButton onSuccess={loadPodcasts} />
      {podcasts.map((podcast) => (
        <div key={podcast.id}>
          <PodcastCard podcast={podcast} onSuccess={loadPodcasts} />
        </div>
      ))}
      ;
    </main>
  );
}
