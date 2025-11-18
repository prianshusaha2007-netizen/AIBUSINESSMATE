import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
       <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[44rem] w-[80rem] bg-[radial-gradient(50%_50%_at_50%_50%,#10b98133_0%,#0b1120_100%)]" />
        </div>
      </div>
      <motion.div
        className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          Modernize Your Retail Business with{' '}
          <span className="text-primary">AI</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
          variants={itemVariants}
        >
          The all-in-one AI-powered POS, Billing, and Inventory system for Indian
          retail shops. Fast, simple, and smart.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Link
            to="/setup"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover sm:w-auto"
          >
            Get Started for Free
          </Link>
          <a
            href="#"
            className="inline-flex w-full items-center justify-center rounded-md border border-slate-700 bg-transparent px-8 py-3 text-base font-medium text-foreground transition-colors hover:bg-slate-800 sm:w-auto"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Demo
          </a>
        </motion.div>
        <motion.div
          className="relative mx-auto mt-16 max-w-5xl"
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
           <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-primary/50 to-purple-500/30 blur-lg" />
          <img
            src="https://i.ibb.co/C5W7fqt/vyaparai-dashboard-mockup.png"
            alt="VyaparAI Dashboard Mockup"
            className="relative rounded-xl border border-slate-700 shadow-2xl shadow-primary/10"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
