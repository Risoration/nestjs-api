'use client';

import { useEffect, useState } from 'react';
import { getFavouriteCategories } from '@/app/api/podcasts';
import { FavouriteCategory } from '@/app/api/types';

export default function FavouriteGenres() {
  const [favourites, setFavourites] = useState<FavouriteCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavouriteCategories();
        setFavourites(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Favourite genres failed', err);
        setError('Unable to load your top categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className='mb-8'>
      <h2 className='text-lg text-zinc-300 mb-3'>Your top categories</h2>
      {loading && (
        <div className='text-zinc-500 text-sm'>Loading categories…</div>
      )}
      {!loading && error && (
        <div className='text-red-400 text-sm'>{error}</div>
      )}
      {!loading && !error && favourites.length === 0 && (
        <p className='text-zinc-500 text-sm'>
          Add some podcasts to your library to see your top categories here.
        </p>
      )}
      {!loading && !error && favourites.length > 0 && (
        <ul className='flex flex-wrap gap-2'>
          {favourites.map((cat) => (
            <li
              key={cat.id}
              className='px-3 py-1.5 bg-zinc-800 border border-teal-500/20 rounded-full text-zinc-200 text-sm'
            >
              {cat.name} ({cat.count}{' '}
              {cat.count === 1 ? 'podcast' : 'podcasts'})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
