import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { TopSellingProduct } from '../../types';

interface TopSellingProductsProps {
  products: TopSellingProduct[];
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({ products }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <motion.div
      className="rounded-xl border border-slate-800 bg-card p-4 sm:p-6"
      variants={cardVariants}
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Top Selling Items</h3>
      </div>
      <div className="mt-4 space-y-4">
        {products.map((product) => (
          <div key={product.name}>
            <div className="flex justify-between text-sm">
              <p className="font-medium text-card-foreground">{product.name}</p>
              <p className="text-muted">{product.soldCount} sold</p>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-slate-700">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${product.salesPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopSellingProducts;
