import React from 'react';
import { motion } from 'framer-motion';
import StoreSetupForm from '../components/setup/StoreSetupForm';

const StoreSetupPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center">
            <img src="https://drive.google.com/uc?export=view&id=1-Vqbz0VQT9gKmP7Q1z2YTjRBFLWlIEoV" alt="VyaparAI Logo" className="h-16 w-auto" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-foreground">
            Welcome! Let's set up your store.
          </h1>
          <p className="mt-2 text-muted">
            Tell us a bit about your business to get started.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-slate-800 bg-card p-6 sm:p-8"
        >
          <StoreSetupForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StoreSetupPage;
