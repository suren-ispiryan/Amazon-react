import { put, takeLatest } from 'redux-saga/effects'
import {
    GET_ALLPRODUCTS_REQUEST,
    GET_ALLPRODUCTS_SUCCESS,
    GET_ALLPRODUCTS_FAILURE,
} from './actions'

//CREATE
// function* createProduct(action) {
//     try {
//         const response = yield action.client.post('/create-product', action.payload)
//         yield put({
//             type: CREATE_PRODUCT_SUCCESS,
//             message: 'product successfully created',
//             products: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: CREATE_PRODUCT_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }

//GET
function* getAllProducts(action) {
    try {
        const response = yield action.payload.get('/get-all-user-products')
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

//DELETE
// function* deleteProducts(action) {
//     try {
//         const response = yield action.client.delete('/delete-auth-user-products/'+action.payload)
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

//UPDATE
// function* updateProducts(action) {
//     try {
//         const response = yield action.client.post('/update-product', action.payload)
//         yield put({
//             type: UPDATE_PRODUCT_SUCCESS,
//             message: 'product successfully created',
//             products: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: UPDATE_PRODUCT_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }

export default function* () {
    // yield takeLatest(CREATE_PRODUCT_REQUEST, createProduct);
    yield takeLatest(GET_ALLPRODUCTS_REQUEST, getAllProducts);
    // yield takeLatest(DELETE_PRODUCTS_REQUEST, deleteProducts);
    // yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProducts);
}
