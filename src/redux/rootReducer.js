import { combineReducers } from 'redux';
import myStore from './myStore/reducer';
import userProfile from './userProfile/reducer';

const rootReducer = combineReducers({
    products: myStore,
    addresses: userProfile
})
export default rootReducer
