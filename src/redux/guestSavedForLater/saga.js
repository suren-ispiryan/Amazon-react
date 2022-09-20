import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
import {
    GET_SAVEDFORLATER_REQUEST,
    GET_SAVEDFORLATER_SUCCESS,
    GET_SAVEDFORLATER_FAILURE
} from './actions'

//GET
function* getGuestSavedForLaterProducts(action) {
    try {
        const response = yield axiosInstance.post('get-guest-saved-for-later-products', action.payload)
        yield put({
            type: GET_SAVEDFORLATER_SUCCESS,
            message: 'Success fetching data',
            products: response.data
        });
    } catch (e) {
        yield put({
            type: GET_SAVEDFORLATER_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* () {
    yield takeLatest(GET_SAVEDFORLATER_REQUEST, getGuestSavedForLaterProducts);
}
