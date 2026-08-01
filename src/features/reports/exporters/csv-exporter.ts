/**
 * CSV Exporter Engine — Generates UTF-8 encoded CSV files from structured tabular records.
 */
export function exportToCsv<T extends Record<string, unknown>>(
  filename: string,
  data: T[],
  columns?: { key: keyof T; header: string }[],
): void {
  if (!data || data.length === 0) return;

  const activeColumns =
    columns ||
    (Object.keys(data[0] || {}).map((key) => ({
      key: key as keyof T,
      header: String(key).toUpperCase(),
    })) as { key: keyof T; header: string }[]);

  const headersRow = activeColumns.map((col) => `"${col.header}"`).join(',');

  const rows = data.map((item) =>
    activeColumns
      .map((col) => {
        const val = item[col.key];
        const formatted = val === null || val === undefined ? '' : String(val).replace(/"/g, '""');
        return `"${formatted}"`;
      })
      .join(','),
  );

  const csvContent = '\uFEFF' + [headersRow, ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
