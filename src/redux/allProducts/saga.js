import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from './../../config/axiosInstance';
import {
    GET_ALLPRODUCTS_REQUEST,
    GET_ALLPRODUCTS_SUCCESS,
    GET_ALLPRODUCTS_FAILURE,
    GET_PRODUCTDETAILS_REQUEST,
    GET_PRODUCTDETAILS_SUCCESS,
    GET_PRODUCTDETAILS_FAILURE,
    GET_SEARCH_FOR_PRODUCT_REQUEST,
    GET_SEARCH_FOR_PRODUCT_SUCCESS,
    GET_SEARCH_FOR_PRODUCT_FAILURE
} from './actions'

//GET ALL
function* getAllProducts(action) {
    try {
        const response = yield axiosInstance.get('/get-all-user-products')
        yield put({
            type: GET_ALLPRODUCTS_SUCCESS,
            message: 'Success fetching data',
            products: response.data
        });
    } catch (e) {
        yield put({
            type: GET_ALLPRODUCTS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET DETAILS
function* getProductDetails(action) {
    try {
        const response = yield axiosInstance.get('/get-product-details/'+action.payload)
        yield put({
            type: GET_PRODUCTDETAILS_SUCCESS,
            message: 'Success fetching data',
            product: response.data
        });
    } catch (e) {
        yield put({
            type: GET_PRODUCTDETAILS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET SEARCHED
function* getSearchForProduct(action) {
    try {
        const response = yield axiosInstance.post('/get-searched-product', action.payload)
        yield put({
            type: GET_SEARCH_FOR_PRODUCT_SUCCESS,
            message: 'Success fetching data',
            product: response.data
        });
    } catch (e) {
        yield put({
            type: GET_SEARCH_FOR_PRODUCT_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* () {
    yield takeLatest(GET_ALLPRODUCTS_REQUEST, getAllProducts);
    yield takeLatest(GET_PRODUCTDETAILS_REQUEST, getProductDetails);
    yield takeLatest(GET_SEARCH_FOR_PRODUCT_REQUEST, getSearchForProduct);
}
