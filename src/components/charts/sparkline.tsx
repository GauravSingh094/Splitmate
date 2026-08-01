'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';

export interface SparklineProps {
  data: Record<string, unknown>[];
  dataKey: string;
  color?: string;
  height?: number;
  width?: number | string;
}

export function Sparkline({
  data,
  dataKey,
  color = 'var(--accent)',
  height = 40,
  width = '100%',
}: SparklineProps) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
