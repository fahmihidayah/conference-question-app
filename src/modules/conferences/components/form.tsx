'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { createConference } from '../actions';
import { ConferenceFormSchema, conferenceFormSchema } from '../type';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

export function ConferenceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ConferenceFormSchema>({
    resolver: zodResolver(conferenceFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: ConferenceFormSchema) => {
    setIsSubmitting(true);

    try {
      const result = await createConference(data);

      if (result) {
        toast({
          title: 'Success',
          description: 'Conference created successfully!',
        });
        router.push('/conferences');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create conference. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error creating conference:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex size-full flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter conference title"
                {...field}
                disabled={isSubmitting}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter conference description"
                {...field}
                disabled={isSubmitting}
                rows={4}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Conference'}
        </Button>
      </form>
    </Form>
  );
}
