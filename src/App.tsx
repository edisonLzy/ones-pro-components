import { useEffect, useState } from 'react'
import StepsForm from './components/steps-form'
import './App.css'
import { UserStepForm } from './user-form'
import { ConnectStepForm } from './connect-form'
import { ShareSteps, ShareStep, useStepActions, useStepData, useStoreActions } from './components/share-steps'
import { Button, Space } from '@ones-design/core'

function ShareStepActions(props: any) {
  const { preStep, nextStep } = useStepActions()
  const { savaData } = useStoreActions()
  const data = useStepData()

  return (
    <Space>
      {props.children}
      <Button onClick={preStep}>上一步</Button>
      <Button onClick={nextStep}>下一步</Button>
    </Space>
  )
}

function App() {
  const [step, setStep] = useState(0);

  return (
    <div className="App">
      <ShareSteps stepsProps={{
        labelPlacement: 'vertical'
      }}>
        <ShareStep name='first' description='a'>
          <ShareStepActions>1</ShareStepActions>
        </ShareStep>
        <ShareStep name='second' description='b'>
          <ShareStepActions>2</ShareStepActions>
        </ShareStep>
        <ShareStep name='third' description='c'>
          <ShareStepActions>3</ShareStepActions>
        </ShareStep>
      </ShareSteps>
    </div>
  )
}

export default App
