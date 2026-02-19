import Link from 'next/link';

export default function AddPodcastButton() {
  return (
    <Link
      href={'/podcasts/new'}
      className='inline-block px-4 py-2 bg-violet-500 text-white rounded'
    >
      Add Podcast
    </Link>
  );
}
