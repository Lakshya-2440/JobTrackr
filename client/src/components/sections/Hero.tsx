import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Button';
import { KanbanMockup } from '@/components/ui/KanbanMockup';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

export const Hero = () => (
  <section className="noise-overlay relative pt-32 pb-14 sm:pt-36 sm:pb-16 lg:min-h-screen lg:pt-40 lg:pb-24">
    <div className="absolute inset-0 bg-hero-bloom" aria-hidden="true" />
    <div className="absolute inset-0 grid-dots opacity-35" aria-hidden="true" />
    <div className="absolute left-[8%] top-28 h-56 w-56 rounded-full bg-indigo-500/20 blur-[120px]" />
    <div className="absolute right-[12%] top-44 h-56 w-56 rounded-full bg-cyan-400/10 blur-[140px]" />
    <div className="section-container relative z-10">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={item}>
            <Badge
              className="group relative overflow-hidden rounded-full px-4 py-2 text-[0.72rem]"
            >
              <span className="absolute inset-y-0 left-0 w-20 -translate-x-16 bg-white/25 blur-md transition-transform duration-1000 group-hover:translate-x-[220px]" />
              <span className="relative z-10">Now in public beta ✦</span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[3.5rem] leading-[0.93] tracking-[-0.07em] text-white sm:text-[4.6rem] lg:text-[5.7rem]"
          >
            Your job search,
            <span className="mt-3 block gradient-text">finally under control.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            JobTrackr organizes every application, interview, and follow-up in one intelligent board
            so you can focus on landing the job, not managing spreadsheets.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className={buttonStyles({
                variant: 'primary',
                size: 'xl',
                className:
                  'rounded-full px-6 shadow-[0_28px_80px_-40px_rgba(99,102,241,1)] will-change-transform'
              })}
            >
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#how-it-works"
              className={buttonStyles({
                variant: 'outline',
                size: 'xl',
                className: 'rounded-full px-6 text-slate-100'
              })}
            >
              <PlayCircle className="h-4 w-4" />
              See how it works
            </a>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 text-sm tracking-[0.01em] text-slate-400 sm:text-[0.95rem]"
          >
            Joined by 4,200+ job seekers · No credit card required
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, y: 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ willChange: 'transform' }}
        >
          <KanbanMockup />
        </motion.div>
      </div>
    </div>

    <div
      className="pointer-events-none absolute inset-x-0 bottom-[-4px] h-44 bg-gradient-to-b from-transparent via-indigo-500/12 to-[#090909]"
      aria-hidden="true"
    />
  </section>
);
