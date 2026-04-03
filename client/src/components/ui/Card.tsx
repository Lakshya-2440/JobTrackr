import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'indigo' | 'cyan' | 'none';
}

const glowClasses: Record<NonNullable<CardProps['glow']>, string> = {
  indigo: 'shadow-[0_28px_80px_-48px_rgba(99,102,241,0.85)]',
  cyan: 'shadow-[0_28px_80px_-48px_rgba(34,211,238,0.75)]',
  none: 'shadow-[0_18px_60px_-45px_rgba(15,23,42,0.6)]'
};

export const Card = ({ className, glow = 'indigo', ...props }: CardProps) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.035] backdrop-blur-xl',
      glowClasses[glow],
      className
    )}
    {...props}
  />
);
