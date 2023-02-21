export type CacheKey = string;

export class ShareStepsStore<Data = Record<string, unknown>> {

    private store = new Map<CacheKey, Data>()

    savaData = (key: CacheKey, data: Data) => {
        this.store.set(key, data)
    }

    retrieveData = (key: CacheKey) => {
        return this.store.get(key)
    }
    
    deleteData = (key: CacheKey) => {
        this.store.delete(key)
    }

    clearData = () => {
        this.store.clear()
    }

}