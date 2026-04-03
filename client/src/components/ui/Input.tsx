import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export const Input = ({ label, error, registration, className, ...props }: InputProps) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
    {label && <span>{label}</span>}
    <input
      className={cn(
        'h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-900/40',
        error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-100 dark:focus:ring-rose-900/40',
        className
      )}
      {...registration}
      {...props}
    />
    {error && <span className="text-xs font-medium text-rose-500">{error}</span>}
  </label>
);

