import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"

const service: AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 60000
})

service.interceptors.request.use(
    (req: AxiosRequestConfig): AxiosRequestConfig => {
        return req
    },
    (error: any): any => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (res: AxiosResponse): any => {
        if(res.status === 200) {
            return res.data
        }
        return Promise.reject(res)
    },
    (error: any): any => {
        return Promise.reject(error)
    }
)

export default service