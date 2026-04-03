import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CHANGELOG_ITEMS } from '@/constants/data';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const Changelog = () => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-8 sm:py-12">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 rounded-[34px] border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent p-7 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div>
            <Badge variant="cyan">Latest Ship Notes</Badge>
            <h2 className="mt-5 font-display text-3xl tracking-[-0.05em] text-white sm:text-4xl">
              Shipping clarity for every search sprint.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Trackr is evolving fast, but the principle stays the same: fewer tabs, less guesswork,
              more momentum.
            </p>
          </div>

          <div className="grid gap-4">
            {CHANGELOG_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.58,
                  delay: 0.08 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Card className="rounded-[24px] border-white/8 bg-[#101117]/72 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">
                        {item.date}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
                        {item.description}
                      </p>
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
