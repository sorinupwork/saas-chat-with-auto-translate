'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import useAdminId from '@/hooks/useAdminId';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

function DeleteChatButton({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const adminId = useAdminId({ chatId });

  const handleDelete = async () => {
    toast({
      title: 'Deleting chat',
      description: 'Please wait while we delete the chat...',
    });

    await fetch('/api/chat/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId: chatId }),
    })
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Your chat has been deleted!',
          className: 'bg-green-600 text-white',
          duration: 3000,
        });
        router.replace(`/chat`);
      })
      .catch((err) => {
        console.error(err.message);

        toast({
          title: 'Error',
          description: 'There was an error deleting your chat!',
          variant: 'destructive',
        });
      })
      .finally(() => setOpen(false));
  };

  return (
    session?.user.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'destructive'}>Delete Chat</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Are you sure?</DialogTitle>
            <DialogDescription className="text-center">
              This will delete the chat and all messages permanently!
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant={'destructive'} onClick={handleDelete}>
              Delete
            </Button>

            <Button variant={'outline'} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
}

export default DeleteChatButton;
