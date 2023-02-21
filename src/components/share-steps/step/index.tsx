import { Steps } from "@ones-design/core";
import { ComponentProps, PropsWithChildren, ReactNode, useEffect } from "react";
import { useShareStepsContext } from "../context/share-steps";

export interface ShareStepProps {
    name: string,
    description: ReactNode,
    stepProps?: ComponentProps<typeof Steps.Step>,
}

export function ShareStep(props: PropsWithChildren<ShareStepProps>) {
    
    const { registerStep, unRegisterStep } = useShareStepsContext()
    
    useEffect(() => {
        if (!(props.name)) return;
        const name = (props.name)!.toString();
        registerStep(name, props);
        return () => {
            unRegisterStep(name);
        };
    }, [])

    return <div className="share-step">
        {props.children}
    </div>
}