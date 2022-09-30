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
    DELETE_PRODUCTS_COMMENT_FAILURE
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
//
// //DELETE
// function* deleteProducts(action) {
//     try {
//         const response = yield axiosInstance.delete('/delete-auth-user-products/'+action.payload)
//         yield put({
//             type: DELETE_PRODUCTS_SUCCESS,
//             message: 'Product successfully deleted',
//             products: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: DELETE_PRODUCTS_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }

export default function* () {
    yield takeLatest(CREATE_PRODUCT_COMMENT_REQUEST, createProductComment);
    yield takeLatest(GET_PRODUCTS_COMMENT_REQUEST, getProductComments);
}
