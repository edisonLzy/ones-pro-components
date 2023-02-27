
export const dataSource = [
    {
        id: '123',
        key: '0',
        name: 'Edward King 0',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '13',
        key: '0',
        name: 'Edward King 2',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '132',
        key: '0',
        name: 'Edward King 2',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '133',
        key: '0',
        name: 'Edward King 2',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '456',
        key: '2',
        name: 'Edward King 3',
        age: '33',
        operation: 'view',
        city: 'beijing'
    }
]

export function getDataSource(len: number) {
    const arr = new Array(len);
    
    const temp = {
        id: '456',
        key: '2',
        name: 'Edward King 3',
        age: '33',
        operation: 'view',
        city: 'beijing'
    }

    const tempArr = arr.fill(0).map(r => {
        return {
            ...temp,
            id: Math.random().toString(36).slice(2)
        }
    })
    dataSource.concat(tempArr)
    return dataSource.concat(tempArr)
}