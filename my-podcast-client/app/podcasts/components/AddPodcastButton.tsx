import Link from 'next/link';

export default function AddPodcastButton() {
  return (
    <Link
      href={'/podcasts/new'}
      className='
        inline-block px-4 py-2
        text-md font-medium text-zinc-300
        transition-colors hover:bg-teal-500/50 hover:text-teal-400
        bg-teal-600 
      '
    >
      Add Podcast
    </Link>
  );
}
