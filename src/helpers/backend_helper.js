import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

//  .............................. AUTH ....................................
//  user login
export const userLogin = user => post(url.USER_LOGIN, user, { params: { ...user } });
export const userSignup = user => post(url.USER_SIGNUP, user);   // todo remove later by /register


//  .............................. USER ....................................
// add user
export const addUser = user => post(url.ADD_USER, user)
// get Users
// export const getUsers = user => get(url.GET_USERS, { params: { ...user } }) // todo - uncomment when backend is ready
// get getUserByPagination
// export const getUserByPagination = user =>  // todo - uncomment when backend is ready
//     get(`${url.GET_USER}/${user.page}/${user.pageSize}`, {
//         params: { ...user },
//     })
// get User
export const getUser = user => get(`${url.GET_USER}`, { params: { ...user } })
export const getUserAccount = user => get(`${url.ACCOUNT_USER}`, { params: { ...user } })
// update User
export const updateUser = user =>
    put(`${url.UPDATE_USER}`, user)
// delete User
export const deleteUser = user =>
    del(`${url.DELETE_USER}`, { params: { ...user } })




//  .............................. PRODUCT ....................................
// get products
export const getProductAll = product => get(url.GET_PRODUCTS, { params: { ...product } })
// get product
export const getProductById = id => get(`${url.GET_PRODUCT}`, { params: { id } })
