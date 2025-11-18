import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRightCircle } from 'lucide-react';
import { CartItem } from '../../types';
import { Button } from '../ui/Button';

interface DraftCartPreviewProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const DraftCartPreview: React.FC<DraftCartPreviewProps> = ({ cart, setCart }) => {
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('vyaparai_draft_cart');
  };
  
  const handleGoToBilling = () => {
    navigate('/app/billing');
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <h3 className="text-lg font-semibold text-foreground">Draft Cart</h3>
        {cart.length > 0 && (
          <Button variant="ghost" size="sm" className="p-2 h-auto text-muted hover:text-red-500" onClick={handleClearCart}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted">
            <ShoppingCart className="h-12 w-12" />
            <p className="mt-4">The draft cart is empty.</p>
            <p className="text-sm">Items added by the AI will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium text-card-foreground">{item.name}</p>
                    <p className="text-xs text-muted">₹{item.price.toFixed(2)}</p>
                </div>
                <p className="w-12 text-center text-muted">x {item.quantity}</p>
                <p className="w-20 text-right font-semibold text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="border-t border-slate-800 p-4">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-card-foreground">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground">
                    <span>Total Value</span>
                    <span>₹{totalValue.toFixed(2)}</span>
                </div>
            </div>
            <Button className="mt-4 w-full" onClick={handleGoToBilling}>
                Proceed to Billing
                <ArrowRightCircle className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )}
    </div>
  );
};

export default DraftCartPreview;
