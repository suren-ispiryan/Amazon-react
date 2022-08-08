import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
import {
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    GET_PRODUCT_CATEGORIES_REQUEST,
    GET_PRODUCT_CATEGORIES_SUCCESS,
    GET_PRODUCT_CATEGORIES_FAILURE,
    REMOVE_CATEGORY_REQUEST,
    REMOVE_CATEGORY_SUCCESS,
    REMOVE_CATEGORY_FAILURE,
    // GUEST_PRODUCT_GET_REQUEST,
    // GUEST_PRODUCT_GET_SUCCESS,
    // GUEST_PRODUCT_GET_FAILURE,
    // BUY_PRODUCTS_FROM_CART_REQUEST,
    // BUY_PRODUCTS_FROM_CART_SUCCESS,
    // BUY_PRODUCTS_FROM_CART_FAILURE,
    // GET_ORDERS_REQUEST,
    // GET_ORDERS_SUCCESS,
    // GET_ORDERS_FAILURE
} from './actions'

//ADD CATEGORY
function* addCategory(action) {
    try {
        const response = yield axiosInstance.post('add-category', action.payload)
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            message: 'product successfully created',
            addedCategory: response.data
        });
    } catch (e) {
        yield put({
            type: ADD_CATEGORY_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET PRODUCT CATEGORIES
function* getProductCategories(action) {
    try {
        const response = yield axiosInstance.get('get-product-categories')
        yield put({
            type: GET_PRODUCT_CATEGORIES_SUCCESS,
            message: 'product successfully created',
            getCategories: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCT_CATEGORIES_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//REMOVE
function* removeCategory(action) {
    try {
        const response = yield axiosInstance.get('/remove-category/'+action.payload)
        yield put({
            type: REMOVE_CATEGORY_SUCCESS,
            message: 'product successfully created',
            removeCategory: response.data
        });
    } catch (e) {
        yield put({
            type: REMOVE_CATEGORY_FAILURE,
            message: 'Something went wrong'
        });
    }
}

// //GET GUEST
// function* getGuestProductsFromCart (action) {
//     try {
//         const response = yield axiosInstance.post('/get-guest-from-cart', action.payload)
//         yield put({
//             type: GUEST_PRODUCT_GET_SUCCESS,
//             message: 'product successfully created',
//             addedToCart: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: GUEST_PRODUCT_GET_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }


export default function* () {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
    yield takeLatest(GET_PRODUCT_CATEGORIES_REQUEST, getProductCategories);
    yield takeLatest(REMOVE_CATEGORY_REQUEST, removeCategory);
    // yield takeLatest(GUEST_PRODUCT_GET_REQUEST, getGuestProductsFromCart);
    // yield takeLatest(BUY_PRODUCTS_FROM_CART_REQUEST, buyProductsFromCart);
    // yield takeLatest(GET_ORDERS_REQUEST, getOrders);
}
