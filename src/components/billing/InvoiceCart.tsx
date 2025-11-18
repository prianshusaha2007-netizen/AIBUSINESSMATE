import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, UserPlus, Trash2 } from 'lucide-react';
import { CartItem, Customer } from '../../types';
import CartItemCard from './CartItem';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface InvoiceCartProps {
  cartItems: CartItem[];
  customers: Customer[];
  selectedCustomer: Customer | null;
  paymentMethod: 'Cash' | 'UPI';
  onCustomerChange: (customer: Customer | null) => void;
  onPaymentMethodChange: (method: 'Cash' | 'UPI') => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onGenerateInvoice: () => void;
}

const InvoiceCart: React.FC<InvoiceCartProps> = ({
  cartItems,
  customers,
  selectedCustomer,
  paymentMethod,
  onCustomerChange,
  onPaymentMethodChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGenerateInvoice
}) => {
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalGst = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * (item.gst / 100)), 0);
    const grandTotal = subtotal + totalGst;
    return { subtotal, totalGst, grandTotal };
  }, [cartItems]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex h-full flex-col bg-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <h2 className="text-lg font-semibold text-foreground">Current Invoice</h2>
        {cartItems.length > 0 && (
          <Button variant="destructive" size="sm" onClick={onClearCart}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted">
            <ShoppingCart className="h-16 w-16" />
            <p className="mt-4 text-lg">Your cart is empty</p>
            <p className="text-sm">Add products from the left panel to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer with totals and actions */}
      {cartItems.length > 0 && (
        <div className="border-t border-slate-800 bg-background/50 p-4">
          {/* Customer Selection */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCustomer?.id || ''}
              onChange={(e) => {
                const customer = customers.find(c => c.id === e.target.value) || null;
                onCustomerChange(customer);
              }}
              className="flex-grow rounded-md border border-slate-700 bg-card py-2 px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select Customer (Walk-in)</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <Button variant="ghost" size="sm" className="p-2">
              <UserPlus className="h-5 w-5 text-primary" />
            </Button>
          </div>

          {/* Totals */}
          <div className="my-4 space-y-2 text-sm">
            <div className="flex justify-between text-card-foreground">
              <span>Subtotal</span>
              <span>₹{totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-card-foreground">
              <span>Total GST</span>
              <span>₹{totals.totalGst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Grand Total</span>
              <span>₹{totals.grandTotal.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Payment Method */}
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => onPaymentMethodChange('Cash')} className={cn('rounded-md py-2 text-sm font-semibold', paymentMethod === 'Cash' ? 'bg-primary text-white' : 'bg-slate-700 text-card-foreground hover:bg-slate-600')}>Cash</button>
                <button onClick={() => onPaymentMethodChange('UPI')} className={cn('rounded-md py-2 text-sm font-semibold', paymentMethod === 'UPI' ? 'bg-primary text-white' : 'bg-slate-700 text-card-foreground hover:bg-slate-600')}>UPI</button>
            </div>

          {/* Generate Invoice Button */}
          <Button size="lg" className="mt-4 w-full" onClick={onGenerateInvoice}>
            Generate Invoice
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default InvoiceCart;
