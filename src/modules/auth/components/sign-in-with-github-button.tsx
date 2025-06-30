'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export default function SignInWithGithubButton() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const handleSignIn = () => {
    if (isPending) return; // Prevent multiple clicks while pending
    startTransition(async () => {
      const result = await signIn('github');
      if (result?.ok) {
        // Redirect to the home page after successful sign-in
        router.push('/');
      }
    });
  };
  return (
    <Button onClick={handleSignIn}>
      {isPending && <span className="mr-2 animate-spin">Loading...</span>}
      {!isPending && <span className="mr-2">Sign in with GitHub</span>}
    </Button>
  );
}
