import { Form, Table } from '@ones-design/core'
import { useEffect } from 'react'
import { EditTableProps } from './type'
import { useVirtualList } from 'ahooks'
import './index.scss';
import { useColumns } from './hooks/use-columns';

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
        <Table
            {...restProps}
            className='pro-table'
            scroll={{ y: 500 }}
            // 无法获取 columnType
            columns={finalColumns as any[]}
            dataSource={dataSource}
        />
    </Form>
}