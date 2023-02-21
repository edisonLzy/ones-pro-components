import { useRef } from 'react';
import { useShareStepsContext } from '../context'
import { ShareStepsStore } from '../store';


export function useShareStore() {
    const store = useRef(new ShareStepsStore());
    return store.current
}

export function useStepActions() {
    const { preStep, nextStep } = useShareStepsContext();
    const { savaData, retrieveData, deleteData ,clearData } = useShareStore();
    return { preStep, nextStep, savaData, retrieveData, deleteData,clearData }
}

export function useStepData(name?: string) {
    const store = useShareStore();
    console.log(store);
    
    const { currentStep } = useShareStepsContext();
    return store.retrieveData(name ?? currentStep);
}