import {
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE
} from "./actions"

const initialState = {
    adminUsers: [],
    loading: false,
    message: '',
}
const adminUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                adminUsers: []
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                adminUsers: action.adminUserList,
                message: action.message
            }
        case GET_ALL_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                adminUsers: [...state.adminUsers]
            }
        case DELETE_USER_SUCCESS:
            const removedUser = state.adminUsers.filter(i => i.id !== parseInt(action.deleteUser))
            return {
                ...state,
                loading: false,
                adminUsers: removedUser,
                message: action.message
            }
        case DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                adminUsers: [...state.adminUsers]
            }
        case UPDATE_USER_SUCCESS:
            const newUser = [];
            state.adminUsers.map(i => {
                if(i.id !== parseInt(action.updatedUser.id)) {
                    newUser.push(i)
                } else {
                    newUser.push(action.updatedUser)
                }
            })
            return {
                ...state,
                loading: false,
                adminUsers: newUser,
                message: action.message
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
        default:
            return state
    }
}
export default adminUsersReducer;
