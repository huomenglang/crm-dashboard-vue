
import  {TOKEN_KEY}  from "../constant/index"
import {AppConfig} from "../configs/index"
import axios, { type AxiosRequestConfig } from "axios"


const getAxiosConfig = (override?: AxiosRequestConfig) => {
    let obj = {
        baseURL: AppConfig.SERVER_URL,
        timeout: 10000,
        ...override,
    }

    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        obj = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            ...obj,
        }
    }

    return axios.create(obj)
}
export {getAxiosConfig}