'use server';

import { Conference, Question } from '@prisma/client';
import { revalidateTag } from 'next/cache';

import { ConferenceFormSchema } from '../type';

import { auth } from '@/libs/auth';
import prisma from '@/libs/prisma';
import { getUser } from '@/modules/user/actions';

export async function findByIdConference(
  id: string
): Promise<(Conference & { questions: Question[] }) | null> {
  const conference = await prisma.conference.findUnique({
    where: {
      id: id,
    },
    include: {
      questions: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  return conference;
}

export async function createConference(
  form: ConferenceFormSchema
): Promise<Conference | undefined> {
  const user = await getUser();

  if (user) {
    return await prisma.conference.create({
      data: {
        title: form.title,
        description: form.description,
        user: {
          connectOrCreate: {
            create: {
              ...user,
            },
            where: {
              id: user.id,
            },
          },
        },
      },
    });
  }
  return undefined;
}

export async function findAllConference(): Promise<
  | (Conference & { questions: Question[]; _count: { questions: number } })[]
  | undefined
> {
  const session = await auth();

  const conferences = await prisma.conference.findMany({
    where: {
      user: {
        email: {
          equals: session?.user?.email,
        },
      },
    },
    include: {
      questions: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          questions: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return conferences;
}

export async function deleteByIdConference(id: string) {
  await prisma.conference.delete({
    where: {
      id: id,
    },
  });

  revalidateTag('/conferences');
}
