import { Form } from '@ones-design/core'
import { EditTableProps } from './type'
import { useColumns } from './hooks/use-columns';
import VirtualTable from '@ones-design/table'
import './index.scss';

export * from './type'

export function ProTable<Data>({ columns, dataSource, form, ...restProps }: EditTableProps) {
    //
    const [internalForm] = Form.useForm(form);
    const finalColumns = useColumns(columns, dataSource as any[]);
    //
    return <Form
        form={internalForm}
        scrollToFirstError
    >
        <VirtualTable
            {...restProps}
            className='pro-table'
            // 无法获取 columnType
            columns={finalColumns as any[]}
            dataSource={dataSource}
        />
    </Form>
}