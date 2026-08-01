export type SplitType = 'equal' | 'exact' | 'percentage' | 'share';

export interface ParticipantSplit {
  userId: string;
  name: string;
  amount: number;
  percentage?: number;
  shares?: number;
}

/**
 * Calculates equal splits across participants.
 */
export function calculateEqualSplits(
  totalAmount: number,
  participants: { userId: string; name: string }[],
): ParticipantSplit[] {
  if (participants.length === 0 || totalAmount <= 0) return [];
  const shareAmount = Number((totalAmount / participants.length).toFixed(2));
  return participants.map((p) => ({
    userId: p.userId,
    name: p.name,
    amount: shareAmount,
    percentage: Number((100 / participants.length).toFixed(2)),
  }));
}

/**
 * Calculates share-based splits across participants.
 */
export function calculateShareSplits(
  totalAmount: number,
  participants: { userId: string; name: string; shares: number }[],
): ParticipantSplit[] {
  const totalShares = participants.reduce((acc, p) => acc + (p.shares || 0), 0);
  if (totalShares <= 0 || totalAmount <= 0) return [];

  return participants.map((p) => {
    const ratio = (p.shares || 0) / totalShares;
    return {
      userId: p.userId,
      name: p.name,
      amount: Number((totalAmount * ratio).toFixed(2)),
      percentage: Number((ratio * 100).toFixed(2)),
      shares: p.shares,
    };
  });
}

/**
 * Validates exact split amounts against expense total.
 */
export function validateExactSplits(
  totalAmount: number,
  splits: ParticipantSplit[],
): { isValid: boolean; remaining: number } {
  const currentSum = splits.reduce((acc, s) => acc + s.amount, 0);
  const remaining = Number((totalAmount - currentSum).toFixed(2));
  return {
    isValid: Math.abs(remaining) < 0.01,
    remaining,
  };
}

/**
 * Validates percentage split totals equal 100%.
 */
export function validatePercentageSplits(splits: ParticipantSplit[]): {
  isValid: boolean;
  remainingPercent: number;
} {
  const totalPercent = splits.reduce((acc, s) => acc + (s.percentage || 0), 0);
  const remainingPercent = Number((100 - totalPercent).toFixed(2));
  return {
    isValid: Math.abs(remainingPercent) < 0.01,
    remainingPercent,
  };
}
