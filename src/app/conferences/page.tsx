import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { findAllConference } from '@/modules/conferences/actions';
import ListUserConferences from '@/modules/conferences/components/list-users-conferences';
export default async function Page() {
  const conferences = await findAllConference();

  return (
    <div className="container mx-auto flex flex-col gap-2">
      <div className="flex justify-between py-5">
        <h3>Conferences</h3>
        <Link href={'conferences/create'}>
          <Button>
            <Plus size={16}></Plus>
            Add
          </Button>
        </Link>
      </div>
      <ListUserConferences conferences={conferences} />
    </div>
  );
}
