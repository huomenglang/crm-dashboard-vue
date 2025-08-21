import { message } from "ant-design-vue"

const handleError = (e: any) => {
    console.error(e)
    return message.error(e)
}

const handleSuccess = () => {
    return message.success('The record saved successful')
}

const handleDeletedSuccess = () => {
    return message.success('The record already deleted')
}
const handleCopySuccess = () => {
    return message.success('already copied.')
}

export {
    handleError as default,
    handleSuccess,
    handleDeletedSuccess,
    handleCopySuccess,
}
