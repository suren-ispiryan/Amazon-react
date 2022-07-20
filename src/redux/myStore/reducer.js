import { handleActions } from 'redux-actions';
import {
    createTodoRequest,
    createTodoSuccess,
    createTodoFailure
} from './actions';

const initialState = {
    isCreating: false,
    isCreatedSuccess: false,
    isCreatedFailure: false,
    successMessage: '',
    errorMessage: '',
    list: []
};

const reducer = handleActions({
      [createTodoRequest]: (state) => ({
          ...state,
          isCreating: true,
          isCreatedSuccess: false,
          isCreatedFailure: false,
          errorMessage: '',
          successMessage: ''
      }),
      [createTodoSuccess]: (state, { payload }) => ({
          ...state,
          isCreating: false,
          isCreatedSuccess: true,
          isCreatedFailure: false,
          list: [...state.list, payload.data],
          successMessage: payload.message,
          errorMessage: ''
      }),
      [createTodoFailure]: (state, { payload }) => ({
          ...state,
          isCreating: false,
          isCreatedSuccess: false,
          isCreatedFailure: true,
          errorMessage: payload
      })
    },
    initialState
);

export default reducer;
