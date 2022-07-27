import {
    GET_ALLPRODUCTS_REQUEST,
    GET_ALLPRODUCTS_SUCCESS,
    GET_ALLPRODUCTS_FAILURE,
    GET_PRODUCTDETAILS_REQUEST,
    GET_PRODUCTDETAILS_SUCCESS,
    GET_PRODUCTDETAILS_FAILURE
} from "./actions"

const initialStata = {
    allProducts: [],
    productDetail: [],
    loading: false,
    message: '',
}
const userReducer = (state = initialStata, action) => {
    switch (action.type) {
    // GET ALL
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
        // GET DETAILS
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
                message: action.message
            }
        case GET_PRODUCTDETAILS_FAILURE:
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
