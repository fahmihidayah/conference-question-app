import { PackageOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

import { findByIdConference } from '@/modules/conferences/actions';

interface ConferenceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ConferenceDetailPage({
  params,
}: ConferenceDetailPageProps) {
  const conference = await findByIdConference((await params).id);

  if (!conference) {
    notFound();
  }

  return (
    <div className="container mx-auto flex w-full flex-col gap-4 py-8">
      <div className="flex items-start justify-between">
        <h1 className="text-primary mb-4 text-3xl font-bold">
          Kajian : {conference.title}
        </h1>
        <div className="text-primary w-full text-end text-sm">
          Tanggal : {new Date(conference.createdAt).toLocaleDateString()}
        </div>
      </div>
      <h2 className="text-primary w-full text-center text-2xl font-semibold">
        Questions ({conference.questions.length})
      </h2>

      {conference.questions.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-center text-gray-500 ">
          <PackageOpen className="size-16" />
          <p className="text-lg">No questions yet.</p>
        </div>
      ) : (
        <div className="space-y-6 ">
          {conference.questions.map((question) => (
            <div
              key={question.id}
              className="text-primary hover:text-secondary overflow-hidden rounded-lg border-2 border-blue-500 px-4 py-2 hover:cursor-pointer hover:bg-blue-500"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{question.name}</h3>
                <span className="text-sm">
                  {new Date(question.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="leading-relaxed">{question.question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
