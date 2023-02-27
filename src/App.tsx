import './App.css'
import { Button, Form, Input, Select } from '@ones-design/core'
import { ProTable } from './components/pro-table'
import VirtualTable from '@ones-design/table'
import { EditTableColumn } from './components/pro-table/type';
import { getDataSource } from './data';


const columns: EditTableColumn[] = [
  {
  title: 'name',
  code: 'name',
  name: 'name',
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
  code: 'age',
  name: 'age',
  width: 200,
  editable: true,
  field: {
    control: <Input />,
  },
},
{
  title: '操作',
  code: 'operation',
  name: 'operation',
  width: 200,
  editable: true,
  autoMerge: {
    dependency: 'age'
  },
  field: {
    control: <Select
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
},
{
  title: 'city',
  code: 'city',
  width: 200,
  name: "city",
  autoMerge: {
    dependency: 'age'
  },
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


const dataSource = getDataSource(1000);

function App() {
  //
  const [form] = Form.useForm()
  //
  return (
    <div className="App">
      <ProTable
        form={form}
        bordered={false}
        dataSource={dataSource}
        columns={columns}
        rowKey='id'
        height={300}
      />
      <Button onClick={async () => {
        const values = form.validateFields()
        console.log(values);
      }}>校验</Button>
    </div>
  )
}

export default App
