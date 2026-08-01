/**
 * Converts a string to a URL-safe slug.
 * @example slugify("Hello World!") → "hello-world"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncates a string to the specified length, appending an ellipsis if truncated.
 * @example truncate("Hello World", 8) → "Hello Wo…"
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 1)}…`;
}

/**
 * Capitalises the first letter of a string.
 * @example capitalize("hello") → "Hello"
 */
export function capitalize(input: string): string {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Converts a string to title case.
 * @example titleCase("hello world") → "Hello World"
 */
export function titleCase(input: string): string {
  return input.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Returns the initials of a name (up to 2 characters).
 * @example initials("John Doe") → "JD"
 * @example initials("Alice") → "A"
 */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0).toUpperCase() ?? '';
  const second = parts[1]?.charAt(0).toUpperCase() ?? '';
  return first + second;
}

/**
 * Checks if a string is a valid URL.
 */
export function isValidUrl(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

/**
 * Strips HTML tags from a string.
 * @example stripHtml("<p>Hello <b>World</b></p>") → "Hello World"
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}
