'use client';

import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useMounted } from '@/hooks/use-mounted';

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

/**
 * Generic React Portal component with SSR protection.
 * Mounts children to the specified container ID or document.body.
 */
export function Portal({ children, containerId }: PortalProps) {
  const mounted = useMounted();

  if (!mounted) return null;

  const targetContainer = containerId
    ? (document.getElementById(containerId) ?? document.body)
    : document.body;

  return createPortal(children, targetContainer);
}
