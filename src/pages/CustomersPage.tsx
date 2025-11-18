import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import CustomerList from '../components/customers/CustomerList';
import AddEditCustomerModal from '../components/customers/AddEditCustomerModal';
import CustomerProfileModal from '../components/customers/CustomerProfileModal';
import { mockCustomers, mockCustomerProfiles } from '../lib/mock-data';
import { Customer, CustomerProfile } from '../types';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );
  }, [customers, searchTerm]);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setAddEditModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setAddEditModalOpen(true);
  };

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setProfileModalOpen(true);
  };

  const handleSaveCustomer = (customerData: Omit<CustomerProfile, 'id' | 'recentPurchases' | 'lastPurchaseDate'>) => {
    if (selectedCustomer) {
      // Edit existing customer
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id ? { ...c, ...customerData } : c
        )
      );
    } else {
      // Add new customer
      const newCustomer: Customer = {
        ...customerData,
        id: new Date().toISOString(),
        lastPurchaseDate: new Date(),
        totalSpent: 0,
        invoiceCount: 0,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }
    setAddEditModalOpen(false);
  };

  const getCustomerProfile = (customerId: string): CustomerProfile | undefined => {
      return mockCustomerProfiles.find(p => p.id === customerId);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-muted">Manage your customer database.</p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-card py-2 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button onClick={handleAddCustomer}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer List */}
      <CustomerList
        customers={filteredCustomers}
        onEdit={handleEditCustomer}
        onViewProfile={handleViewProfile}
      />

      {/* Modals */}
      <AddEditCustomerModal
        isOpen={isAddEditModalOpen}
        onClose={() => setAddEditModalOpen(false)}
        onSave={handleSaveCustomer}
        customer={selectedCustomer ? getCustomerProfile(selectedCustomer.id) : undefined}
      />
      
      {selectedCustomer && (
        <CustomerProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          customerProfile={getCustomerProfile(selectedCustomer.id)}
        />
      )}
    </div>
  );
};

export default CustomersPage;
