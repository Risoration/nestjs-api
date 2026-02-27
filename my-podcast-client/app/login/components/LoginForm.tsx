'use client';

import { inter } from '../../ui/fonts';
import React, { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '../../api/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUserFromLogin } = useAuth() ?? {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { user } = await loginUser(formData);
      if (user) {
        setUserFromLogin?.(user);
      }
      router.push('/podcasts');
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      setError(message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    'relative py-4 mb-2 focus:shadow-teal-500/40 focus:shadow-lg focus:outline-none border-b-2 bg-transparent text-white border-teal-500/30 placeholder-zinc-500 focus:border-teal-400 transition-colors';

  const linkClasses =
    'text-sm py-1 px-3 bg-violet-600 rounded-md hover:bg-violet-500 text-white transition-colors';

  return (
    <form
      className='flex flex-col m-2 h-fit bg-zinc-800/80 rounded-2xl p-10 border border-teal-500/20 shadow-2xl shadow-teal-500/20'
      onSubmit={handleSubmit}
    >
      <h2 className={`${inter.className} mb-3 text-2xl`}>Log in</h2>
      {error && (
        <p className='mb-3 text-sm text-red-400' role='alert'>
          {error}
        </p>
      )}
      <div className='flex flex-col'>
        <div className='flex flex-col h-2/3 mb-4'>
          <Input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className={inputClasses}
          />
          <Input
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className={inputClasses}
          />
        </div>
        <div className='flex flex-col h-2/3 mb-4 gap-5'>
          <Button
            type='submit'
            isLoading={isLoading}
          >
            Log In
          </Button>
          <span className='flex flex-row justify-between items-center'>
            <p className='text-xs text-zinc-400 text-left'>
              Don't have an account?
            </p>
            <Link
              href='/register'
              className={linkClasses}
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}
