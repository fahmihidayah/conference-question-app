'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { auth } from '@/libs/auth';

const Home = async () => {
  const user = await auth();
  console.log('auth ', user);
  return (
    <main className="text-primary min-h-screen">
      <section className="px-6 py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold">Run Q&A with ease</h2>
        <p className="text-primary mx-auto mb-8 max-w-xl text-lg">
          Create a conference session and allow participants to submit questions
          without logging in.
        </p>
        <Button>
          <Link href="/sign-up" className="">
            Create Your First Conference
          </Link>
        </Button>
      </section>

      <section className="bg-primary-foreground px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">How it works</h3>
            <ul className="text-primary list-inside list-disc space-y-4">
              <li>🧑 Moderator signs up and creates a conference.</li>
              <li>🔗 A unique link is shared with participants.</li>
              <li>❓ Participants ask questions—no login needed!</li>
              <li>✅ Moderator views and manages all questions.</li>
            </ul>
          </div>
          <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500">
            {/* You can replace this with an actual image */}[ Image /
            Screenshot Placeholder ]
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
