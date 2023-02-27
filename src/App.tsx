import './App.css'
import { Button, Form, Input, Select } from '@ones-design/core'
import { ProTable } from './components/pro-table'
import { EditTableColumn } from './components/pro-table/type';
import { getDataSource } from './data';


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
    control: <Input />,
  },
},
{
  title: '操作',
  dataIndex: 'operation',
  width: 200,
  editable: true,
  field: {
    control: <Select
      dropdownStyle={{
        zIndex: 999
      }}
      options={
        [
          {
            label: '更新',
            value: 'update'
          },
          {
            label: '查看',
            value: 'view'
          },
        ]
      } />
  },
  // autoMerge: {
  //   dependency: 'age'
  // }
},
{
  title: 'city',
  dataIndex: 'city',
  width: 200,
  // autoMerge: {
  //   dependency: 'age'
  // },
  editable: true,
  field: {
    control: (namePath, parentPath) => {
      return <Form.Item shouldUpdate={(pre: any, next: any) => {
        return pre[parentPath].operation !== next[parentPath].operation
      }}>
        {(form) => {
          const operation = form.getFieldValue([parentPath, 'operation']);
          const value = form.getFieldValue(namePath)
          if (operation === 'view') {
            return <span>{value}</span>
          }
          return <Form.Item name={namePath}>
            <Input placeholder='请编辑' />
          </Form.Item>
        }}
      </Form.Item>
    }
  }
},
];


function App() {
  const [form] = Form.useForm()
  
  return (
    <div className="App">
      <ProTable
        form={form}
        dataSource={getDataSource(100) as any[]}
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
