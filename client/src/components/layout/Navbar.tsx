import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MoveRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { NAV_LINKS } from '@/constants/data';
import { buttonStyles } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition duration-500',
        isScrolled ? 'py-3' : 'py-5'
      )}
    >
      <div className="section-container">
        <div
          className={cn(
            'mx-auto flex items-center justify-between rounded-full border px-4 py-3 transition duration-500 sm:px-5',
            isScrolled
              ? 'border-white/10 bg-black/45 shadow-glow backdrop-blur-2xl'
              : 'border-transparent bg-white/[0.02]'
          )}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white"
            aria-label="JobTrackr home"
          >
            <img src={logo} alt="JobTrackr" className="h-9 w-auto" />
            <span className="font-display text-xl">JobTrackr</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white focus-visible:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <Link
              to="/register"
              className={buttonStyles({
                variant: 'primary',
                size: 'lg',
                className:
                  'group relative overflow-hidden rounded-full px-5 text-sm shadow-[0_26px_70px_-40px_rgba(99,102,241,1)]'
              })}
            >
              <span className="absolute inset-y-0 left-0 w-14 -translate-x-20 rotate-[18deg] bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[280px]" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Get Started Free
                <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-[28px] border border-white/10 bg-black/70 p-4 shadow-glow backdrop-blur-2xl lg:hidden">
                <div className="space-y-1">
                  {NAV_LINKS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className={buttonStyles({
                    variant: 'primary',
                    size: 'lg',
                    fullWidth: true,
                    className: 'mt-4 rounded-full'
                  })}
                >
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};
