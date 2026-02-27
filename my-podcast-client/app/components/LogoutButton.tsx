'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '../ui/button';

export default function SignOutButton() {
  const router = useRouter();
  const { logout } = useAuth() ?? {};

  function handleSignOut() {
    logout?.();
    router.push('/login');
  }

  return (
    <Button onClick={handleSignOut} variant="secondary" className="text-nowrap">
      Log Out
    </Button>
  );
}
