import React from 'react';
import Modal from 'react-modal';
import { X, User, Phone, MapPin, Calendar, Hash, DollarSign } from 'lucide-react';
import { CustomerProfile } from '../../types';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface CustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerProfile?: CustomerProfile;
}

const modalStyles: Modal.Styles = {
  overlay: { backgroundColor: 'rgba(11, 17, 32, 0.8)', zIndex: 50 },
  content: {
    top: '50%', left: '50%', right: 'auto', bottom: 'auto',
    transform: 'translate(-50%, -50%)', background: '#1E293B',
    border: '1px solid #334155', borderRadius: '0.75rem', padding: '0',
    width: '90%', maxWidth: '700px', maxHeight: '90vh', display: 'flex', flexDirection: 'column'
  },
};

const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({ isOpen, onClose, customerProfile }) => {
  if (!customerProfile) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} contentLabel="Customer Profile">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-700 p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary text-lg font-bold">
                {customerProfile.name.charAt(0)}
            </div>
            <div>
                <h2 className="text-xl font-semibold text-foreground">{customerProfile.name}</h2>
                <p className="text-sm text-muted">Customer since {customerProfile.joinDate.toLocaleDateString()}</p>
            </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="p-2 h-auto">
          <X className="h-5 w-5" />
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted" /> {customerProfile.phone}</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-muted" /> {customerProfile.address || 'No address provided'}</div>
        </div>

        {/* Stats */}
        <div className="my-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-xs text-muted">Total Spent</p>
                <p className="text-lg font-bold text-primary">₹{customerProfile.totalSpent.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-xs text-muted">Invoices</p>
                <p className="text-lg font-bold text-foreground">{customerProfile.invoiceCount}</p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-xs text-muted">Last Purchase</p>
                <p className="text-lg font-bold text-foreground">{customerProfile.lastPurchaseDate.toLocaleDateString()}</p>
            </div>
        </div>

        {/* Recent Purchases */}
        <div>
            <h3 className="text-base font-semibold text-foreground mb-3">Recent Purchases</h3>
            <div className="space-y-2">
                {customerProfile.recentPurchases.map(invoice => (
                    <div key={invoice.id} className="flex justify-between items-center rounded-md bg-slate-800/50 p-3 text-sm">
                        <div>
                            <p className="font-medium text-card-foreground">Invoice #{invoice.id}</p>
                            <p className="text-xs text-muted">{invoice.date.toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                             <p className="font-semibold text-foreground">₹{invoice.amount.toLocaleString()}</p>
                             <span className={cn(
                                'rounded-full px-2 py-0.5 text-xs',
                                invoice.status === 'Paid' && 'bg-green-500/20 text-green-400',
                                invoice.status === 'Pending' && 'bg-amber-500/20 text-amber-400',
                                invoice.status === 'Due' && 'bg-red-500/20 text-red-400'
                                )}>
                                {invoice.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerProfileModal;
