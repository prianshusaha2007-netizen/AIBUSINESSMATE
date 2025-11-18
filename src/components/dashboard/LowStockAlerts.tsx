import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Product } from '../../types';

interface LowStockAlertsProps {
  products: Product[];
}

const LowStockAlerts: React.FC<LowStockAlertsProps> = ({ products }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
    };
  return (
    <motion.div 
        className="h-full rounded-xl border border-slate-800 bg-card p-4 sm:p-6"
        variants={cardVariants}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <h3 className="text-lg font-semibold text-foreground">Low Stock Alerts</h3>
      </div>
      <div className="mt-4 space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between text-sm">
            <p className="font-medium text-card-foreground">{product.name}</p>
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400">
              {product.stock} left
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LowStockAlerts;
