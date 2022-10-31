import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_CHOSEN_USER_MESSAGES_REQUEST,
    GET_CHOSEN_USER_MESSAGES_SUCCESS,
    GET_CHOSEN_USER_MESSAGES_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
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
        case GET_CHOSEN_USER_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                chatMessages: []
            }
        case GET_CHOSEN_USER_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                chatMessages: action.chosenUserMessages,
                message: action.message
            }
        case GET_CHOSEN_USER_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case SEND_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                chatMessages: [...state.chatMessages],
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                chatMessages: [...state.chatMessages, action.createdMessage],
                message: action.message
            }
        case SEND_MESSAGE_FAILURE:
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
