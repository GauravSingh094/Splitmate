import { describe, expect, it } from 'vitest';

import {
  calculateEqualSplits,
  calculateShareSplits,
  validateExactSplits,
  validatePercentageSplits,
} from './split-calculator';

describe('Split Calculator Engine', () => {
  it('calculates equal splits correctly among participants', () => {
    const participants = [
      { userId: 'u1', name: 'Alice' },
      { userId: 'u2', name: 'Bob' },
    ];
    const splits = calculateEqualSplits(100, participants);

    expect(splits).toHaveLength(2);
    expect(splits[0]?.amount).toBe(50);
    expect(splits[1]?.amount).toBe(50);
  });

  it('calculates share based splits proportionally', () => {
    const participants = [
      { userId: 'u1', name: 'Alice', shares: 2 },
      { userId: 'u2', name: 'Bob', shares: 1 },
    ];
    const splits = calculateShareSplits(300, participants);

    expect(splits[0]?.amount).toBe(200);
    expect(splits[1]?.amount).toBe(100);
  });

  it('validates exact splits total matches expense amount', () => {
    const splits = [
      { userId: 'u1', name: 'Alice', amount: 60 },
      { userId: 'u2', name: 'Bob', amount: 40 },
    ];
    const validation = validateExactSplits(100, splits);

    expect(validation.isValid).toBe(true);
    expect(validation.remaining).toBe(0);
  });

  it('validates percentage splits sum to 100%', () => {
    const splits = [
      { userId: 'u1', name: 'Alice', amount: 50, percentage: 50 },
      { userId: 'u2', name: 'Bob', amount: 50, percentage: 50 },
    ];
    const validation = validatePercentageSplits(splits);

    expect(validation.isValid).toBe(true);
    expect(validation.remainingPercent).toBe(0);
  });
});
