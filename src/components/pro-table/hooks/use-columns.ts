import { EditTableColumn } from '../type';
import { useMemo } from 'react';
import { supportAutoMerge } from '../features/auto-merged';
import { supportEditable } from '../features/editable';

export function useColumns(columns: EditTableColumn[], dataSource: Record<string, unknown>[]) {
    return useMemo(() => {
        return columns.map((column) => {
            return supportAutoMerge(column, dataSource)
        }).map(column=>{
            return supportEditable(column as EditTableColumn, dataSource)
        })
    }, [columns])
}