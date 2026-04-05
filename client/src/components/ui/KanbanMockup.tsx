import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, GripVertical } from 'lucide-react';
import { HERO_COLUMNS } from '@/constants/data';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

const toneClasses = {
  indigo: 'bg-indigo-400 shadow-[0_0_18px_rgba(129,140,248,0.8)]',
  cyan: 'bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]',
  emerald: 'bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.75)]'
} as const;

export const KanbanMockup = () => (
  <div className="relative mx-auto w-full max-w-[42rem] will-change-transform">
    <div className="absolute inset-x-16 bottom-0 h-24 rounded-full bg-indigo-500/35 blur-[82px]" />
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [5.5, 4.5, 5.5] }}
      transition={{ duration: 8.5, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
      className="relative z-10"
      style={{ willChange: 'transform' }}
    >
      <Card className="overflow-hidden rounded-[34px] border-white/12 bg-[#111118]/88 p-4 shadow-[0_35px_90px_-42px_rgba(99,102,241,0.85)] sm:p-5">
        <div className="flex flex-col gap-3 border-b border-white/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-slate-500">
              Trackr board
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-200">
              <span className="font-medium text-white">Q2 Search Sprint</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>5 actions today</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
              3 interviews this week
            </div>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {HERO_COLUMNS.map((column, columnIndex) => (
            <div
              key={column.title}
              className="rounded-[26px] border border-white/8 bg-white/[0.03] p-3"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{column.title}</span>
                  <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[0.68rem] text-slate-300">
                    {column.cards.length}
                  </span>
                </div>
                <GripVertical className="h-4 w-4 text-slate-600" />
              </div>

              <div className="space-y-3">
                {column.cards.map((card, cardIndex) => (
                  <motion.div
                    key={`${card.company}-${card.role}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.18 + columnIndex * 0.12 + cardIndex * 0.08,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.018,
                      transition: { duration: 0.12, ease: 'easeOut' }
                    }}
                    className="rounded-[22px] border border-white/8 bg-[#0f1016] p-4 shadow-[0_18px_42px_-28px_rgba(15,23,42,0.95)] transition"
                    style={{ willChange: 'transform' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{card.company}</p>
                        <p className="mt-1 text-sm text-slate-300">{card.role}</p>
                      </div>
                      <span className={cn('mt-1 h-2.5 w-2.5 rounded-full', toneClasses[card.tone])} />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-[0.72rem] text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {card.date}
                      </span>
                      <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-slate-300">
                        Follow-up ready
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  </div>
);
