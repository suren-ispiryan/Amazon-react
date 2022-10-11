import { put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../config/axiosInstance';
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE
} from './actions'


function* login(action) {
    try {
        const response = yield axiosInstance.post('/login', action.payload)
        yield put({
            type: LOGIN_USER_SUCCESS,
            message: 'Successfully logged in',
            login: response.data
        });
    } catch (e) {
        yield put({
            type: LOGIN_USER_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* () {
    yield takeLatest(LOGIN_USER_REQUEST, login);
}
