export type FeatureFlagKey =
  'experimental_simplified_debts' | 'dev_diagnostics_panel' | 'offline_persistence';

class FeatureFlagsManager {
  private flags: Record<FeatureFlagKey, boolean> = {
    experimental_simplified_debts: true,
    dev_diagnostics_panel: process.env.NODE_ENV !== 'production',
    offline_persistence: true,
  };

  isEnabled(flag: FeatureFlagKey): boolean {
    return this.flags[flag] ?? false;
  }

  setFlag(flag: FeatureFlagKey, enabled: boolean) {
    this.flags[flag] = enabled;
  }

  getAllFlags(): Record<FeatureFlagKey, boolean> {
    return { ...this.flags };
  }
}

export const featureFlags = new FeatureFlagsManager();
