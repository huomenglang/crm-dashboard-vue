export const setStorage = (key: string, value?: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (
    key: string,
    defaultValue?: string
): string | undefined | null => {
    return localStorage.getItem(key) ?? defaultValue
}

export const clearStorage = () => {
    return localStorage.clear()
}

export const stringToJson=(data?:string,defaultValue:any=undefined)=>{
        if(data){
            try{
                return JSON.parse(data);
            }catch(e:any){
                return defaultValue;
            }
        }
        return [];
}
