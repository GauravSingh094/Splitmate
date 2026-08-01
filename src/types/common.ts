/**
 * Makes a type nullable (T | null).
 */
export type Nullable<T> = T | null;

/**
 * Makes a type optional (T | undefined).
 */
export type Optional<T> = T | undefined;

/**
 * Makes a type nullable and optional (T | null | undefined).
 */
export type Maybe<T> = T | null | undefined;

/**
 * Recursively makes all properties of T optional.
 */
export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

/**
 * Recursively makes all properties of T required.
 */
export type DeepRequired<T> = T extends object ? { [K in keyof T]-?: DeepRequired<T[K]> } : T;

/**
 * Extracts the value types of an object.
 * @example ValueOf<{a: string; b: number}> → string | number
 */
export type ValueOf<T> = T[keyof T];

/**
 * Converts an object's entries to a typed tuple array.
 * @example Entries<{a: string}> → ['a', string][]
 */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * Omit that enforces the key exists on T (stricter than the built-in).
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

/**
 * Extracts only the keys of T whose values are assignable to V.
 * @example KeysOfType<{a: string; b: number; c: string}, string> → 'a' | 'c'
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * Makes specific keys of T required, leaving others as-is.
 */
export type RequireKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * A record where all values are the same type.
 */
export type TypedRecord<K extends string | number | symbol, V> = Record<K, V>;

/**
 * Represents a function that takes no arguments and returns void.
 */
export type VoidFn = () => void;

/**
 * Represents an async function that takes no arguments.
 */
export type AsyncVoidFn = () => Promise<void>;

/**
 * Represents a React children prop.
 */
export type Children = { children: React.ReactNode };

/**
 * Represents optional React children.
 */
export type OptionalChildren = { children?: React.ReactNode };

/**
 * A component that accepts a className prop.
 */
export type WithClassName = { className?: string };
