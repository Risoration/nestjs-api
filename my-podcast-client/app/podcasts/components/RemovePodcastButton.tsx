import { useState } from 'react';
import { Podcast } from '../page';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type RemovePodcastButtonProps = {
  podcast: Podcast;
  onSuccess: () => void;
};

export default function RemovePodcastButton({
  podcast,
  onSuccess,
}: RemovePodcastButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function removePodcast(e: React.FormEvent) {
    e.preventDefault();

    const confirmed = window.confirm(
      `Are you sure you want to remove ${podcast.title}?`,
    );
    if (!confirmed) return;
    setIsLoading(true);
    setError(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
      const response = await axios.delete(
        `${apiUrl}/podcasts?id=${podcast.id}`,
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success(`Removed "${podcast.title}" from your podcasts`);
        onSuccess();
      } else {
        throw new Error(`Unexpected response ${response.status}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error while attempting to DELETE podcast';
      setError(errorMessage);
      toast.error(errorMessage);

      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            `DELETE failed with status ${error.response.status}, ${error.response.statusText}`,
          );
        } else if (error.request) {
          console.error('Network error: No response from server');
        } else {
          console.error(`Request error ${error.message}`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className='cursor-pointer hover:bg-red-600 p-2 m-2 rounded-2xl bg-red-500'
      onClick={removePodcast}
    >
      Remove Podcast
    </button>
  );
}
