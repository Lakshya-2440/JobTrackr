import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BellRing,
  Files,
  Import,
  LayoutDashboard,
  Link2,
  MoveRight,
  NotebookText,
  Sparkles,
  Workflow
} from 'lucide-react';

export interface NavLinkItem {
  href: string;
  label: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
  accent: string;
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlyNote: string;
  cta: string;
  featured?: boolean;
  features: PricingFeature[];
}

export interface FooterLinkGroup {
  title: string;
  links: NavLinkItem[];
}

export interface MockCard {
  company: string;
  role: string;
  date: string;
  tone: 'indigo' | 'cyan' | 'emerald';
}

export interface MockColumn {
  title: string;
  cards: MockCard[];
}

export interface ChangelogItem {
  date: string;
  title: string;
  description: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#changelog', label: 'Changelog' }
];

export const LOGO_NAMES = ['Google', 'Meta', 'Amazon', 'Stripe', 'Notion', 'Figma'] as const;

export const HERO_COLUMNS: MockColumn[] = [
  {
    title: 'Applied',
    cards: [
      { company: 'Notion', role: 'Product Designer', date: 'Apr 10', tone: 'indigo' },
      { company: 'Vercel', role: 'Growth Marketer', date: 'Apr 12', tone: 'cyan' },
      { company: 'Webflow', role: 'Frontend Engineer', date: 'Apr 15', tone: 'emerald' }
    ]
  },
  {
    title: 'Interview',
    cards: [
      { company: 'Linear', role: 'Product Operations', date: 'Today', tone: 'cyan' },
      { company: 'Figma', role: 'Brand Designer', date: 'Apr 18', tone: 'indigo' }
    ]
  },
  {
    title: 'Offer',
    cards: [
      { company: 'Stripe', role: 'Lifecycle PM', date: 'Apr 21', tone: 'emerald' },
      { company: 'Ramp', role: 'RevOps Lead', date: 'Apr 23', tone: 'indigo' }
    ]
  }
];

export const FEATURES: FeatureItem[] = [
  {
    icon: LayoutDashboard,
    title: 'Kanban Board',
    description: 'Drag and drop every application across custom stages with a clear, high-signal pipeline.'
  },
  {
    icon: BellRing,
    title: 'Smart Reminders',
    description: 'Never miss a follow-up with automated nudges that surface the next best action.'
  },
  {
    icon: Files,
    title: 'Resume Vault',
    description: 'Store tailored resume versions, cover letters, and notes directly on every job card.'
  },
  {
    icon: NotebookText,
    title: 'Interview Prep',
    description: 'Capture talking points, recruiter context, and question banks before every conversation.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'See your funnel, response rates, and stage conversion trends without exporting a single sheet.'
  },
  {
    icon: Import,
    title: 'One-Click Import',
    description: 'Pull in roles from LinkedIn links or CSV files and turn messy lists into a live board instantly.'
  }
];

export const STEPS: StepItem[] = [
  {
    icon: Link2,
    title: 'Add jobs from anywhere',
    description: 'Drop in a job URL, paste the details manually, or upload a CSV when you are moving fast.'
  },
  {
    icon: Workflow,
    title: 'Move cards through your custom pipeline',
    description: 'Shape the board around your search, then drag roles through stages as each conversation progresses.'
  },
  {
    icon: Sparkles,
    title: 'Get reminders, prep for interviews, land the job',
    description: 'Track follow-ups, store prep notes, and keep momentum right up to the offer stage.'
  }
];

