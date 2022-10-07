import { put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../config/axiosInstance';
import {
    CREATE_PRODUCT_COMMENT_REQUEST,
    CREATE_PRODUCT_COMMENT_SUCCESS,
    CREATE_PRODUCT_COMMENT_FAILURE,
    GET_PRODUCTS_COMMENT_REQUEST,
    GET_PRODUCTS_COMMENT_SUCCESS,
    GET_PRODUCTS_COMMENT_FAILURE,
    DELETE_PRODUCTS_COMMENT_REQUEST,
    DELETE_PRODUCTS_COMMENT_SUCCESS,
    DELETE_PRODUCTS_COMMENT_FAILURE,
    LIKE_PRODUCTS_COMMENT_REQUEST,
    LIKE_PRODUCTS_COMMENT_SUCCESS,
    LIKE_PRODUCTS_COMMENT_FAILURE,
    DISLIKE_PRODUCTS_COMMENT_REQUEST,
    DISLIKE_PRODUCTS_COMMENT_SUCCESS,
    DISLIKE_PRODUCTS_COMMENT_FAILURE
} from './actions'

//CREATE
function* createProductComment(action) {
    try {
        const response = yield axiosInstance.post('/create-product-comment', action.payload)
        yield put({
            type: CREATE_PRODUCT_COMMENT_SUCCESS,
            message: 'product comment successfully created',
            productComments: response.data
        });
    } catch (e) {
        yield put({
            type: CREATE_PRODUCT_COMMENT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET
function* getProductComments(action) {
    try {
        const response = yield axiosInstance.get('/get-products-comments/'+action.payload)
        yield put({
            type: GET_PRODUCTS_COMMENT_SUCCESS,
            message: 'Success fetching data',
            productComments: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCTS_COMMENT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//DELETE
function* deleteProductComments(action) {
    try {
        const response = yield axiosInstance.delete('/delete-product-comment/'+action.payload)
        yield put({
            type: DELETE_PRODUCTS_COMMENT_SUCCESS,
            message: 'Product successfully deleted',
            productComments: response.data
        });
    } catch (e) {
        yield put({
            type: DELETE_PRODUCTS_COMMENT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//LIKE
function* likeProductComments(action) {
    try {
        const response = yield axiosInstance.get('/like-products-comments/'+action.payload)
        yield put({
            type: LIKE_PRODUCTS_COMMENT_SUCCESS,
            message: 'Success fetching data',
            likeProductComments: response.data
        });
    } catch (e) {
        yield put({
            type: LIKE_PRODUCTS_COMMENT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//DISLIKE
function* dislikeProductComments(action) {
    try {
        const response = yield axiosInstance.get('/dislike-products-comments/'+action.payload)
        yield put({
            type: DISLIKE_PRODUCTS_COMMENT_SUCCESS,
            message: 'Success fetching data',
            dislikeProductComments: response.data
        });
    } catch (e) {
        yield put({
            type: DISLIKE_PRODUCTS_COMMENT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* () {
    yield takeLatest(CREATE_PRODUCT_COMMENT_REQUEST, createProductComment);
    yield takeLatest(GET_PRODUCTS_COMMENT_REQUEST, getProductComments);
    yield takeLatest(DELETE_PRODUCTS_COMMENT_REQUEST, deleteProductComments);
    yield takeLatest(LIKE_PRODUCTS_COMMENT_REQUEST, likeProductComments);
    yield takeLatest(DISLIKE_PRODUCTS_COMMENT_REQUEST, dislikeProductComments);
}
