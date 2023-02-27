import { EditTableColumn } from "../type";

export function supportAutoMerge(column: EditTableColumn, dataSource: Record<string, unknown>[]) {
    //
    if (!column.autoMerge) {
        return column
    }
    //
    const { getCellProps: originGetCellProps, code } = column;
    //
    const dependency = typeof column.autoMerge === 'boolean' ? code : column.autoMerge.dependency;
    //
    const getCellProps = (_: unknown ,row: Record<string, unknown>, index: number) => {
        const temp = originGetCellProps?.(_, row, index) ?? {};
        // 
        const rowIndex = dataSource.findIndex(d => d === row);
        const value = row[dependency];
        //
        let rowSpan = 1;
        let className= temp.className ?? '';
        //
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
        getCellProps: getCellProps
    }
}