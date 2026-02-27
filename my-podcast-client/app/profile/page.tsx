'use client';

import { inter } from '../ui/fonts';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from '@/app/api/auth';
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth() ?? {};
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    } else if (user) {
      setName(user.name);
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      await updateProfile({ name });
      await refreshUser?.();
      setSuccess(true);
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      setError(message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    'relative py-4 mb-2 focus:shadow-teal-500/40 focus:shadow-lg focus:outline-none border-b-2 bg-transparent text-white border-teal-500/30 placeholder-zinc-500 focus:border-teal-400 transition-colors';

  if (loading || !user) {
    return (
      <main className='p-10'>
        <div className='text-zinc-400'>
          {loading ? 'Loading...' : 'Redirecting...'}
        </div>
      </main>
    );
  }

  return (
    <main className='p-10'>
      <div className='flex flex-col max-w-md m-auto'>
        <h1 className={`${inter.className} text-2xl mb-6 text-zinc-100`}>
          My Profile
        </h1>

        <form
          className='flex flex-col bg-zinc-800/80 rounded-2xl p-10 border border-teal-500/20 shadow-2xl shadow-teal-500/20'
          onSubmit={handleSubmit}
        >
          {error && (
            <p
              className='mb-3 text-sm text-red-400'
              role='alert'
            >
              {error}
            </p>
          )}
          {success && (
            <p className='mb-3 text-sm text-teal-400'>Profile updated.</p>
          )}
          <div className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm text-zinc-400 mb-1'>Email</label>
              <p className='text-zinc-100 py-2'>{user?.email}</p>
            </div>
            <div>
              <label className='block text-sm text-zinc-400 mb-1'>Name</label>
              <Input
                type='text'
                placeholder='Your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
              />
            </div>
            {user?.createdAt && (
              <p className='text-xs text-zinc-400 flex flex-row justify-between'>
                <span>
                  {' '}
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </span>
                <br />
                <span>
                  Last updated on{' '}
                  {new Date(user.updatedAt ?? '').toLocaleDateString()}
                </span>
              </p>
            )}
            <Button
              type='submit'
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
