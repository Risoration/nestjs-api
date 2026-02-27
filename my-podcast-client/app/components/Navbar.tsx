'use client';
import Link from 'next/link';
import { inter } from '../ui/fonts';
import SignOutButton from './LogoutButton';
import NavLink from './NavLink';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const authContext = useAuth();
  const user = authContext?.user;
  const loading = authContext?.loading;

  return (
    <nav className='flex flex-row justify-between items-center py-4 border-b border-teal-500/20'>
      <Link
        className='text-2xl font-semibold text-zinc-100 hover:text-teal-400 transition-colors'
        href='/'
      >
        MapMyPodcast
      </Link>

      {loading ? (
        <div className='flex flex-row gap-4 text-zinc-500'>Loading...</div>
      ) : user ? (
        <>
          <div
            className={`flex flex-row border border-teal-500/20 rounded-2xl justify-center w-[50vw] h-10 bg-zinc-800/60 ${inter.className}`}
          >
            <NavLink href='/podcasts'>My Podcasts</NavLink>
            <NavLink href='/profile'>My Profile</NavLink>
          </div>
          <SignOutButton />
        </>
      ) : (
        <div className='flex flex-row gap-2'>
          <Link
            href='/login'
            className='px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors'
          >
            Login
          </Link>
          <Link
            href='/register'
            className='px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors'
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
