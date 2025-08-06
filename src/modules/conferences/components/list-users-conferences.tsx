'use client';
import { Conference } from '@prisma/client';
import { Eye, Share2, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { deleteByIdConference } from '../actions';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ListUserConferences({
  conferences,
}: {
  conferences?: Conference[];
}) {
  const { toast } = useToast();

  const handleShare = async (conferenceId: string) => {
    const shareUrl = `${window.location.origin}/conferences/${conferenceId}/questions`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy share link:', err);
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };
  return (
    <ul className="flex size-full flex-col gap-3">
      {conferences?.map((e, index) => {
        return (
          <li
            key={index}
            className="text-primary border-primary flex flex-col gap-3 rounded border-2 px-3 py-2"
          >
            <Link href={`conferences/${e.id}`}>
              <h3>{e.title}</h3>
            </Link>
            <div className="flex w-full flex-row-reverse gap-4 ">
              <Button
                size={'sm'}
                variant={'destructive'}
                onClick={() => {
                  deleteByIdConference(e.id);
                }}
              >
                <Trash2 size={16} />
              </Button>
              <Button 
                size={'sm'} 
                variant={'default'}
                onClick={() => handleShare(e.id)}
              >
                <Share2 size={16} />
              </Button>

              <Button size={'sm'}>
                <Link href={`conferences/${e.id}`}>
                  <Eye size={16} />
                </Link>
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
