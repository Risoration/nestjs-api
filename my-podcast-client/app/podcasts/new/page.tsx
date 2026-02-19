'use client';

import { apiClient } from '@/app/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewPodcastPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rssUrl: '',
    imageUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiClient.post('/podcasts', formData.rssUrl);

      router.push('/podcasts');
    } catch (error) {
      console.error('Failed to create podcast', error);
    }
  };

  return (
    <main className='p-10'>
      <h1 className='text-2xl mb-6'>Add New Podcast</h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          type='text'
          placeholder='Podcast Title'
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <button type='submit'>Add Podcast</button>
        <button
          type='button'
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </form>
    </main>
  );
}
