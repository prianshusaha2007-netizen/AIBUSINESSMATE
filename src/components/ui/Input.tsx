import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          id={id}
          type={type}
          className={cn(
            'peer h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          placeholder=" " // Required for the floating label to work
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute left-3 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-card px-1 text-sm text-muted duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:bg-card peer-focus:text-primary"
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = 'Input';
