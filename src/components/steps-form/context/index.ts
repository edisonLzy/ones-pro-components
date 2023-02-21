import { FormInstance } from '@ones-design/core';
import React, { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { StepFormProps } from '../step-form';

export interface StepsFormContext {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
    currentStep: number;
    preStep: () => void;
    nextStep: ()=>void;
    onFormFinished: (name: string, values: any) => void;
    formInstancesRef: React.MutableRefObject<FormInstance[]>;
    formMapRef: React.MutableRefObject<Map<string,StepFormProps>>
    unRegisterForm: (name: string) => void;
    registerForm: (name: string, form: StepFormProps) => void;
  
}

export const stepsFormContext = createContext<StepsFormContext | null>(null)

export function useStepsFormContext() {
  const context = useContext(stepsFormContext);
  if(!context){
    throw new Error("useStepsFormContext must be used within StepsFormContext");
  }
  return context
}