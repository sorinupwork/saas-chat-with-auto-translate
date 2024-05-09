'use client';

import { useSubscriptionStore } from '@/store/store';

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro =
    subscription?.role === 'pro' && subscription.status === 'active';
  return (
    <div
      className={`flex-1 w-full flex flex-col max-w-6xl mx-auto sm:min-h-[800px] ${
        isPro && 'sm:min-h-[840px]'
      } min-h-[671px] ${isPro && 'min-h-[712px]'}`}
    >
      {children}
    </div>
  );
}
