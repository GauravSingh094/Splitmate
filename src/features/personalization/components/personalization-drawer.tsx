'use client';

import { Check, Download, Palette, RefreshCw, Sliders, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';
import {
  type AccentColor,
  type DisplayDensity,
  type MotionPreference,
  usePersonalization,
} from '../store/personalization-store';

export function PersonalizationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, resetToDefaults, exportConfig } = usePersonalization();

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hover:bg-surface-interactive fixed right-4 bottom-16 z-40 flex items-center gap-2 rounded-full border border-primary/40 bg-surface-raised px-3 py-1.5 text-xs font-semibold text-foreground shadow-neo-2 transition-all"
      >
        <Icon icon={Palette} size={14} className="text-primary" />
        <span>Customize</span>
      </button>
    );
  }

  const ACCENTS: { id: AccentColor; label: string; colorClass: string }[] = [
    { id: 'indigo', label: 'Indigo', colorClass: 'bg-indigo-500' },
    { id: 'emerald', label: 'Emerald', colorClass: 'bg-emerald-500' },
    { id: 'purple', label: 'Purple', colorClass: 'bg-purple-500' },
    { id: 'amber', label: 'Amber', colorClass: 'bg-amber-500' },
    { id: 'rose', label: 'Rose', colorClass: 'bg-rose-500' },
  ];

  const DENSITIES: { id: DisplayDensity; label: string }[] = [
    { id: 'compact', label: 'Compact' },
    { id: 'comfortable', label: 'Comfortable' },
    { id: 'spacious', label: 'Spacious' },
  ];

  const MOTIONS: { id: MotionPreference; label: string }[] = [
    { id: 'normal', label: 'Normal' },
    { id: 'reduced', label: 'Reduced' },
    { id: 'disabled', label: 'Disabled' },
  ];

  const handleDownloadConfig = () => {
    const jsonStr = exportConfig();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'splito-personalization.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col justify-between overflow-y-auto border-l border-border bg-surface/95 p-5 shadow-neo-4 backdrop-blur-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon icon={Sliders} size={16} />
            </div>
            <h3 className="text-sm font-bold tracking-tight text-foreground">
              Workspace Personalization
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon icon={X} size={18} />
          </button>
        </div>

        {/* Accent Color Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Accent Theme
          </label>
          <div className="flex items-center gap-3">
            {ACCENTS.map((accent) => (
              <button
                key={accent.id}
                type="button"
                onClick={() => updateSettings({ accentColor: accent.id })}
                className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all ${accent.colorClass} ${
                  settings.accentColor === accent.id
                    ? 'scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-background'
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                {settings.accentColor === accent.id && (
                  <Icon icon={Check} size={14} className="text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Display Density Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Display Density
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DENSITIES.map((den) => (
              <button
                key={den.id}
                type="button"
                onClick={() => updateSettings({ density: den.id })}
                className={`rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  settings.density === den.id
                    ? 'border-primary bg-primary/10 text-primary shadow-neo-1'
                    : 'border-border bg-surface-raised text-muted-foreground'
                }`}
              >
                {den.label}
              </button>
            ))}
          </div>
        </div>

        {/* Motion Preference */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Motion & Animations
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MOTIONS.map((mot) => (
              <button
                key={mot.id}
                type="button"
                onClick={() => updateSettings({ motion: mot.id })}
                className={`rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  settings.motion === mot.id
                    ? 'border-primary bg-primary/10 text-primary shadow-neo-1'
                    : 'border-border bg-surface-raised text-muted-foreground'
                }`}
              >
                {mot.label}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Toggle */}
        <Card variant="surface" className="flex items-center justify-between border-border p-3.5">
          <span className="text-xs font-semibold text-foreground">High Contrast Mode</span>
          <button
            type="button"
            onClick={() => updateSettings({ highContrast: !settings.highContrast })}
            className={`relative h-5 w-9 rounded-full transition-colors ${settings.highContrast ? 'bg-primary' : 'bg-muted'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${settings.highContrast ? 'translate-x-4' : 'translate-x-0'}`}
            />
          </button>
        </Card>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
        <Button
          variant="ghost"
          size="xs"
          onClick={resetToDefaults}
          leftIcon={<Icon icon={RefreshCw} size={14} />}
        >
          Reset Defaults
        </Button>
        <Button
          variant="secondary"
          size="xs"
          onClick={handleDownloadConfig}
          leftIcon={<Icon icon={Download} size={14} />}
        >
          Export JSON
        </Button>
      </div>
    </div>
  );
}
