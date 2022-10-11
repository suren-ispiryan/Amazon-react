import {
    GET_ALLPRODUCTS_REQUEST,
    GET_ALLPRODUCTS_SUCCESS,
    GET_ALLPRODUCTS_FAILURE,
    GET_PRODUCTDETAILS_REQUEST,
    GET_PRODUCTDETAILS_SUCCESS,
    GET_PRODUCTDETAILS_FAILURE,
    GET_SEARCH_FOR_PRODUCT_REQUEST,
    GET_SEARCH_FOR_PRODUCT_SUCCESS,
    GET_SEARCH_FOR_PRODUCT_FAILURE
} from "./actions"

const initialStata = {
    allProducts: [],
    searchedCategories: [],
    productDetail: [],
    loading: false,
    message: '',
}
const userReducer = (state = initialStata, action) => {
    switch (action.type) {
        case GET_ALLPRODUCTS_REQUEST:
            return {
               ...state,
                loading: true,
                message: '',
                allProducts: [],
                searchedCategories: []
            }
        case GET_ALLPRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                allProducts: action.products.allProducts,
                searchedCategories: action.products.categories,
                message: action.message
            }
        case GET_ALLPRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case GET_PRODUCTDETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                productDetail: []
            }
        case GET_PRODUCTDETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetail: [...state.productDetail, action.product],
                message: action.detailsMessage
            }
        case GET_PRODUCTDETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.detailsMessage
            }
        case GET_SEARCH_FOR_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                allProducts: []
            }
        case GET_SEARCH_FOR_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                allProducts: action.product,
                message: action.message
            }
        case GET_SEARCH_FOR_PRODUCT_FAILURE:
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
