// ** Redux Imports
import { combineReducers } from 'redux';

// ** Reducers Imports
import
    todos from './myStore/reducer'

const rootReducer = combineReducers({
    todos,
});

export default rootReducer;
