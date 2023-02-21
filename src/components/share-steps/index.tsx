import { cloneElement, ComponentProps, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cls from 'classnames'
import { ShareStepsStore } from './store'
import { shareStepsContext } from './context/steps'
import { ShareStepProps, ShareStep } from './step';
import { Steps } from '@ones-design/core';
import { useStep } from './hooks/use-step';
import { toArray } from '../utils'

import './index.scss'

export { ShareStep }
export * from './hooks'


const initialFormMap = new Map<string, ShareStepProps>();

export interface ShareStepsProps {
    current?: number;
    stepsProps?: Omit<ComponentProps<typeof Steps>, 'onChange'>;
}

export function ShareSteps(props: PropsWithChildren<ShareStepsProps>) {
    const { stepsProps, current = 0 } = props
    //
    const stepMapRef = useRef(initialFormMap);
    const [stepArray, setStepArray] = useState<string[]>([]);
    const [step, {
        preStep,
        nextStep
    }] = useStep({
        initialStep: current,
        totalSteps: stepArray.length
    });
    //
    const unRegisterStep = useCallback((name: string) => {
        stepMapRef.current.delete(name);
    }, [])
    const registerStep = useCallback((name: string, stepProp: ShareStepProps) => {
        stepMapRef.current.set(name, stepProp);
    }, [])
    //
    const currentStep = useMemo(() => {
        return stepArray[step]
    }, [step, stepArray])

    const provideValue = useMemo(() => {
        return {
            unRegisterStep,
            registerStep,
            preStep,
            nextStep,
            currentStep
        }
    }, [nextStep, preStep, currentStep])
    //
    useEffect(() => {
        setStepArray(Array.from(stepMapRef.current.keys()));
    }, []);
    //
    const stepsNode = useMemo(() => {
        return <div
            className={`steps-container`}
        >
            <Steps current={step} {...stepsProps}>
                {stepArray.map((name, index) => {
                    const stepFormProps = stepMapRef.current.get(name) as ShareStepProps;
                    return <Steps.Step key={index} title={stepFormProps.name} {...stepFormProps.stepProps} />
                })}
            </Steps>
        </div>
    }, [stepArray, step])
    //
    const descriptionNode = useMemo(() => {
        return <div className='description-container'>
            {stepArray.map((name, index) => {
                const stepFormProps = stepMapRef.current.get(name) as ShareStepProps;
                const isShow = step === index;
                return <div
                    key={name}
                    className={cls('description', {
                        'description-active': isShow
                    })}>
                    {stepFormProps.description}
                </div>
            })
            }
        </div>
    }, [stepArray, step])
    //
    const contentNode = useMemo(() => {
        return <div className="content-container">
            {toArray(props.children).map((child, index) => {
                const stepProps = child.props as ShareStepProps;
                const name = stepProps.name || `${index}`;
                //
                const isShow = step === index;
                return (
                    <div
                        key={name}
                        className={cls('step', {
                            'step-active': isShow,
                        })}
                    >
                        {cloneElement(child, {
                            ...stepProps,
                            name,
                            step: index,
                            key: name,
                        })}
                    </div>
                );
            })}
        </div>
    }, [stepArray, step])

    return <div className='share-steps'>
        <shareStepsContext.Provider value={provideValue}>
            {stepsNode}
            {descriptionNode}
            {contentNode}
        </shareStepsContext.Provider>
    </div>
}