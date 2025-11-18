import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { mockSalesData } from '../../lib/mock-data';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-700 bg-card p-2 shadow-lg">
        <p className="label text-sm text-muted">{`${label}`}</p>
        <p className="intro font-semibold text-foreground">{`Sales : ₹${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const SalesChart: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };
  return (
    <motion.div 
      className="rounded-xl border border-slate-800 bg-card p-4 sm:p-6"
      variants={cardVariants}
    >
      <h3 className="text-lg font-semibold text-foreground">Weekly Sales</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockSalesData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="name" 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${Number(value) / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#10B981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChart;
