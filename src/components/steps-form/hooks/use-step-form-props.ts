import { useStepsFormContext } from "../context";

export function useStepFormProps(){
    const { currentStep } = useStepsFormContext();
    
}