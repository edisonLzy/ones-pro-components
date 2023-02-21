import { Steps } from "@ones-design/core";
import { ComponentProps, ReactElement, ReactNode, useEffect } from "react";
import { useShareStepsContext } from "../context/steps";

export interface ShareStepProps {
    name: string,
    description: ReactNode,
    stepProps?: ComponentProps<typeof Steps.Step>,
    children: ReactElement
}

export function ShareStep(props: ShareStepProps) {

    const { registerStep, unRegisterStep } = useShareStepsContext()

    useEffect(() => {
        if (!(props.name)) return;
        const name = (props.name)!.toString();
        registerStep(name, props);
        return () => {
            unRegisterStep(name);
        };
    }, [])

    // only render if is active
    // if (props.name !== currentStep) {
    //     return null
    // }
    
    return props.children
}