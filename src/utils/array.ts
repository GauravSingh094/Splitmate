/**
 * Groups an array of objects by a key.
 * @example groupBy([{type:'a'},{type:'b'},{type:'a'}], 'type') → {a:[...], b:[...]}
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key]);
    const existing = acc[groupKey] ?? [];
    return { ...acc, [groupKey]: [...existing, item] };
  }, {});
}

/**
 * Returns unique values from an array (shallow comparison).
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Returns unique values from an array by a key selector.
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set<unknown>();
  return array.filter((item) => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Sorts an array of objects by a key (ascending or descending).
 */
export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === bVal) return 0;
    const comparison = aVal < bVal ? -1 : 1;
    return direction === 'asc' ? comparison : -comparison;
  });
}

/**
 * Splits an array into chunks of the specified size.
 * @example chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]]
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Returns the first element of an array, or undefined if empty.
 */
export function first<T>(array: T[]): T | undefined {
  return array[0];
}

/**
 * Returns the last element of an array, or undefined if empty.
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Removes falsy values from an array.
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(Boolean) as T[];
}
