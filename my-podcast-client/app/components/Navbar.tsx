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

  if (loading) return null;
  return (
    <nav className='flex flex-row justify-between items-center'>
      <Link
        className='text-2xl'
        href={'/'}
      >
        MapMyPodcast
      </Link>

      {user ? (
        <>
          <div
            className={`flex flex-row border-2 rounded-2xl justify-center w-[50vw] h-10 ${inter.className}`}
          >
            <NavLink href='/podcasts'>My Podcasts</NavLink>
            <NavLink href='/profile'>My Profile</NavLink>
          </div>
          <SignOutButton />
        </>
      ) : (
        <>
          <a href='/login'>Login</a>
          <a href='/register'>Register</a>
        </>
      )}
    </nav>
  );
}
