'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useTour } from './features/useTour';
import { TourStepUI } from './sections/TourStep';
import { TourProgress } from './sections/TourProgress';
import { TourNavigation } from './sections/TourNavigation';
import { TOUR_STEPS } from './tour-steps';

export default function GuidedTour() {
  const {
    currentStep,
    step,
    isFirst,
    isLast,
    tourOpen,
    goNext,
    goPrev,
    handleSkip,
    handleOpenChange,
    goToStep,
  } = useTour(TOUR_STEPS);

  return (
    <Dialog open={tourOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md industrial-card border-border p-0 overflow-hidden"
        showCloseButton={false}
      >
        <TourStepUI
          step={step}
          currentStep={currentStep}
          onSkip={handleSkip}
        />

        <TourProgress
          steps={TOUR_STEPS}
          currentStep={currentStep}
          onStepClick={goToStep}
        />

        <TourNavigation
          isFirst={isFirst}
          isLast={isLast}
          onPrev={goPrev}
          onNext={goNext}
          onSkip={handleSkip}
        />
      </DialogContent>
    </Dialog>
  );
}
