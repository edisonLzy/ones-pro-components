import { useRef,useEffect } from "react";

export function usePrevious<Value>(v: Value){
    const ref = useRef<Value>();
    useEffect(()=>{
        ref.current = v;
    },[v]);
    return ref.current;
}