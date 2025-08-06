import z from 'zod';

export const conferenceFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type ConferenceFormSchema = z.infer<typeof conferenceFormSchema>;
