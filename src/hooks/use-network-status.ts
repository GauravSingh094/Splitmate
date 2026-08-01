'use client';

import { useEffect, useState } from 'react';
import { networkStatus } from '@/lib/offline/network-status';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(networkStatus.isOnline);
  const [isSlow, setIsSlow] = useState<boolean>(networkStatus.isSlow);

  useEffect(() => {
    return networkStatus.subscribe((online, slow) => {
      setIsOnline(online);
      setIsSlow(slow);
    });
  }, []);

  return { isOnline, isSlow };
}
