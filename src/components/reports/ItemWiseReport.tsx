import React from 'react';
import { motion } from 'framer-motion';
import { ItemReport } from '../../types';

interface ItemWiseReportProps {
  data: ItemReport[];
}

const ItemWiseReport: React.FC<ItemWiseReportProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { transition: { staggerChildren: 0.03 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-muted">
          <tr>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3 text-right">Qty Sold</th>
            <th scope="col" className="px-6 py-3 text-right">Total Value</th>
          </tr>
        </thead>
        <motion.tbody
          className="divide-y divide-slate-800"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((item) => (
            <motion.tr key={item.id} variants={itemVariants} className="hover:bg-slate-800/50">
              <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
              <td className="px-6 py-4 text-card-foreground">{item.category}</td>
              <td className="px-6 py-4 text-right text-card-foreground">{item.quantitySold}</td>
              <td className="px-6 py-4 text-right font-semibold text-primary">₹{item.totalValue.toLocaleString()}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};

export default ItemWiseReport;
