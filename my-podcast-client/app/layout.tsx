import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import { inter, roboto } from '../app/ui/fonts';

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
        className={`${inter.className} ${roboto.className} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className='flex-1'>{children}</main>
        <ToastContainer position='top-right' autoClose={3000} pauseOnHover />
      </body>
    </html>
  );
}
