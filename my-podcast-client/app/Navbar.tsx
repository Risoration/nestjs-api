'use client';
import Link from 'next/link';
import { inter } from './ui/fonts';

export default function Navbar() {
  return (
    <div className={`flex justify-between p-2 m-2 ${inter.className}`}>
      <Link
        className='text-3xl'
        href={'/'}
      >
        MapMyPodcast
      </Link>
      <Link
        className='text-xl'
        href='/podcasts'
      >
        My Podcasts
      </Link>
    </div>
  );
}
