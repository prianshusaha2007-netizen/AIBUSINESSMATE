import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import { CustomerProfile } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AddEditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: Omit<CustomerProfile, 'id' | 'recentPurchases'| 'lastPurchaseDate' | 'totalSpent' | 'invoiceCount'>) => void;
  customer?: CustomerProfile;
}

const modalStyles: Modal.Styles = {
  overlay: { backgroundColor: 'rgba(11, 17, 32, 0.8)', zIndex: 50 },
  content: {
    top: '50%', left: '50%', right: 'auto', bottom: 'auto',
    transform: 'translate(-50%, -50%)', background: '#1E293B',
    border: '1px solid #334155', borderRadius: '0.75rem', padding: '0',
    width: '90%', maxWidth: '500px',
  },
};

const AddEditCustomerModal: React.FC<AddEditCustomerModalProps> = ({ isOpen, onClose, onSave, customer }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setPhone(customer.phone);
      setAddress(customer.address || '');
      setNotes(customer.notes || '');
    } else {
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
    }
  }, [customer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, phone, address, notes, joinDate: customer?.joinDate || new Date() });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} contentLabel="Add/Edit Customer">
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-700 p-4">
          <h2 className="text-xl font-semibold text-foreground">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2 h-auto">
            <X className="h-5 w-5" />
          </Button>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <Input id="name" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input id="phone" label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Input id="address" label="Address (Optional)" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <div>
             <label htmlFor="notes" className="block text-sm font-medium text-muted mb-2">Notes (Optional)</label>
             <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-slate-700 bg-transparent p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
             />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Customer</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddEditCustomerModal;
