import {
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    PUBLISH_PRODUCT_REQUEST,
    PUBLISH_PRODUCT_SUCCESS,
    PUBLISH_PRODUCT_FAILURE
} from "./actions"

const initialStata = {
    products: [],
    loading: false,
    message: '',
}
const userReducer = (state = initialStata, action) => {
    switch (action.type) {
    //CREATE
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                products: [...state.products],
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.products],
                message: action.message
            }
        case CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    // GET
        case GET_PRODUCTS_REQUEST:
            return {
               ...state,
                loading: true,
                message: '',
                products: []
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products,
                message: action.message
            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    // DELETE
        case DELETE_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                products: [...state.products]
            }
        case DELETE_PRODUCTS_SUCCESS:
            const removedProduct = state.products.filter(i => i.id !== parseInt(action.products))
            return {
                ...state,
                loading: false,
                products: removedProduct,
                message: action.message
            }
        case DELETE_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    // UPDATE
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                products: [...state.products]
            }
        case UPDATE_PRODUCT_SUCCESS:
            const newProducts = [];
            state.products.map(i => {
                if(i.id !== parseInt(action.products.id)) {
                    newProducts.push(i)
                } else {
                    newProducts.push(action.products)
                }
            })
            return {
                ...state,
                loading: false,
                products: newProducts,
                message: action.message
            }
        case UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        // UPDATE PUBLISHED
        case PUBLISH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                products: [...state.products]
            }
        case PUBLISH_PRODUCT_SUCCESS:
            const newProducts1 = [];
            state.products.map(i => {
                if(i.id !== parseInt(action.products.id)) {
                    newProducts1.push(i)
                } else {
                    newProducts1.push(action.products)
                }
            })
            return {
                ...state,
                loading: false,
                products: newProducts1,
                message: action.message
            }
        case PUBLISH_PRODUCT_FAILURE:
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
