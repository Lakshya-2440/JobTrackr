import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/constants/data';
import { Card } from '@/components/ui/Card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const repeatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

export const Testimonials = () => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-indigo-300/85">
            // TESTIMONIALS
          </p>
          <h2 className="section-heading mt-5">Don&apos;t take our word for it</h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="group mt-12 mask-fade-x"
      >
        <div className="flex w-max gap-5 pr-5 animate-marquee group-hover:[animation-play-state:paused]">
          {repeatedTestimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.name}-${index}`}
              className="w-[20rem] shrink-0 rounded-[28px] p-5"
              glow="none"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.accent} text-sm font-semibold text-white`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-indigo-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-200">{testimonial.quote}</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
