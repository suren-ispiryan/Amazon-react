import {
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
   GET_PRODUCT_CATEGORIES_REQUEST,
   GET_PRODUCT_CATEGORIES_SUCCESS,
   GET_PRODUCT_CATEGORIES_FAILURE,
    REMOVE_CATEGORY_REQUEST,
    REMOVE_CATEGORY_SUCCESS,
    REMOVE_CATEGORY_FAILURE,
    // GUEST_PRODUCT_GET_REQUEST,
    // GUEST_PRODUCT_GET_SUCCESS,
    // GUEST_PRODUCT_GET_FAILURE,
    // BUY_PRODUCTS_FROM_CART_REQUEST,
    // BUY_PRODUCTS_FROM_CART_SUCCESS,
    // BUY_PRODUCTS_FROM_CART_FAILURE,
    // GET_ORDERS_REQUEST,
    // GET_ORDERS_SUCCESS,
    // GET_ORDERS_FAILURE
} from "./actions"

const initialStata = {
    categories: [],
    sizes: [],
    loading: false,
    message: '',
}

const adminProductParametersReducer = (state = initialStata, action) => {
    switch (action.type) {
    //CREATE
        case ADD_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                categories: [...state.categories],
            }
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.addedCategory],
                message: action.message
            }
        case ADD_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
//     // GET
        case GET_PRODUCT_CATEGORIES_REQUEST:
            return {
               ...state,
                loading: true,
                message: '',
                categories: []
            }
        case GET_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.getCategories,
                message: action.message
            }
        case GET_PRODUCT_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
//     // REMOVE
        case REMOVE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                categories: [...state.categories]
            }
        case REMOVE_CATEGORY_SUCCESS:
            let productsList = []
            productsList = state.categories.filter(i => i.id !== parseInt(action.removeCategory.id))
            return {
                ...state,
                loading: false,
                categories: productsList,
                message: action.message
            }
        case REMOVE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
//     //GUEST GET
//         case GUEST_PRODUCT_GET_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 message: '',
//                 addedToCart: []
//             }
//         case GUEST_PRODUCT_GET_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 addedToCart: action.addedToCart,
//                 message: action.message
//             }
//         case GUEST_PRODUCT_GET_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 message: action.message
//             }
//     //ORDER
//         case BUY_PRODUCTS_FROM_CART_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 message: ''
//             }
//         case BUY_PRODUCTS_FROM_CART_SUCCESS:
//             return {
//                 ...state,
//                 loading: true,
//                 message: 'Products were successfully ordered',
//             }
//         case BUY_PRODUCTS_FROM_CART_FAILURE:
//             return {
//                 ...state.orders,
//                 loading: true,
//                 message: '',
//             }
//     //GET ORDERED
//         case GET_ORDERS_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 message: '',
//                 orderedProducts: []
//             }
//         case GET_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 orderedProducts: action.addedToCart,
//                 message: action.message
//             }
//         case GET_ORDERS_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 message: action.message
//             }
    // DEFAULT
        default:
            return state
    }
}
export default adminProductParametersReducer
