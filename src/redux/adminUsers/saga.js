import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
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
} from './actions'

function* getAllUsers() {
    try {
        const response = yield axiosInstance.get('/get-all-users')
        yield put({
            type: GET_ALL_USERS_SUCCESS,
            message: 'Can not find users',
            adminUserList: response.data
        });
    } catch (e) {
        yield put({
            type: GET_ALL_USERS_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* deleteUser (action) {
    try {
        const response = yield axiosInstance.get(`/delete-users/${action.payload}`)
        yield put({
            type: DELETE_USER_SUCCESS,
            message: 'Can not find users',
            deleteUser: response.data
        });
    } catch (e) {
        yield put({
            type: DELETE_USER_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* UpdateUser(action) {
    try {
        const response = yield axiosInstance.post('/update-user', action.payload)
        yield put({
            type: UPDATE_USER_SUCCESS,
            message: 'Success fetching data',
            updatedUser: response.data
        });
    } catch (e) {
        yield put({
            type: UPDATE_USER_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* adminUsers() {
    yield takeLatest(GET_ALL_USERS_REQUEST, getAllUsers);
    yield takeLatest(DELETE_USER_REQUEST, deleteUser);
    yield takeLatest(UPDATE_USER_REQUEST, UpdateUser);
}
