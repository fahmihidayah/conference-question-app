'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import AuthForm from '../components/auth-form';
import SignInWithGithubButton from '../components/sign-in-with-github-button';

export default function AuthPageTemplate() {
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      // Redirect to the home page if the user is already authenticated
      router.push('/');
    }
  }, [session]);

  return (
    <div className="container mx-auto flex flex-col items-center py-10">
      <div className="flex w-1/2 flex-col gap-3">
        {' '}
        <AuthForm></AuthForm> <SignInWithGithubButton></SignInWithGithubButton>
      </div>
    </div>
  );
}
