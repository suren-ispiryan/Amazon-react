import { put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../config/axiosInstance';
import {
    LIKE_PRODUCTS_REQUEST,
    LIKE_PRODUCTS_SUCCESS,
    LIKE_PRODUCTS_FAILURE,
    UNLIKE_PRODUCTS_REQUEST,
    UNLIKE_PRODUCTS_SUCCESS,
    UNLIKE_PRODUCTS_FAILURE,
    GET_PRODUCTS_LIKE_REQUEST,
    GET_PRODUCTS_LIKE_SUCCESS,
    GET_PRODUCTS_LIKE_FAILURE
} from './actions'

function* getProductLikes(action) {
    try {
        const response = yield axiosInstance.get(`/get-products-likes/${action.payload}`)
        yield put({
            type: GET_PRODUCTS_LIKE_SUCCESS,
            message: 'Success fetching data',
            productLikes: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCTS_LIKE_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* likeProduct(action) {
    try {
        const response = yield axiosInstance.get(`/like-products/${action.payload}`)
        yield put({
            type: LIKE_PRODUCTS_SUCCESS,
            message: 'Success fetching data',
            productLikes: response.data
        });
    } catch (e) {
        yield put({
            type: LIKE_PRODUCTS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* unlikeProduct(action) {
    try {
        const response = yield axiosInstance.get(`/unlike-products/${action.payload}`)
        yield put({
            type: UNLIKE_PRODUCTS_SUCCESS,
            message: 'Success fetching data',
            dislikeProductComments: response.data
        });
    } catch (e) {
        yield put({
            type: UNLIKE_PRODUCTS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* productLikes() {
    yield takeLatest(LIKE_PRODUCTS_REQUEST, likeProduct);
    yield takeLatest(UNLIKE_PRODUCTS_REQUEST, unlikeProduct);
    yield takeLatest(GET_PRODUCTS_LIKE_REQUEST, getProductLikes);
}
