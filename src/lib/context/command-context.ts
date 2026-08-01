import { createContext, useContext } from 'react';

import type { CommandGroup, CommandItem } from '@/types/ui';

export interface CommandContextValue {
  /** Whether the command palette is currently open. */
  isOpen: boolean;
  /** Open the command palette. */
  open: () => void;
  /** Close the command palette. */
  close: () => void;
  /** Toggle the command palette. */
  toggle: () => void;
  /** Current search query in the palette. */
  query: string;
  /** Update the search query. */
  setQuery: (query: string) => void;
  /** All registered command groups. */
  groups: CommandGroup[];
  /** Register a group of commands. Returns a cleanup function. */
  registerGroup: (group: CommandGroup) => () => void;
  /** Unregister a group by ID. */
  unregisterGroup: (groupId: string) => void;
  /** Register a single command into an existing group. */
  registerCommand: (groupId: string, command: CommandItem) => () => void;
}

export const CommandContext = createContext<CommandContextValue | null>(null);
CommandContext.displayName = 'CommandContext';

/**
 * Access the command palette system.
 * Must be used inside `<CommandProvider>`.
 *
 * @example
 * const { open, registerGroup } = useCommand();
 */
export function useCommand(): CommandContextValue {
  const ctx = useContext(CommandContext);
  if (!ctx) {
    throw new Error('useCommand must be used within <CommandProvider>');
  }
  return ctx;
}
