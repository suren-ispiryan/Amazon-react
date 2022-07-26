import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    GET_FROM_CART_REQUEST,
    GET_FROM_CART_SUCCESS,
    GET_FROM_CART_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    GUEST_PRODUCT_GET_REQUEST,
    GUEST_PRODUCT_GET_SUCCESS,
    GUEST_PRODUCT_GET_FAILURE,
    BUY_PRODUCTS_FROM_CART_REQUEST,
    BUY_PRODUCTS_FROM_CART_SUCCESS,
    BUY_PRODUCTS_FROM_CART_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE
} from './actions'

function* addToCart(action) {
    try {
        const response = yield axiosInstance.get(`/add-to-cart/${action.payload}/${action.productCount}`)
        yield put({
            type: ADD_TO_CART_SUCCESS,
            message: 'Can not add product',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: ADD_TO_CART_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* getFromCart() {
    try {
        const response = yield axiosInstance.get('/get-from-cart')
        yield put({
            type: GET_FROM_CART_SUCCESS,
            message: 'Can not find products',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: GET_FROM_CART_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* removeFromCart(action) {
    try {
        const response = yield axiosInstance.get(`/remove-from-cart/${action.payload}`)
        yield put({
            type: REMOVE_FROM_CART_SUCCESS,
            message: 'Can not find products on cart',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: REMOVE_FROM_CART_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* getGuestProductsFromCart (action) {
    try {
        const response = yield axiosInstance.post('/get-guest-from-cart', action.payload)
        yield put({
            type: GUEST_PRODUCT_GET_SUCCESS,
            message: 'No products',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: GUEST_PRODUCT_GET_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* buyProductsFromCart () {
    try {
        const response = yield axiosInstance.get('/buy-products-from-cart')
        yield put({
            type: BUY_PRODUCTS_FROM_CART_SUCCESS,
            message: 'Order made successfully',
            orders: response.data
        });
    } catch (e) {
        yield put({
            type: BUY_PRODUCTS_FROM_CART_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* getOrders () {
    try {
        const response = yield axiosInstance.get('/get-ordered')
        yield put({
            type: GET_ORDERS_SUCCESS,
            message: 'product successfully created',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: GET_ORDERS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* userCart() {
    yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
    yield takeLatest(GET_FROM_CART_REQUEST, getFromCart);
    yield takeLatest(REMOVE_FROM_CART_REQUEST, removeFromCart);
    yield takeLatest(GUEST_PRODUCT_GET_REQUEST, getGuestProductsFromCart);
    yield takeLatest(BUY_PRODUCTS_FROM_CART_REQUEST, buyProductsFromCart);
    yield takeLatest(GET_ORDERS_REQUEST, getOrders);
}
