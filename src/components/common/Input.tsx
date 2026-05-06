import React, { forwardRef } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label &&
        <label className="text-sm font-medium text-dark ml-1">{label}</label>
        }
        <div className="relative flex items-center">
          {leftIcon &&
          <div className="absolute left-4 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          }
          <input
            ref={ref}
            className={`
              w-full bg-gray-50 border border-border rounded-2xl px-4 py-3.5
              text-base text-dark placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
              transition-all duration-200
              ${leftIcon ? 'pl-11' : ''}
              ${rightIcon ? 'pr-11' : ''}
              ${error ? 'border-primary focus:ring-primary/10 focus:border-primary' : ''}
              ${className}
            `}
            {...props} />
          
          {rightIcon &&
          <div className="absolute right-4 text-gray-400">{rightIcon}</div>
          }
        </div>
        {error &&
        <span className="text-xs text-primary font-medium ml-1 mt-0.5">
            {error}
          </span>
        }
      </div>);

  }
);
Input.displayName = 'Input';