import { Form, FormProps, Steps } from '@ones-design/core'
import { cloneElement, ComponentProps, PropsWithChildren, ReactElement, useEffect } from 'react'
import { useStepsFormContext } from '../context'

export interface StepFormProps<T = any> extends Omit<FormProps<T>, 'onFinish'> {
    name: string
    step?: number,
    description?: string,
    stepProps?: ComponentProps<typeof Steps.Step>,
    onFinish?: (values: T) => Promise<boolean>
}

export function StepForm<Values = any>(props: StepFormProps<Values>) {
    //
    const { name, form, step, onFinish, ...restFormProps } = props;
    const context = useStepsFormContext();
    //
    const [internalForm] = Form.useForm(form);
    // 
    useEffect(() => {
        if (!(props.name || props.step)) return;
        const name = (props.name || props.step)!.toString();
        context?.registerForm(name, props);
        return () => {
            context?.unRegisterForm(name);
        };
    }, [])
    useEffect(() => {
        context.formInstancesRef.current[step || 0] = internalForm
    }, [internalForm])
    //
    return <Form
        form={internalForm}
        onFinish={async values => {
            //
            context.onFormFinished(name, values)
            //
            if (onFinish) {
                context.setLoading(true);
                const success = await onFinish(values)
                if (success) {
                    context?.nextStep();
                }
                context?.setLoading(false);
                return;
            }
            //
            context.nextStep()
        }}
        {...restFormProps}
    >
    </Form>
}