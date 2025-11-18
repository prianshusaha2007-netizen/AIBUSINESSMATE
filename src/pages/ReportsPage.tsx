import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ReportFilters from '../components/reports/ReportFilters';
import SalesReportSummary from '../components/reports/SalesReportSummary';
import ItemWiseReport from '../components/reports/ItemWiseReport';
import CustomerWiseReport from '../components/reports/CustomerWiseReport';
import { mockItemReport, mockCustomerReport } from '../lib/mock-data';
import { cn } from '../lib/utils';

type ReportView = 'items' | 'customers';
type TimeRange = 'today' | 'week' | 'month';

const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [activeView, setActiveView] = useState<ReportView>('items');

  const handleDownload = (format: 'csv' | 'pdf') => {
    // Placeholder for actual download logic
    console.log(`Downloading ${activeView} report for ${timeRange} as ${format.toUpperCase()}`);
    alert(`Simulating download of ${format.toUpperCase()} report.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted">Analyze your sales, products, and customer data.</p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Button variant="outline" onClick={() => handleDownload('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => handleDownload('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters selectedRange={timeRange} onSelectRange={setTimeRange} />

      {/* Sales Summary */}
      <SalesReportSummary timeRange={timeRange} />

      {/* Report Tables */}
      <div className="rounded-xl border border-slate-800 bg-card">
        {/* Tabs */}
        <div className="border-b border-slate-800 px-4">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveView('items')}
              className={cn(
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                activeView === 'items'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:border-slate-600 hover:text-card-foreground'
              )}
            >
              Item-wise Report
            </button>
            <button
              onClick={() => setActiveView('customers')}
              className={cn(
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                activeView === 'customers'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:border-slate-600 hover:text-card-foreground'
              )}
            >
              Customer-wise Report
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-2 sm:p-4">
          {activeView === 'items' && <ItemWiseReport data={mockItemReport} />}
          {activeView === 'customers' && <CustomerWiseReport data={mockCustomerReport} />}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
