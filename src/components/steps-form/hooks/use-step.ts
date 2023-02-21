import { useEffect, useState } from "react";
import { usePrevious } from "./use-previous";

interface Options {
    step: number;
    onStepChange?: (step: number)=> void;
    totalSteps: number;
}

export function useStep({ step, totalSteps,onStepChange }: Options){
    const [internalStep,setInternalStep] = useState(step);
    const previousStep = usePrevious(internalStep);
    const nextStep = () => {
        if (step > totalSteps - 2) return;
        setInternalStep(step + 1);
    }
    const preStep = () => {
        if (step < 1) return;
        setInternalStep(step - 1);
    }
    const isLastStep = () => {
        return step === totalSteps - 1;
    }
    const isFirstStep = () => {
        return step === 0;
    }
    //
    useEffect(()=>{
        if(step === previousStep){
            return;
        }
        setInternalStep(step);
    },[step,previousStep])
    //
    useEffect(()=>{
        onStepChange?.(internalStep)
    },[internalStep])
    //
    return [internalStep, {
        nextStep,
        preStep,
        isLastStep,
        isFirstStep
    }] as const
}