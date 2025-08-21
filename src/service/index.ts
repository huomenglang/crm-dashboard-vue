import FileService from './file'

class FileUpload {
    public static instance: FileUpload
    public static getInstance(): FileUpload {
        if (!this.instance) {
            this.instance = new FileUpload()
        }
        return this.instance
    }

    public file = () => {
        return new FileService()
    }
}

const FileSdk = FileUpload.getInstance().file()
export { FileSdk }