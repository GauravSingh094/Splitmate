'use client';

import { useState } from 'react';

export interface FavoriteItem {
  id: string;
  type: 'group' | 'expense';
  title: string;
  href: string;
}

const STORAGE_KEY_FAVORITES = 'splito_favorites';
const STORAGE_KEY_RECENTS = 'splito_recents';

export function useFavoritesStore() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const favData = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return favData ? JSON.parse(favData) : [];
    } catch {
      return [];
    }
  });

  const [recents, setRecents] = useState<FavoriteItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const recData = localStorage.getItem(STORAGE_KEY_RECENTS);
      return recData ? JSON.parse(recData) : [];
    } catch {
      return [];
    }
  });

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const next = prev.some((f) => f.id === item.id) ? prev : [item, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const addRecent = (item: FavoriteItem) => {
    setRecents((prev) => {
      const next = [item, ...prev.filter((r) => r.id !== item.id)].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_KEY_RECENTS, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return {
    favorites,
    recents,
    addFavorite,
    removeFavorite,
    isFavorite: (id: string) => favorites.some((f) => f.id === id),
    addRecent,
  };
}
