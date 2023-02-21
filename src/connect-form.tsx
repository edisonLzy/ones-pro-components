import { Form, Input } from '@ones-design/core';
import StepsForm from './components/steps-form'

export function ConnectStepForm() {
    return <StepsForm.StepForm
        name='connect'
        description='你好'
        onFinish={async values => {
            console.log(values);
            return true
        }}
    >
        <Form.Item label="username" name={'username'} rules={[{
            required: true
        }]}>
            <Input placeholder='第一个input' />
        </Form.Item>
    </StepsForm.StepForm>
}