import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <img src="https://drive.google.com/uc?export=view&id=1-Vqbz0VQT9gKmP7Q1z2YTjRBFLWlIEoV" alt="VyaparAI Logo" className="h-10 w-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Link
            to="/setup"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <Link
            to="/setup"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
