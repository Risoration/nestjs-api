import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import { inter, roboto } from '../app/ui/fonts';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MapMyPodcast',
  description: 'A podcast knowledge base',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} ${roboto.className} antialiased w-full p-5 m-2 bg-[#0c0c0f] text-zinc-100`}
      >
        <AuthProvider>
          <ToastContainer theme='dark' />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
