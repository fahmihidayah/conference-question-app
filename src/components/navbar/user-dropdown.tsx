'use client';

import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import Link from 'next/link';
import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';

import ImageWrapper from '../ui/image-wrapper';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { env } from '@/env.mjs';

export const UserDropdown = ({
  session: { user },
}: {
  session: DefaultSession;
}) => {
  const handleCreateCheckoutSession = async () => {
    const res = await fetch('/api/stripe/checkout-session');
    const checkoutSession = await res.json().then(({ session }) => session);
    const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="overflow-hidden rounded-full"
          src={user?.image || '/user.png'}
          alt={`${user?.name}`}
          width={32}
          height={32}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel className="text-primary">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-center justify-center p-2">
          <ImageWrapper
            className="overflow-hidden rounded-full"
            src={user?.image ?? ''}
            alt={`${user?.name}`}
            width={100}
            height={100}
          />
          <h2 className="py-2 text-lg font-bold">{user?.name}</h2>
          <Link href={'conferences'}>
            <Button
              onClick={handleCreateCheckoutSession}
              className="text-secondary bg-primary w-64"
            >
              {'Your Conferences'}
            </Button>
          </Link>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <Icons.logOut className="mr-2 size-4" /> <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
