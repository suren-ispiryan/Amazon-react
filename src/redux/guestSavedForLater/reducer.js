import {
    GET_SAVEDFORLATER_REQUEST,
    GET_SAVEDFORLATER_SUCCESS,
    GET_SAVEDFORLATER_FAILURE
} from "./actions"

const initialState = {
    guestSavedForLaterProducts: [],
    loading: false,
    message: '',
}
const guestSavedForLaterReducer = (state = initialState, action) => {
    switch (action.type) {
    //GET
        case GET_SAVEDFORLATER_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                guestSavedForLaterProducts: []
            }
        case GET_SAVEDFORLATER_SUCCESS:
            return {
                ...state,
                loading: false,
                guestSavedForLaterProducts: action.products,
                message: action.message
            }
        case GET_SAVEDFORLATER_FAILURE:
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
export default guestSavedForLaterReducer
