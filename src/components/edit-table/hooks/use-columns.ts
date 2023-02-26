import { EditTableColumn } from './../type';
import { useMemo } from 'react';

// https://pandolia.net/2019/03-31-antd-table-with-auto-merge-above.html
function supportAutoMerge(column: EditTableColumn, dataSource: Record<string, unknown>[]) {
    //
    if (!column.autoMerge) {
        return column
    }
    //
    const { render: originRender, dataIndex } = column;

    const render = (value: unknown, row: Record<string, unknown>) => {
        const rowIndex = dataSource.findIndex(d => d === row);
        if (rowIndex > 0 && value === dataSource[rowIndex - 1][dataIndex]) {
            // 自动合并到上一行中
            return {
                rowSpan: 0,
                children: null
            }
        } else {
            const children = originRender?.(value, row, rowIndex) ?? value;
            let rowSpan = 1;
            for (let i = rowIndex + 1; i < dataSource.length; i++) {
                if (dataSource[i][dataIndex] === value) {
                    rowSpan += 1;
                }
            }
            return {
                rowSpan: rowSpan,
                children: children
            }
        }
    }

    return {
        ...column,
        render: render
    }
}

export function useColumns(columns: EditTableColumn[], dataSource: Record<string, unknown>[]) {
    return useMemo(() => {
        return columns.map((column) => {
            return supportAutoMerge(column, dataSource)
        })
    }, [columns])
}