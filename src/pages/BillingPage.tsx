import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductSearch from '../components/billing/ProductSearch';
import InvoiceCart from '../components/billing/InvoiceCart';
import InvoiceViewer from '../components/billing/InvoiceViewer';
import { mockProducts, mockCustomers } from '../lib/mock-data';
import { Product, CartItem, Customer, GeneratedInvoice, StoreDetails } from '../types';
import { faker } from '@faker-js/faker';

const BillingPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI'>('Cash');
  const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
  
  const [generatedInvoice, setGeneratedInvoice] = useState<GeneratedInvoice | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    const details = localStorage.getItem('vyaparai_store_details');
    if (details) {
      setStoreDetails(JSON.parse(details));
    }

    // Check for a draft cart from the AI assistant
    const draftCartData = localStorage.getItem('vyaparai_draft_cart');
    if (draftCartData) {
        try {
            const draftCartItems: CartItem[] = JSON.parse(draftCartData);
            if (draftCartItems.length > 0) {
                setCart(draftCartItems);
                // Clear the draft cart after loading it
                localStorage.removeItem('vyaparai_draft_cart');
            }
        } catch (e) {
            console.error("Failed to parse draft cart:", e);
            localStorage.removeItem('vyaparai_draft_cart');
        }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return mockProducts.slice(0, 20); // Show some products initially
    return mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setPaymentMethod('Cash');
  };
  
  const handleGenerateInvoice = () => {
    if (cart.length === 0 || !storeDetails) {
        alert("Cannot generate an empty invoice or store details are missing.");
        return;
    }

    const totals = {
        subtotal: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        totalGst: cart.reduce((acc, item) => acc + (item.price * item.quantity * (item.gst / 100)), 0),
        grandTotal: 0
    };
    totals.grandTotal = totals.subtotal + totals.totalGst;

    const newInvoice: GeneratedInvoice = {
        id: faker.string.numeric(8),
        date: new Date(),
        storeDetails,
        customer: selectedCustomer,
        items: cart,
        totals,
        paymentMethod
    };

    setGeneratedInvoice(newInvoice);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setGeneratedInvoice(null);
    clearCart();
    // In a real app, you might navigate away or show a success message.
  };


  return (
    <>
      <div className="flex h-full flex-col lg:flex-row lg:overflow-hidden">
        <div className="w-full lg:w-3/5 lg:border-r lg:border-slate-800">
          <ProductSearch
            products={filteredProducts}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddToCart={addToCart}
          />
        </div>
        <div className="w-full lg:w-2/5">
          <AnimatePresence>
            <InvoiceCart
              cartItems={cart}
              customers={mockCustomers}
              selectedCustomer={selectedCustomer}
              onCustomerChange={setSelectedCustomer}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              onGenerateInvoice={handleGenerateInvoice}
            />
          </AnimatePresence>
        </div>
      </div>
      {generatedInvoice && (
        <InvoiceViewer 
            isOpen={isViewerOpen}
            onClose={handleCloseViewer}
            invoice={generatedInvoice}
        />
      )}
    </>
  );
};

export default BillingPage;
