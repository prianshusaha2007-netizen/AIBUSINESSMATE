import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, MoreVertical } from 'lucide-react';
import { Customer } from '../../types';
import { Button } from '../ui/Button';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onViewProfile: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onViewProfile }) => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-background/50 text-xs uppercase text-muted">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Contact</th>
              <th scope="col" className="px-6 py-3">Total Spent</th>
              <th scope="col" className="px-6 py-3">Invoices</th>
              <th scope="col" className="px-6 py-3">Last Purchase</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <motion.tbody
            className="divide-y divide-slate-800"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {customers.map((customer) => (
              <motion.tr key={customer.id} variants={itemVariants} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-foreground">{customer.name}</td>
                <td className="px-6 py-4 text-card-foreground">{customer.phone}</td>
                <td className="px-6 py-4 text-card-foreground">₹{customer.totalSpent.toLocaleString()}</td>
                <td className="px-6 py-4 text-card-foreground">{customer.invoiceCount}</td>
                <td className="px-6 py-4 text-card-foreground">{customer.lastPurchaseDate.toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="p-2 h-auto" onClick={() => onViewProfile(customer)}>
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 h-auto" onClick={() => onEdit(customer)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
       {customers.length === 0 && (
            <div className="p-8 text-center text-muted">
                No customers found.
            </div>
        )}
    </div>
  );
};

export default CustomerList;
