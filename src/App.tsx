import './App.css'
import { Button } from '@ones-design/core'
import EditableList, { EditableListRef } from './components/editable-list'

import { useRef } from 'react';
import { data } from './data';
import { Row } from './row';

const mergedData = Object.values(data.merge);

export type MergedData = typeof mergedData[number]


function App() {
  const listRef = useRef<EditableListRef>(null)
  //
  return (
    <div className="App">
      <div style={{ width: 1000, height: 300, border: '1px solid #ccc' }}>
        <EditableList<MergedData>
          ref={listRef}
          // 
          itemData={mergedData}
          itemSize={(index,data)=>{
              return data.length >= 2 ? 100 : 50
          }}
          itemCount={mergedData.length}
          rowComponent={Row}
          //
          getErrorFieldsInfo={values=>{
            return {
              index: 0,
              namePath: [0,'ones_email']
            }
          }}
           />
      </div>

      <Button onClick={async () => {
        const values = listRef.current?.validateFields()
        console.log(values);
      }}>校验</Button>
    </div>
  )
}

export default App
