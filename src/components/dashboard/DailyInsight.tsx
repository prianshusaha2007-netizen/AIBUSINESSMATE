import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface DailyInsightProps {
  insight: string;
}

const DailyInsight: React.FC<DailyInsightProps> = ({ insight }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
  };

  return (
    <motion.div
      className="rounded-xl border border-dashed border-primary/50 bg-primary/10 p-4"
      variants={cardVariants}
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary" />
        <div>
          <h4 className="text-base font-semibold text-foreground">Daily Insight</h4>
          <p className="mt-1 text-sm text-muted">{insight}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyInsight;
