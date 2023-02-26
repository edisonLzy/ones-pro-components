import { Table, FormInstance, Form } from '@ones-design/core'
import { ComponentProps, ComponentType, ReactNode } from 'react'


type RequireKeys<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & Omit<T, K>

type TableProps = RequireKeys<ComponentProps<typeof Table>, 'columns' | 'dataSource'>

type FormItemProps = ComponentProps<typeof Form.Item>

export type RawColumns = TableProps['columns'][number];

export type RenderFn = (namePath: (string | number)[], index: number) => ReactNode

export type EnhanceProps = {
  dataIndex: string,
  //
  autoMerge?: boolean
  //
  editable?: boolean
  field?: {
    formItemProps?: Omit<FormItemProps, 'name' | 'initialValue'>
    control: ReactNode | RenderFn
  },
}

export type EditTableColumn = RawColumns & EnhanceProps;

export interface EditableCellProps<RecordType extends Record<string, unknown> = any> extends EnhanceProps {
  title: React.ReactNode;
  children: React.ReactNode;
  index: number
  record: RecordType;
}

export interface EditTableProps extends TableProps {
  // form props
  form?: FormInstance
  // override table props
  columns: EditTableColumn[]
}