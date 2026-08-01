'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CreditCard, Folder, Receipt, Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Input } from '@/components/forms/input';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';
import { useGlobalSearch } from '@/hooks/use-global-search';
import { useFavoritesStore } from '@/lib/store/favorites-store';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const { data: results = [], isLoading } = useGlobalSearch(query);
  const { addRecent } = useFavoritesStore();

  const iconMap = {
    group: Folder,
    expense: Receipt,
    settlement: CreditCard,
    notification: Bell,
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative z-10 w-full max-w-xl"
        >
          <Card variant="raised" className="space-y-4 border-border p-4 shadow-neo-4">
            <div className="flex items-center gap-3 border-b border-border/40 pb-3">
              <Icon icon={SearchIcon} size={20} className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search groups, expenses, settlements, notifications..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="border-none bg-transparent px-0 text-base shadow-none focus:ring-0"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
              >
                <Icon icon={X} size={18} />
              </button>
            </div>

            <div className="max-h-96 space-y-2 overflow-y-auto">
              {isLoading ? (
                <div className="py-8 text-center text-xs text-muted-foreground">Searching...</div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  {query.trim().length < 2
                    ? 'Type at least 2 characters to search'
                    : 'No matching results found.'}
                </div>
              ) : (
                results.map((res) => {
                  const IconComp = iconMap[res.type] || Folder;
                  return (
                    <Link
                      key={`${res.type}-${res.id}`}
                      href={res.href}
                      onClick={() => {
                        addRecent({
                          id: res.id,
                          type: res.type === 'expense' ? 'expense' : 'group',
                          title: res.title,
                          href: res.href,
                        });
                        onClose();
                      }}
                      className="flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all hover:border-primary/20 hover:bg-primary/5"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon icon={IconComp} size={16} />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-bold text-foreground">
                          {res.title}
                        </span>
                        <span className="text-2xs truncate text-muted-foreground">
                          {res.subtitle}
                        </span>
                      </div>
                      <span className="text-2xs rounded-md bg-surface-raised px-2 py-0.5 font-semibold text-muted-foreground uppercase">
                        {res.type}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
