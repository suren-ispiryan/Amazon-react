import { createAction } from 'redux-actions';

export const createTodoRequest = createAction('CREATE_TODO_REQUEST')
export const createTodoSuccess = createAction('CREATE_TODO_SUCCESS')
export const createTodoFailure = createAction('CREATE_TODO_FAILURE')
