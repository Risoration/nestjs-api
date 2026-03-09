'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecommendedPodcasts } from '@/app/api/podcasts';
import { SearchResult } from '@/app/api/types';

export default function Recommendations() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecommendedPodcasts();
        setRecommendations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Recommendations failed', err);
        setError(
          'Unable to load recommendations right now. Please try again later.',
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section>
      <h2 className='text-lg text-zinc-300 mb-3'>Recommended for you</h2>
      {loading && (
        <div className='text-zinc-500 text-sm'>
          Finding podcasts you might like…
        </div>
      )}
      {!loading && error && <div className='text-red-400 text-sm'>{error}</div>}
      {!loading && !error && recommendations.length === 0 && (
        <p className='text-zinc-500 text-sm'>
          Add a few podcasts to your library, and we’ll recommend new shows
          based on their topics. Or check back later for new suggestions.
        </p>
      )}
      {!loading && !error && recommendations.length > 0 && (
        <div className='space-y-2'>
          {recommendations.map((podcast) => (
            <div
              key={podcast.listenNotesId}
              role='button'
              tabIndex={0}
              onClick={() => router.push(`/podcasts/${podcast.listenNotesId}`)}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                router.push(`/podcasts/${podcast.listenNotesId}`)
              }
              className='flex items-center gap-4 p-4 bg-zinc-800/60 border border-teal-500/20 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors'
            >
              {podcast.image && (
                <img
                  src={podcast.image}
                  alt=''
                  className='w-16 h-16 rounded object-cover'
                />
              )}
              <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-zinc-100 truncate'>
                  {podcast.title}
                </h3>
                <p className='text-sm text-zinc-500 line-clamp-2'>
                  {podcast.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
