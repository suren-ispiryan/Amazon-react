import {
    LIKE_PRODUCTS_REQUEST,
    LIKE_PRODUCTS_SUCCESS,
    LIKE_PRODUCTS_FAILURE,
    UNLIKE_PRODUCTS_REQUEST,
    UNLIKE_PRODUCTS_SUCCESS,
    UNLIKE_PRODUCTS_FAILURE
} from "./actions"
import cloneDeep from "clone-deep";

const initialStata = {
    productLikes: [],
    loadingLikes: false,
    message: '',
}
const productLikesReducer = (state = initialStata, action) => {
    switch (action.type) {
    // LIKE
        case LIKE_PRODUCTS_REQUEST:
            return {
                ...state,
                loadingLikes: true,
                message: '',
                productLikes: [...state.productLikes]
            }
        case LIKE_PRODUCTS_SUCCESS:
            const productLikesCopy = cloneDeep(state.productLikes)
               productLikesCopy.map((item) => {
                   if (item.id === +action.productLikes.likeable_id) {
                       item.likes = [...item.likes, action.productLikes];
                       return item
                   }
                })
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
        // DISLIKE
        case UNLIKE_PRODUCTS_REQUEST:
            return {
                ...state,
                loadingLikes: true,
                message: '',
                productLikes: [...state.productLikes]
            }
        case UNLIKE_PRODUCTS_SUCCESS:
            const removed = cloneDeep(state.productLikes)
            removed.map((item) => {
                item.likes = cloneDeep(item.likes.filter(i => +i.id !== +action.productLikes.id));
                return item
            })
            return {
                ...state,
                loadingLikes: false,
                productLikes: removed,
                message: action.message
            }
        case UNLIKE_PRODUCTS_FAILURE:
            return {
                ...state,
                loadingLikes: false,
                message: action.message
            }
    // DEFAULT
        default:
            return state
    }
}
export default productLikesReducer
