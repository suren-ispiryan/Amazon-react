import {
    SAVE_PRODUCT_FOR_LATER_REQUEST,
    SAVE_PRODUCT_FOR_LATER_SUCCESS,
    SAVE_PRODUCT_FOR_LATER_FAILURE,
    GET_PRODUCTS_FOR_LATER_REQUEST,
    GET_PRODUCTS_FOR_LATER_SUCCESS,
    GET_PRODUCTS_FOR_LATER_FAILURE,
    REMOVE_PRODUCT_FOR_LATER_REQUEST,
    REMOVE_PRODUCT_FOR_LATER_SUCCESS,
    REMOVE_PRODUCT_FOR_LATER_FAILURE
} from "./actions"

const initialStata = {
    savedForLater: [],
    loading: false,
    message: '',
}
const savedForLaterReducer = (state = initialStata, action) => {
    switch (action.type) {
        case SAVE_PRODUCT_FOR_LATER_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                savedForLater: [...state.savedForLater],
            }
        case SAVE_PRODUCT_FOR_LATER_SUCCESS:
            if (Object.keys(action.savedForLater).length > 0) {
                return {
                    ...state,
                    loading: false,
                    savedForLater: [...state.savedForLater, action.savedForLater],
                    message: action.message
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    savedForLater: [...state.savedForLater],
                    message: action.message
                }
            }
        case SAVE_PRODUCT_FOR_LATER_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case GET_PRODUCTS_FOR_LATER_REQUEST:
            return {
               ...state,
                loading: true,
                message: '',
                savedForLater: []
            }
        case GET_PRODUCTS_FOR_LATER_SUCCESS:
            return {
                ...state,
                loading: false,
                savedForLater: action.savedForLater,
                message: action.message
            }
        case GET_PRODUCTS_FOR_LATER_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case REMOVE_PRODUCT_FOR_LATER_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                savedForLater: [...state.savedForLater]
            }
        case REMOVE_PRODUCT_FOR_LATER_SUCCESS:
            const removedProduct = state.savedForLater.filter(i => i.id !== parseInt(action.savedForLater))
            return {
                ...state,
                loading: false,
                savedForLater: removedProduct,
                message: action.message
            }
        case REMOVE_PRODUCT_FOR_LATER_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        default:
            return state
    }
}
export default savedForLaterReducer
