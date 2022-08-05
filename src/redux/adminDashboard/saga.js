import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
import {
    GET_ALL_USER_PRODUCTS_REQUEST,
    GET_ALL_USER_PRODUCTS_SUCCESS,
    GET_ALL_USER_PRODUCTS_FAILURE
} from './actions'

//CREATE
// function* createAddress(action) {
//     try {
//         const response = yield axiosInstance.post('/create-address', action.payload)
//         yield put({
//             type: CREATE_ADDRESS_SUCCESS,
//             message: 'product successfully created',
//             address: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: CREATE_ADDRESS_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }

//GET
function* getAllUsersProducts(action) {
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

//DELETE
// function* deleteAddress(action) {
//     try {
//         const response = yield axiosInstance.delete('/delete-address/'+action.payload)
//         yield put({
//             type: DELETE_ADDRESS_SUCCESS,
//             message: 'Success fetching data',
//             address: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: DELETE_ADDRESS_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }

//MAKE DEFAULT
// function* defaultAddress(action) {
//     try {
//         const response = yield axiosInstance.get('/make-address-default/'+action.payload)
//         yield put({
//             type: DEFAULT_ADDRESS_SUCCESS,
//             message: 'Success fetching data',
//             address: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: DEFAULT_ADDRESS_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }

export default function* () {
    // yield takeLatest(CREATE_ADDRESS_REQUEST, createAddress);
    yield takeLatest(GET_ALL_USER_PRODUCTS_REQUEST, getAllUsersProducts);
    // yield takeLatest(DELETE_ADDRESS_REQUEST, deleteAddress);
    // yield takeLatest(DEFAULT_ADDRESS_REQUEST, defaultAddress);
}
