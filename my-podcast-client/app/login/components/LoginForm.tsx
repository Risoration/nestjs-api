'use client';

import { useSearchParams } from 'next/navigation';
import { inter } from '../../ui/fonts';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/podcasts';
  const [state, action, pending] = useActionState(authenticate, undefined);

  return (
    <form
      className='flex flex-col justify-center m-2 p-2 w-full'
      action={action}
    >
      <h1 className={`${inter.className} mb-3 text-2xl`}>
        Please log in to continue
      </h1>
      <input type='text' placeholder='email' />
      <input type='password' placeholder='password' />
      <button type='submit'>Log In</button>
      <Link href={'/register'}>Register</Link>
    </form>
  );
}
