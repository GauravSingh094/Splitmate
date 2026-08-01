'use client';

import { Bar, BarChart as RechartsBarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartContainer, type ChartContainerProps } from './chart-container';

export interface BarChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface BarChartProps extends Omit<ChartContainerProps, 'children'> {
  data: Record<string, unknown>[];
  xAxisKey: string;
  series: BarChartSeries[];
}

export function BarChart({
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
}: BarChartProps) {
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
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.name ?? s.key}
            fill={s.color ?? 'var(--primary)'}
            radius={[6, 6, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}
