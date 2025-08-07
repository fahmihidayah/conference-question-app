'use client';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

import AuthForm from '../components/auth-form';

export default function AuthPageTemplate() {
  return (
    <div className="container mx-auto flex flex-col items-center py-10">
      <div className="flex w-1/2 flex-col gap-3">
        {' '}
        <AuthForm></AuthForm>
        {/* <SignInWithGithubButton></SignInWithGithubButton> */}
      </div>
    </div>
  );
}
