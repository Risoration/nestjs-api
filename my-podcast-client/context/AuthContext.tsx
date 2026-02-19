'use client';
import { getMe } from '@/app/api/auth';
import { apiClient } from '@/app/lib/axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  user: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((data) => setUser(data))
      .catch((error) => {
        console.log(error);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   fetch('/auth/me', {
  //     credentials: 'include',
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error();
  //       return res.json();
  //     })
  //     .then((data) => setUser(data))
  //     .catch(() => setUser(null))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
