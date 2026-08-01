import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

// ---- Currency -------------------------------------------------------

/**
 * Formats a number as a currency string.
 * @param amount - The numeric amount.
 * @param currency - ISO 4217 currency code (e.g. 'USD', 'EUR', 'INR').
 * @param locale - BCP 47 locale string. Defaults to 'en-US'.
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a compact currency amount (e.g. $1.2K, $3.4M).
 */
export function formatCurrencyCompact(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

// ---- Dates ----------------------------------------------------------

/**
 * Formats a date string or Date object.
 * @param date - ISO string or Date object.
 * @param pattern - date-fns format pattern. Defaults to 'MMM d, yyyy'.
 */
export function formatDate(date: string | Date, pattern = 'MMM d, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return format(dateObj, pattern);
}

/**
 * Returns a relative time string (e.g. "3 minutes ago", "2 days ago").
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Formats a date as a short string (e.g. "Jul 31").
 */
export function formatDateShort(date: string | Date): string {
  return formatDate(date, 'MMM d');
}

// ---- Percentage -----------------------------------------------------

/**
 * Formats a decimal fraction as a percentage string.
 * @param value - Decimal (e.g. 0.75 → "75%").
 * @param decimals - Number of decimal places.
 */
export function formatPercent(value: number, decimals = 1): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// ---- File Size ------------------------------------------------------

/**
 * Formats a byte count as a human-readable file size.
 * @param bytes - Size in bytes.
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const unit = units[unitIndex] ?? 'B';
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${unit}`;
}
