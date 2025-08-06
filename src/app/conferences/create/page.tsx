import { ConferenceForm } from '@/modules/conferences/components/form';

export default function CreatePage() {
  return (
    <div className="container mx-auto flex h-screen w-full flex-col items-center">
      <ConferenceForm />
    </div>
  );
}
