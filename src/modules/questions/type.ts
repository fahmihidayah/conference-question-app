import z from 'zod';

export const questionFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  question: z
    .string()
    .min(1, 'Question is required')
    .max(1000, 'Question must be less than 1000 characters'),
  conferenceId: z.string().min(1, 'Conference ID is required'),
});

export type QuestionFormSchema = z.infer<typeof questionFormSchema>;
