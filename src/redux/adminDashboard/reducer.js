import {
    GET_ALL_USER_PRODUCTS_REQUEST,
    GET_ALL_USER_PRODUCTS_SUCCESS,
    GET_ALL_USER_PRODUCTS_FAILURE,
    DELETE_USER_PRODUCT_REQUEST,
    DELETE_USER_PRODUCT_SUCCESS,
    DELETE_USER_PRODUCT_FAILURE,
    UPDATE_USER_PRODUCT_REQUEST,
    UPDATE_USER_PRODUCT_SUCCESS,
    UPDATE_USER_PRODUCT_FAILURE
} from "./actions"

const initialState = {
    adminProducts: [],
    loading: false,
    message: '',
}
const adminDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                adminProducts: []
            }
        case GET_ALL_USER_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                adminProducts: action.allUserProducts,
                message: action.message
            }
        case GET_ALL_USER_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case DELETE_USER_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                adminProducts: [...state.adminProducts]
            }
        case DELETE_USER_PRODUCT_SUCCESS:
            const removedProduct = state.adminProducts.filter(i => i.id !== parseInt(action.adminProducts))
            return {
                ...state,
                loading: false,
                adminProducts: removedProduct,
                message: action.message
            }
        case DELETE_USER_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case UPDATE_USER_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                adminProducts: [...state.adminProducts]
            }
        case UPDATE_USER_PRODUCT_SUCCESS:
            const newProducts = [];
            state.adminProducts.map(i => {
                if(i.id !== parseInt(action.adminProducts.id)) {
                    newProducts.push(i)
                } else {
                    newProducts.push(action.adminProducts)
                }
                return newProducts
            })
            return {
                ...state,
                loading: false,
                adminProducts: newProducts,
                message: action.message
            }
        case UPDATE_USER_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        default:
            return state
    }
}
export default adminDashboardReducer
