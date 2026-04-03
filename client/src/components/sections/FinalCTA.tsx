import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonStyles } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const FinalCTA = () => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.06] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/18 blur-[140px]" />
      <div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[36px] border border-white/10 bg-white/[0.04] px-6 py-16 text-center shadow-glow backdrop-blur-2xl sm:px-10"
        >
          <h2 className="mx-auto max-w-3xl font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Ready to stop juggling spreadsheets?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Join 4,200+ job seekers who track smarter.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <Link
              to="/register"
              className={buttonStyles({
                variant: 'primary',
                size: 'xl',
                className:
                  'rounded-full px-7 shadow-[0_28px_80px_-40px_rgba(99,102,241,1)] will-change-transform'
              })}
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-sm text-slate-400">No credit card required</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
