import React from 'react';
import { motion } from 'framer-motion';
import {
  Warehouse,
  IndianRupee,
  FileText,
  Users,
  Bot,
  Mic,
  Icon,
} from 'lucide-react';

interface Feature {
  icon: Icon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Warehouse,
    title: 'Smart Inventory',
    description: 'Automatic stock reduction and low-stock alerts to keep you ahead.',
  },
  {
    icon: IndianRupee,
    title: 'Fast POS Billing',
    description: 'Create and share professional GST invoices in seconds via PDF.',
  },
  {
    icon: FileText,
    title: 'GST Ready',
    description: 'Auto-calculated GST for all your transactions, making tax filing a breeze.',
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Track purchase history and manage customer relationships with ease.',
  },
  {
    icon: Bot,
    title: 'AI Chatbot',
    description: 'Get business insights, sales summaries, and product suggestions from your AI assistant.',
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    description: 'A revolutionary way to manage your store. Bill items just by speaking.',
  },
];

const Features: React.FC = () => {
    const sectionVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Everything You Need, All in One App
          </h2>
          <p className="mt-4 text-lg text-muted">
            VyaparAI packs powerful features into a simple interface, designed for the modern Indian retailer.
          </p>
        </div>
        <motion.div 
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="flex flex-col rounded-xl border border-slate-800 bg-card p-8 shadow-lg"
              variants={cardVariants}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-base text-card-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
