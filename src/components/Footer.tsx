import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} VyaparAI Retail. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
