import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Receipt,
  Users,
  LineChart,
  Bot,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/app/products', icon: Boxes },
  { name: 'Billing (POS)', href: '/app/billing', icon: Receipt },
  { name: 'Customers', href: '/app/customers', icon: Users },
  { name: 'Reports', href: '/app/reports', icon: LineChart },
];

const tools = [
  { name: 'AI Assistant', href: '/app/ai-assistant', icon: Bot },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

const logoUrl = 'https://drive.google.com/uc?export=view&id=1-Vqbz0VQT9gKmP7Q1z2YTjRBFLWlIEoV';

const Sidebar: React.FC = () => {
    const [storeName, setStoreName] = useState('Your Store');
    const [ownerName, setOwnerName] = useState('Store Owner');
    const [logo, setLogo] = useState(logoUrl);

    useEffect(() => {
        const storeData = localStorage.getItem('vyaparai_store_details');
        if (storeData) {
            const { storeName, ownerName, logo: userLogo } = JSON.parse(storeData);
            setStoreName(storeName || 'Your Store');
            setOwnerName(ownerName || 'Store Owner');
            setLogo(userLogo || logoUrl);
        }
    }, []);

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-800 bg-card md:flex">
      <div className="flex h-16 items-center border-b border-slate-800 px-4">
        <img src={logoUrl} alt="VyaparAI Logo" className="h-12 w-auto" />
      </div>
      <nav className="flex-1 space-y-4 p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-card-foreground hover:bg-slate-700 hover:text-foreground',
                  isActive && 'bg-primary/10 text-primary'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="pt-4">
          <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Tools
          </h3>
          <div className="mt-2 space-y-1">
            {tools.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-card-foreground hover:bg-slate-700 hover:text-foreground',
                    isActive && 'bg-primary/10 text-primary'
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={logo}
            alt="User avatar"
          />
          <div className="ml-3 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">{ownerName}</p>
            <p className="truncate text-xs text-muted">{storeName}</p>
          </div>
          <ChevronDown className="ml-auto h-5 w-5 flex-shrink-0 text-muted" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
