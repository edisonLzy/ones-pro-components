<<<<<<< Updated upstream
import { Form } from '@ones-design/core'
import { EditTableProps } from './type'
import { useColumns } from './hooks/use-columns';
import VirtualTable from '@ones-design/table'
import './index.scss';
=======
import { Form, Loading, Table } from '@ones-design/core'
import cls from 'classnames'
import { EditTableProps } from './type'
import './index.scss';
import { useColumns } from './hooks/use-columns';
import { PropsWithChildren } from 'react';
>>>>>>> Stashed changes

export * from './type'


interface LoadingWrapperProps {
    className: string
}

function LoadingWrapper(props: PropsWithChildren<LoadingWrapperProps>) {
    return <Loading loading={true}>
        <table className={cls(props.className, 'test')}>
            {props.children}
        </table>
    </Loading>
}

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
            loading={false}
            components={{
                table: LoadingWrapper
            }}
        />
    </Form>
    
}