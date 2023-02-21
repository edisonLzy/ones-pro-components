import { useStepsFormContext } from "../context";

export function useStepForm(){
    const { currentStep,formInstancesRef } = useStepsFormContext();
    return [formInstancesRef.current[currentStep]]
}