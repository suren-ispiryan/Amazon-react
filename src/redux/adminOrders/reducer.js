import {
    GET_ALL_ORDERED_PRODUCTS_REQUEST,
    GET_ALL_ORDERED_PRODUCTS_SUCCESS,
    GET_ALL_ORDERED_PRODUCTS_FAILURE
} from "./actions"

const initialState = {
    adminOrders: [],
    loading: false,
    message: '',
}
const adminOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERED_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                adminOrders: []
            }
        case GET_ALL_ORDERED_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                adminOrders: action.adminOrder,
                message: action.message
            }
        case GET_ALL_ORDERED_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        default:
            return state
    }
}
export default adminOrdersReducer;
