export function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        try {
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        } catch (e) {
            console.error(e)
        }
    })
}
