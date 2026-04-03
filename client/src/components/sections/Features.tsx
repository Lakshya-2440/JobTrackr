import { motion } from 'framer-motion';
import { FEATURES } from '@/constants/data';
import { Card } from '@/components/ui/Card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
  }
};

export const Features = () => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 grid-dots opacity-20" aria-hidden="true" />
      <div className="absolute left-[14%] top-32 h-64 w-64 rounded-full bg-indigo-500/8 blur-[120px]" />
      <div className="section-container relative z-10" ref={ref}>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-indigo-300/85">
            // FEATURES
          </p>
          <h2 className="section-heading mt-5">Everything you need to land the role</h2>
          <p className="section-copy mt-5">
            From first application to final offer, Trackr keeps your search visible, actionable, and
            calm.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card
                className="group h-full rounded-[30px] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-white/14 hover:bg-white/[0.05]"
                style={{ willChange: 'transform' }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-indigo-500/12 text-indigo-200 shadow-[0_20px_45px_-30px_rgba(99,102,241,1)]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
