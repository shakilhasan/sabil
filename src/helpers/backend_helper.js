import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"
import {LOGIN, LOGOUT} from "./url_helper";

//Auth -----------------------------
export const login = user => post(url.LOGIN, user);
export const logout = user => post(url.LOGOUT, user);



// Users  -----------------------------------------------
//add User
export const addUser = user => post(url.ADD_USER, user)

// get Users
export const getUsers = user =>
    get(url.GET_USERS, { params: { ...user } })

// get getUsersByPagination
export const getUsersByPagination = user => 
    get(`${url.GET_USERS}/${user.page}/${user.pageSize}`, {params: { ...user },})

// get User
export const getUser = id =>
    get(`${url.GET_USER}/${id}`, { params: { id } })

// update User
export const updateUser = user =>
    put(`${url.UPDATE_USER}/${user._id}`, user)

// delete User
export const deleteUser = user =>
    del(`${url.DELETE_USER}/${user._id}`, { headers: { user } })


// Products  -----------------------------------------------------
//add Product
export const addProduct = product => post(url.ADD_PRODUCT, product)

// get Products
export const getProducts = product =>
    get(url.GET_PRODUCTS, { params: { ...product } })

// get getProductsByPagination
export const getProductsByPagination = product =>
    get(`${url.GET_PRODUCTS}/${product.page}/${product.pageSize}`, {params: { ...product },})

// get Product
export const getProduct = id =>
    get(`${url.GET_PRODUCT}/${id}`, { params: { id } })

// update Product
export const updateProduct = product =>
    put(`${url.UPDATE_PRODUCT}/${product._id}`, product)

// delete Product
export const deleteProduct = product =>
    del(`${url.DELETE_PRODUCT}/${product._id}`, { headers: { product } })
