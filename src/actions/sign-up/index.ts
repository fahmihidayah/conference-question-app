'use server';
import bcrypt from 'bcryptjs';

import { SignUpFormSchema } from '@/modules/sign-up/type';
import { ResponseAction } from '@/types/response';
import { TUser } from '@/types/user';

export const signUpAction = async (
  form: SignUpFormSchema
): Promise<ResponseAction<TUser | undefined>> => {
  console.log(form);
  try {
    const user = await prisma?.user.create({
      data: {
        email: form.email,
        name: form.name,
        password: await bcrypt.hash(form.password, 10),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (user) {
      return {
        data: user,
        error: false,
        message: 'User created successfully',
      };
    } else {
      return {
        data: undefined,
        error: true,
        message: 'User creation failed',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      data: undefined,
      error: true,
      message: 'User creation failed',
    };
  }
};
