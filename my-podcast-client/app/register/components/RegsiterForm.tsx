'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { inter } from '../../ui/fonts';
import { useActionState, useState } from 'react';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { buttonClasses, inputClasses } from '@/app/styles';
import { registerUser } from '../../api/auth';

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/podcasts';
  const [state, action, pending] = useActionState(authenticate, undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData);
      const user = await registerUser(formData);
      console.log('Registration successful:', user);
      router.push('/login');
    } catch (error: any) {
      console.log('ERROR:', error);
      console.log('RESPONSE:', error?.response);
    }
  };

  return (
    <form
      className='flex flex-col m-2 h-fit bg-gray-700 rounded-2xl p-10 border-2 shadow-2xl shadow-teal-500/70'
      action={action}
    >
      <h2 className={`${inter.className} mb-3 text-2xl`}>Sign Up</h2>
      <div className='flex flex-col'>
        <div className='flex flex-col h-2/3 mb-4'>
          <input
            type='text'
            placeholder='Name'
            className={inputClasses}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type='text'
            placeholder='Email'
            className={inputClasses}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type='password'
            placeholder='Password'
            className={inputClasses}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>
        <div className='flex flex-col h-2/3 mb-4 gap-5'>
          <button
            type='submit'
            className={buttonClasses}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <span className='flex flex-row justify-between items-center'>
            <p className='text-xs text-gray-300 text-left'>
              Already have an account?
            </p>
            <Link
              href={'/login'}
              className={buttonClasses + ' text-sm py-1 px-3 bg-violet-800'}
            >
              Log In
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}
