'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { searchPodcasts, addPodcast, type SearchResult } from '@/app/api/podcasts';
import { toast } from 'react-toastify';

const DEBOUNCE_MS = 300;

export default function NewPodcastPage() {
  const router = useRouter();
  const { user, loading } = useAuth() ?? {};
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setSearchLoading(true);
    try {
      const data = await searchPodcasts(q);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Search failed', err);
      toast.error('Search failed. Please try again.');
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      performSearch(query);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [query, performSearch]);

  const handleAdd = async (listenNotesId: string, title: string) => {
    setAddingId(listenNotesId);
    try {
      await addPodcast(listenNotesId);
      toast.success(`Added "${title}" to your podcasts`);
      router.push('/podcasts');
    } catch (err) {
      console.error('Add failed', err);
      toast.error('Failed to add podcast. Please try again.');
    } finally {
      setAddingId(null);
    }
  };

  const inputClasses =
    'w-full py-3 px-4 bg-zinc-800/80 border border-teal-500/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-500/50 transition-colors';

  return (
    <main className='p-10'>
      <h1 className='text-2xl mb-6 text-zinc-100'>Add New Podcast</h1>

      <div className='max-w-2xl space-y-6'>
        <div>
          <input
            type='text'
            placeholder='Search for a podcast by name...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={inputClasses}
          />
        </div>

        {searchLoading && (
          <div className='text-zinc-400'>Searching...</div>
        )}

        {!searchLoading && query.trim() && results.length === 0 && (
          <div className='text-zinc-400'>
            No podcasts found. Try a different search term.
          </div>
        )}

        {!searchLoading && results.length > 0 && (
          <div className='space-y-3'>
            <h2 className='text-lg text-zinc-300'>Results</h2>
            <div className='space-y-2'>
              {results.map((podcast) => (
                <div
                  key={podcast.listenNotesId}
                  className='flex items-center gap-4 p-4 bg-zinc-800/60 border border-teal-500/20 rounded-lg'
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
                  <button
                    type='button'
                    onClick={() =>
                      handleAdd(podcast.listenNotesId, podcast.title)
                    }
                    disabled={addingId === podcast.listenNotesId}
                    className='px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-lg transition-colors shrink-0'
                  >
                    {addingId === podcast.listenNotesId ? 'Adding...' : 'Add'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <button
            type='button'
            onClick={() => router.back()}
            className='px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg transition-colors'
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
