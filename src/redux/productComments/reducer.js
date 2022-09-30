import {
    CREATE_PRODUCT_COMMENT_REQUEST,
    CREATE_PRODUCT_COMMENT_SUCCESS,
    CREATE_PRODUCT_COMMENT_FAILURE,
    GET_PRODUCTS_COMMENT_REQUEST,
    GET_PRODUCTS_COMMENT_SUCCESS,
    GET_PRODUCTS_COMMENT_FAILURE,
    DELETE_PRODUCTS_COMMENT_REQUEST,
    DELETE_PRODUCTS_COMMENT_SUCCESS,
    DELETE_PRODUCTS_COMMENT_FAILURE
} from "./actions"

const initialStata = {
    productComments: [],
    loadingComents: false,
    message: '',
}
const productCommentsReducer = (state = initialStata, action) => {
    switch (action.type) {
    //CREATE
        case CREATE_PRODUCT_COMMENT_REQUEST:
            return {
                ...state,
                loadingComents: true,
                message: '',
                productComments: [...state.productComments],
            }
        case CREATE_PRODUCT_COMMENT_SUCCESS:
            return {
                ...state,
                loadingComents: false,
                productComments: [...state.productComments, action.productComments],
                message: action.message
            }
        case CREATE_PRODUCT_COMMENT_FAILURE:
            return {
                ...state,
                loadingComents: false,
                message: action.message
            }
    // GET
        case GET_PRODUCTS_COMMENT_REQUEST:
            return {
               ...state,
                loadingComents: true,
                message: '',
                proproductCommentsducts: []
            }
        case GET_PRODUCTS_COMMENT_SUCCESS:
            return {
                ...state,
                loadingComents: false,
                productComments: action.productComments,
                message: action.message
            }
        case GET_PRODUCTS_COMMENT_FAILURE:
            return {
                ...state,
                loadingComents: false,
                message: action.message
            }
    // // DELETE
    //     case DELETE_PRODUCTS_REQUEST:
    //         return {
    //             ...state,
    //             loading: true,
    //             message: '',
    //             products: [...state.products]
    //         }
    //     case DELETE_PRODUCTS_SUCCESS:
    //         const removedProduct = state.products.filter(i => i.id !== parseInt(action.products))
    //         return {
    //             ...state,
    //             loading: false,
    //             products: removedProduct,
    //             message: action.message
    //         }
    //     case DELETE_PRODUCTS_FAILURE:
    //         return {
    //             ...state,
    //             loading: false,
    //             message: action.message
    //         }
    // DEFAULT
        default:
            return state
    }
}
export default productCommentsReducer
