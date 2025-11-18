import React from 'react';
import { faker } from '@faker-js/faker';
import StatCard from '../dashboard/StatCard';
import { DollarSign, FileText, Users, Percent } from 'lucide-react';

interface SalesReportSummaryProps {
  timeRange: 'today' | 'week' | 'month';
}

const SalesReportSummary: React.FC<SalesReportSummaryProps> = ({ timeRange }) => {
  // Mock data generation based on time range
  const generateData = (range: typeof timeRange) => {
    const multiplier = range === 'today' ? 1 : range === 'week' ? 7 : 30;
    return [
      {
        name: 'Total Revenue',
        value: `₹${faker.finance.amount(8000 * multiplier, 15000 * multiplier, 0)}`,
        change: `+${faker.number.float({ min: 2, max: 15, precision: 1 })}%`,
        icon: <DollarSign className="h-6 w-6 text-white" />,
      },
      {
        name: 'Total Invoices',
        value: faker.number.int({ min: 40 * multiplier, max: 100 * multiplier }).toString(),
        change: `+${faker.number.float({ min: 5, max: 20, precision: 1 })}%`,
        icon: <FileText className="h-6 w-6 text-white" />,
      },
      {
        name: 'New Customers',
        value: faker.number.int({ min: 5 * multiplier, max: 20 * multiplier }).toString(),
        change: `+${faker.number.int({ min: 1 * multiplier, max: 5 * multiplier })}`,
        icon: <Users className="h-6 w-6 text-white" />,
      },
      {
        name: 'Avg. Bill Value',
        value: `₹${faker.finance.amount(250, 600, 0)}`,
        change: `-${faker.number.float({ min: 1, max: 5, precision: 1 })}%`,
        icon: <Percent className="h-6 w-6 text-white" />,
      },
    ];
  };

  const data = generateData(timeRange);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {data.map((stat, index) => (
        <StatCard
          key={stat.name}
          title={stat.name}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          colorIndex={index}
        />
      ))}
    </div>
  );
};

export default SalesReportSummary;
