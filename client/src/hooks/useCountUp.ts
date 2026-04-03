import { useEffect, useMemo, useState } from 'react';

interface CountUpOptions {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
}

export const useCountUp = ({
  to,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  start
}: CountUpOptions) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let animationFrame = 0;
    const animationStart = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - animationStart) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setValue(Number((to * easedProgress).toFixed(decimals)));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [decimals, duration, start, to]);

  return useMemo(
    () =>
      `${prefix}${value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}${suffix}`,
    [decimals, prefix, suffix, value]
  );
};
