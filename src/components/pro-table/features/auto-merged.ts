import { EditTableColumn } from "../type";

export function supportAutoMerge(column: EditTableColumn, dataSource: Record<string, unknown>[]) {
    //
    if (!column.autoMerge) {
        return column
    }
    //
    const { onCell: originCell, dataIndex } = column;
    //
    const dependency = typeof column.autoMerge === 'boolean' ? dataIndex : column.autoMerge.dependency;
    //
    const onCell = (row: Record<string, unknown>, index: number) => {
        const temp = originCell?.(row, index) ?? {};
        // 
        const rowIndex = dataSource.findIndex(d => d === row);
        const value = row[dependency];
        //
        let rowSpan = 1;
        let className= temp.className ?? '';

        if (rowIndex > 0 && value === dataSource[rowIndex - 1][dependency]) {
            rowSpan = 0
        } else {
            for (let i = rowIndex + 1; i < dataSource.length; i++) {
                if (dataSource[i][dependency] === value) {
                    rowSpan += 1;
                }
            }
            className += 'auto-merged-cell'
        }
        return {
            ...temp,
            rowSpan,
            className
        }
    }
    return {
        ...column,
        onCell: onCell
    }
}