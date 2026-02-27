'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPodcastDetail } from '@/app/api/podcasts';
import { PodcastDetail } from '@/app/api/types';
import { inter } from '@/app/ui/fonts';
import EpisodeList from '@/app/episodes/components/EpisodeList';

export default function PodcastDetailPage() {
  const params = useParams();
  const router = useRouter();
  const podcastId = params?.id as string | undefined;
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth() ?? {};

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!podcastId) {
      setIsLoading(false);
      setError('Missing podcast ID');
      return;
    }

    async function fetchPodcast() {
      if (!podcastId) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPodcastDetail(podcastId);
        setPodcast(data);
      } catch (error) {
        console.error(`Error fetching podcast detail: ${error}`);
        setError('Failed to load podcast detail');
      } finally {
        setIsLoading(false);
      }
    }
    fetchPodcast();
  }, [podcastId]);

  if (authLoading || !user) {
    return (
      <main className='p-10'>
        <div className='text-zinc-400'>
          {authLoading ? 'Loading...' : 'Redirecting...'}
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className='p-10'>
        <div className='text-zinc-400'>Loading podcast details...</div>
      </main>
    );
  }

  if (error || !podcast) {
    return (
      <main className='p-10'>
        <p className='text-zinc-400'>
          {error || 'Failed to load podcast detail'}
        </p>
        <Link
          href='/podcasts'
          className='text-teal-500 hover:text-teal-400'
        >
          Back to Podcasts
        </Link>
      </main>
    );
  }

  return (
    <main className=' flex flex-col gap-10 p-10'>
      <Link
        href='/podcasts'
        className='text-teal-500 hover:text-teal-400'
      >
        Back to Podcasts
      </Link>
      <div className='flex flex-col items-center justify-between mt-4 gap-4'>
        <h1>{podcast.title}</h1>
        <div>
          {podcast.topics.map((t) => (
            <span
              key={t.id}
              className='px-3 py-1 bg-teal-600/30 text-teal-300 rounded-full text-sm'
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <div className='bg-zinc-800/80 rounded-2xl p-6 border border-teal-500/20 shadow-lg shadow-teal-500/5'>
        <div className='flex flex-row gap-6'>
          {podcast.imageUrl && (
            <img
              src={podcast.imageUrl}
              alt={podcast.title}
              className='w-32 h-32 rounded-lg'
            />
          )}
          <div className='flex-1 min-w-0'>
            <p className='text-zinc-400'>{podcast.description}</p>
          </div>
        </div>
      </div>
      <div className='bg-zinc-800/80 rounded-2xl p-6 border border-teal-500/20 shadow-lg shadow-teal-500/5'>
        <h2 className={`${inter.className} text-lg text-zinc-400 mb-4`}>
          Episodes
        </h2>
        <EpisodeList episodes={podcast.episodes ?? []} />
      </div>
    </main>
  );
}
