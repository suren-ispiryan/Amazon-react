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
    BUY_PRODUCTS_FROM_CART_REQUEST,
    BUY_PRODUCTS_FROM_CART_SUCCESS,
    BUY_PRODUCTS_FROM_CART_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE
} from "./actions"

const initialStata = {
    addedToCart: [],
    orderedProducts: [],
    loading: false,
    message: '',
}
const userReducer = (state = initialStata, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                addedToCart: [...state.addedToCart],
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                addedToCart: [...state.addedToCart, action.addedToCart],
                message: action.message
            }
        case ADD_TO_CART_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case GET_FROM_CART_REQUEST:
            return {
               ...state,
                loading: true,
                message: '',
                addedToCart: []
            }
        case GET_FROM_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                addedToCart: action.addedToCart,
                message: action.message
            }
        case GET_FROM_CART_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case REMOVE_FROM_CART_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                addedToCart: [...state.addedToCart]
            }
        case REMOVE_FROM_CART_SUCCESS:
            let removedProduct = [];
            if (action.addedToCart.product_count === 0) {
                removedProduct = state.addedToCart.filter(i => i.product_id !== parseInt(action.addedToCart.product_id))
            } else {
                state.addedToCart.map(i => {
                    if(i.product_id !== action.addedToCart.product_id) {
                        removedProduct.push(i)
                    } else {
                        removedProduct.push(action.addedToCart)
                    }
                    return removedProduct
                })
           }
            return {
                ...state,
                loading: false,
                addedToCart: removedProduct,
                message: action.message
            }
        case REMOVE_FROM_CART_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case GUEST_PRODUCT_GET_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                addedToCart: []
            }
        case GUEST_PRODUCT_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                addedToCart: action.addedToCart,
                message: action.message
            }
        case GUEST_PRODUCT_GET_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case BUY_PRODUCTS_FROM_CART_REQUEST:
            return {
                ...state,
                loading: true,
                message: ''
            }
        case BUY_PRODUCTS_FROM_CART_SUCCESS:
            return {
                ...state,
                loading: true,
                message: 'Products were successfully ordered',
            }
        case BUY_PRODUCTS_FROM_CART_FAILURE:
            return {
                ...state.orders,
                loading: true,
                message: '',
            }
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                orderedProducts: []
            }
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderedProducts: action.addedToCart,
                message: action.message
            }
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        default:
            return state
    }
}
export default userReducer
