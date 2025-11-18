export interface Product {
    id: string;
    name: string;
    stock: number;
    price: number;
    gst: number; // Added GST percentage
    barcode: string;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Invoice {
    id: string;
    customerName: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Due';
    date: Date;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    lastPurchaseDate: Date;
    totalSpent: number;
    invoiceCount: number;
}

export interface CustomerProfile extends Customer {
    address: string;
    notes: string;
    joinDate: Date;
    recentPurchases: Invoice[];
}

export interface ChatMessage {
    role: 'user' | 'model' | 'system';
    parts: { text: string }[];
    timestamp: Date;
}

export type AiAction = 
    | { action: 'ADD_ITEM'; payload: { itemName: string; quantity: number } }
    | { action: 'NAVIGATE'; payload: { page: string } }
    | { action: 'SEARCH'; payload: { query: string } }
    | { action: 'CLARIFY'; payload: { message: string } }
    | { action: 'GENERAL_CHAT' };


export interface TopSellingProduct {
  name: string;
  soldCount: number;
  salesPercentage: number;
}

export interface StoreDetails {
    storeName: string;
    ownerName: string;
    mobileNumber: string;
    gstNumber?: string;
    logo?: string | null;
}

export interface GeneratedInvoice {
    id: string;
    date: Date;
    storeDetails: StoreDetails;
    customer: Customer | null;
    items: CartItem[];
    totals: {
        subtotal: number;
        totalGst: number;
        grandTotal: number;
    };
    paymentMethod: 'Cash' | 'UPI';
}

export interface ItemReport {
    id: string;
    name: string;
    category: string;
    quantitySold: number;
    totalValue: number;
}

export interface CustomerReport {
    id: string;
    name: string;
    visits: number;
    totalSpent: number;
}
