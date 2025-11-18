import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  colorIndex: number;
}

const colors = [
  'from-green-500 to-emerald-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-violet-500',
  'from-orange-500 to-amber-500',
];

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, colorIndex }) => {
  const isPositive = change.startsWith('+');
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl border border-slate-800 bg-card p-5 shadow-lg"
      variants={cardVariants}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br", colors[colorIndex % colors.length])}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm">
        <span className={cn('flex items-center gap-1', isPositive ? 'text-green-400' : 'text-red-400')}>
          {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          {change}
        </span>
        <span className="text-muted">vs last day</span>
      </div>
    </motion.div>
  );
};

export default StatCard;
