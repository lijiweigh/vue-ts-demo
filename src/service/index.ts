import axios from "../utils/axios"

export function getSeller(params: object, config: object) {
    return axios.get("/seller", {
        params,
        ...config
    })
}

export function getGoods(params: object, config: object) {
    return axios.get("/goods", {
        params,
        ...config
    })
}

export function getRatings(params: object, config: object) {
    return axios.get("/ratings", {
        params,
        ...config
    })
}