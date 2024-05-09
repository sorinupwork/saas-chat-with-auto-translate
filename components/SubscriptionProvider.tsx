'use client';

import { onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import { subscriptionRef } from '@/lib/converters/Subscription';
import { useSubscriptionStore } from '@/store/store';

function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session?.user?.id),
      (snapshot) => {
        if (snapshot.empty) {
          setSubscription(null);
          return;
        } else {
          setSubscription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.error('Error getting document:', error);
      }
    );
  }, [session, setSubscription]);

  return <>{children}</>;
}

export default SubscriptionProvider;
