'use client';

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer, type ChartContainerProps } from './chart-container';

export interface AreaChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface AreaChartProps extends Omit<ChartContainerProps, 'children'> {
  data: Record<string, unknown>[];
  xAxisKey: string;
  series: AreaChartSeries[];
}

export function AreaChart({
  data,
  xAxisKey,
  series,
  height = 300,
  isLoading,
  isEmpty,
  title,
  description,
  action,
  className,
}: AreaChartProps) {
  const isDataEmpty = isEmpty || !data || data.length === 0;

  return (
    <ChartContainer
      height={height}
      isLoading={isLoading}
      isEmpty={isDataEmpty}
      title={title}
      description={description}
      action={action}
      className={className}
    >
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color ?? 'var(--accent)'} stopOpacity={0.4} />
              <stop offset="95%" stopColor={s.color ?? 'var(--accent)'} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
        <XAxis
          dataKey={xAxisKey}
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-elevation-2)',
            color: 'var(--foreground)',
          }}
        />
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name ?? s.key}
            stroke={s.color ?? 'var(--accent)'}
            fillOpacity={1}
            fill={`url(#gradient-${s.key})`}
            strokeWidth={2}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}
