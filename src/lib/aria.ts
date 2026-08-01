/**
 * ARIA utility helpers.
 * Generates unique, deterministic IDs for WAI-ARIA relationships.
 */

/**
 * Generates a unique ARIA ID with an optional semantic prefix.
 * Uses crypto.randomUUID when available, falls back to Math.random.
 *
 * @example
 * const labelId = ariaId('label');   // "label-4a2f…"
 * const descId  = ariaId('desc');    // "desc-9b1e…"
 */
export function ariaId(prefix = 'aria'): string {
  const suffix =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${suffix}`;
}

/**
 * Creates a pair of related label/content IDs for ARIA labelling.
 *
 * @example
 * const { labelId, contentId } = ariaLabelPair('dialog');
 * <h2 id={labelId}>Title</h2>
 * <div aria-labelledby={labelId} id={contentId}>…</div>
 */
export function ariaLabelPair(prefix = 'region'): { labelId: string; contentId: string } {
  const base = ariaId(prefix);
  return { labelId: `${base}-label`, contentId: `${base}-content` };
}

/**
 * Builds a space-separated aria-labelledby/aria-describedby string
 * from multiple element IDs, filtering out any nullish values.
 *
 * @example
 * aria.join(titleId, hasDescription ? descId : null)
 * // "title-123 desc-456" or "title-123"
 */
export function ariaJoin(...ids: (string | null | undefined)[]): string {
  return ids.filter(Boolean).join(' ');
}

/**
 * Returns the correct aria-invalid value for a field.
 * Accepts both boolean and string representations.
 */
export function ariaInvalid(invalid: boolean | string | undefined): true | undefined {
  return invalid === true || invalid === 'true' ? true : undefined;
}

/**
 * Returns a safe aria-label string, falling back to a default.
 */
export function ariaLabel(label: string | undefined, fallback: string): string {
  return label?.trim() || fallback;
}

/**
 * Keyboard event helper — checks if the event is an activation key (Enter or Space).
 * Use for elements with role="button" that aren't native buttons.
 */
export function isActivationKey(event: React.KeyboardEvent): boolean {
  return event.key === 'Enter' || event.key === ' ';
}

/**
 * Keyboard event helper — checks if the event is a dismiss key (Escape).
 */
export function isDismissKey(event: React.KeyboardEvent | KeyboardEvent): boolean {
  return event.key === 'Escape';
}

/**
 * Keyboard navigation helper — checks for arrow key navigation.
 */
export function isArrowKey(event: React.KeyboardEvent): event is React.KeyboardEvent {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
}
