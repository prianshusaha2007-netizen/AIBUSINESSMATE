import React from 'react';
import { motion } from 'framer-motion';
import { Invoice } from '../../types';
import { cn } from '../../lib/utils';
import { MoreHorizontal } from 'lucide-react';

interface RecentInvoicesProps {
  invoices: Invoice[];
}

const RecentInvoices: React.FC<RecentInvoicesProps> = ({ invoices }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
    };
  return (
    <motion.div 
        className="rounded-xl border border-slate-800 bg-card"
        variants={cardVariants}
    >
      <h3 className="border-b border-slate-800 p-4 text-lg font-semibold text-foreground sm:p-6">
        Recent Invoices
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted">
            <tr>
              <th scope="col" className="px-6 py-3">Invoice ID</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-foreground">#{invoice.id}</td>
                <td className="px-6 py-4 text-card-foreground">{invoice.customerName}</td>
                <td className="px-6 py-4 text-card-foreground">₹{invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-medium',
                      invoice.status === 'Paid' && 'bg-green-500/20 text-green-400',
                      invoice.status === 'Pending' && 'bg-amber-500/20 text-amber-400',
                      invoice.status === 'Due' && 'bg-red-500/20 text-red-400'
                    )}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="rounded-md p-1 text-muted hover:bg-slate-700 hover:text-foreground">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentInvoices;
