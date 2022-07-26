import {
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE,
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE,
    DEFAULT_ADDRESS_REQUEST,
    DEFAULT_ADDRESS_SUCCESS,
    DEFAULT_ADDRESS_FAILURE
} from "./actions"

const initialState = {
    addresses: [],
    loading: false,
    message: '',
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
    //CREATE
        case CREATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                addresses: [...state.addresses],
            }
        case CREATE_ADDRESS_SUCCESS:
            console.log(action.address)
            return {
                ...state,
                loading: false,
                addresses: [...state.addresses, action.address],
                message: action.message
            }
        case CREATE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    //GET
        case GET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                addresses: []
            }
        case GET_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.address,
                message: action.message
            }
        case GET_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    //DELETE
        case DELETE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                addresses: [...state.addresses]
            }
        case DELETE_ADDRESS_SUCCESS:
            const removedAddress = state.addresses.filter(i => i.id !== parseInt(action.address))
            return {
                ...state,
                loading: false,
                addresses: removedAddress,
                message: action.message
            }
        case DELETE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.message
            }
    //MAKE DEFAULT
        case DEFAULT_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                addresses: [...state.addresses]
            }
        case DEFAULT_ADDRESS_SUCCESS:
            const newProducts = [];
            state.addresses.map(i => {
                if(i.id !== parseInt(action.address.id)) {
                    i.default = 0
                    newProducts.push(i)
                } else {
                    newProducts.push(action.address)
                }
            })
            return {
                ...state,
                loading: false,
                addresses: newProducts,
                message: action.message
            }
        case DEFAULT_ADDRESS_FAILURE:
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
export default profileReducer
