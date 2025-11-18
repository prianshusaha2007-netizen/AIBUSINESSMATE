import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Boxes, Bot, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

const actions = [
  { name: 'Create Invoice', to: '/app/billing', icon: PlusCircle },
  { name: 'Add Product', to: '/app/products', icon: Boxes },
  { name: 'AI Assistant', to: '/app/ai-assistant', icon: Bot },
  { name: 'Store Settings', to: '/app/settings', icon: Settings },
];

const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {actions.map((action) => (
        <Button
          key={action.name}
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
          asChild
        >
          <Link to={action.to}>
            <action.icon className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-card-foreground">{action.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
