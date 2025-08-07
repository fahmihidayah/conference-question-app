'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { SignUpFormSchema } from '../type';

import { signUpAction } from '@/actions/sign-up';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function SignUpForm() {
  const form = useForm<SignUpFormSchema>({
    defaultValues: {
      email: '',
      name: '',
      confirmPassword: '',
      password: '',
    },
  });

  const toast = useToast();

  const router = useRouter();

  const onSubmit = async (data: SignUpFormSchema) => {
    const user = await signUpAction(data);
    if (user.error) {
      toast.toast({
        title: 'Error',
        description: user.message,
        variant: 'destructive',
      });
    } else {
      router.push('/');
      toast.toast({
        title: 'Berhasil',
        description: user.message,
        variant: 'default',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        method="post"
        encType={'application/x-www-form-urlencoded'}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <Input placeholder="Email" {...field} />}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => <Input placeholder="Nama" {...field} />}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input type="password" placeholder="Password" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Input type="password" placeholder="Konfirmasi Password" {...field} />
          )}
        />
        <Button type="submit" className="w-full rounded-sm">
          Daftar
        </Button>
      </form>
    </Form>
  );
}
