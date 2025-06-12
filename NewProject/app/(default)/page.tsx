/**
 * HOMEPAGE
 * Página principal de la landing page de longevidad
 */

import { Suspense } from 'react';
import { HeroSection, WhyTakeControl, PackagesSection } from '@/components/landing';
import HowToTakeControl from '@/components/landing/HowToTakeControl';
import { SuccessNotification } from '@/components/ui/SuccessNotification';

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <SuccessNotification />
      </Suspense>
      <HeroSection />
      <WhyTakeControl />
      <HowToTakeControl />
      
      <PackagesSection />
    </main>
  );
}
