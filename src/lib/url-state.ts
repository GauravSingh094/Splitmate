import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs';

/**
 * Standardized nuqs URL search parameter parsers.
 */
export const urlStateParsers = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault('createdAt'),
  sortDirection: parseAsStringEnum(['asc', 'desc']).withDefault('desc'),
  tab: parseAsString.withDefault(''),
  fromDate: parseAsString.withDefault(''),
  toDate: parseAsString.withDefault(''),
  booleanFlag: parseAsBoolean.withDefault(false),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
};
