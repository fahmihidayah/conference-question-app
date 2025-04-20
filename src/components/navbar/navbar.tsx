'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { SignInButton } from '@/components/navbar/sign-in-button';
import { UserDropdown } from '@/components/navbar/user-dropdown';

export const Navbar = () => {
  const session = useSession();

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold">
          App
        </Link>
        <div className="flex items-center gap-2">
          {session.status === 'authenticated' ? (
            <UserDropdown session={session.data} />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
};
