import dayjs from 'dayjs'

export const dateFormat = (date: number | null | undefined) => {
    if (!date) {
        return undefined
    }
    const result = new Date(date).toLocaleString()
    return result
}

export const momentToTimestamp = (date: any) => {
    if (!date) {
        return undefined
    }
    return date && date.toDate().getTime().toString()
}
export const momentConverter = (date: number | null | undefined) => {
    if (!date) {
        return undefined
    }
    return dayjs(date)
}
export const getTimeStampInMillie = (val: any) => {
    if (val) {
        const dateToParse = typeof val === 'string' ? Date.parse(val) : val._i
        return dayjs(dateToParse).valueOf()
    }
    return null
}


export const formatDate = (date: any) => {
    let d = new Date(date)
    let month = (d.getMonth() + 1).toString().padStart(2, '0')
    let day = d.getDate().toString().padStart(2, '0')
    let year = d.getFullYear()
    return [day, month, year].join('/')
}


export const DateTimeFormatOption = {
    DEFAULT: 'DD/MM/YYYY hh:mm a',
    DEFAULT24: 'DD/MM/YYYY HH:mm',
    DATE: 'DD/MM/YYYY',
    MMM: 'DD MMM YYYY',
    DATE_COMMA: 'DD MMM, YYYY',
    HIRING_JOB: 'MMM DD, YYYY',
    JOB_CARD: 'DD MMM YYYY',
    WALLET: 'MMM D, YYYY | HH:mm',
    DATE_OF_BIRTH: 'DD - MM - YYYY',
    H12: 'hh:mm a',
    TIMESTAMP: 'X',
} as const;

export type DateTimeFormatOption =
    typeof DateTimeFormatOption[keyof typeof DateTimeFormatOption];
