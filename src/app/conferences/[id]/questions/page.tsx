import { notFound } from 'next/navigation';

import { findByIdConference } from '@/modules/conferences/actions';
import { QuestionForm } from '@/modules/questions/components';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CreateQuestion({ params }: Props) {
  const { id } = await params;

  // Verify conference exists
  const conference = await findByIdConference(id);

  if (!conference) {
    notFound();
  }

  return (
    <div className="container mx-auto flex size-full flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-primary mb-2 text-3xl font-bold">
            Ajukan Pertanyaan
          </h1>
          <p className="text-lg text-gray-600">{conference.title}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <QuestionForm conferenceId={id} />
        </div>
      </div>
    </div>
  );
}
