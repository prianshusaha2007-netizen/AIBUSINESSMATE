import React from 'react';
import Modal from 'react-modal';
import { X, Download, Printer, Share2 } from 'lucide-react';
import { GeneratedInvoice } from '../../types';
import { Button } from '../ui/Button';

interface InvoiceViewerProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: GeneratedInvoice;
}

const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: 'rgba(11, 17, 32, 0.8)',
    zIndex: 50,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#1E293B', // card color
    border: '1px solid #334155', // slate-700
    borderRadius: '0.75rem', // rounded-xl
    padding: '0',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
};

const InvoiceViewer: React.FC<InvoiceViewerProps> = ({ isOpen, onClose, invoice }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Invoice Viewer"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-700 p-4 flex-shrink-0">
          <h2 className="text-xl font-semibold text-foreground">Invoice #{invoice.id}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2 h-auto">
            <X className="h-5 w-5" />
          </Button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-card-foreground">
          {/* Store and Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg text-foreground">{invoice.storeDetails.storeName}</h3>
              <p>{invoice.storeDetails.mobileNumber}</p>
              {invoice.storeDetails.gstNumber && <p>GSTIN: {invoice.storeDetails.gstNumber}</p>}
            </div>
            <div className="md:text-right">
              <p className="font-semibold text-foreground">Bill To:</p>
              <p>{invoice.customer?.name || 'Walk-in Customer'}</p>
              {invoice.customer?.phone && <p>{invoice.customer.phone}</p>}
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="mt-6 border-t border-b border-slate-700 py-3 grid grid-cols-2">
             <div>
                <p><span className="font-semibold text-foreground">Date:</span> {invoice.date.toLocaleDateString()}</p>
                <p><span className="font-semibold text-foreground">Time:</span> {invoice.date.toLocaleTimeString()}</p>
             </div>
             <div className="text-right">
                <p><span className="font-semibold text-foreground">Payment:</span> {invoice.paymentMethod}</p>
             </div>
          </div>

          {/* Items Table */}
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left font-semibold text-foreground sm:pl-0">Item</th>
                      <th scope="col" className="px-3 py-3.5 text-left font-semibold text-foreground">Qty</th>
                      <th scope="col" className="px-3 py-3.5 text-left font-semibold text-foreground">Price</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 text-right font-semibold text-foreground sm:pr-0">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {invoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-4 pl-4 pr-3 sm:pl-0">{item.name}</td>
                        <td className="px-3 py-4">{item.quantity}</td>
                        <td className="px-3 py-4">₹{item.price.toFixed(2)}</td>
                        <td className="relative py-4 pl-3 pr-4 text-right sm:pr-0">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{invoice.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total GST</span>
                    <span>₹{invoice.totals.totalGst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-700 pt-2 text-lg font-bold text-foreground">
                    <span>Grand Total</span>
                    <span>₹{invoice.totals.grandTotal.toFixed(2)}</span>
                </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-xs text-muted">
            Thank you for your business!
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="flex items-center justify-end gap-3 border-t border-slate-700 p-4 bg-background/50 flex-shrink-0">
          <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
          <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          <Button><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
        </footer>
      </div>
    </Modal>
  );
};

export default InvoiceViewer;
