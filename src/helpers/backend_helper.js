import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

//  .............................. AUTH ....................................
//  user login
export const userLogin = user => post(url.USER_LOGIN, user, { params: { ...user } });
export const userSignup = user => post(url.USER_SIGNUP, user);   // todo remove later by /register


//  .............................. USERS ....................................
// add user
export const addUser = user => post(url.ADD_USER, user)
// search users
export const searchUsers = user => post(url.SEARCH_USERS, user)

// get User
export const getUser = user => get(`${url.GET_USER}`, { params: { ...user } })
export const getUserAccount = user => get(`${url.ACCOUNT_USER}`, { params: { ...user } })
// update User
export const updateUser = user =>
    put(`${url.UPDATE_USER}`, user)
// delete User
export const deleteUser = user =>
    del(`${url.DELETE_USER}`, { params: { ...user } })




//  .............................. PRODUCTS ....................................
// search products
export const searchProducts = product => post(url.SEARCH_PRODUCTS, product)
// get product
export const getProductById = id => get(`${url.GET_PRODUCT}`, { params: { id } })


//  .............................. RESOURCES ....................................
// add user
export const addManyResources = resources => post(url.ADD_MANY_RESOURCES, resources)
