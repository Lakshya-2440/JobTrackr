import { Github, Linkedin, MoveUpRight, Twitter } from 'lucide-react';
import { FOOTER_LINK_GROUPS } from '@/constants/data';

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin }
] as const;

export const Footer = () => (
  <footer id="footer" className="border-t border-white/8 bg-black/55 pb-10 pt-14">
    <div className="section-container">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="font-display text-3xl tracking-[-0.06em] text-white">Trackr</span>
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.85)]" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Trackr gives job seekers a calm, high-signal command center for every application,
            interview, and follow-up.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                    >
                      {link.label}
                      {link.href.startsWith('mailto') ? <MoveUpRight className="h-3.5 w-3.5" /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-6 border-t border-white/8 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span>© 2026 Trackr. All rights reserved.</span>
          <span className="hidden text-slate-700 sm:inline">•</span>
          <span>Built with ♥ for job seekers</span>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
