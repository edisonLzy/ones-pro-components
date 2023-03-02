import data from './data'

function isPrimitive(value: any) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}
function isEmpty(value: any) {
    return value === '';
}

function validateRequiredFields(data: any, requiredFields: string[]) {

    let errorPath: string[] | null = null;

    const process = (data: any, currentKey: string = '',temp: string[] = []) => {
        //
        if (data === null || errorPath !== null) return;
        //
        if (isPrimitive(data)) {
            if (requiredFields.includes(currentKey) && isEmpty(data)) {
                errorPath = [...temp];
            }
            return 
        }
        //
        Object.keys(data).forEach((k) => {
            process(data[k],k,[...temp, k]);
        })
    }
    process(data);
    return errorPath;
}

console.log(validateRequiredFields(data,['ones_uuid']));

