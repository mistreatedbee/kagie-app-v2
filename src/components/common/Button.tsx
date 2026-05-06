import React from 'react';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
  'relative inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none disabled:active:scale-100';
  const variants = {
    primary:
    'bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/20',
    secondary: 'bg-gray-100 text-dark hover:bg-gray-200',
    outline:
    'border-2 border-border text-dark hover:border-gray-300 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:text-dark hover:bg-gray-100'
  };
  const sizes = {
    sm: 'text-sm px-4 py-2 rounded-xl',
    md: 'text-base px-6 py-3.5 rounded-2xl',
    lg: 'text-lg px-8 py-4 rounded-2xl'
  };
  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}>
      
      {isLoading ?
      <Loader2 className="w-5 h-5 animate-spin" /> :

      <div className="flex items-center gap-2">
          {leftIcon}
          {children}
          {rightIcon}
        </div>
      }
    </button>);

}
