'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import FavouriteGenres from './components/FavouriteGenres';
import Recommendations from './components/Recommendations';

export default function ExplorePage() {
  const router = useRouter();
  const { user, loading } = useAuth() ?? {};

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-2 text-zinc-100'>Explore</h1>
      <p className='text-zinc-400 text-sm mb-6'>
        Discover new shows based on what you already love.
      </p>

      <FavouriteGenres />
      <Recommendations />
    </main>
  );
}
