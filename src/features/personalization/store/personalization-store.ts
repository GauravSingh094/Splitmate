'use client';

import { useEffect, useState } from 'react';

export type AccentColor = 'indigo' | 'emerald' | 'purple' | 'amber' | 'rose';
export type DisplayDensity = 'compact' | 'comfortable' | 'spacious';
export type MotionPreference = 'normal' | 'reduced' | 'disabled';

export interface UserPersonalization {
  accentColor: AccentColor;
  density: DisplayDensity;
  motion: MotionPreference;
  highContrast: boolean;
}

const DEFAULT_PERSONALIZATION: UserPersonalization = {
  accentColor: 'indigo',
  density: 'comfortable',
  motion: 'normal',
  highContrast: false,
};

const STORAGE_KEY = 'splito_user_personalization_v1';

export function usePersonalization() {
  const [settings, setSettings] = useState<UserPersonalization>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved) as UserPersonalization;
      } catch {
        // Fallback to defaults on error
      }
    }
    return DEFAULT_PERSONALIZATION;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        document.documentElement.setAttribute('data-accent', settings.accentColor);
        document.documentElement.setAttribute('data-density', settings.density);
        document.documentElement.setAttribute('data-motion', settings.motion);
        if (settings.highContrast) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      } catch {
        // Ignore storage errors
      }
    }
  }, [settings]);

  const updateSettings = (updates: Partial<UserPersonalization>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_PERSONALIZATION);
  };

  const exportConfig = () => JSON.stringify(settings, null, 2);

  const importConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString) as UserPersonalization;
      if (parsed.accentColor && parsed.density && parsed.motion) {
        setSettings(parsed);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  return {
    settings,
    updateSettings,
    resetToDefaults,
    exportConfig,
    importConfig,
  };
}
