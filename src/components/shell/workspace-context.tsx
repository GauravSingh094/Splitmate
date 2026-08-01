'use client';

import React, { createContext, useContext, useState } from 'react';

export interface WorkspaceContextValue {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  setTitle: (title?: string) => void;
  setSubtitle: (subtitle?: string) => void;
  setActions: (actions?: React.ReactNode) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState<string | undefined>();
  const [subtitle, setSubtitle] = useState<string | undefined>();
  const [actions, setActions] = useState<React.ReactNode | undefined>();

  return (
    <WorkspaceContext.Provider
      value={{ title, subtitle, actions, setTitle, setSubtitle, setActions }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used within <WorkspaceProvider>');
  }
  return ctx;
}
