import { put, takeLatest } from 'redux-saga/effects'
import axiosInstance from '../../config/axiosInstance';
import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_CHOOSEN_USER_MESSAGES_REQUEST,
    GET_CHOOSEN_USER_MESSAGES_SUCCESS,
    GET_CHOOSEN_USER_MESSAGES_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
} from './actions'


function* getMessages() {
    try {
        const response = yield axiosInstance.get(`/get-chat-messages`)
        yield put({
            type: GET_MESSAGES_SUCCESS,
            message: 'Can not find messages',
            chatUsers: response.data
        });
    } catch (e) {
        yield put({
            type: GET_MESSAGES_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* getChosenUserMessages(action) {
    try {
        const response = yield axiosInstance.get(`/get-chosen-user-messages/${action.payload}`)
        yield put({
            type: GET_CHOOSEN_USER_MESSAGES_SUCCESS,
            message: 'Can not find messages',
            chosenUserMessages: response.data
        });
    } catch (e) {
        yield put({
            type: GET_CHOOSEN_USER_MESSAGES_FAILURE,
            message: 'Something went wrong'
        });
    }
}

function* createMessage(action) {
    try {
        const response = yield axiosInstance.post(`/create-message/${action.payload.id}`, action.payload)
        yield put({
            type: SEND_MESSAGE_SUCCESS,
            message: 'Can not create messages',
            createdMessage: response.data
        });
    } catch (e) {
        yield put({
            type: SEND_MESSAGE_FAILURE,
            message: 'Something went wrong'
        });
    }
}

export default function* chat() {
    yield takeLatest(GET_MESSAGES_REQUEST, getMessages);
    yield takeLatest(GET_CHOOSEN_USER_MESSAGES_REQUEST, getChosenUserMessages);
    yield takeLatest(SEND_MESSAGE_REQUEST, createMessage);
}
