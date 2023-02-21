import { useState, useCallback } from 'react';

interface Options {
  initialStep: number;
  totalSteps: number;
}

export function useStep({ initialStep, totalSteps }: Options) {
  //
  const [internalStep, setInternalStep] = useState(initialStep);
  //
  const nextStep = useCallback(() => {
    setInternalStep((step)=>{
        if(step > totalSteps - 2) return step
        return step + 1
    });
  },[totalSteps]);

  const preStep = useCallback(() => {
    setInternalStep(step=>{
      if (step < 1) return step;
      return step - 1;
    });
  },[]);
  //
  return [
    internalStep,
    {
      nextStep,
      preStep,
    },
  ] as const;
}
