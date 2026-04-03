import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PRICING_TIERS } from '@/constants/data';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/utils/cn';

export const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const { ref, isInView } = useScrollReveal<HTMLDivElement>();

  const displayedTiers = useMemo(
    () =>
      PRICING_TIERS.map((tier) => ({
        ...tier,
        displayPrice: billing === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice,
        priceLabel:
          tier.name === 'Free'
            ? tier.yearlyNote
            : billing === 'monthly'
              ? 'Billed monthly'
              : tier.yearlyNote
      })),
    [billing]
  );

  return (
    <section className="relative py-24 sm:py-28">
      <div className="section-container" ref={ref}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-indigo-300/85">
              // PRICING
            </p>
            <h2 className="section-heading mt-5">Simple plans that scale with your search</h2>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
            <button
              type="button"
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
              className={cn(
                'rounded-full px-4 py-2 text-sm transition',
                billing === 'monthly' ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={billing === 'yearly'}
              onClick={() => setBilling('yearly')}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition',
                billing === 'yearly' ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'
              )}
            >
              Yearly
              <Badge variant="cyan" className="px-2.5 py-1 text-[0.62rem]">
                20% off
              </Badge>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-5 xl:grid-cols-3">
          {displayedTiers.map((tier, index) => {
            const action =
              tier.name === 'Team' ? (
                <a
                  href="mailto:hello@trackr.app"
                  className={buttonStyles({
                    variant: tier.featured ? 'primary' : 'outline',
                    size: 'lg',
                    fullWidth: true,
                    className: 'rounded-full'
                  })}
                >
                  {tier.cta}
                </a>
              ) : (
                <Link
                  to="/register"
                  className={buttonStyles({
                    variant: tier.featured ? 'primary' : 'outline',
                    size: 'lg',
                    fullWidth: true,
                    className: 'rounded-full'
                  })}
                >
                  {tier.cta}
                </Link>
              );

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.62,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Card
                  className={cn(
                    'h-full rounded-[32px] p-6 sm:p-7',
                    tier.featured
                      ? 'border-indigo-400/35 bg-indigo-500/[0.08] shadow-[0_32px_90px_-50px_rgba(99,102,241,1)]'
                      : 'bg-white/[0.035]'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                      <p className="mt-3 max-w-xs text-sm leading-7 text-slate-300">
                        {tier.description}
                      </p>
                    </div>
                    {tier.featured ? <Badge>Most popular</Badge> : null}
                  </div>

                  <div className="mt-8">
                    <div className="flex items-end gap-2">
                      <span className="font-display text-6xl tracking-[-0.06em] text-white">
                        {tier.displayPrice}
                      </span>
                      <span className="pb-3 text-sm text-slate-400">
                        {tier.name === 'Free' ? '' : '/mo'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{tier.priceLabel}</p>
                  </div>

                  <div className="mt-8">{action}</div>

                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.label}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-slate-200"
                      >
                        <span>{feature.label}</span>
                        <span
                          className={cn(
                            'font-mono text-base',
                            feature.included ? 'text-cyan-300' : 'text-slate-500'
                          )}
                        >
                          {feature.included ? '✓' : '✗'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
