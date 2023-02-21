import { Button, Form, Input } from "@ones-design/core";
import { useStepForm } from "./components/steps-form/hooks/use-step-form";
import StepsForm from './components/steps-form'

export function UserStepForm() {
    return <StepsForm.StepForm
        name='user'
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


