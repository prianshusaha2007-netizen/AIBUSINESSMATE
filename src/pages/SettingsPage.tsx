import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-card">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
        <p className="mt-2 text-muted">This page is under construction.</p>
        <p className="text-muted">Store details, user profile, and application settings will be managed here.</p>
      </div>
    </div>
  );
};

export default SettingsPage;
