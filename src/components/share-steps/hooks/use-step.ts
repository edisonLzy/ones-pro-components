import { useEffect, useState } from 'react';

interface Options {
  initialStep: number;
  totalSteps: number;
  onStepChange?: (step: number) => void;
}

export function useStep({ initialStep, totalSteps, onStepChange }: Options) {
  const [internalStep, setInternalStep] = useState(initialStep);
  const nextStep = () => {
    if (internalStep > totalSteps - 2) return;
    setInternalStep(internalStep + 1);
  };
  const preStep = () => {
    if (internalStep < 1) return;
    setInternalStep(internalStep - 1);
  };
  const isLastStep = () => {
    return internalStep === totalSteps - 1;
  };
  const isFirstStep = () => {
    return internalStep === 0;
  };
  //
  useEffect(() => {
    onStepChange?.(internalStep);
  }, [internalStep, onStepChange]);
  //
  return [
    internalStep,
    {
      nextStep,
      preStep,
      isLastStep,
      isFirstStep,
    },
  ] as const;
}
