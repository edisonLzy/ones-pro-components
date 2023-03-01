import { Form } from '@ones-design/core'
import { useLayoutEffect } from 'react';
import { ComponentProps } from 'react';

const { Item } = Form

export type NamePath = string | number | (string | number)[];

export interface FormSyncItemProps extends Omit<ComponentProps<typeof Item>, 'name'> {
    syncFields: NamePath
    name: NamePath
}

export function FormSyncItem(props: FormSyncItemProps) {
    //
    const { name, syncFields, ...restProps } = props
    //
    const form = Form.useFormInstance()
    const newValue = Form.useWatch(name, form)
    //
    useLayoutEffect(() => {
        const namePath = Array.isArray(syncFields) ? syncFields : [syncFields];
        form.setFields([{
            name: namePath,
            value: newValue
        }])
    }, [newValue, syncFields])
    //
    return <>
        <Form.Item
            name={name}
            {...restProps} />
        {/* just for sync data */}
        <Form.Item
            {...restProps}
            noStyle
            hidden
            name={syncFields}
            />
    </>
}