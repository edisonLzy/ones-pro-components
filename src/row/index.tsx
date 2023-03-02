import { Form, Input, Radio } from '@ones-design/core';

import { MergedData } from "../App";
import { RowComponentProps } from "../components/editable-list";


export function Row(props: RowComponentProps<MergedData>) {
  const { style, index } = props;
  return <div style={style}>
    <div>
      <Radio>合并</Radio>
      <Radio>不合并</Radio>
    </div>
    <div>
      <Form.Item 
      initialValue={''}
      name={[index,0, 'jira_id']} rules={[
        {
          required: true,
        }
      ]}>
        <Input />
      </Form.Item>
    </div>
  </div>
}
