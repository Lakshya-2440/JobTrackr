import { motion } from 'framer-motion';
import { LOGO_NAMES } from '@/constants/data';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const logoMarks: Record<(typeof LOGO_NAMES)[number], JSX.Element> = {
  Google: (
    <svg viewBox="0 0 120 28" className="h-7 w-auto fill-current">
      <text x="0" y="20" fontSize="20" fontWeight="600" fontFamily="DM Sans, sans-serif">
        Google
      </text>
    </svg>
  ),
  Meta: (
    <svg viewBox="0 0 100 28" className="h-7 w-auto fill-current">
      <path d="M12 20C20 7 24 7 32 20C40 7 44 7 52 20" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      <text x="58" y="20" fontSize="18" fontWeight="600" fontFamily="DM Sans, sans-serif">
        Meta
      </text>
    </svg>
  ),
  Amazon: (
    <svg viewBox="0 0 120 28" className="h-7 w-auto fill-current">
      <text x="0" y="18" fontSize="19" fontWeight="600" fontFamily="DM Sans, sans-serif">
        amazon
      </text>
      <path d="M14 23C28 27 46 27 63 18" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Stripe: (
    <svg viewBox="0 0 110 28" className="h-7 w-auto fill-current">
      <text x="0" y="20" fontSize="19" fontWeight="700" fontFamily="DM Sans, sans-serif" transform="skewX(-11)">
        stripe
      </text>
    </svg>
  ),
  Notion: (
    <svg viewBox="0 0 108 28" className="h-7 w-auto fill-current">
      <rect x="0.5" y="2.5" width="22" height="22" rx="4" stroke="currentColor" fill="none" />
      <path d="M6 21V7L16 21V7" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <text x="31" y="20" fontSize="18" fontWeight="600" fontFamily="DM Sans, sans-serif">
        Notion
      </text>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 100 28" className="h-7 w-auto fill-current">
      <circle cx="9" cy="9" r="4" />
      <circle cx="17" cy="9" r="4" />
      <circle cx="9" cy="17" r="4" />
      <circle cx="17" cy="17" r="4" />
      <circle cx="9" cy="25" r="3" />
      <text x="32" y="20" fontSize="18" fontWeight="600" fontFamily="DM Sans, sans-serif">
        Figma
      </text>
    </svg>
  )
};

export const LogoBar = () => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-16 sm:py-20">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[30px] border border-white/8 bg-white/[0.025] px-6 py-8 backdrop-blur-xl"
        >
          <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-slate-500">
            Used by job seekers at
          </p>

          <div className="mt-7 grid grid-cols-2 gap-5 text-slate-500 sm:grid-cols-3 lg:grid-cols-6">
            {LOGO_NAMES.map((name) => (
              <div
                key={name}
                className="flex h-16 items-center justify-center rounded-2xl border border-white/6 bg-white/[0.02] text-[0.92rem] grayscale transition hover:border-white/12 hover:bg-white/[0.04] hover:text-slate-300"
              >
                {logoMarks[name]}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
