import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';
import { CartItem } from '../../types';
import { Button } from '../ui/Button';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItemCard: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const subtotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-background p-3"
    >
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{item.name}</p>
        <p className="text-xs text-muted">
          ₹{item.price.toFixed(2)} x {item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="w-20 text-right text-sm font-bold text-primary">
        ₹{subtotal.toFixed(2)}
      </p>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-red-500/70 hover:bg-red-500/10 hover:text-red-500"
        onClick={() => onRemove(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default CartItemCard;
