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
    ADD_SIZE_REQUEST,
    ADD_SIZE_SUCCESS,
    ADD_SIZE_FAILURE,
    GET_PRODUCT_SIZES_REQUEST,
    GET_PRODUCT_SIZES_SUCCESS,
    GET_PRODUCT_SIZES_FAILURE,
    REMOVE_SIZE_REQUEST,
    REMOVE_SIZE_SUCCESS,
    REMOVE_SIZE_FAILURE
} from "./actions"

const initialStata = {
    categories: [],
    sizes: [],
    loading: false,
    message: '',
}

const adminProductParametersReducer = (state = initialStata, action) => {
    switch (action.type) {
    //CREATE CATEGORY
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
    // GET CATEGORY
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
    // REMOVE CATEGORY
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

    //CREATE SIZE
        case ADD_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                sizes: [...state.sizes],
            }
        case ADD_SIZE_SUCCESS:
            return {
                ...state,
                loading: false,
                sizes: [...state.sizes, action.addedSize],
                message: action.message
            }
        case ADD_SIZE_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    // GET SIZE
        case GET_PRODUCT_SIZES_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                sizes: []
            }
        case GET_PRODUCT_SIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                sizes: action.getSizes,
                message: action.message
            }
        case GET_PRODUCT_SIZES_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    // REMOVE SIZE
        case REMOVE_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                categories: [...state.categories]
            }
        case REMOVE_SIZE_SUCCESS:
            let sizesList = []
            sizesList = state.sizes.filter(i => i.id !== parseInt(action.removeSize.id))
            return {
                ...state,
                loading: false,
                sizes: sizesList,
                message: action.message
            }
        case REMOVE_SIZE_FAILURE:
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
export default adminProductParametersReducer
