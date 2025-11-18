import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, PlusCircle } from 'lucide-react';

const AppHeader: React.FC = () => {
    const location = useLocation();
    
    const getTitle = () => {
        const path = location.pathname.split('/').pop() || 'dashboard';
        return path.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-800 bg-background px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-foreground">{getTitle()}</h1>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="text"
            placeholder="Search products, customers..."
            className="w-64 rounded-md border border-slate-700 bg-card py-2 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
          <PlusCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Create Invoice</span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
