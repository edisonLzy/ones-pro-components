import { Table, Form, Input, Button } from '@ones-design/core'
import { useState } from 'react'

function Gap(){
    return <div style={{
        height: '500px'
    }}></div>
}
export function EditTable() {
    const [visible, setVisible] = useState(true)
    const [form] = Form.useForm()
    return <>
        <Form
            form={form}
            scrollToFirstError={{
                behavior: 'smooth'
            }}
            onFinish={v => {
                const values = form.getFieldsValue(true);
                if(!values['user']){
                    setVisible(true)
                    queueMicrotask(()=>{
                        form.scrollToField(['user'],{
                            behavior: 'smooth'
                        })
                        form.validateFields(['user'])
                    })
                }
            }}>

            {visible && <Form.Item
                label='用户名'
                name={'user'} rules={[{
                    required: true
                }]}>
                <Input placeholder='请输入' />
            </Form.Item>}

            <Gap/>

            <Form.Item
                label='邮箱'
                name={'email'} rules={[{
                    required: true
                }]}>
                <Input placeholder='请输入' />
            </Form.Item>

            <Form.Item>
                <Button htmlType='submit'>提交</Button>
            </Form.Item>
        </Form>

        <Button onClick={() => {
            setVisible(v => !v)
        }}>toggle</Button>
    </>
}