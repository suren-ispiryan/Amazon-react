import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
import {
    GET_ALL_USER_PRODUCTS_REQUEST,
    GET_ALL_USER_PRODUCTS_SUCCESS,
    GET_ALL_USER_PRODUCTS_FAILURE,
    DELETE_USER_PRODUCT_REQUEST,
    DELETE_USER_PRODUCT_SUCCESS,
    DELETE_USER_PRODUCT_FAILURE,
    UPDATE_USER_PRODUCT_REQUEST,
    UPDATE_USER_PRODUCT_SUCCESS,
    UPDATE_USER_PRODUCT_FAILURE
} from './actions'

function* getAllUsersProducts() {
    try {
        const response = yield axiosInstance.get('/get-all-user-data')
        yield put({
            type: GET_ALL_USER_PRODUCTS_SUCCESS,
            message: 'Success fetching data',
            allUserProducts: response.data
        });
    } catch (e) {
        yield put({
            type: GET_ALL_USER_PRODUCTS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* deleteUsersProduct(action) {
    try {
        const response = yield axiosInstance.delete(`/delete-users-product/${action.payload}`)
        yield put({
            type: DELETE_USER_PRODUCT_SUCCESS,
            message: 'Success fetching data',
            adminProducts: response.data
        });
    } catch (e) {
        yield put({
            type: DELETE_USER_PRODUCT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* updateUsersProduct(action) {
    try {
        const response = yield axiosInstance.post('/update-user-product', action.payload)
        yield put({
            type: UPDATE_USER_PRODUCT_SUCCESS,
            message: 'success',
            adminProducts: response.data
        });
    } catch (e) {
        yield put({
            type: UPDATE_USER_PRODUCT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* () {
    yield takeLatest(GET_ALL_USER_PRODUCTS_REQUEST, getAllUsersProducts);
    yield takeLatest(DELETE_USER_PRODUCT_REQUEST, deleteUsersProduct);
    yield takeLatest(UPDATE_USER_PRODUCT_REQUEST, updateUsersProduct);
}
