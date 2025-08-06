'use server';
import { QuestionFormSchema } from '../type';

import prisma from '@/libs/prisma';

export async function createQuestion(form: QuestionFormSchema) {
  return await prisma.question.create({
    data: {
      name: form.name,
      question: form.question,
      conferenceId: form.conferenceId,
    },
  });
}
