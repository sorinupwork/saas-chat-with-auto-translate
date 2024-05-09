import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getDocs } from 'firebase/firestore';

import { authOptions } from '@/auth';
import ChatInput from '@/components/ChatInput';
import { sortedMessagesRef } from '@/lib/converters/Message';
import ChatMessages from '@/components/ChatMessages';
import ChatMembersBadge from '@/components/ChatMembersBadge';
import AdminControls from '@/components/AdminControls';
import { chatMembersRef } from '@/lib/converters/ChatMembers';

type Props = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect('/chat?error=permission');

  return (
    <>
      <AdminControls chatId={chatId} />
      <ChatMembersBadge chatId={chatId} />

      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>

      <ChatInput chatId={chatId} />
    </>
  );
}

export default ChatPage;
