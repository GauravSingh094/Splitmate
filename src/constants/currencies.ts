export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', name: 'INR - Indian Rupee (₹)' },
  { code: 'USD', symbol: '$', name: 'USD - US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'EUR - Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'GBP - British Pound (£)' },
  { code: 'SGD', symbol: 'S$', name: 'SGD - Singapore Dollar (S$)' },
  { code: 'AED', symbol: 'AED ', name: 'AED - UAE Dirham (AED)' },
  { code: 'JPY', symbol: '¥', name: 'JPY - Japanese Yen (¥)' },
  { code: 'CAD', symbol: 'C$', name: 'CAD - Canadian Dollar (C$)' },
];

export function getCurrencySymbol(code?: string): string {
  if (!code) return '₹';
  const normalized = code.trim().toUpperCase();
  const found = SUPPORTED_CURRENCIES.find((c) => c.code === normalized);
  if (found) return found.symbol;
  if (normalized === 'USD') return '$';
  if (normalized === 'EUR') return '€';
  if (normalized === 'GBP') return '£';
  if (normalized === 'INR') return '₹';
  return '₹';
}

export function formatCurrency(amount: number | string, code: string = 'INR'): string {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const symbol = getCurrencySymbol(code);
  const formatted = Math.abs(num).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return num < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}
