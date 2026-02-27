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
        flex-1 flex items-center justify-center
        text-md font-medium text-zinc-300
        transition-colors hover:bg-teal-500/10 hover:text-teal-400
        rounded-2xl
      '
    >
      {children}
    </Link>
  );
}