export const STATS: StatItem[] = [
  { value: 4200, suffix: '+', label: 'Active Users' },
  { value: 38000, suffix: '+', label: 'Applications Tracked' },
  { value: 91, suffix: '%', label: 'Say it reduced their job search stress' },
  { value: 2.4, suffix: 'x', decimals: 1, label: 'Faster response follow-up rate' }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Maya Chen',
    role: 'Product Designer',
    company: 'ex-Notion',
    initials: 'MC',
    quote: 'I had 40 applications open across 3 spreadsheets. Trackr fixed that in 10 minutes and I finally knew who needed a follow-up.',
    accent: 'from-indigo-500 to-cyan-400'
  },
  {
    name: 'Jordan Vega',
    role: 'Growth Marketer',
    company: 'Series B SaaS',
    initials: 'JV',
    quote: 'The reminder flow is the reason I stuck with it. Recruiter follow-ups stopped falling through the cracks immediately.',
    accent: 'from-fuchsia-500 to-indigo-400'
  },
  {
    name: 'Priya Nair',
    role: 'Frontend Engineer',
    company: 'Freelance to full-time',
    initials: 'PN',
    quote: 'I used to paste notes into random docs. Now every interview prep note lives exactly where I need it.',
    accent: 'from-cyan-400 to-sky-400'
  },
  {
    name: 'Daniel Brooks',
    role: 'Customer Success Lead',
    company: 'Remote-first startup',
    initials: 'DB',
    quote: 'The funnel analytics showed me I was over-indexing on low-fit roles. I tightened the search and got interviews faster.',
    accent: 'from-violet-500 to-indigo-500'
  },
  {
    name: 'Sara Ahmed',
    role: 'Operations Manager',
    company: 'Healthcare tech',
    initials: 'SA',
    quote: 'Trackr made my search feel calm for the first time. I stopped wondering what I forgot and started acting with confidence.',
    accent: 'from-emerald-400 to-cyan-400'
  },
  {
    name: 'Leo Martinez',
    role: 'Sales Engineer',
    company: 'Cloud infrastructure',
    initials: 'LM',
    quote: 'I imported my backlog, split it into priority lanes, and finally had a system that matched how fast I was applying.',
    accent: 'from-indigo-500 to-violet-500'
  },
  {
    name: 'Nina Patel',
    role: 'UX Researcher',
    company: 'Consumer apps',
    initials: 'NP',
    quote: 'The resume vault alone is worth it. I can keep tailored versions per company without digging through folders.',
    accent: 'from-cyan-400 to-indigo-500'
  },
  {
    name: 'Owen Hart',
    role: 'Account Executive',
    company: 'B2B SaaS',
    initials: 'OH',
    quote: 'It gave me a clean weekly review ritual. Monday mornings went from chaos to a focused 20-minute planning session.',
    accent: 'from-orange-400 to-indigo-400'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    description: 'A clean, focused board for an active solo search.',
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    yearlyNote: 'Always free',
    cta: 'Get Started',
    features: [
      { label: 'Unlimited job cards', included: true },
      { label: '3 pipeline stages', included: true },
      { label: 'Basic reminders', included: true },
      { label: 'Resume attachments', included: false },
      { label: 'Advanced analytics', included: false }
    ]
  },
  {
    name: 'Pro',
    description: 'For job seekers who want a smarter, more organized process.',
    monthlyPrice: '$9',
    yearlyPrice: '$7',
    yearlyNote: 'Billed yearly, save 20%',
    cta: 'Start Pro Trial',
    featured: true,
    features: [
      { label: 'Unlimited job cards', included: true },
      { label: 'Unlimited custom stages', included: true },
      { label: 'Smart reminders & follow-ups', included: true },
      { label: 'Resume vault & interview prep', included: true },
      { label: 'Advanced analytics dashboard', included: true }
    ]
  },
  {
    name: 'Team',
    description: 'Shared visibility for coaches, bootcamps, and career teams.',
    monthlyPrice: '$19',
    yearlyPrice: '$15',
    yearlyNote: 'Billed yearly, save 20%',
    cta: 'Contact Sales',
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Shared workspaces', included: true },
      { label: 'Commenting and review notes', included: true },
      { label: 'Role assignment & permissions', included: true },
      { label: 'CSV import concierge', included: true }
    ]
  }
];

export const CHANGELOG_ITEMS: ChangelogItem[] = [
  {
    date: 'Apr 2026',
    title: 'Calendar-aware reminders',
    description: 'Trackr now schedules follow-ups around interview blocks so your board matches your real week.'
  },
  {
    date: 'Mar 2026',
    title: 'Priority lenses',
    description: 'Sort your pipeline by urgency, fit, or salary band when you need to decide where to spend your energy.'
  },
  {
    date: 'Feb 2026',
    title: 'Offer stage snapshots',
    description: 'Compare comp notes, recruiter feedback, and decision deadlines in one fast review screen.'
  }
];

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#how-it-works' },
      { label: 'Careers', href: '#final-cta' },
      { label: 'Contact', href: 'mailto:hello@trackr.app' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'API Status', href: '#stats' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#footer' },
      { label: 'Terms', href: '#footer' },
      { label: 'Security', href: '#footer' }
    ]
  }
];
