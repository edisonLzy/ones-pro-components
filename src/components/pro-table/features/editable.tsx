import { Form } from '@ones-design/core'
import { EditTableColumn } from "../type";

export function supportEditable(column: EditTableColumn, dataSource: Record<string, unknown>[]){
    if(!column.editable){
      return column
    }
    //
    const { field, dataIndex} = column;  
    const { control ,formItemProps = {}} = field ?? {}
    //
    const render = (value: unknown, row: Record<string, unknown>)=>{
        const rowIndex = dataSource.findIndex(d=>d === row);
        const namePath = [rowIndex, dataIndex];
        const finalControl = typeof control === 'function' ? control(namePath, rowIndex) : control;
        return <Form.Item {...formItemProps} name={namePath} initialValue={value}>
            {finalControl}
        </Form.Item>
    }
    //
    return {
        ...column,
        render
    }
}