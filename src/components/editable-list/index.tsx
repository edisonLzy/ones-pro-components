import { ComponentType, forwardRef, useImperativeHandle, useRef, ForwardRefRenderFunction, useEffect } from 'react';
import { Form } from '@ones-design/core'
import { ListChildComponentProps, VariableSizeList, VariableSizeListProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer';


interface ErrorFieldInfo {
    index: number
    namePath: (string|number)[]
}

export type RowComponentProps<Data> = Omit<ListChildComponentProps<any>, 'data'> & {
    data: Data
}

export interface EditableListProps<Data = any> extends Omit<VariableSizeListProps, 'width' | 'height' | 'children' | 'itemSize'> {
    rowComponent: ComponentType<RowComponentProps<Data>>
    itemSize: (index: number, data: Data[]) => number
    getErrorFieldsInfo: (data: Data[]) => ErrorFieldInfo
}

export interface EditableListRef {
    validateFields: () => Promise<any>
}

const InternalEditableList: ForwardRefRenderFunction<EditableListRef, EditableListProps> = (props, ref) => {
    //
    const { rowComponent: Component, itemSize, itemData, getErrorFieldsInfo, ...restProps } = props
    //
    const virtualListRef = useRef<VariableSizeList<any[]>>(null);
    // 
    const [internalForm] = Form.useForm();
    //
    useImperativeHandle(ref, () => {
        return {
            validateFields: async () => {
                const values = internalForm.getFieldsValue(true)
                const { index, namePath } = getErrorFieldsInfo(values);
                virtualListRef.current?.scrollToItem(index);
                //
                queueMicrotask(() => {
                    internalForm.validateFields(namePath)
                })
            },
        }
    }, [])
    //
    useEffect(()=>{
        // init form values
        internalForm.setFieldsValue(itemData)
    },[internalForm, itemData])
    //
    return <Form form={internalForm} component={false}>
        <AutoSizer>
            {({ height, width }) => {
                return <VariableSizeList
                    ref={virtualListRef}
                    width={width}
                    height={height}
                    itemSize={index => {
                        return itemSize(index, itemData[index])
                    }}
                    {...restProps}
                >
                    {({ index, isScrolling, style }) => {
                        return <Component
                            index={index}
                            isScrolling={isScrolling}
                            style={style}
                            data={itemData[index]}
                        />
                    }}
                </VariableSizeList>
            }}
        </AutoSizer>
    </Form>
}

const EditableList = forwardRef<EditableListRef, EditableListProps>(InternalEditableList) as <Values = any>(
    props: React.PropsWithChildren<EditableListProps<Values>> & { ref?: React.Ref<EditableListRef> },
) => React.ReactElement;

export default EditableList
