import React from 'react';
import { motion } from 'framer-motion';
import { CustomerReport } from '../../types';

interface CustomerWiseReportProps {
  data: CustomerReport[];
}

const CustomerWiseReport: React.FC<CustomerWiseReportProps> = ({ data }) => {
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
            <th scope="col" className="px-6 py-3">Customer Name</th>
            <th scope="col" className="px-6 py-3 text-right">Visits</th>
            <th scope="col" className="px-6 py-3 text-right">Total Spent</th>
          </tr>
        </thead>
        <motion.tbody
          className="divide-y divide-slate-800"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((customer) => (
            <motion.tr key={customer.id} variants={itemVariants} className="hover:bg-slate-800/50">
              <td className="px-6 py-4 font-medium text-foreground">{customer.name}</td>
              <td className="px-6 py-4 text-right text-card-foreground">{customer.visits}</td>
              <td className="px-6 py-4 text-right font-semibold text-primary">₹{customer.totalSpent.toLocaleString()}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};

export default CustomerWiseReport;
