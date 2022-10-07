import {
    CREATE_PRODUCT_COMMENT_REQUEST,
    CREATE_PRODUCT_COMMENT_SUCCESS,
    CREATE_PRODUCT_COMMENT_FAILURE,
    GET_PRODUCTS_COMMENT_REQUEST,
    GET_PRODUCTS_COMMENT_SUCCESS,
    GET_PRODUCTS_COMMENT_FAILURE,
    DELETE_PRODUCTS_COMMENT_REQUEST,
    DELETE_PRODUCTS_COMMENT_SUCCESS,
    DELETE_PRODUCTS_COMMENT_FAILURE,
    LIKE_PRODUCTS_COMMENT_REQUEST,
    LIKE_PRODUCTS_COMMENT_SUCCESS,
    LIKE_PRODUCTS_COMMENT_FAILURE,
    DISLIKE_PRODUCTS_COMMENT_REQUEST,
    DISLIKE_PRODUCTS_COMMENT_SUCCESS,
    DISLIKE_PRODUCTS_COMMENT_FAILURE
} from "./actions"
import cloneDeep from "clone-deep";

const initialStata = {
    productComments: [],
    commentLikes: [],
    authUserId: null,
    loadingComents: false,
    loadingCommentLikes: false,
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
                productComments: []
            }
        case GET_PRODUCTS_COMMENT_SUCCESS:
            return {
                ...state,
                loadingComents: false,
                productComments: action.productComments[0],
                authUserId: action.productComments[1],
                message: action.message
            }
        case GET_PRODUCTS_COMMENT_FAILURE:
            return {
                ...state,
                loadingComents: false,
                message: action.message
            }
    // DELETE
        case DELETE_PRODUCTS_COMMENT_REQUEST:
            return {
                ...state,
                loadingComents: true,
                message: '',
                productComments: [...state.productComments]
            }
        case DELETE_PRODUCTS_COMMENT_SUCCESS:
            const removedComment = state.productComments.filter(i => i.id !== parseInt(action.productComments))
            return {
                ...state,
                loadingComents: false,
                productComments: removedComment,
                message: action.message
            }
        case DELETE_PRODUCTS_COMMENT_FAILURE:
            return {
                ...state,
                loadingComents: false,
                message: action.message
            }
    // LIKE
        case LIKE_PRODUCTS_COMMENT_REQUEST:
            return {
                ...state,
                loadingCommentLikes: true,
                message: '',
                productComments: [...state.productComments]
            }
        case LIKE_PRODUCTS_COMMENT_SUCCESS:
            const productCommentsCopy = cloneDeep(state.productComments)
               productCommentsCopy.map((item) => {
                   if (item.id === +action.likeProductComments.likeable_id) {
                       item.likes = [...item.likes, action.likeProductComments];
                       return item
                   }
                })
            return {
                ...state,
                loadingCommentLikes: false,
                productComments: productCommentsCopy,
                message: action.message
            }
        case LIKE_PRODUCTS_COMMENT_FAILURE:
            return {
                ...state,
                loadingCommentLikes: false,
                message: action.message
            }
        // DISLIKE
        case DISLIKE_PRODUCTS_COMMENT_REQUEST:
            return {
                ...state,
                loadingCommentLikes: true,
                message: '',
                productComments: [...state.productComments]
            }
        case DISLIKE_PRODUCTS_COMMENT_SUCCESS:
            const removed = cloneDeep(state.productComments)
            removed.map((item) => {
                item.likes = [item.likes.filter(i => +i.id !== +action.dislikeProductComments.id)];
                return item
            })
            return {
                ...state,
                loadingCommentLikes: false,
                productComments: removed,
                message: action.message
            }
        case DISLIKE_PRODUCTS_COMMENT_FAILURE:
            return {
                ...state,
                loadingCommentLikes: false,
                message: action.message
            }
    // DEFAULT
        default:
            return state
    }
}
export default productCommentsReducer
