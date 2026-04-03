import { RefObject, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrollRevealOptions {
  amount?: 'some' | 'all' | number;
  once?: boolean;
  margin?: string;
  initial?: boolean;
}

export const useScrollReveal = <T extends Element>({
  amount = 0.28,
  once = true,
  margin = '0px 0px -12% 0px',
  initial = false
}: ScrollRevealOptions = {}) => {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref as RefObject<T>, {
    amount,
    once,
    margin,
    initial
  });

  return { ref, isInView };
};
