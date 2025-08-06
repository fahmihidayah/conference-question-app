'use server';

import { auth } from '@/libs/auth';

export async function getUser() {
  const session = await auth();

  return await prisma?.user.findFirst({
    where: {
      email: {
        equals: session?.user?.email,
      },
    },
  });
}
