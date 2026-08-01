'use client';

import { Download, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';
import { exportToCsv, exportToJson, triggerPrintPage } from '../exporters';

export interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportName?: string;
  data?: Record<string, unknown>[];
}

export function ReportExportModal({
  isOpen,
  onClose,
  reportName = 'Splito_Financial_Report',
  data = [],
}: ReportExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'json' | 'print'>('csv');

  if (!isOpen) return null;

  const handleExport = () => {
    if (selectedFormat === 'csv') {
      exportToCsv(reportName, data);
    } else if (selectedFormat === 'json') {
      exportToJson(reportName, data);
    } else if (selectedFormat === 'print') {
      triggerPrintPage();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <Card
        variant="raised"
        className="w-full max-w-md space-y-5 border-border bg-surface p-6 shadow-neo-4"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon icon={Download} size={18} />
            </div>
            <h3 className="text-base font-bold tracking-tight text-foreground">Export Report</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedFormat('csv')}
              className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all ${
                selectedFormat === 'csv'
                  ? 'border-primary bg-primary/10 text-primary shadow-neo-1'
                  : 'border-border bg-surface-raised text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon icon={FileSpreadsheet} size={20} />
              <span>CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat('json')}
              className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all ${
                selectedFormat === 'json'
                  ? 'border-primary bg-primary/10 text-primary shadow-neo-1'
                  : 'border-border bg-surface-raised text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon icon={FileText} size={20} />
              <span>JSON</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat('print')}
              className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all ${
                selectedFormat === 'print'
                  ? 'border-primary bg-primary/10 text-primary shadow-neo-1'
                  : 'border-border bg-surface-raised text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon icon={Printer} size={20} />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="text-2xs flex items-center justify-between rounded-xl border border-border bg-surface-raised p-3 text-muted-foreground">
          <span>Records Included:</span>
          <span className="font-bold text-foreground">{data.length} entries</span>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExport}
            leftIcon={<Icon icon={Download} size={14} />}
          >
            Download Report
          </Button>
        </div>
      </Card>
    </div>
  );
}
