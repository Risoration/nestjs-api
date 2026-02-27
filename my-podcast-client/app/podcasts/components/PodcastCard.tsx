import Link from 'next/link';
import { Podcast } from '../page';
import RemovePodcastButton from './RemovePodcastButton';

type PodcastCardProps = {
  podcast: Podcast;
  onSuccess: () => void;
};

export default function PodcastCard({ podcast, onSuccess }: PodcastCardProps) {
  return (
    <div className='border border-teal-500/20 rounded-2xl p-5 bg-zinc-800/60 shadow-lg shadow-teal-500/5'>
      <div className='flex flex-row justify-between gap-4'>
        <h1 className='font-bold text-2xl m-1 text-zinc-100'>
          {podcast.title}
        </h1>
        <img
          className='w-24 h-24 object-cover shrink-0 rounded-lg'
          src={podcast.imageUrl}
          alt={podcast.title}
        />
      </div>
      <h3 className='mt-2 text-zinc-400'>{podcast.description}</h3>
      <div className='flex flex-row justify-between items-center'>
        <RemovePodcastButton
          podcast={podcast}
          onSuccess={onSuccess}
        />
        <Link
          href={`/podcasts/${podcast.id}`}
          className='bg-teal-600 hover:bg-teal-500 rounded-2xl p-2'
        >
          See More
        </Link>
      </div>
    </div>
  );
}
