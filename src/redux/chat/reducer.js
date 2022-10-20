import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILURE
} from "./actions"

const initialState = {
    chatUsers: [],
    chatMessages: [],
    loading: false,
    message: '',
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                chatUsers: []
            }
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                chatUsers: action.chatUsers,
                message: action.message
            }
        case GET_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        default:
            return state
    }
}
export default chatReducer
