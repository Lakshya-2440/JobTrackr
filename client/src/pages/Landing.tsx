import { LazyExoticComponent, Suspense, lazy, useEffect, useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { LogoBar } from '@/components/sections/LogoBar';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Changelog = lazy(() =>
  import('@/components/sections/Changelog').then((module) => ({ default: module.Changelog }))
);
const Features = lazy(() =>
  import('@/components/sections/Features').then((module) => ({ default: module.Features }))
);
const HowItWorks = lazy(() =>
  import('@/components/sections/HowItWorks').then((module) => ({ default: module.HowItWorks }))
);
const Stats = lazy(() =>
  import('@/components/sections/Stats').then((module) => ({ default: module.Stats }))
);
const Testimonials = lazy(() =>
  import('@/components/sections/Testimonials').then((module) => ({ default: module.Testimonials }))
);
const Pricing = lazy(() =>
  import('@/components/sections/Pricing').then((module) => ({ default: module.Pricing }))
);
const FinalCTA = lazy(() =>
  import('@/components/sections/FinalCTA').then((module) => ({ default: module.FinalCTA }))
);

interface DeferredSectionProps {
  component: LazyExoticComponent<() => JSX.Element>;
  fallbackHeight: string;
  sectionId: string;
}

const SectionFallback = ({ height }: { height: string }) => (
  <div className="section-container py-12 sm:py-16">
    <div
      className={`glass-panel animate-pulse rounded-[32px] border border-white/8 bg-white/[0.03] ${height}`}
      aria-hidden="true"
    />
  </div>
);

const DeferredSection = ({ component: Component, fallbackHeight, sectionId }: DeferredSectionProps) => {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({
    amount: 0.02,
    margin: '0px 0px 420px 0px'
  });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldRender(true);
    }
  }, [isInView]);

  return (
    <div id={sectionId} ref={ref}>
      {shouldRender ? (
        <Suspense fallback={<SectionFallback height={fallbackHeight} />}>
          <Component />
        </Suspense>
      ) : (
        <SectionFallback height={fallbackHeight} />
      )}
    </div>
  );
};

export const Landing = () => (
  <div className="page-shell">
    <Navbar />
    <main>
      <Hero />
      <LogoBar />
      <DeferredSection component={Changelog} fallbackHeight="h-[18rem]" sectionId="changelog" />
      <DeferredSection component={Features} fallbackHeight="h-[38rem]" sectionId="features" />
      <DeferredSection component={HowItWorks} fallbackHeight="h-[32rem]" sectionId="how-it-works" />
      <DeferredSection component={Stats} fallbackHeight="h-[18rem]" sectionId="stats" />
      <DeferredSection component={Testimonials} fallbackHeight="h-[28rem]" sectionId="testimonials" />
      <DeferredSection component={Pricing} fallbackHeight="h-[42rem]" sectionId="pricing" />
      <DeferredSection component={FinalCTA} fallbackHeight="h-[22rem]" sectionId="final-cta" />
    </main>
    <Footer />
  </div>
);
