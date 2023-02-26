import { Form, Input } from '@ones-design/core'
import { EditableCellProps } from "./type";

export function EditTableCell(props: EditableCellProps) {
    const { children, title, editable, index, dataIndex, record, field, ...restProps } = props;
    //
    let childEle = children;
    if (editable) {
        const namePath = [index, dataIndex as string];
        const value = record[dataIndex];
        const { formItemProps, control } = field;
        childEle = typeof control === 'function' ? control(namePath,index) : <Form.Item {...formItemProps} name={namePath} initialValue={value}>
            {control}
        </Form.Item>
    }
    return <td {...restProps}>
        {childEle}
    </td>
}