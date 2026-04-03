import { motion } from 'framer-motion';
import { STATS } from '@/constants/data';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const StatCard = ({
  value,
  suffix,
  decimals,
  label,
  start
}: (typeof STATS)[number] & { start: boolean }) => {
  const formatted = useCountUp({
    to: value,
    suffix,
    decimals,
    start
  });

  return (
    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] px-6 py-8 backdrop-blur-xl">
      <p className="font-mono text-4xl tracking-[-0.05em] text-white sm:text-5xl">{formatted}</p>
      <p className="mt-3 max-w-[14rem] text-sm leading-6 text-slate-300">{label}</p>
    </div>
  );
};

export const Stats = () => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ amount: 0.3 });

  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} start={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
