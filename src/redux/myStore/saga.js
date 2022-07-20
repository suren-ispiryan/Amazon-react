import { put, takeLatest } from 'redux-saga/effects';

import {
    createTodoRequest,
    createTodoSuccess,
    createTodoFailure
} from './actions';

function* createTodo({ payload }) {
    try {
        if (!localStorage.getItem('todos')) {
            localStorage.setItem('todos', JSON.stringify([payload]));
        } else {
            let todos = JSON.parse(localStorage.getItem('todos'));
            todos.push(payload)
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        const response = { message: 'successfully put in local storage like in db', status: 200, data: payload }
        if (response?.status === 200) {
            yield put(createTodoSuccess(response));
        }
    } catch (error) {
        if (error) {
            yield put(createTodoFailure(error.message));
        }
    }
}

export default function* actions () {
    yield takeLatest(createTodoRequest, createTodo);
}
