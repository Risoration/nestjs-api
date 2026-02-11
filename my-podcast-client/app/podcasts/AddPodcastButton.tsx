'use client';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type AddPodcastButtonProps = {
  onSuccess: () => void;
};

export default function AddPodcastButton({ onSuccess }: AddPodcastButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [rssUrl, setRssUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addPodcast(e: React.SubmitEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await axios.post(`${apiUrl}/podcasts`, {
        rssUrl,
      });
      if (response.status >= 200 && response.status < 300) {
        onSuccess();
        toast.success(`Podcast added successfully`);
      } else {
        throw new Error(`Unexpected response ${response.status}`);
      }
    } catch (error) {
      let errorMessage =
        error instanceof Error
          ? error.message
          : 'Error while attempting to CREATE podcast';

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data.message ??
          error.message ??
          'Error while attempting to CREATE podcast';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (showForm) {
    return (
      <form
        className='p-4 m-2 border rounded-2xl bg-gray-600'
        onSubmit={addPodcast}
      >
        <div className='mb-3'>
          <label className='block mb-2 text-sm font-medium' htmlFor='rssUrl'>
            RSS Feed URL
          </label>
          <input
            className='w-full'
            id='rssUrl'
            type='url'
            value={rssUrl}
            onChange={(e) => setRssUrl(e.target.value)}
            placeholder='https://example.com/podcast.rss'
            required
            disabled={isLoading}
          />
        </div>
        {error && <div className='mb-3'>{error}</div>}
        <div className='flex gap-2'>
          <button
            type='submit'
            disabled={isLoading}
            className='cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Adding...' : 'Add Podcast'}
          </button>
          <button
            type='button'
            onClick={() => {
              setShowForm(false);
              setRssUrl('');
              setError(null);
            }}
            disabled={isLoading}
            className='cursor-pointer bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg disabled:opacity-50'
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      className='cursor-pointer hover:bg-gray-300 p-2 m-2 rounded-2xl bg-gray-500 text-black'
      onClick={() => setShowForm(true)}
    >
      Add Podcasts
    </button>
  );
}
