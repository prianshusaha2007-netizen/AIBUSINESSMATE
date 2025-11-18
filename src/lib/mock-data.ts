import { faker } from '@faker-js/faker';
import { Product, Invoice, Customer, TopSellingProduct, CustomerProfile, ItemReport, CustomerReport } from '../types';

// Dashboard Stats
export const mockStats = [
  { name: "Today's Sales", value: `₹${faker.finance.amount(8000, 15000, 0)}`, change: `+${faker.number.float({ min: 2, max: 15, precision: 1 })}%` },
  { name: "Today's Invoices", value: faker.number.int({ min: 40, max: 100 }).toString(), change: `+${faker.number.float({ min: 5, max: 20, precision: 1 })}%` },
  { name: "New Customers", value: faker.number.int({ min: 5, max: 20 }).toString(), change: `+${faker.number.int({ min: 1, max: 5 })}` },
  { name: "Items Sold", value: faker.number.int({ min: 150, max: 400 }).toString(), change: `-${faker.number.float({ min: 1, max: 5, precision: 1 })}%` },
];

// Sales Chart Data
export const mockSalesData = [
  { name: 'Mon', sales: faker.number.int({ min: 2000, max: 5000 }) },
  { name: 'Tue', sales: faker.number.int({ min: 3000, max: 6000 }) },
  { name: 'Wed', sales: faker.number.int({ min: 4000, max: 7000 }) },
  { name: 'Thu', sales: faker.number.int({ min: 3500, max: 6500 }) },
  { name: 'Fri', sales: faker.number.int({ min: 5000, max: 9000 }) },
  { name: 'Sat', sales: faker.number.int({ min: 6000, max: 11000 }) },
  { name: 'Sun', sales: faker.number.int({ min: 5500, max: 10000 }) },
];

// Products
const createRandomProduct = (): Product => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  stock: faker.number.int({ min: 0, max: 100 }),
  price: parseFloat(faker.commerce.price({ min: 10, max: 2000 })),
  gst: faker.helpers.arrayElement([0, 5, 12, 18, 28]),
  barcode: faker.string.numeric(12),
  category: faker.commerce.department(),
});

export const mockProducts: Product[] = faker.helpers.multiple(createRandomProduct, { count: 50 });

export const mockLowStockProducts: Product[] = mockProducts
  .filter(p => p.stock > 0 && p.stock < 6)
  .slice(0, 5);

// Invoices
const createRandomInvoice = (): Invoice => ({
  id: faker.string.numeric(6),
  customerName: faker.person.fullName(),
  amount: parseFloat(faker.finance.amount(100, 2500)),
  status: faker.helpers.arrayElement(['Paid', 'Pending', 'Due']),
  date: faker.date.recent(30),
});

export const mockInvoices: Invoice[] = faker.helpers.multiple(createRandomInvoice, { count: 150 });
export const mockRecentInvoices: Invoice[] = [...mockInvoices].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

// Customers
const createRandomCustomer = (): Customer => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    lastPurchaseDate: faker.date.recent(60),
    totalSpent: parseFloat(faker.finance.amount(500, 15000)),
    invoiceCount: faker.number.int({ min: 1, max: 50 }),
});

export const mockCustomers: Customer[] = faker.helpers.multiple(createRandomCustomer, { count: 40 });

const createRandomCustomerProfile = (customer: Customer): CustomerProfile => ({
    ...customer,
    address: faker.location.streetAddress(),
    notes: faker.lorem.sentence(),
    joinDate: faker.date.past({ years: 2 }),
    recentPurchases: faker.helpers.arrayElements(mockInvoices, { min: 3, max: 8 }).map(inv => ({...inv, customerName: customer.name})),
});

export const mockCustomerProfiles: CustomerProfile[] = mockCustomers.map(createRandomCustomerProfile);


// Top Selling Products
export const mockTopSellingProducts: TopSellingProduct[] = [
    { name: 'Parle-G Biscuit', soldCount: 124, salesPercentage: 35 },
    { name: 'Dove Soap', soldCount: 98, salesPercentage: 28 },
    { name: 'Aashirvaad Atta 5kg', soldCount: 76, salesPercentage: 21 },
    { name: 'Red Label Tea 250g', soldCount: 45, salesPercentage: 12 },
    { name: 'Maggi Noodles', soldCount: 22, salesPercentage: 4 },
];

// Daily AI Insight
export const mockDailyInsight: string = "Your sales peaked around noon today. Biscuits and tea were the most frequently purchased items together.";


// --- Reports Data ---

// Item-wise Report
export const mockItemReport: ItemReport[] = mockProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    quantitySold: faker.number.int({ min: 10, max: 200 }),
    totalValue: product.price * faker.number.int({ min: 10, max: 200 }),
})).sort((a, b) => b.totalValue - a.totalValue);

// Customer-wise Report
export const mockCustomerReport: CustomerReport[] = mockCustomers.map(customer => ({
    id: customer.id,
    name: customer.name,
    visits: customer.invoiceCount,
    totalSpent: customer.totalSpent,
})).sort((a, b) => b.totalSpent - a.totalSpent);
