
export const dataSource = [
    {
        id: '123',
        name: 'Edward King 0',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '13',
        name: 'Edward King 2',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '132',
        name: 'Edward King 2',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '133',
        name: 'Edward King 2',
        age: '32',
        operation: 'update',
        city: 'sichuan'
    },
    {
        id: '456',
        name: 'Edward King 3',
        age: '33',
        operation: 'view',
        city: 'beijing'
    }
]

// export function getDataSource(len: number) {
//     const arr = new Array(len);
    
//     const temp = {
//         name: 'Edward King 3',
//         age: '33',
//         operation: 'view',
//         city: 'beijing'
//     }

//     const tempArr = arr.fill(0).map((r,idx) => {
//         return {
//             ...temp,
//             id: Math.random().toString(36).slice(2)
//         }
//     })
//     return dataSource.concat(tempArr)
// }

export function getDataSource(max: number) {
    let temp = [
        { prov: '湖北省', confirmed: 54406, cured: 4793, dead: 1457, t: '2020-02-15 19:52:02' },
        { prov: '广东省', confirmed: 1294, cured: 409, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '河南省', confirmed: 1212, cured: 390, dead: 13, t: '2020-02-15 19:52:02' },
        { prov: '浙江省', confirmed: 1162, cured: 428, dead: 0, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
      ]
      for (let i = 0; i < max; i++) {
        temp = [...temp,...temp]
      }
      return temp
}