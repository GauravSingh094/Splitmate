declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Application
      readonly NEXT_PUBLIC_APP_URL: string;
      readonly NEXT_PUBLIC_APP_NAME: string;
      readonly NEXT_PUBLIC_APP_VERSION: string;

      // API
      readonly NEXT_PUBLIC_API_BASE_URL: string;
      readonly NEXT_PUBLIC_API_TIMEOUT_MS: string;

      // Feature Flags
      readonly NEXT_PUBLIC_FF_AI_SUGGESTIONS: string;
      readonly NEXT_PUBLIC_FF_RECEIPT_SCANNING: string;
      readonly NEXT_PUBLIC_FF_ANALYTICS_DASHBOARD: string;
      readonly NEXT_PUBLIC_FF_MULTI_CURRENCY: string;

      // Telemetry
      readonly NEXT_TELEMETRY_DISABLED: string;

      // Node
      readonly NODE_ENV: 'development' | 'test' | 'production';
    }
  }
}

// This export is required to make this file a module
export {};
