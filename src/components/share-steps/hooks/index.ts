import { useShareStepsContext } from '../context/share-steps';
import { useShareStoreContext } from '../context/share-store'

export function useShareStore() {
    const { store } = useShareStoreContext()
    return store
}

export function useStoreActions() {
    const store = useShareStore();
    const { savaData, retrieveData, deleteData } = store
    return {
        savaData,
        retrieveData,
        deleteData
    }
}

export function useStepActions(){
    const { preStep,nextStep} = useShareStepsContext()
    return  { preStep,nextStep}
}

export function useStepData(name?: string){
    const store = useShareStore();
    const { currentStep } = useShareStepsContext();
    return store.retrieveData(name ?? currentStep);
}