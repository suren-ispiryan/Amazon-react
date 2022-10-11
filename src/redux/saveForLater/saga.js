import { put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../config/axiosInstance';
import {
    SAVE_PRODUCT_FOR_LATER_REQUEST,
    SAVE_PRODUCT_FOR_LATER_SUCCESS,
    SAVE_PRODUCT_FOR_LATER_FAILURE,
    GET_PRODUCTS_FOR_LATER_REQUEST,
    GET_PRODUCTS_FOR_LATER_SUCCESS,
    GET_PRODUCTS_FOR_LATER_FAILURE,
    REMOVE_PRODUCT_FOR_LATER_REQUEST,
    REMOVE_PRODUCT_FOR_LATER_SUCCESS,
    REMOVE_PRODUCT_FOR_LATER_FAILURE
} from './actions'

function* saveProduct(action) {
    try {
        const response = yield axiosInstance.get(`/save-product-for-later/${action.payload}`)
        yield put({
            type: SAVE_PRODUCT_FOR_LATER_SUCCESS,
            message: 'product successfully saved',
            savedForLater: response.data
        });
    } catch (e) {
        yield put({
            type: SAVE_PRODUCT_FOR_LATER_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* getProducts() {
    try {
        const response = yield axiosInstance.get('/get-saved-for-later')
        yield put({
            type: GET_PRODUCTS_FOR_LATER_SUCCESS,
            message: 'No saved product',
            savedForLater: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCTS_FOR_LATER_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* removeProduct(action) {
    try {
        const response = yield axiosInstance.delete(`/remove-product-from-save-for-later/${action.payload}`)
        yield put({
            type: REMOVE_PRODUCT_FOR_LATER_SUCCESS,
            message: 'Product successfully deleted',
            savedForLater: response.data
        });
    } catch (e) {
        yield put({
            type: REMOVE_PRODUCT_FOR_LATER_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* saveForLater() {
    yield takeLatest(SAVE_PRODUCT_FOR_LATER_REQUEST, saveProduct);
    yield takeLatest(GET_PRODUCTS_FOR_LATER_REQUEST, getProducts);
    yield takeLatest(REMOVE_PRODUCT_FOR_LATER_REQUEST, removeProduct);
}
