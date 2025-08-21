import {getAxiosConfig} from "@/utils"

const url = '/uploads/'
export const url_ = '/api/v1/files'
class FileService {
    async uploadFile(
        data: FormData,
        source?: string,
        warehouse?:number
    ) {
      
        const res = await getAxiosConfig().post(
            `${url}file?source=${source}&warehouse=${warehouse}`,
            data
        )
        return res.data
    }

   
}

export default FileService
