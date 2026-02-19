import Link from 'next/link';
import { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className='
        flex-1
        flex items-center justify-center
        text-md font-medium
        transition-colors
        hover:bg-gray-700
        rounded-2xl
      '
    >
      {children}
    </Link>
  );
}
