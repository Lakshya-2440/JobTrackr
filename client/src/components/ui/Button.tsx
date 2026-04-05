import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'border border-indigo-400/40 bg-indigo-500 text-white shadow-[0_16px_40px_-20px_rgba(99,102,241,0.95)] hover:border-indigo-300 hover:bg-indigo-400 focus-visible:ring-indigo-400',
  secondary:
    'bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-400',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500',
  ghost:
    'bg-transparent text-slate-200 hover:bg-slate-900 focus-visible:ring-slate-400',
  outline:
    'border border-white/12 bg-white/[0.02] text-white hover:border-white/18 hover:bg-white/[0.06] focus-visible:ring-indigo-400',
  glass:
    'border border-white/10 bg-white/[0.06] text-white shadow-[0_18px_45px_-30px_rgba(34,211,238,0.55)] backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.1] focus-visible:ring-cyan-300'
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
  xl: 'h-12 px-6 text-base'
};

export const buttonStyles = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className
}: Pick<ButtonProps, 'variant' | 'size' | 'fullWidth' | 'className'> = {}) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-60',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={buttonStyles({ variant, size, fullWidth, className })}
    disabled={disabled || loading}
    {...props}
  >
    {loading && (
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    )}
    {children}
  </button>
);
