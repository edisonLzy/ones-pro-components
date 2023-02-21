import { useEffect, useState } from 'react'
import StepsForm from './components/steps-form'
import './App.css'
import { ConfigureUser } from './user-form'
import { ConnectConfluence } from './connect-form'
import { ShareSteps, ShareStep, useStepActions, useStepData } from './components/share-steps'
import { Button, Space } from '@ones-design/core'

function App() {

  return (
    <div className="App">
      <ShareSteps stepsProps={{
        labelPlacement: 'vertical'
      }}>
        <ShareStep name='first' description='a'>
          <ConnectConfluence/>
        </ShareStep>
        <ShareStep name='second' description='b'>
          <ConfigureUser/>
        </ShareStep>
      </ShareSteps>
    </div>
  )
}

export default App
