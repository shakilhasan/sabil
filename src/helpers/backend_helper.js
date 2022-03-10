import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"


// Products  ............................
//add Product
export const addProduct = product => post(url.ADD_PRODUCT, product)

// get Products
export const getProducts = product =>
    get(url.GET_PRODUCTS, { params: { ...product } })

// get getProductsByPagination
export const getProductsByPagination = product =>
    get(`${url.GET_PRODUCTS}/${product.page}/${product.pageSize}`, {
        params: { ...product },
    })

// get Product
export const getProduct = id =>
    get(`${url.GET_PRODUCT}/${id}`, { params: { id } })

// update Product
export const updateProduct = product =>
    put(`${url.UPDATE_PRODUCT}/${product._id}`, product)

// delete Product
export const deleteProduct = product =>
    del(`${url.DELETE_PRODUCT}/${product._id}`, { headers: { product } })
