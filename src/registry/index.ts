/**
 * Splito Platform Component Registry.
 *
 * Centralized catalog detailing component metadata, variants, documentation,
 * versioning schemas, and component exports for the entire UI platform.
 */

export interface ComponentMetadata {
  id: string;
  name: string;
  category:
    | 'ui'
    | 'forms'
    | 'feedback'
    | 'navigation'
    | 'layout'
    | 'data'
    | 'charts'
    | 'overlay'
    | 'widgets';
  description: string;
  variants: string[];
  docsUrl?: string;
  version: string;
}

export const COMPONENT_REGISTRY: Record<string, ComponentMetadata> = {
  button: {
    id: 'button',
    name: 'Button',
    category: 'ui',
    description:
      'CVA-driven Neo-Clay Button component supporting loading, icons, and 9 visual variants.',
    variants: [
      'primary',
      'secondary',
      'ghost',
      'outline',
      'danger',
      'success',
      'link',
      'soft',
      'minimal',
    ],
    version: '1.0.0',
  },
  card: {
    id: 'card',
    name: 'Card',
    category: 'ui',
    description: 'Neo-Clay Surface Card compound components with hover elevation.',
    variants: ['surface', 'raised', 'inset', 'interactive', 'outlined'],
    version: '1.0.0',
  },
  badge: {
    id: 'badge',
    name: 'Badge',
    category: 'ui',
    description: 'Semantic status badge component supporting icon indicators.',
    variants: ['default', 'secondary', 'outline', 'success', 'warning', 'danger', 'info', 'muted'],
    version: '1.0.0',
  },
  avatar: {
    id: 'avatar',
    name: 'Avatar',
    category: 'ui',
    description: 'User avatar display with automatic initials fallback and error handling.',
    variants: ['xs', 'sm', 'md', 'lg', 'xl'],
    version: '1.0.0',
  },
  table: {
    id: 'table',
    name: 'Table',
    category: 'data',
    description: 'Enterprise data table with hover highlights and responsive horizontal scroll.',
    variants: ['default'],
    version: '1.0.0',
  },
  chartContainer: {
    id: 'chart-container',
    name: 'ChartContainer',
    category: 'charts',
    description:
      'Responsive Recharts container with theme awareness, loading skeleton, and empty state.',
    variants: ['default'],
    version: '1.0.0',
  },
} as const;
