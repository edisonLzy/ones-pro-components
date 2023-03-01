import { Form, Input, Button } from '@ones-design/core';
import { useEffect } from 'react';
import { FormSyncItem } from './components/form-sync-item';

const data = [
    {
        user: '',
    },
    {
        user: '',
    }
]
export function ConnectConfluence() {
    const [ form ] = Form.useForm()
    //
    return <Form
        name="basic"
        form={form}
        initialValues={data}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
    >
        <FormSyncItem
            name={[0, 'user']}
            syncFields={[1, 'user']}
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </FormSyncItem>

        {/* <Form.Item 
        hidden
        shouldUpdate={(pre,next)=> pre.username !== next.username}>
            {(form)=>{
                const v = form.getFieldValue(['username'])
                form.setFields([{
                   name: ['password'],
                   value:  v
                }])
                return null
            }}
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={() => {
                console.log(form.getFieldsValue());

            }}>
                Submit
            </Button>
        </Form.Item>
    </Form>
}