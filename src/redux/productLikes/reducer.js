import {
    LIKE_PRODUCTS_REQUEST,
    LIKE_PRODUCTS_SUCCESS,
    LIKE_PRODUCTS_FAILURE,
    UNLIKE_PRODUCTS_REQUEST,
    UNLIKE_PRODUCTS_SUCCESS,
    UNLIKE_PRODUCTS_FAILURE,
    GET_PRODUCTS_LIKE_REQUEST,
    GET_PRODUCTS_LIKE_SUCCESS,
    GET_PRODUCTS_LIKE_FAILURE
} from "./actions"
import cloneDeep from "clone-deep";

const initialStata = {
    productLikes: [],
    loadingLikes: false,
    message: '',
    authUsersId: null
}
const productLikesReducer = (state = initialStata, action) => {
    switch (action.type) {
        case GET_PRODUCTS_LIKE_REQUEST:
            return {
                ...state,
                loadingLikes: true,
                message: '',
                productLikes: []
            }
        case GET_PRODUCTS_LIKE_SUCCESS:
            return {
                ...state,
                loadingLikes: false,
                productLikes: action.productLikes,
                message: action.message
            }
        case GET_PRODUCTS_LIKE_FAILURE:
            return {
                ...state,
                loadingLikes: false,
                message: action.message
            }
        case LIKE_PRODUCTS_REQUEST:
            return {
                ...state,
                loadingLikes: true,
                message: '',
                productLikes: [...state.productLikes]
            }
        case LIKE_PRODUCTS_SUCCESS:
            let productLikesCopy = cloneDeep(state.productLikes)
            productLikesCopy = [...productLikesCopy, action.productLikes]
            return {
                ...state,
                loadingLikes: false,
                productLikes: productLikesCopy,
                message: action.message
            }
        case LIKE_PRODUCTS_FAILURE:
            return {
                ...state,
                loadingLikes: false,
                message: action.message
            }
        case UNLIKE_PRODUCTS_REQUEST:
            return {
                ...state,
                loadingLikes: true,
                message: '',
                // productLikes: [...state.productLikes]
            }
        case UNLIKE_PRODUCTS_SUCCESS:
            const filteredProductLikesCopy = cloneDeep(state.productLikes)
            let deletedArray = filteredProductLikesCopy.filter(i => +i.id !== +action.dislikeProductComments.id)
            return {
                ...state,
                loadingLikes: false,
                productLikes: deletedArray,
                message: action.message
            }
        case UNLIKE_PRODUCTS_FAILURE:
            return {
                ...state,
                loadingLikes: false,
                message: action.message
            }
        default:
            return state
    }
}

export default productLikesReducer
