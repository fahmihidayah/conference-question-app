'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const SignInButton = () => {
  return (
    <Link href={'/auth'}>
      <Button>Sign In</Button>
    </Link>
  );
};
