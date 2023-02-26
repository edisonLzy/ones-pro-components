import { Form, Table } from '@ones-design/core'
import { useEffect, useMemo } from 'react'
import { EditTableCell } from './Cell';
import { EditTableProps } from './type'
import './index.scss';
import { useColumns } from './hooks/use-columns';

export * from './type'

export function EditTable<Data>({ columns, dataSource, form, ...restProps }: EditTableProps) {
    //
    const [internalForm] = Form.useForm(form);
    const finalColumns = useColumns(columns,dataSource as any[])
    //
    // const mergedColumns = useMemo(() => {
    //     return columns.map(column => {
    //         if ('editable' in column) {
    //             return {
    //                 ...column,
    //                 onCell: (record: Data, index: number) => {
    //                     return {
    //                         record,
    //                         editable: column.editable,
    //                         dataIndex: column.dataIndex,
    //                         title: column.title,
    //                         field: column.field,
    //                         index
    //                     }
    //                 }
    //             }
    //         }
    //         return column
    //     })
    // }, [finalColumns])
    //
    useEffect(() => {
        // set dataSource into form
        // console.log(form?.getFieldsValue());
    }, [dataSource])

    console.log(finalColumns);
    
    return <Form
        form={internalForm}
        scrollToFirstError
    >
        <Table
            {...restProps}
            className='editable-table'
            // 无法获取 columnType
            columns={finalColumns as any[]}
            dataSource={dataSource}
            components={{
                body: {
                    cell: EditTableCell,
                }
            }}
        />
    </Form>
}