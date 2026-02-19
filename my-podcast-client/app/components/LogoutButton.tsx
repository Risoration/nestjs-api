'use client';

import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    document.cookie = '';
    router.push('/login');
  }
  return (
    <button
      onClick={signOut}
      className='text-nowrap w-[7.5vw]'
    >
      Log Out
    </button>
  );
}
