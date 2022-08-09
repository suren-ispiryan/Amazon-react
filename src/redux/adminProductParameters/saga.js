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
    ADD_SIZE_REQUEST,
    ADD_SIZE_SUCCESS,
    ADD_SIZE_FAILURE,
    GET_PRODUCT_SIZES_REQUEST,
    GET_PRODUCT_SIZES_SUCCESS,
    GET_PRODUCT_SIZES_FAILURE,
    REMOVE_SIZE_REQUEST,
    REMOVE_SIZE_SUCCESS,
    REMOVE_SIZE_FAILURE
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

//REMOVE CATEGORY
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


//ADD SIZE
function* addSize(action) {
    try {
        const response = yield axiosInstance.post('add-size', action.payload)
        yield put({
            type: ADD_SIZE_SUCCESS,
            message: 'product successfully created',
            addedSize: response.data
        });
    } catch (e) {
        yield put({
            type: ADD_SIZE_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET PRODUCT SIZES
function* getProductSizes(action) {
    try {
        const response = yield axiosInstance.get('get-product-sizes')
        yield put({
            type: GET_PRODUCT_SIZES_SUCCESS,
            message: 'product successfully created',
            getSizes: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCT_SIZES_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//REMOVE SIZES
function* removeSizes(action) {
    try {
        const response = yield axiosInstance.get('/remove-size/'+action.payload)
        yield put({
            type: REMOVE_SIZE_SUCCESS,
            message: 'product successfully created',
            removeSize: response.data
        });
    } catch (e) {
        yield put({
            type: REMOVE_SIZE_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* () {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
    yield takeLatest(GET_PRODUCT_CATEGORIES_REQUEST, getProductCategories);
    yield takeLatest(REMOVE_CATEGORY_REQUEST, removeCategory);
    yield takeLatest(ADD_SIZE_REQUEST, addSize);
    yield takeLatest(GET_PRODUCT_SIZES_REQUEST, getProductSizes);
    yield takeLatest(REMOVE_SIZE_REQUEST, removeSizes);
}
