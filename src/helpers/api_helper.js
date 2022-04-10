import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

// pass new generated access token here
const token = accessToken

// apply base url for axios
const API_URL =
    process.env.REACT_APP_API_URL
    // || "http://localhost:8080/api"

const axiosApi = axios.create({
    baseURL: API_URL,
})
const fakeApi = axios.create({
    baseURL: "",
})
axiosApi.defaults.headers.common.authorization = token

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

export async function get(url, config = {}) {
    // eslint-disable-next-line no-return-await
    return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(
    url,
    data,
    config = {}
) {
    console.log("axios", data)
    return axiosApi.post(url, data, { ...config }).then(response => response.data)
}

export async function postMultipart(
    url,
    data,
    config = {}
) {
    console.log("axios", data)
    return axiosApi.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(response => response.data)
}

export async function fakePost(url, data, config = {}) {
    return fakeApi
        .post(url, { ...data }, { ...config })
        .then(response => response.data)
}

export async function put(url, data, config = {}) {
    return axiosApi
        .put(url, { ...data }, { ...config })
        .then(response => response.data)
}

export async function del(url, config = {}) {
    // eslint-disable-next-line no-return-await
    return await axiosApi
        .delete(url, { ...config })
        .then(response => response.data)
}
