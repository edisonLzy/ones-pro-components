import { createContext, useContext } from 'react';
import { ShareStepProps } from '../step';
import { ShareStepsStore } from '../store';

export interface ShareStepsContext {
    unRegisterStep: (name: string)=>void
    registerStep: (name:string, stepProp: ShareStepProps)=>void
    preStep:()=>void,
    nextStep:()=>void,
    currentStep: string,
}

export const shareStepsContext = createContext<ShareStepsContext | null>(null)

export function useShareStepsContext() {
  const context = useContext(shareStepsContext);
  if(!context){
    throw new Error("useStepsFormContext must be used within StepsFormContext");
  }
  return context
}