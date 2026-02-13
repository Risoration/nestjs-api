'use client';

import { useSearchParams } from 'next/navigation';
import { inter } from '../ui/fonts';
import React, { useActionState, useState } from 'react';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { buttonStyle, inputBox } from '@/app/styles';
import { loginUser } from '../api/auth';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/podcasts';
  const [state, action, pending] = useActionState(authenticate, undefined);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser(formData);
      console.log('Login successful:', user);
    } catch (error: any) {
      console.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form
      className='flex flex-col m-2 h-fit bg-gray-700 rounded-2xl p-10 border-2 shadow-2xl shadow-teal-500/70'
      action={action}
    >
      <h2 className={`${inter.className} mb-3 text-2xl`}>Log in</h2>
      <div className='flex flex-col'>
        <div className='flex flex-col h-2/3 mb-4'>
          <input
            type='text'
            placeholder='Email'
            className={inputBox}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type='password'
            placeholder='Password'
            className={inputBox}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>
        <div className='flex flex-col h-2/3 mb-4 gap-5'>
          <button
            type='submit'
            className={buttonStyle}
          >
            Log In
          </button>
          <span className='flex flex-row justify-between items-center'>
            <p className='text-xs text-gray-300 text-left'>
              Don't have an account?
            </p>
            <Link
              href={'/register'}
              className={buttonStyle + ' text-sm py-1 px-3 bg-violet-800'}
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}
