import { put, takeLatest } from 'redux-saga/effects'
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    GET_FROM_CART_REQUEST,
    GET_FROM_CART_SUCCESS,
    GET_FROM_CART_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    GUEST_PRODUCT_GET_REQUEST,
    GUEST_PRODUCT_GET_SUCCESS,
    GUEST_PRODUCT_GET_FAILURE,
    // GUEST_PRODUCT_REMOVE_REQUEST,
    // GUEST_PRODUCT_REMOVE_SUCCESS,
    // GUEST_PRODUCT_REMOVE_FAILURE
} from './actions'

//ADD
function* addToCart(action) {
    try {
        const response = yield action.client.get('/add-to-cart/'+action.payload)
        yield put({
            type: ADD_TO_CART_SUCCESS,
            message: 'product successfully created',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: ADD_TO_CART_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET
function* getFromCart(action) {
    try {
        const response = yield action.payload.get('/get-from-cart')
        yield put({
            type: GET_FROM_CART_SUCCESS,
            message: 'product successfully created',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: GET_FROM_CART_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//REMOVE
function* removeFromCart(action) {
    try {
        const response = yield action.client.get('/remove-from-cart/'+action.payload)
        yield put({
            type: REMOVE_FROM_CART_SUCCESS,
            message: 'product successfully created',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: REMOVE_FROM_CART_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//GET GUEST
function* getGuestProductsFromCart (action) {
    try {
        const response = yield action.client.post('/get-guest-from-cart', action.payload)
        yield put({
            type: GUEST_PRODUCT_GET_SUCCESS,
            message: 'product successfully created',
            addedToCart: response.data
        });
    } catch (e) {
        yield put({
            type: GUEST_PRODUCT_GET_FAILURE,
            message: 'Something went wrong'
        });
    }
}

//REMOVE GUEST
// function* removeGuestProductsFromCart(action) {
//     try {
//         const response = yield action.client.get('/remove-from-guest-cart/'+action.payload)
//         yield put({
//             type: GUEST_PRODUCT_REMOVE_SUCCESS,
//             message: 'product successfully created',
//             addedToCart: response.data
//         });
//     } catch (e) {
//         yield put({
//             type: GUEST_PRODUCT_REMOVE_FAILURE,
//             message: 'Something went wrong'
//         });
//     }
// }


export default function* () {
    yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
    yield takeLatest(GET_FROM_CART_REQUEST, getFromCart);
    yield takeLatest(REMOVE_FROM_CART_REQUEST, removeFromCart);
    yield takeLatest(GUEST_PRODUCT_GET_REQUEST, getGuestProductsFromCart);
    // yield takeLatest(GUEST_PRODUCT_REMOVE_REQUEST, removeGuestProductsFromCart);
}
