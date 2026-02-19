import { Podcast } from '../page';
import RemovePodcastButton from './RemovePodcastButton';

type PodcastCardProps = {
  podcast: Podcast;
  onSuccess: () => void;
};

export default function PodcastCard({ podcast, onSuccess }: PodcastCardProps) {
  return (
    <div className='border-2 rounded-3xl m-2 p-5 w-1/2'>
      <div className='flex flex-row justify-between'>
        <h1 className='font-bold text-3xl m-1'>{podcast.title}</h1>
        <img
          className='size-50'
          src={podcast.imageUrl}
          alt={podcast.title}
        />
      </div>
      <h3 className='mt-2'>{podcast.description}</h3>
      <RemovePodcastButton
        podcast={podcast}
        onSuccess={onSuccess}
      />
    </div>
  );
}
