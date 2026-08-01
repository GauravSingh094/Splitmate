import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  // Base Next.js rules — core web vitals + TypeScript
  ...nextVitals,
  ...nextTs,

  // Ignore generated and tooling files
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'node_modules/**',
    'next-env.d.ts',
    'pnpm-lock.yaml',
    '*.config.mjs',
    '*.config.ts',
    'postcss.config.mjs',
  ]),

  // Custom rules for the codebase
  {
    rules: {
      // --- TypeScript ---
      // Prefer explicit return types on exported functions
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Allow void return in async functions
      '@typescript-eslint/no-floating-promises': 'off',
      // Enforce consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      // Disallow unused variables (report errors, not warnings)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // --- React ---
      // React 19 — JSX transform, no need to import React
      'react/react-in-jsx-scope': 'off',
      // Enforce exhaustive deps for hooks
      'react-hooks/exhaustive-deps': 'warn',

      // --- General ---
      // Prefer const
      'prefer-const': 'error',
      // Disallow console in production (allow warn/error)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // No duplicate imports
      'no-duplicate-imports': 'error',
    },
  },
]);

export default eslintConfig;
