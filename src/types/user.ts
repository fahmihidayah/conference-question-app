import { Prisma } from '@prisma/client';

export type TUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
  };
}>;
