import { createContext, useContext } from 'react';
import { ShareStepsStore } from '../store';

export interface ShareStoreContext {
    store: ShareStepsStore
}

export const shareStoreContext = createContext<ShareStoreContext | null>(null)

export function useShareStoreContext() {
  const context = useContext(shareStoreContext);
  if(!context){
    throw new Error("useStepsFormContext must be used within StepsFormContext");
  }
  return context
}