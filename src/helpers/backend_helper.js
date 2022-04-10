import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

//  .............................. AUTH ....................................
//  user login
export const userLogin = user => post(url.USER_LOGIN, user, { params: { ...user } });

//  .............................. USER ....................................
// add user
export const addUser = user => post(url.ADD_USER, user)
// get Users
export const getUsers = user => get(url.GET_USERS, { params: { ...user } })
// get getUserByPagination
export const getUserByPagination = user =>
    get(`${url.GET_USER}/${user.page}/${user.pageSize}`, {
        params: { ...user },
    })
// get User
export const getUser = id => get(`${url.GET_USER}/${id}`, { params: { id } })
// update User
export const updateUser = user =>
    put(`${url.UPDATE_USER}`, user)
// delete User
export const deleteUser = user =>
    del(`${url.DELETE_USER}/${user._id}`, { headers: { user } })




//  .............................. PRODUCT ....................................
// get products
export const getProductAll = product => get(url.GET_PRODUCTS, { params: { ...product } })
// get product
export const getProductById = id => get(`${url.GET_PRODUCT}`, { params: { id } })
