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
    REMOVE_SIZE_FAILURE,
    ADD_SUBCATEGORY_REQUEST,
    ADD_SUBCATEGORY_SUCCESS,
    ADD_SUBCATEGORY_FAILURE,
    GET_PRODUCT_SUBCATEGORIES_REQUEST,
    GET_PRODUCT_SUBCATEGORIES_SUCCESS,
    GET_PRODUCT_SUBCATEGORIES_FAILURE,
    REMOVE_SUBCATEGORY_REQUEST,
    REMOVE_SUBCATEGORY_SUCCESS,
    REMOVE_SUBCATEGORY_FAILURE
} from './actions'

function* addCategory(action) {
    try {
        const response = yield axiosInstance.post('add-category', action.payload)
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            message: 'Product is not created',
            addedCategory: response.data
        });
    } catch (e) {
        yield put({
            type: ADD_CATEGORY_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* getProductCategories() {
    try {
        const response = yield axiosInstance.get('get-product-categories')
        yield put({
            type: GET_PRODUCT_CATEGORIES_SUCCESS,
            message: 'Can not find product categories',
            getCategories: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCT_CATEGORIES_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* removeCategory(action) {
    try {
        const response = yield axiosInstance.get(`/remove-category/${action.payload}`)
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

function* getProductSizes() {
    try {
        const response = yield axiosInstance.get('get-product-sizes')
        yield put({
            type: GET_PRODUCT_SIZES_SUCCESS,
            message: 'Cant find product sizes',
            getSizes: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCT_SIZES_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* removeSizes(action) {
    try {
        const response = yield axiosInstance.get(`/remove-size/${action.payload}`)
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

function* addSubCategory(action) {
    try {
        const response = yield axiosInstance.post('add-subcategory', action.payload)
        yield put({
            type: ADD_SUBCATEGORY_SUCCESS,
            message: 'product successfully created',
           addSubCategories: response.data
        });
    } catch (e) {
        yield put({
            type: ADD_SUBCATEGORY_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* getProductSubCategories() {
    try {
        const response = yield axiosInstance.get('get-product-subcategories')
        yield put({
            type: GET_PRODUCT_SUBCATEGORIES_SUCCESS,
            message: 'cant find product subcategories',
            getSubCategories: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCT_SUBCATEGORIES_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* removeSubCategory(action) {
    try {
        const response = yield axiosInstance.get(`/remove-subcategory/${action.payload}`)
        yield put({
            type: REMOVE_SUBCATEGORY_SUCCESS,
            message: 'product successfully created',
            removeSubCategories: response.data
        });
    } catch (e) {
        yield put({
            type: REMOVE_SUBCATEGORY_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* adminProductParameters() {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
    yield takeLatest(GET_PRODUCT_CATEGORIES_REQUEST, getProductCategories);
    yield takeLatest(REMOVE_CATEGORY_REQUEST, removeCategory);
    yield takeLatest(ADD_SIZE_REQUEST, addSize);
    yield takeLatest(GET_PRODUCT_SIZES_REQUEST, getProductSizes);
    yield takeLatest(REMOVE_SIZE_REQUEST, removeSizes);
    yield takeLatest(ADD_SUBCATEGORY_REQUEST, addSubCategory);
    yield takeLatest(GET_PRODUCT_SUBCATEGORIES_REQUEST, getProductSubCategories);
    yield takeLatest(REMOVE_SUBCATEGORY_REQUEST, removeSubCategory);
}
