import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import RecentInvoices from '../components/dashboard/RecentInvoices';
import LowStockAlerts from '../components/dashboard/LowStockAlerts';
import QuickActions from '../components/dashboard/QuickActions';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import DailyInsight from '../components/dashboard/DailyInsight';
import { DollarSign, FileText, Users, ShoppingBag } from 'lucide-react';
import { mockStats, mockRecentInvoices, mockLowStockProducts, mockTopSellingProducts, mockDailyInsight } from '../lib/mock-data';

const DashboardPage: React.FC = () => {
  const statIcons = {
    "Today's Sales": <DollarSign className="h-6 w-6 text-white" />,
    "Today's Invoices": <FileText className="h-6 w-6 text-white" />,
    "New Customers": <Users className="h-6 w-6 text-white" />,
    "Items Sold": <ShoppingBag className="h-6 w-6 text-white" />,
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <QuickActions />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat, index) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            change={stat.change}
            icon={statIcons[stat.name as keyof typeof statIcons]}
            colorIndex={index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <SalesChart />
          <RecentInvoices invoices={mockRecentInvoices} />
        </div>
        <div className="space-y-8">
            <TopSellingProducts products={mockTopSellingProducts} />
            <LowStockAlerts products={mockLowStockProducts} />
            <DailyInsight insight={mockDailyInsight} />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
