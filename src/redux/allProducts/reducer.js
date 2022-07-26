import {
    GET_ALLPRODUCTS_REQUEST,
    GET_ALLPRODUCTS_SUCCESS,
    GET_ALLPRODUCTS_FAILURE,
} from "./actions"

const initialStata = {
    allProducts: [],
    loading: false,
    message: '',
}
const userReducer = (state = initialStata, action) => {
    switch (action.type) {
    //CREATE
    //     case CREATE_PRODUCT_REQUEST:
    //         return {
    //             ...state,
    //             loading: true,
    //             message: '',
    //             products: [...state.products],
    //         }
    //     case CREATE_PRODUCT_SUCCESS:
    //         return {
    //             ...state,
    //             loading: false,
    //             products: [...state.products, action.products],
    //             message: action.message
    //         }
    //     case CREATE_PRODUCT_FAILURE:
    //         return {
    //             ...state,
    //             loading: false,
    //             message: action.message
    //         }
    // GET
        case GET_ALLPRODUCTS_REQUEST:
            return {
               ...state,
                loading: true,
                message: '',
                allProducts: []
            }
        case GET_ALLPRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                allProducts: action.products,
                message: action.message
            }
        case GET_ALLPRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    // DELETE
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
    // UPDATE
    //     case UPDATE_PRODUCT_REQUEST:
    //         return {
    //             ...state,
    //             loading: true,
    //             message: '',
    //             products: [...state.products]
    //         }
    //     case UPDATE_PRODUCT_SUCCESS:
    //         const newProducts = [];
    //         state.products.map(i => {
    //             if(i.id !== parseInt(action.products.id)) {
    //                 newProducts.push(i)
    //             } else {
    //                 newProducts.push(action.products)
    //             }
    //         })
    //         return {
    //             ...state,
    //             loading: false,
    //             products: newProducts,
    //             message: action.message
    //         }
    //     case UPDATE_PRODUCT_FAILURE:
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
export default userReducer
