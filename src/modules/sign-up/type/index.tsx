import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
