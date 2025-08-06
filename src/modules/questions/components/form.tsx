'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createQuestion } from '../actions';
import { QuestionFormSchema, questionFormSchema } from '../type';

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

interface QuestionFormProps {
  conferenceId: string;
  onSuccess?: () => void;
}

export function QuestionForm({ conferenceId, onSuccess }: QuestionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      name: '',
      question: '',
      conferenceId,
    },
  });

  const onSubmit = async (data: QuestionFormSchema) => {
    setIsSubmitting(true);

    try {
      const result = await createQuestion(data);

      if (result) {
        toast({
          title: 'Success',
          description: 'Question submitted successfully!',
        });

        // Reset form
        form.reset({
          name: '',
          question: '',
          conferenceId,
        });

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Default behavior: redirect to conference page
          // router.push(`/conferences/${conferenceId}`);
        }
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit question. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting question:', error);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <Input
                placeholder="Enter your name"
                {...field}
                disabled={isSubmitting}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <Textarea
                placeholder="Type your question here..."
                {...field}
                disabled={isSubmitting}
                rows={4}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Question'}
        </Button>
      </form>
    </Form>
  );
}
