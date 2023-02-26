import './App.css'
import { Button, Form, Input } from '@ones-design/core'
import { EditTable } from './components/edit-table'
import { EditTableColumn } from './components/edit-table/type';

function EInput() {
  console.log('render');
  return <Input></Input>
}

const columns: EditTableColumn[] = [{
  title: 'name',
  dataIndex: 'name',
  width: 200,
  editable: true,
  field: {
    control: <Input />,
    formItemProps: {
      rules: [{
        required: true
      }]
    }
  },
},
{
  title: 'age',
  dataIndex: 'age',
  width: 200,
  editable: true,
  field: {
    control: (namePath) => {
      return <Form.Item shouldUpdate>
        {(form) => {
          return <Form.Item name={namePath}>
            <Input />
          </Form.Item>
        }}
      </Form.Item>
    },
  },
},
{
  title: 'address',
  dataIndex: 'address',
  width: 200,
},
{
  title: 'merged',
  dataIndex: 'city',
  width: 200,
  autoMerge: true
}
];

const dataSource = [
  {
    id: '123',
    key: '0',
    name: 'Edward King 0',
    age: '32',
    address: 'London, Park Lane no. 0',
    city: 'sichuan'
  },
  {
    id: '13',
    key: '0',
    name: 'Edward King 2',
    age: '32',
    address: 'London, Park Lane no. 0',
    city: 'sichuan'
  },
  {
    id: '456',
    key: '2',
    name: 'Edward King 3',
    age: '32',
    address: 'London, Park Lane no. 1',
    city: 'beijing'
  }]

function App() {

  const [form] = Form.useForm()

  return (
    <div className="App">
      <EditTable
        form={form}
        dataSource={dataSource as any[]}
        columns={columns}
        rowKey='id'
      />
      <Button onClick={async () => {
        const values = form.validateFields()
        console.log(values);
      }}>校验</Button>
    </div>
  )
}

export default App
