import { motion } from 'framer-motion';
import { STEPS } from '@/constants/data';
import { Card } from '@/components/ui/Card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const HowItWorks = () => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 sm:py-28">
      <div className="section-container" ref={ref}>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-300/80">
            // HOW IT WORKS
          </p>
          <h2 className="section-heading mt-5">Three steps to your next offer</h2>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px dash-line animate-dash-flow opacity-80 lg:left-1/2 lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -24 : 24, y: 20 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]"
                >
                  <div className={isEven ? '' : 'lg:col-start-3'}>
                    <Card className="relative overflow-hidden rounded-[30px] p-6 sm:p-7">
                      <span className="pointer-events-none absolute right-5 top-3 font-display text-8xl leading-none tracking-[-0.08em] text-white/[0.06]">
                        0{index + 1}
                      </span>
                      <div className="relative z-10 max-w-xl">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-indigo-200">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-base leading-7 text-slate-300">{step.description}</p>
                      </div>
                    </Card>
                  </div>

                  <div className="hidden lg:flex lg:justify-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-[#111118] text-sm font-semibold text-white shadow-glow">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
