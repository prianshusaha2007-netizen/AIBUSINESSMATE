import React from 'react';
import { cn } from '../../lib/utils';

type TimeRange = 'today' | 'week' | 'month';

interface ReportFiltersProps {
  selectedRange: TimeRange;
  onSelectRange: (range: TimeRange) => void;
}

const filters: { label: string; value: TimeRange }[] = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
];

const ReportFilters: React.FC<ReportFiltersProps> = ({ selectedRange, onSelectRange }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-card p-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onSelectRange(filter.value)}
          className={cn(
            'w-full rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            selectedRange === filter.value
              ? 'bg-primary text-white shadow'
              : 'text-muted hover:bg-slate-800 hover:text-card-foreground'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default ReportFilters;
