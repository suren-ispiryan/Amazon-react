import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
import {
    GET_ALL_ORDERED_PRODUCTS_REQUEST,
    GET_ALL_ORDERED_PRODUCTS_SUCCESS,
    GET_ALL_ORDERED_PRODUCTS_FAILURE
} from './actions'

function* getAllOrderedProducts() {
    try {
        const response = yield axiosInstance.get('/get-all-ordered-products')
        yield put({
            type: GET_ALL_ORDERED_PRODUCTS_SUCCESS,
            message: 'Success fetching data',
            adminOrder: response.data
        });
    } catch (e) {
        yield put({
            type: GET_ALL_ORDERED_PRODUCTS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* getAllOrdered() {
    yield takeLatest(GET_ALL_ORDERED_PRODUCTS_REQUEST, getAllOrderedProducts);
}
