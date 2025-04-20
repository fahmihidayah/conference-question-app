'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { AuthFormSchema, authFormSchema } from '../type';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function AuthForm() {
  const form = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (data: AuthFormSchema) => {
    console.log('submit form : ', data);
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      toast.toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      router.push('/');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        encType={'application/x-www-form-urlencoded'}
        className="flex w-full flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <Input placeholder="Email" {...field} />}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input type="password" placeholder="Password" {...field} />
          )}
        />
        <Button type="submit" className="w-full rounded-sm text-white">
          Login
        </Button>
      </form>
    </Form>
  );
}
