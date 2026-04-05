import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export const Input = ({ label, error, registration, className, ...props }: InputProps) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
    {label && <span>{label}</span>}
    <input
      className={cn(
        'h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30',
        error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30',
        className
      )}
      {...registration}
      {...props}
    />
    {error && <span className="text-xs font-medium text-rose-400">{error}</span>}
  </label>
);

