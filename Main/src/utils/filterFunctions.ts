export function filterByBoolean(value1:boolean,filterValue?:boolean):boolean{
    if(filterValue === undefined){return true}
    return (value1 == filterValue);
}

export function filterByString(value1?:string,filterValue?:string):boolean{
    if(filterValue === undefined){return true}
    return (value1 == filterValue);
}

export function filterByLessThan(value1:number,filterValue?:number):boolean{
    if(filterValue === undefined){return true}
    return !(value1 < filterValue);
}

export function filterByGreaterThan(value1:number,filterValue?:number):boolean{
    if(filterValue === undefined){return true}
    return !(value1 > filterValue);
}

export function filterByEqualNumber(value1:number,filterValue?:number):boolean{
    if(filterValue === undefined){return true}
    return !(value1 == filterValue);
}

export function filterByDifferentNumber(value1:number,filterValue?:number):boolean{
    if(filterValue === undefined){return true}
    return (value1 == filterValue);
}
