import { put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../config/axiosInstance';
import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_FAILURE,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE
} from './actions'

//CREATE
function* createProduct(action) {
    try {
        const response = yield axiosInstance.post('/create-product', action.payload)
        yield put({
            type: CREATE_PRODUCT_SUCCESS,
            message: 'product successfully created',
            products: response.data
        });
    } catch (e) {
        yield put({
            type: CREATE_PRODUCT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET
function* getProducts(action) {
    try {
        const response = yield axiosInstance.get('/get-auth-user-products')
        yield put({
            type: GET_PRODUCTS_SUCCESS,
            message: 'Success fetching data',
            products: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCTS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//DELETE
function* deleteProducts(action) {
    try {
        const response = yield axiosInstance.delete('/delete-auth-user-products/'+action.payload)
        yield put({
            type: DELETE_PRODUCTS_SUCCESS,
            message: 'Product successfully deleted',
            products: response.data
        });
    } catch (e) {
        yield put({
            type: DELETE_PRODUCTS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//UPDATE
function* updateProducts(action) {
    try {
        const response = yield axiosInstance.post('/update-product', action.payload)
        yield put({
            type: UPDATE_PRODUCT_SUCCESS,
            message: 'product successfully created',
            products: response.data
        });
    } catch (e) {
        yield put({
            type: UPDATE_PRODUCT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* () {
    yield takeLatest(CREATE_PRODUCT_REQUEST, createProduct);
    yield takeLatest(GET_PRODUCTS_REQUEST, getProducts);
    yield takeLatest(DELETE_PRODUCTS_REQUEST, deleteProducts);
    yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProducts);
}
