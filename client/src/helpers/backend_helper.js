import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";
import {INIT_PAYMENT, VALIDATE_PAYMENT} from "./url_helper";

//  .............................. AUTH ....................................
export const userLogin = user => post(url.USER_LOGIN, user, { params: { ...user } });
export const userSignup = user => post(url.USER_SIGNUP, user);   // todo remove later by /register

//  .............................. USERS ....................................
export const addUser = user => post(url.ADD_USER, user);
export const searchUsers = user => post(url.SEARCH_USERS, user);
export const getUser = user => get(url.GET_USER, { params: { ...user } });
export const getUserAccount = user => get(url.ACCOUNT_USER, { params: { ...user } });
export const updateUser = user =>  put(url.UPDATE_USER, user);
export const deleteUser = user => del(url.DELETE_USER, { params: { ...user } });

export const updateFollowUser = user =>  put(url.UPDATE_FOLLOW_USER, user);

//  .............................. PAYMENTS ....................................
export const initPayment = () => get(url.INIT_PAYMENT, { params: {  } });
export const validatePayment = () => get(url.VALIDATE_PAYMENT, { params: {  } });

//  .............................. PRODUCTS ....................................
export const searchProducts = product => post(url.SEARCH_PRODUCTS, product);
export const getProductById = id => get(url.GET_PRODUCT, { params: { id } });
export const addProduct = product => post(url.ADD_PRODUCT, product);
export const updateProduct = product =>  put(url.UPDATE_PRODUCT, product);

//  .............................. SALES_ORDERS ....................................
export const searchSalesOrders = item => post(url.SEARCH_SALES_ORDERS, item);
export const getSalesOrderById = id => get(url.GET_SALES_ORDER, { params: { id } });
export const addSalesOrder = item => post(url.ADD_SALES_ORDER, item);
export const updateSalesOrder = item =>  put(url.UPDATE_SALES_ORDER, item);

//  .............................. BLOGS ....................................
export const searchBlogs = blog => post(url.SEARCH_BLOGS, blog);
export const getBlogById = id => get(url.GET_BLOG, { params: { id } });
export const addBlog = blog => post(url.ADD_BLOG, blog);
export const updateBlog = blog =>  put(url.UPDATE_BLOG, blog);
export const updateLikeBlog = blog =>  put(url.UPDATE_LIKE_BLOG, blog);
export const deleteBlog = blog => del(url.DELETE_BLOG, { params: { ...blog } });

//  .............................. RESOURCES ....................................
// add user
export const addManyResources = resources => post(url.ADD_MANY_RESOURCES, resources)
