import { Steps, FormInstance, Button } from '@ones-design/core';
import { Children, cloneElement, ComponentProps, isValidElement, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames'
import { toArray } from '../utils';
import { stepsFormContext } from './context';
import { StepForm, StepFormProps } from './step-form';
import './index.scss'
import { useStep } from './hooks/use-step';

interface SubmitterRenderProps {
    form: FormInstance<any>
    onSubmit: () => void
    step: number
    preStep: () => void
}

interface SubmitterRender {
    (props: SubmitterRenderProps, actions: [next: ReactElement]): React.ReactNode
    (props: SubmitterRenderProps, actions: [pre: ReactElement]): React.ReactNode
    (props: SubmitterRenderProps, actions: [pre: ReactElement, next: ReactElement]): React.ReactNode
}

interface StepsFormProps<Values = any> {
    current?: number;
    onCurrentChange?: (current: number) => void;
    onFinish?: (values: Values) => void;
    stepsProps?: Omit<ComponentProps<typeof Steps>, 'onChange'>;
    submitter?: false | {
        render?: SubmitterRender | false
    };
}

const initialFormMap = new Map<string, StepFormProps>;
const initialFormDataMap = new Map<string, Record<string, any>>
const initialFormInstance: FormInstance[] = []

function StepsForm(props: PropsWithChildren<StepsFormProps>) {
    //
    const { current = 0, onCurrentChange, stepsProps, submitter } = props;
    //
    const formMapRef = useRef(initialFormMap);
    const formDataRef = useRef(initialFormDataMap);
    const formInstancesRef = useRef(initialFormInstance);
    const [formArray, setFormArray] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [step, {
        preStep,
        nextStep
    }] = useStep({
        step: current,
        onStepChange: onCurrentChange,
        totalSteps: formArray.length
    });
    //
    const unRegisterForm = useCallback((name: string) => {
        formMapRef.current.delete(name);
        formDataRef.current.delete(name);
    }, [])
    const registerForm = useCallback((name: string, stepFormProp: StepFormProps) => {
        formMapRef.current.set(name, stepFormProp);
    }, [])
    const onFormFinished = useCallback((name: string, values: Record<string, any>) => {
        formDataRef.current.set(name, values);
        console.log('values', values);
    }, [step])
    const onSubmit = useCallback(() => {
        const formInstance = formInstancesRef.current[step];
        formInstance?.submit()
    }, [step])
    //
    const provideValue = useMemo(() => {
        return {
            currentStep: step,
            unRegisterForm,
            registerForm,
            formInstancesRef,
            onFormFinished,
            nextStep,
            preStep,
            loading,
            setLoading,
            formMapRef
        }
    }, [step, loading, nextStep])

    //
    useEffect(() => {
        setFormArray(Array.from(formMapRef.current.keys()));
    }, [Array.from(formMapRef.current.keys()).join(',')])
    //
    const stepsNode = (
        <div
            className={`steps-container`}
        >
            <Steps current={step} {...stepsProps}>
                {formArray.map(name => {
                    const stepFormProps = formMapRef.current.get(name) as StepFormProps;
                    return <Steps.Step key={name} title={stepFormProps.title} {...stepFormProps.stepProps} />
                })}
            </Steps>
        </div>
    );

    const descriptionNode = <div className='description-container'>
        {formArray.map((name, index) => {
            const stepFormProps = formMapRef.current.get(name) as StepFormProps;
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

    const childrenNode = toArray(props.children)

    const pre = <Button onClick={preStep}>
        上一步
    </Button>
    const next = <Button type='primary' onClick={() => {
        onSubmit()
    }}>
        下一步
    </Button>

    const submitterNode = useMemo(() => {
        let buttons: ReactElement[] = [];
        const index = step || 0;
        if (index < 1) {
            buttons.push(next);
        } else if (index + 1 === formArray.length) {
            buttons.push(pre);
        } else {
            buttons.push(pre, next);
        }
        buttons = buttons.filter(isValidElement);
        if (submitter && submitter.render) {
            const submitterProps: any = {
                form: formInstancesRef.current[step],
                onSubmit,
                step,
                preStep
            };

            return submitter.render(submitterProps, buttons as any) as React.ReactNode;
        }
        if (submitter && submitter?.render === false) {
            return null;
        }
        return <div className='submitter-container'>
            {buttons}
        </div>;
    }, [formArray.length, next, onSubmit, pre, preStep, step, submitter]);

    return <div className='steps-form'>
        <stepsFormContext.Provider value={provideValue}>
            {stepsNode}
            {descriptionNode}
            {childrenNode}
            {submitterNode}
        </stepsFormContext.Provider>
    </div>
}

export default Object.assign(StepsForm, {
    StepForm: StepForm
})
