'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from 'cmdk';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useMounted } from '@/hooks/use-mounted';
import { useRegisterDefaultCommands } from '@/hooks/use-register-default-commands';
import { CommandContext } from '@/lib/context/command-context';
import { VARIANTS } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { CommandGroup as CommandGroupType, CommandItem as CommandItemType } from '@/types/ui';

function DefaultCommandsRegistrar() {
  useRegisterDefaultCommands();
  return null;
}

/**
 * CommandProvider — global command palette powered by cmdk.
 */
export function CommandProvider({ children }: { readonly children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<CommandGroupType[]>([]);
  const mounted = useMounted();

  // Keyboard shortcut registration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Reset query on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setQuery(''), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const registerGroup = useCallback((group: CommandGroupType) => {
    setGroups((prev) => {
      const exists = prev.some((g) => g.id === group.id);
      return exists ? prev.map((g) => (g.id === group.id ? group : g)) : [...prev, group];
    });
    return () => {
      setGroups((prev) => prev.filter((g) => g.id !== group.id));
    };
  }, []);

  const unregisterGroup = useCallback((groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }, []);

  const registerCommand = useCallback((groupId: string, command: CommandItemType) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const hasCmd = g.items.some((i) => i.id === command.id);
        return {
          ...g,
          items: hasCmd
            ? g.items.map((i) => (i.id === command.id ? command : i))
            : [...g.items, command],
        };
      }),
    );
    return () => {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId ? { ...g, items: g.items.filter((i) => i.id !== command.id) } : g,
        ),
      );
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      query,
      setQuery,
      groups,
      registerGroup,
      unregisterGroup,
      registerCommand,
    }),
    [
      isOpen,
      open,
      close,
      toggle,
      query,
      setQuery,
      groups,
      registerGroup,
      unregisterGroup,
      registerCommand,
    ],
  );

  return (
    <CommandContext.Provider value={contextValue}>
      <DefaultCommandsRegistrar />
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <CommandPalette
                groups={groups}
                query={query}
                onQueryChange={setQuery}
                onClose={close}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </CommandContext.Provider>
  );
}

// ---- Palette UI -------------------------------------------------------

interface CommandPaletteProps {
  groups: CommandGroupType[];
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
}

function CommandPalette({ groups, query, onQueryChange, onClose }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasCommands = groups.some((g) => g.items.length > 0);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={VARIANTS.overlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette panel */}
      <motion.div
        variants={VARIANTS.scaleUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={cn(
          'fixed top-[20%] left-1/2 z-50 w-full max-w-xl -translate-x-1/2',
          'overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border',
        )}
      >
        <Command className="flex flex-col" shouldFilter={true} label="Command palette">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <SearchIcon />
            <CommandInput
              ref={inputRef}
              value={query}
              onValueChange={onQueryChange}
              placeholder="Search commands…"
              className={cn(
                'flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground',
              )}
            />
            <kbd className="hidden rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground sm:inline">
              ESC
            </kbd>
          </div>

          <CommandList className="max-h-80 overflow-y-auto overscroll-contain py-2">
            {!hasCommands && (
              <CommandEmpty className="px-4 py-8 text-center text-sm text-muted-foreground">
                No commands found.
              </CommandEmpty>
            )}

            {groups.map((group, index) => (
              <div key={group.id}>
                {index > 0 && <CommandSeparator className="my-1 h-px bg-border" />}
                <CommandGroup
                  heading={group.label}
                  className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.label} ${item.description ?? ''}`}
                      onSelect={() => {
                        if (item.closeOnSelect !== false) onClose();
                        void item.onSelect();
                      }}
                      className={cn(
                        'mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5',
                        'text-sm text-foreground transition-colors',
                        'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
                      )}
                    >
                      {item.icon && (
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1">
                        <span className="block font-medium">{item.label}</span>
                        {item.description && (
                          <span className="block text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </span>
                      {item.shortcut && (
                        <div className="flex gap-1">
                          {item.shortcut.map((key) => (
                            <kbd
                              key={key}
                              className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>

          <div className="flex items-center justify-between border-t border-border px-4 py-2">
            <span className="text-xs text-muted-foreground">
              <kbd className="font-mono">↑↓</kbd> to navigate · <kbd className="font-mono">↵</kbd>{' '}
              to select
            </span>
            <span className="text-xs text-muted-foreground">
              <kbd className="font-mono">⌘K</kbd> to toggle
            </span>
          </div>
        </Command>
      </motion.div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-muted-foreground"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
