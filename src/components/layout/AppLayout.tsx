import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
