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
    GUEST_PRODUCT_GET_FAILURE
} from "./actions"

const initialStata = {
    addedToCart: [],
    loading: false,
    message: '',
}
const userReducer = (state = initialStata, action) => {
    switch (action.type) {
    //CREATE
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
    // // GET
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
    // REMOVE
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
    //GUEST GET
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
    // DEFAULT
        default:
            return state
    }
}
export default userReducer
