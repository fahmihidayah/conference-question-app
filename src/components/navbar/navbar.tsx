'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '../ui/button';

import { SignInButton } from '@/components/navbar/sign-in-button';
import { UserDropdown } from '@/components/navbar/user-dropdown';

export const Navbar = () => {
  const session = useSession();

  return (
    <header className="container mx-auto flex items-center  justify-between py-6">
      <h1 className="text-primary text-2xl font-bold">QuestionApp</h1>
      <nav className="space-x-4">
        {session.status === 'authenticated' ? (
          <UserDropdown
            session={{
              user: session.data.user,
              expires: session.data.expires,
            }}
          />
        ) : (
          <>
            <SignInButton />
            <Link href={'sign-up'}>
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
    // <header className="w-full border-b">
    //   <div className="container flex h-16 items-center justify-between">
    //     <Link href="/" className="font-mono text-lg font-bold">
    //       App
    //     </Link>
    //     <div className="flex items-center gap-2">
    //       {session.status === 'authenticated' ? (
    //         <UserDropdown session={session.data} />
    //       ) : (
    //         <SignInButton />
    //       )}
    //     </div>
    //   </div>
    // </header>
  );
};
